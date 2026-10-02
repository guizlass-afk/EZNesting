/* Exact 2D DXF entities are kept apart from the sampled nesting geometry.
 * Group codes: Autodesk DXF Reference (SPLINE, ELLIPSE, ARC, POLYLINE).
 * No control points, knot values, weights, radii or bulges are simplified.
 */
(() => {
  'use strict';
  const TAU = 2 * Math.PI, TOLERANCE = 0.01;
  const errorMessages = {"pt-BR": ["Limite de amostragem da curva excedido.", "A SPLINE precisa de pontos de controle, nós e pesos positivos válidos. Reexporte a curva no CAD como spline por pontos de controle.", "A POLYLINE ajustada ou 3D precisa ser reexportada no CAD como SPLINE ou polilinha 2D suportada.", "Somente curvas paralelas ao plano XY são aceitas.", "Geometria inválida."], "en-US": ["Curve sampling limit exceeded.", "SPLINE requires valid control points, knots and positive weights. Re-export it in CAD as a control-point spline.", "Re-export fitted or 3D POLYLINE in CAD as a supported planar SPLINE or 2D polyline.", "Only curves parallel to the XY plane are supported.", "Invalid geometry."], "es-ES": ["Se superó el límite de muestreo de la curva.", "SPLINE requiere puntos de control, nodos y pesos positivos válidos. Reexpórtela en CAD como spline por puntos de control.", "Reexporte POLYLINE ajustada o 3D como SPLINE plana o polilínea 2D compatible.", "Solo se admiten curvas paralelas al plano XY.", "Geometría no válida."], "fr-FR": ["Limite d’échantillonnage de courbe dépassée.", "SPLINE exige des points de contrôle, nœuds et poids positifs valides. Réexportez-la en CAO avec des points de contrôle.", "Réexportez la POLYLINE ajustée ou 3D en SPLINE plane ou polyligne 2D prise en charge.", "Seules les courbes parallèles au plan XY sont acceptées.", "Géométrie invalide."], "de-DE": ["Grenze für die Kurvenabtastung überschritten.", "SPLINE benötigt gültige Kontrollpunkte, Knoten und positive Gewichte. Als Kontrollpunktspline aus CAD neu exportieren.", "Angepasste oder 3D-POLYLINE als unterstützte ebene SPLINE oder 2D-Polylinie neu exportieren.", "Nur Kurven parallel zur XY-Ebene werden unterstützt.", "Ungültige Geometrie."], "it-IT": ["Limite di campionamento della curva superato.", "SPLINE richiede punti di controllo, nodi e pesi positivi validi. Riesportarla dal CAD con punti di controllo.", "Riesportare POLYLINE adattata o 3D come SPLINE planare o polilinea 2D supportata.", "Sono supportate solo curve parallele al piano XY.", "Geometria non valida."], "zh-CN": ["超出曲线采样限制。", "SPLINE 需要有效的控制点、节点和正权重。请在 CAD 中以控制点样条重新导出。", "请将拟合或三维 POLYLINE 重新导出为支持的平面 SPLINE 或二维多段线。", "仅支持平行于 XY 平面的曲线。", "几何数据无效。"], "ja-JP": ["曲線のサンプリング上限を超えました。", "SPLINE には有効な制御点・ノット・正の重みが必要です。CAD で制御点スプラインとして再出力してください。", "フィットまたは3D POLYLINE を対応する平面 SPLINE または2Dポリラインとして再出力してください。", "XY 平面に平行な曲線のみ対応しています。", "無効なジオメトリです。"], "ru-RU": ["Превышен предел дискретизации кривой.", "SPLINE требует корректных контрольных точек, узлов и положительных весов. Повторно экспортируйте из CAD как сплайн по контрольным точкам.", "Повторно экспортируйте сглаженную или 3D POLYLINE как поддерживаемую плоскую SPLINE или 2D-полилинию.", "Поддерживаются только кривые, параллельные плоскости XY.", "Некорректная геометрия."], "ar-SA": ["تم تجاوز حد أخذ عينات المنحنى.", "تتطلب SPLINE نقاط تحكم وعقدًا وأوزانًا موجبة صالحة. أعد تصديرها من CAD كمنحنى بنقاط تحكم.", "أعد تصدير POLYLINE الملائمة أو ثلاثية الأبعاد كمنحنى SPLINE مستوٍ أو خط متعدد ثنائي الأبعاد مدعوم.", "تُدعم فقط المنحنيات الموازية للمستوى XY.", "هندسة غير صالحة."], "hi-IN": ["वक्र नमूनाकरण सीमा पार हो गई।", "SPLINE के लिए मान्य नियंत्रण बिंदु, नॉट और धनात्मक भार चाहिए। CAD से नियंत्रण-बिंदु स्प्लाइन के रूप में फिर निर्यात करें।", "फिटेड या 3D POLYLINE को समर्थित समतलीय SPLINE या 2D पॉलीलाइन के रूप में फिर निर्यात करें।", "केवल XY तल के समानांतर वक्र समर्थित हैं।", "अमान्य ज्यामिति।"], "bn-BD": ["বক্ররেখার নমুনা সীমা অতিক্রম করেছে।", "SPLINE-এর জন্য বৈধ নিয়ন্ত্রণ বিন্দু, নট এবং ধনাত্মক ওজন প্রয়োজন। CAD থেকে নিয়ন্ত্রণ-বিন্দু স্প্লাইন হিসেবে আবার রপ্তানি করুন।", "ফিট করা বা 3D POLYLINE-কে সমর্থিত সমতল SPLINE বা 2D পলিলাইন হিসেবে আবার রপ্তানি করুন।", "শুধু XY তলের সমান্তরাল বক্ররেখা সমর্থিত।", "অবৈধ জ্যামিতি।"]};
  const failure = index => new Error("DXF: " + (errorMessages[document.documentElement.lang] || errorMessages["en-US"])[index]);
  const value = (e, code, fallback = 0) => {
    const p = e.pairs.find(p => p.code === code);
    return p ? Number(p.value) : fallback;
  };
  const values = (e, code) => e.pairs.filter(p => p.code === code).map(p => Number(p.value));
  const coordinates = (e, code = 10) => {
    const xs = values(e, code), ys = values(e, code + 10), zs = values(e, code + 20);
    return xs.map((x, i) => ({ x, y: ys[i] ?? 0, z: zs[i] ?? 0 }));
  };
  const distanceToLine = (p, a, b) => {
    const dx = b.x - a.x, dy = b.y - a.y, d2 = dx * dx + dy * dy;
    const t = d2 ? Math.max(0, Math.min(1, ((p.x-a.x)*dx+(p.y-a.y)*dy)/d2)) : 0;
    return Math.hypot(p.x-a.x-t*dx, p.y-a.y-t*dy);
  };
  function curvePoints(evaluate, intervals) {
    const out = [];
    function subdivide(a, b, pa, pb, depth) {
      const q1 = evaluate(a+(b-a)/4), mid = evaluate((a+b)/2), q3 = evaluate(a+3*(b-a)/4);
      const deviation = Math.max(...[q1,mid,q3].map(p=>distanceToLine(p,pa,pb)));
      if (deviation > TOLERANCE / 2) {
        if (depth >= 20) throw failure(0);
        subdivide(a,(a+b)/2,pa,mid,depth+1);subdivide((a+b)/2,b,mid,pb,depth+1);
      } else out.push(pb);
      if (out.length > 100000) throw failure(0);
    }
    for (const [a,b] of intervals) {
      if (!(b>a)) continue;
      const pa=evaluate(a),pb=evaluate(b);
      if (!out.length) out.push(pa);
      subdivide(a,b,pa,pb,0);
    }
    return out;
  }
  function splinePoints(e) {
    const controls=coordinates(e),degree=value(e,71),knots=values(e,40),weights=values(e,41);
    const n=controls.length-1;
    if (!Number.isInteger(degree)||degree<1||degree>n||knots.length!==controls.length+degree+1||
        knots.some((k,i)=>!Number.isFinite(k)||(i&&k<knots[i-1]))||
        (weights.length&&weights.length!==controls.length)||weights.some(w=>!Number.isFinite(w)||w<=0)) {
      throw failure(1);
    }
    const start=knots[degree],end=knots[n+1];
    if (!(end>start)) throw failure(1);
    function evaluate(u) {
      let span=n;
      if(u<end){let low=degree,high=n+1;while(low+1<high){const mid=(low+high)>>1;if(knots[mid]<=u)low=mid;else high=mid;}span=low;}
      const d=[];
      for(let j=0;j<=degree;j++){const index=span-degree+j,w=weights[index]??1,p=controls[index];d.push([p.x*w,p.y*w,w]);}
      for(let level=1;level<=degree;level++)for(let j=degree;j>=level;j--){
        const i=span-degree+j,denom=knots[i+degree-level+1]-knots[i],alpha=denom?(u-knots[i])/denom:0;
        for(let k=0;k<3;k++)d[j][k]=(1-alpha)*d[j-1][k]+alpha*d[j][k];
      }
      return {x:d[degree][0]/d[degree][2],y:d[degree][1]/d[degree][2]};
    }
    const intervals=[];
    for(let i=degree;i<=n;i++)if(knots[i+1]>knots[i]){
      const steps=Math.max(4,degree*2);
      for(let j=0;j<steps;j++)intervals.push([knots[i]+(knots[i+1]-knots[i])*j/steps,knots[i]+(knots[i+1]-knots[i])*(j+1)/steps]);
    }
    return curvePoints(evaluate,intervals);
  }
  function arcPoints(cx,cy,r,start,end) {
    const step=2*Math.acos(Math.max(-1,1-TOLERANCE/Math.max(r,TOLERANCE)));
    const count=Math.max(8,Math.ceil(Math.abs(end-start)/Math.min(Math.PI/36,step)));
    if(count>100000)throw failure(0);
    return Array.from({length:count+1},(_,i)=>{const a=start+(end-start)*i/count;return {x:cx+r*Math.cos(a),y:cy+r*Math.sin(a)}});
  }
  function bulgePoints(vertices,closed) {
    const out=[];const count=closed?vertices.length:vertices.length-1;
    for(let i=0;i<count;i++){
      const a=vertices[i],b=vertices[(i+1)%vertices.length];out.push({x:a.x,y:a.y});
      if(a.bulge){const dx=b.x-a.x,dy=b.y-a.y,chord=Math.hypot(dx,dy);if(!chord)continue;
        const theta=4*Math.atan(a.bulge),d=chord*(1-a.bulge*a.bulge)/(4*a.bulge);
        const cx=(a.x+b.x)/2-dy/chord*d,cy=(a.y+b.y)/2+dx/chord*d;
        const start=Math.atan2(a.y-cy,a.x-cx);
        out.push(...arcPoints(cx,cy,Math.hypot(a.x-cx,a.y-cy),start,start+theta).slice(1,-1));
      }
    }
    if(!closed&&vertices.length)out.push({x:vertices.at(-1).x,y:vertices.at(-1).y});
    return out;
  }
  function parseRecords(records) {
    const paths=[],supported=new Set(['LINE','ARC','CIRCLE','ELLIPSE','SPLINE','LWPOLYLINE','POLYLINE']);
    for(let i=0;i<records.length;i++){
      const raw=records[i];if(!supported.has(raw.type))continue;
      const e={type:raw.type,pairs:raw.pairs.map(p=>({...p}))};
      const nx=value(e,210),ny=value(e,220),nz=value(e,230,1);
      if(Math.abs(nx)>1e-10||Math.abs(ny)>1e-10||Math.abs(Math.abs(nz)-1)>1e-10)throw failure(3);
      let points=[],closed=false;
      const ocs=['ARC','CIRCLE','LWPOLYLINE','POLYLINE'].includes(e.type),sign=ocs&&nz<0?-1:1;
      if(e.type==='LINE')points=[...coordinates(e,10),...coordinates(e,11)];
      else if(e.type==='CIRCLE'||e.type==='ARC'){
        const start=e.type==='CIRCLE'?0:value(e,50)*Math.PI/180;let end=e.type==='CIRCLE'?TAU:value(e,51)*Math.PI/180;
        while(end<=start)end+=TAU;
        const radius=value(e,40);if(!(radius>0))throw failure(4);
        points=arcPoints(value(e,10),value(e,20),radius,start,end);closed=e.type==='CIRCLE';
      }else if(e.type==='ELLIPSE'){
        const cx=value(e,10),cy=value(e,20),mx=value(e,11),my=value(e,21),ratio=value(e,40),start=value(e,41);let end=value(e,42,TAU);
        while(end<=start)end+=TAU;
        if(!(ratio>0)||!Math.hypot(mx,my))throw failure(4);
        const count=Math.max(16,Math.ceil((end-start)/(Math.PI/36)));
        const evaluate=t=>({x:cx+mx*Math.cos(t)-my*ratio*nz*Math.sin(t),y:cy+my*Math.cos(t)+mx*ratio*nz*Math.sin(t)});
        points=curvePoints(evaluate,Array.from({length:count},(_,j)=>[start+(end-start)*j/count,start+(end-start)*(j+1)/count]));closed=Math.abs(end-start-TAU)<1e-8;
      }else if(e.type==='SPLINE'){
        points=splinePoints(e);closed=(value(e,70)&3)!==0;
      }else{
        const vertices=[];closed=(value(e,70)&1)!==0;
        if(e.type==='POLYLINE'){
          if(value(e,70)&(2|4|8|16|64))throw failure(2);
          e.vertices=[];
          while(records[i+1]?.type==='VERTEX'){
            const vr=records[++i],v={type:'VERTEX',pairs:vr.pairs.map(p=>({...p}))};e.vertices.push(v);
            vertices.push({x:value(v,10),y:value(v,20),bulge:value(v,42)});
          }
          if(records[i+1]?.type==='SEQEND')i++;
        }else{
          let vertex;
          for(const p of e.pairs){if(p.code===10){vertex={x:Number(p.value),y:0,bulge:0};vertices.push(vertex)}else if(p.code===20&&vertex)vertex.y=Number(p.value);else if(p.code===42&&vertex)vertex.bulge=Number(p.value);}
        }
        points=bulgePoints(vertices,closed);
      }
      if(points.some(p=>!Number.isFinite(p.x)||!Number.isFinite(p.y)))throw failure(4);
      if(points.length>1)paths.push({points:points.map(p=>({x:sign*p.x,y:p.y})),closed,sourceEntities:[e]});
    }
    return paths;
  }
  const geometryCodes={LINE:[10,20,30,11,21,31,39,210,220,230],ARC:[10,20,30,40,39,50,51,210,220,230],CIRCLE:[10,20,30,40,39,210,220,230],ELLIPSE:[10,20,30,11,21,31,40,41,42,210,220,230],SPLINE:[10,20,30,11,21,31,12,22,32,13,23,33,40,41,42,43,44,70,71,72,73,74,210,220,230],LWPOLYLINE:[90,70,43,38,39,10,20,40,41,42,91,210,220,230],POLYLINE:[66,10,20,30,70,40,41,75,210,220,230],VERTEX:[10,20,30,40,41,42,70,50,91]};
  function transformEntity(e,transform,inheritedSign=1){
    const pairs=e.pairs.filter(p=>geometryCodes[e.type].includes(p.code)).map(p=>({...p}));
    const sign=['ARC','CIRCLE','LWPOLYLINE','POLYLINE'].includes(e.type)?(value(e,230,1)<0?-1:1):e.type==='VERTEX'?inheritedSign:1;
    const rad=transform.angle*Math.PI/180,c=Math.cos(rad),s=Math.sin(rad);
    let bases=e.type==='SPLINE'?[10,11,12,13]:['LINE','ELLIPSE'].includes(e.type)?[10,11]:e.type==='POLYLINE'?[]:[10];
    for(const base of bases){
      const xs=pairs.filter(p=>p.code===base),ys=pairs.filter(p=>p.code===base+10);
      for(let i=0;i<xs.length;i++){
        const x=Number(xs[i].value)*sign,y=Number(ys[i]?.value??0),vector=(e.type==='ELLIPSE'&&base===11)||(e.type==='SPLINE'&&base>=12);
        const rx=x*c-y*s+(vector?0:transform.x),ry=x*s+y*c+(vector?0:transform.y);
        xs[i].value=sign*rx;if(ys[i])ys[i].value=ry;else pairs.push({code:base+10,value:ry});
      }
    }
    if(e.type==='ARC')for(const p of pairs)if(p.code===50||p.code===51)p.value=((Number(p.value)+sign*transform.angle)%360+360)%360;
    return {type:e.type,pairs,vertices:e.vertices?.map(v=>transformEntity(v,transform,sign))};
  }
  window.DxfGeometry=Object.freeze({parseRecords,transformEntity,tolerance:TOLERANCE});
})();
