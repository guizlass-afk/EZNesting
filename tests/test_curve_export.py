"""Independent DXF regression: pip install ezdxf playwright; Chrome required."""
from functools import partial
from http.server import ThreadingHTTPServer,SimpleHTTPRequestHandler
from threading import Thread
from pathlib import Path
from collections import Counter
import io,math,sys
import ezdxf
from ezdxf.math import Matrix44,Vec3
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1]
sys.stdout.reconfigure(encoding='utf-8')
def fixture():
 doc=ezdxf.new('R2000');m=doc.modelspace()
 m.add_lwpolyline([(1000,-500),(1200,-500),(1200,-340),(1000,-340)],close=True)
 m.add_circle((1040,-450),12.345678901234)
 m.add_arc((1090,-450),17.123456789012,25.5,237.25)
 m.add_ellipse((1150,-390),major_axis=(17,9),ratio=.375,start_param=.2,end_param=5.6)
 m.add_rational_spline([(1020,-410),(1040,-370),(1060,-410)],weights=[1,math.sqrt(.5),1],degree=2,knots=[0,0,0,1,1,1])
 sp=m.add_open_spline([(1100,-430),(1110,-390),(1130,-440),(1140,-410)],degree=3)
 sp.dxf.start_tangent=(10,40,0);sp.dxf.end_tangent=(10,30,0);sp.fit_points=[(1100,-430),(1140,-410)]
 m.add_lwpolyline([(1100,-475,.414213562373095),(1130,-475,-.2),(1125,-450,0)],format='xyb',close=True)
 m.add_polyline2d([(1040,-480,-.414213562373095),(1070,-480,0),(1070,-470,0)],format='xyb')
 m.add_line((1180,-470),(1180,-460))
 m.add_arc((-1150,-460),8,10,130,dxfattribs={'extrusion':(0,0,-1)})
 m.add_ellipse((1020,-370),major_axis=(5,2),ratio=.7,dxfattribs={'extrusion':(0,0,-1)})
 m.add_lwpolyline([(-1170,-425,.6),(-1180,-420,0)],format='xyb',dxfattribs={'extrusion':(0,0,-1)})
 return doc

def dump(doc):
 text=io.StringIO();doc.write(text);return text.getvalue()

def geometry(e):
 typ=e.dxftype()
 if typ=='LINE':return [*e.dxf.start,*e.dxf.end]
 if typ=='CIRCLE':return [*e.dxf.center,e.dxf.radius,*e.dxf.extrusion]
 if typ=='ARC':return [*e.dxf.center,e.dxf.radius,e.dxf.start_angle%360,e.dxf.end_angle%360,*e.dxf.extrusion]
 if typ=='ELLIPSE':return [*e.dxf.center,*e.dxf.major_axis,e.dxf.ratio,e.dxf.start_param,e.dxf.end_param,*e.dxf.extrusion]
 if typ=='SPLINE':return [e.dxf.degree,e.dxf.flags,*e.knots,*e.weights,*[c for p in e.control_points for c in p],*[c for p in e.fit_points for c in p],*e.dxf.get('start_tangent',(0,0,0)),*e.dxf.get('end_tangent',(0,0,0))]
 if typ=='LWPOLYLINE':return [e.dxf.flags,e.dxf.elevation,*e.dxf.extrusion,*[v for p in e.get_points('xyseb') for v in p]]
 if typ=='POLYLINE':return [e.dxf.flags,*e.dxf.extrusion,*[v for p in e.vertices for v in (*p.dxf.location,p.dxf.bulge,p.dxf.start_width,p.dxf.end_width)]]
 raise AssertionError(typ)

def assert_same(actual,expected):
 assert Counter(e.dxftype() for e in actual)==Counter(e.dxftype() for e in expected),(Counter(e.dxftype() for e in actual),Counter(e.dxftype() for e in expected))
 remaining=list(actual)
 for e in expected:
  coords=geometry(e);match=None
  for candidate in remaining:
   if candidate.dxftype()!=e.dxftype():continue
   other=geometry(candidate)
   if len(coords)==len(other) and all(math.isclose(x,y,rel_tol=1e-12,abs_tol=2e-9) for x,y in zip(coords,other)):
    match=candidate;break
  assert match is not None,(e.dxftype(),coords,[(x.dxftype(),geometry(x)) for x in remaining if x.dxftype()==e.dxftype()])
  remaining.remove(match)

class Quiet(SimpleHTTPRequestHandler):
 def log_message(self,*args):pass
server=ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)));Thread(target=server.serve_forever,daemon=True).start()
try:
 with sync_playwright() as pw:
  browser=pw.chromium.launch(channel='chrome',headless=True);page=browser.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
  page.goto(f'http://127.0.0.1:{server.server_port}/');page.wait_for_function('window.NestDXFCore')
  doc=fixture();source=dump(doc)
  result=page.evaluate('''text=>{
    const core=NestDXFCore,parts=core.parseDxfParts(text,'curves.dxf');if(parts.length!==1)throw Error('Unexpected part split: '+parts.length);
    const part=parts[0],before=JSON.stringify(part.sourceEntities),sheets=[];
    for(const angle of [0,37,90,270]){
      const shape=core.rotatedShape(part,angle);
      shape.paths=[{closed:true,points:[{x:0,y:0},{x:1,y:0},{x:1,y:1}]}];
      sheets.push({width:500,height:500,placements:[{part,shape,x:20,y:30}]});
    }
    const dxf=core.createDxf({sheets,config:{edgeGap:5}});
    if(before!==JSON.stringify(part.sourceEntities))throw Error('Original mutated');
    return {dxf,sourceCount:part.sourceEntities.length,partWidth:part.width,partHeight:part.height};
  }''',source)
  assert result['sourceCount']==len(doc.modelspace())
  assert result['partWidth']==200 and result['partHeight']==160
  output=ezdxf.read(io.StringIO(result['dxf'],newline=None));audit=output.audit();assert not audit.has_errors,[str(e) for e in audit.errors];assert not audit.has_fixes,[str(e) for e in audit.fixes]
  exported=[e for e in output.modelspace() if e.dxf.layer.startswith('P_')];expected=[]
  for i,angle in enumerate([0,37,90,270]):
   rotation=Matrix44.z_rotate(math.radians(angle));corners=[rotation.transform(Vec3(x,y,0)) for x,y in [(1000,-500),(1200,-500),(1200,-340),(1000,-340)]]
   tx=20+i*600-min(p.x for p in corners);ty=30-min(p.y for p in corners);transform=rotation@Matrix44.translate(tx,ty,0)
   for original in doc.modelspace():expected.append(original.copy().transform(transform))
  assert_same(exported,expected)
  rational=page.evaluate('''text=>{const paths=DxfGeometry.parseRecords(NestDXFCore.parseDxfParts(text,'x.dxf')[0].sourceEntities);return paths.find(p=>p.sourceEntities[0].type==='SPLINE').points}''',source)
  mid=max(rational,key=lambda p:p['y']);assert abs(mid['y']-(-410+40*math.sqrt(.5)/(1+math.sqrt(.5))))<.01
  optimized=page.evaluate('''async text=>{const parts=NestDXFCore.parseDxfParts(text,'curves.dxf');parts[0].quantity=2;const r=await NestDXFCore.optimize(parts,{sheetWidth:700,sheetHeight:500,partGap:5,edgeGap:10,rotations:[0,90],iterations:2,maxSheets:2});return NestDXFCore.createDxf(r)}''',source)
  optimized_doc=ezdxf.read(io.StringIO(optimized,newline=None));assert not optimized_doc.audit().has_errors
  assert Counter(e.dxftype() for e in optimized_doc.modelspace() if e.dxf.layer.startswith('P_'))==Counter({k:v*2 for k,v in Counter(e.dxftype() for e in doc.modelspace()).items()})
  stitched=ezdxf.new();ms=stitched.modelspace();ms.add_arc((0,0),25,0,180);ms.add_line((-25,0),(25,0))
  counts=page.evaluate("text=>{const p=NestDXFCore.parseDxfParts(text,'semicircle.dxf');return p.map(x=>x.sourceEntities.map(e=>e.type))}",dump(stitched));assert len(counts)==1 and sorted(counts[0])==['ARC','LINE']
  fit_only=ezdxf.new();fit_only.modelspace().add_spline([(0,0),(10,20),(20,0)])
  error=page.evaluate("text=>{try{NestDXFCore.parseDxfParts(text,'fit.dxf');return ''}catch(e){return e.message}}",dump(fit_only));assert 'SPLINE' in error
  assert not errors,errors
  browser.close();print('PASS: independent ezdxf audit; exact native geometry at 0/37/90/270 degrees across four sheets; knots/weights/tangents, arcs, circles, ellipses, bulges, negative OCS, stitching, proxy corruption and real optimizer.')
finally:server.shutdown()
