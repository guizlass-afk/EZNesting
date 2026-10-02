"""Quality regression; optional private DXFs stay outside the repository.
python tests/test_nesting_quality.py [--files A.dxf B.dxf C.dxf] [--output-dir DIR]
Set NESTER_BASELINE_APP to an older app.js for a same-input comparison.
"""
from functools import partial
from http.server import ThreadingHTTPServer,SimpleHTTPRequestHandler
from threading import Thread
from pathlib import Path
from collections import Counter
import argparse,io,json,math,os,sys,time,hashlib
import ezdxf
from ezdxf.path import make_path
from shapely.geometry import LineString,Polygon,box
from shapely.ops import unary_union,polygonize,snap
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1]
sys.stdout.reconfigure(encoding='utf-8')
parser=argparse.ArgumentParser();parser.add_argument('--files',nargs=3,type=Path);parser.add_argument('--output-dir',type=Path);args=parser.parse_args()

def synthetic(width,height,cut):
 doc=ezdxf.new('R2000');m=doc.modelspace();m.add_lwpolyline([(0,0),(width,0),(width,height),(cut,height)],close=True)
 stream=io.StringIO();doc.write(stream);return stream.getvalue()
if args.files:
 original_hashes=[hashlib.sha256(p.read_bytes()).hexdigest() for p in args.files]
 sources=[{'name':p.name,'text':p.read_text(encoding='cp1252')} for p in args.files]
else:sources=[{'name':'large.dxf','text':synthetic(540,530,230)},{'name':'block.dxf','text':synthetic(393,400,0)},{'name':'small.dxf','text':synthetic(393,400,180)}]
class Quiet(SimpleHTTPRequestHandler):
 def log_message(self,*args):pass
server=ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)));Thread(target=server.serve_forever,daemon=True).start()
RUN='''async ({sources,quantity,free,iterations})=>{
 const parts=sources.flatMap(s=>NestDXFCore.parseDxfParts(s.text,s.name));parts.forEach((p,i)=>p.quantity=quantity[i]);
 const start=performance.now(),progress=[];
 const result=await NestDXFCore.optimize(parts,{sheetWidth:1850,sheetHeight:2750,partGap:14,edgeGap:5,rotations:free?[]:[0,90,180,270],freeRotation:free,iterations,maxSheets:1},p=>progress.push(p));
 window.qualityResult=result;
 return {ms:performance.now()-start,occupied:result.occupied,iterations:result.iterationsRun,relocations:result.relocations||0,progress,validated:result.geometryValidated,dxf:NestDXFCore.createDxf(result),sheets:result.sheets.map(s=>({width:s.width,height:s.height,usedMaxX:s.usedMaxX,usedMaxY:s.usedMaxY,placements:s.placements.map(p=>({id:p.part.id,name:p.part.name,instance:p.instanceNumber,angle:p.shape.angle,entities:p.part.sourceEntities.length,area:p.part.area}))}))};
}'''
def verify(result,quantity):
 assert result['validated'] and len(result['sheets'])==1
 progress=result['progress'];assert progress[-1]==1 and all(b>=a for a,b in zip(progress,progress[1:]))
 doc=ezdxf.read(io.StringIO(result['dxf'],newline=None));audit=doc.audit();assert not audit.has_errors and not audit.has_fixes
 native=[e for e in doc.modelspace() if e.dxf.layer.startswith('P_')];sheet=result['sheets'][0];polygons=[];offset=0
 assert Counter(p['name'] for p in sheet['placements'])==Counter({s['name'][:-4]:q for s,q in zip(sources,quantity) if q})
 assert len({(p['name'],p['instance']) for p in sheet['placements']})==sum(quantity)
 for placement in sheet['placements']:
  group=native[offset:offset+placement['entities']];offset+=placement['entities'];assert len(group)==placement['entities']
  lines=[LineString([(v.x,v.y) for v in make_path(e).flattening(.002)]) for e in group]
  network=unary_union(lines);network=unary_union(snap(network,network,1e-6));loops=list(polygonize(network));assert loops,placement
  outer=max(loops,key=lambda p:p.area);contour=Polygon(outer.exterior);assert contour.is_valid
  assert abs(contour.area-placement['area'])<max(1,placement['area']*.0001),(placement,contour.area)
  assert contour.bounds[0]>=5-1e-5 and contour.bounds[1]>=5-1e-5 and contour.bounds[2]<=1845+1e-5 and contour.bounds[3]<=2745+1e-5,(placement,contour.bounds)
  polygons.append(contour)
 assert offset==len(native)
 minimum=min((a.distance(b) for i,a in enumerate(polygons) for b in polygons[i+1:]),default=math.inf)
 assert minimum>=14-0.005,minimum
 return minimum
try:
 with sync_playwright() as pw:
  browser=pw.chromium.launch(channel='chrome',headless=True);page=browser.new_page(viewport={'width':1000,'height':900});errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
  baseline=None
  if os.environ.get('NESTER_BASELINE_APP'):
   old=Path(os.environ['NESTER_BASELINE_APP']).read_text(encoding='utf-8')
   page.route('**/app.js*',lambda route:route.fulfill(body=old,content_type='text/javascript'))
   page.goto(f'http://127.0.0.1:{server.server_port}/');page.wait_for_function('window.NestDXFCore')
   baseline=page.evaluate(RUN,{'sources':sources,'quantity':[2,1,9],'free':True,'iterations':24})
   page.unroute('**/app.js*')
  page.goto(f'http://127.0.0.1:{server.server_port}/');page.wait_for_function('window.NestDXFCore')
  pair=page.evaluate(RUN,{'sources':sources,'quantity':[0,0,2],'free':False,'iterations':12});verify(pair,[0,0,2])
  assert pair['occupied']<2*393*400*.90,pair['occupied']
  result=page.evaluate(RUN,{'sources':sources,'quantity':[2,1,9],'free':True,'iterations':24});minimum=verify(result,[2,1,9])
  assert result['iterations']>=12 and result['occupied']<2600000,result['occupied']
  if baseline:assert result['occupied']<baseline['occupied']*.90,(result['occupied'],baseline['occupied'])
  if args.output_dir:
   args.output_dir.mkdir(parents=True,exist_ok=True)
   (args.output_dir/'nesting_otimizado_livre.dxf').write_text(result['dxf'],encoding='utf-8',newline='')
   # Preview uses the complete sampled paths, export above uses native DXF entities.
   svg=page.evaluate('''()=>{const r=qualityResult,s=r.sheets[0],colors=['#f18759','#529e9a','#7895b8'];let svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="-30 -30 1910 2810" width="573" height="843"><rect x="0" y="0" width="1850" height="2750" fill="white" stroke="#444"/>';const names=[...new Set(s.placements.map(p=>p.part.name))].sort();for(const p of s.placements){let d='';for(const path of p.shape.paths)d+='M'+path.points.map(q=>[q.x+p.x,2750-q.y-p.y].join(',')).join('L')+(path.closed?'Z':'');svg+='<path d="'+d+'" fill="'+colors[names.indexOf(p.part.name)]+'" fill-rule="evenodd" stroke="#333" stroke-width=".5"/>';}return svg+'</svg>'}''')
   (args.output_dir/'previa_nesting.svg').write_text(svg,encoding='utf-8');page.set_content('<body style="margin:0;background:#edf2f4">'+svg+'</body>');page.locator('svg').screenshot(path=str(args.output_dir/'previa_nesting.png'))
   metadata={k:v for k,v in result.items() if k not in ['dxf','progress']};metadata['minimumMeasuredGap']=minimum
   if baseline:metadata['baselineOccupied']=baseline['occupied'];metadata['improvementPercent']=100*(1-result['occupied']/baseline['occupied'])
   (args.output_dir/'validacao.json').write_text(json.dumps(metadata,ensure_ascii=False,indent=2),encoding='utf-8')
  if args.files:assert original_hashes==[hashlib.sha256(p.read_bytes()).hexdigest() for p in args.files]
  assert not errors,errors
  print(json.dumps({'PASS':True,'occupied_m2':result['occupied']/1e6,'baseline_m2':baseline['occupied']/1e6 if baseline else None,'minimum_gap_mm':minimum,'iterations':result['iterations'],'relocations':result['relocations'],'seconds':result['ms']/1000}))
  browser.close()
finally:server.shutdown()
