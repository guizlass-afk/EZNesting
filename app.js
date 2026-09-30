(() => {
  'use strict';

  const $ = (id) => document.getElementById(id);
  const ui = {
    languageSelect: $('languageSelect'), languagePicker: $('languagePicker'), languageButton: $('languageButton'),
    languageMenu: $('languageMenu'), currentFlag: $('currentFlag'), currentLanguage: $('currentLanguage'),
    fileInput: $('fileInput'), dropZone: $('dropZone'), fileList: $('fileList'),
    sheetList: $('sheetList'), addSheetButton: $('addSheetButton'), partGap: $('partGap'),
    edgeGap: $('edgeGap'), rotations: $('rotations'), iterations: $('iterations'),
    nestButton: $('nestButton'), message: $('message'),
    progressPanel: $('progressPanel'), progressLabel: $('progressLabel'), progressPercent: $('progressPercent'),
    progressTrack: $('progressTrack'), progressBar: $('progressBar'), progressDetail: $('progressDetail'),
    canvas: $('previewCanvas'), canvasWrap: $('canvasWrap'), emptyState: $('emptyState'),
    resultSubtitle: $('resultSubtitle'), fitButton: $('fitButton'), exportButton: $('exportButton'),
    exportReportButton: $('exportReportButton'), metricSheets: $('metricSheets'),
    metricUsage: $('metricUsage'), metricParts: $('metricParts'), metricWaste: $('metricWaste')
  };

  const translations = {
    'pt-BR': {
      pageTitle:'NestDXF — Otimizador de chapas', tagline:'Nesting inteligente para corte de chapas', localProcessing:'Processamento 100% local', pieces:'Peças', piecesAuto:'Separadas automaticamente em cada DXF', addDxf:'Adicionar arquivos DXF', dragHere:'ou arraste-os para cá', sheetAndGaps:'Chapa e folgas', dimensionsMm:'Dimensões em milímetros', sheetWidth:'Largura da chapa', sheetLength:'Comprimento da chapa', betweenPieces:'Entre peças', toEdge:'Até a borda', rotationsAllowed:'Rotações permitidas', rotNone:'Sem rotação', rot90:'90º', rot45:'45º', rotFree:'Livre', attempts:'Tentativas', maxSheets:'Máx. de chapas', optimize:'Otimizar nesting', progressPreparing:'Preparando otimização…', analyzing:'Analisando peças e rotações', cuttingPlan:'Plano de corte', addToStart:'Adicione peças para começar', fitDrawing:'Enquadrar desenho', report:'Relatório', exportDxf:'Exportar DXF', emptyTitle:'Seu nesting aparecerá aqui', emptyBody:'Importe os DXFs, informe o tamanho da chapa<br>e clique em “Otimizar nesting”.', zoomHint:'Role para ampliar · Arraste para mover', sheets:'Chapas', utilization:'Aproveitamento', estimatedWaste:'Sobra estimada', footerPrivacy:'DXF ASCII · Todos os dados permanecem neste dispositivo', progressDone:'Otimização concluída', progressDoing:'Otimizando plano de corte', configure:'Configure a chapa e execute a otimização', calculating:'Calculando a melhor disposição…', selectDxf:'Selecione arquivos com extensão .dxf.', imported:'{files} arquivo(s) importado(s): {pieces} peça(s) detectada(s).', quantity:'Quantidade', remove:'Remover', resultSummary:'{pieces} peças em {sheets} chapa(s) · {elapsed} · {attempts} tentativa(s)', completed:'Nesting concluído: {pieces} peças em {sheets} chapa(s).', trial:'Tentativa {current} de {total}', trialPiece:'Tentativa {current}/{attempts} · peça {piece}/{total}: {name}', finalizing:'Preparando visualização e arquivo de saída', sheetUpper:'CHAPA'
    },
    'en-US': {
      pageTitle:'NestDXF — Sheet optimizer', tagline:'Smart nesting for sheet cutting', localProcessing:'100% local processing', pieces:'Parts', piecesAuto:'Automatically separated in each DXF', addDxf:'Add DXF files', dragHere:'or drag them here', sheetAndGaps:'Sheet and clearances', dimensionsMm:'Dimensions in millimeters', sheetWidth:'Sheet width', sheetLength:'Sheet length', betweenPieces:'Between parts', toEdge:'To the edge', rotationsAllowed:'Allowed rotations', rotNone:'No rotation', rot90:'90°', rot45:'45°', rotFree:'Free', attempts:'Attempts', maxSheets:'Max. sheets', optimize:'Optimize nesting', progressPreparing:'Preparing optimization…', analyzing:'Analyzing parts and rotations', cuttingPlan:'Cutting plan', addToStart:'Add parts to get started', fitDrawing:'Fit drawing', report:'Report', exportDxf:'Export DXF', emptyTitle:'Your nesting will appear here', emptyBody:'Import the DXFs, enter the sheet size<br>and click “Optimize nesting”.', zoomHint:'Scroll to zoom · Drag to move', sheets:'Sheets', utilization:'Utilization', estimatedWaste:'Estimated waste', footerPrivacy:'DXF ASCII · All data remains on this device', progressDone:'Optimization complete', progressDoing:'Optimizing cutting plan', configure:'Configure the sheet and run optimization', calculating:'Calculating the best layout…', selectDxf:'Select files with the .dxf extension.', imported:'{files} file(s) imported: {pieces} part(s) detected.', quantity:'Quantity', remove:'Remove', resultSummary:'{pieces} parts on {sheets} sheet(s) · {elapsed} · {attempts} attempt(s)', completed:'Nesting complete: {pieces} parts on {sheets} sheet(s).', trial:'Attempt {current} of {total}', trialPiece:'Attempt {current}/{attempts} · part {piece}/{total}: {name}', finalizing:'Preparing preview and output file', sheetUpper:'SHEET'
    },
    'es-ES': {
      pageTitle:'NestDXF — Optimizador de chapas', tagline:'Nesting inteligente para corte de chapas', localProcessing:'Procesamiento 100% local', pieces:'Piezas', piecesAuto:'Separadas automáticamente en cada DXF', addDxf:'Añadir archivos DXF', dragHere:'o arrástrelos aquí', sheetAndGaps:'Chapa y separaciones', dimensionsMm:'Dimensiones en milímetros', sheetWidth:'Ancho de la chapa', sheetLength:'Largo de la chapa', betweenPieces:'Entre piezas', toEdge:'Hasta el borde', rotationsAllowed:'Rotaciones permitidas', rotNone:'Sin rotación', rot90:'90°', rot45:'45°', rotFree:'Libre', attempts:'Intentos', maxSheets:'Máx. de chapas', optimize:'Optimizar nesting', progressPreparing:'Preparando optimización…', analyzing:'Analizando piezas y rotaciones', cuttingPlan:'Plan de corte', addToStart:'Añada piezas para comenzar', fitDrawing:'Ajustar dibujo', report:'Informe', exportDxf:'Exportar DXF', emptyTitle:'Su nesting aparecerá aquí', emptyBody:'Importe los DXF, indique el tamaño de la chapa<br>y pulse “Optimizar nesting”.', zoomHint:'Desplace para ampliar · Arrastre para mover', sheets:'Chapas', utilization:'Aprovechamiento', estimatedWaste:'Sobrante estimado', footerPrivacy:'DXF ASCII · Todos los datos permanecen en este dispositivo', progressDone:'Optimización completada', progressDoing:'Optimizando plan de corte', configure:'Configure la chapa y ejecute la optimización', calculating:'Calculando la mejor disposición…', selectDxf:'Seleccione archivos con extensión .dxf.', imported:'{files} archivo(s) importado(s): {pieces} pieza(s) detectada(s).', quantity:'Cantidad', remove:'Eliminar', resultSummary:'{pieces} piezas en {sheets} chapa(s) · {elapsed} · {attempts} intento(s)', completed:'Nesting completado: {pieces} piezas en {sheets} chapa(s).', trial:'Intento {current} de {total}', trialPiece:'Intento {current}/{attempts} · pieza {piece}/{total}: {name}', finalizing:'Preparando vista previa y archivo de salida', sheetUpper:'CHAPA'
    },
    'zh-CN': {
      pageTitle:'NestDXF — 板材排样优化器', tagline:'智能板材切割排样', localProcessing:'100% 本地处理', pieces:'零件', piecesAuto:'自动分离每个 DXF 中的零件', addDxf:'添加 DXF 文件', dragHere:'或拖放到此处', sheetAndGaps:'板材与间距', dimensionsMm:'尺寸单位：毫米', sheetWidth:'板材宽度', sheetLength:'板材长度', betweenPieces:'零件间距', toEdge:'边缘间距', rotationsAllowed:'允许旋转', rotNone:'不旋转', rot90:'90°', rot45:'45°', rotFree:'自由', attempts:'尝试次数', maxSheets:'最大板材数', optimize:'优化排样', progressPreparing:'正在准备优化…', analyzing:'正在分析零件和旋转', cuttingPlan:'切割方案', addToStart:'添加零件以开始', fitDrawing:'适合视图', report:'报告', exportDxf:'导出 DXF', emptyTitle:'排样结果将显示在此处', emptyBody:'导入 DXF，输入板材尺寸<br>然后单击“优化排样”。', zoomHint:'滚动缩放 · 拖动移动', sheets:'板材', utilization:'利用率', estimatedWaste:'预计余料', footerPrivacy:'DXF ASCII · 所有数据仅保留在此设备上', progressDone:'优化完成', progressDoing:'正在优化切割方案', configure:'设置板材并运行优化', calculating:'正在计算最佳布局…', selectDxf:'请选择 .dxf 文件。', imported:'已导入 {files} 个文件：检测到 {pieces} 个零件。', quantity:'数量', remove:'删除', resultSummary:'{pieces} 个零件，{sheets} 张板材 · {elapsed} · {attempts} 次尝试', completed:'排样完成：{pieces} 个零件，{sheets} 张板材。', trial:'尝试 {current}/{total}', trialPiece:'尝试 {current}/{attempts} · 零件 {piece}/{total}：{name}', finalizing:'正在准备预览和输出文件', sheetUpper:'板材'
    },
    'hi-IN': {
      pageTitle:'NestDXF — शीट ऑप्टिमाइज़र', tagline:'शीट कटिंग के लिए स्मार्ट नेस्टिंग', localProcessing:'100% स्थानीय प्रोसेसिंग', pieces:'पार्ट्स', piecesAuto:'हर DXF में स्वचालित रूप से अलग', addDxf:'DXF फ़ाइलें जोड़ें', dragHere:'या यहाँ खींचें', sheetAndGaps:'शीट और अंतर', dimensionsMm:'मिलीमीटर में आयाम', sheetWidth:'शीट की चौड़ाई', sheetLength:'शीट की लंबाई', betweenPieces:'पार्ट्स के बीच', toEdge:'किनारे तक', rotationsAllowed:'अनुमत घुमाव', rotNone:'कोई घुमाव नहीं', rotFree:'स्वतंत्र', attempts:'प्रयास', maxSheets:'अधिकतम शीट', optimize:'नेस्टिंग ऑप्टिमाइज़ करें', progressPreparing:'ऑप्टिमाइज़ेशन तैयार हो रहा है…', analyzing:'पार्ट्स और घुमाव का विश्लेषण', cuttingPlan:'कटिंग प्लान', addToStart:'शुरू करने के लिए पार्ट्स जोड़ें', fitDrawing:'ड्रॉइंग फिट करें', report:'रिपोर्ट', exportDxf:'DXF निर्यात', emptyTitle:'आपका नेस्टिंग यहाँ दिखेगा', emptyBody:'DXF आयात करें, शीट आकार दर्ज करें<br>और “नेस्टिंग ऑप्टिमाइज़ करें” पर क्लिक करें।', zoomHint:'ज़ूम के लिए स्क्रॉल · खिसकाने के लिए खींचें', sheets:'शीट', utilization:'उपयोग', estimatedWaste:'अनुमानित अपशिष्ट', footerPrivacy:'DXF ASCII · सभी डेटा इस डिवाइस पर रहता है', progressDone:'ऑप्टिमाइज़ेशन पूरा', progressDoing:'कटिंग प्लान ऑप्टिमाइज़ हो रहा है', configure:'शीट सेट करें और ऑप्टिमाइज़ेशन चलाएँ', calculating:'सर्वश्रेष्ठ लेआउट की गणना…', selectDxf:'.dxf फ़ाइलें चुनें।', imported:'{files} फ़ाइल: {pieces} पार्ट मिले।', quantity:'मात्रा', remove:'हटाएँ', resultSummary:'{pieces} पार्ट, {sheets} शीट · {elapsed} · {attempts} प्रयास', completed:'नेस्टिंग पूरा: {pieces} पार्ट, {sheets} शीट।', trial:'प्रयास {current}/{total}', trialPiece:'प्रयास {current}/{attempts} · पार्ट {piece}/{total}: {name}', finalizing:'प्रीव्यू और आउटपुट तैयार हो रहा है', sheetUpper:'शीट'
    },
    'ar-SA': {
      pageTitle:'NestDXF — محسّن الألواح', tagline:'تعشيش ذكي لقطع الألواح', localProcessing:'معالجة محلية 100%', pieces:'القطع', piecesAuto:'مفصولة تلقائيًا في كل DXF', addDxf:'إضافة ملفات DXF', dragHere:'أو اسحبها هنا', sheetAndGaps:'اللوح والمسافات', dimensionsMm:'الأبعاد بالمليمتر', sheetWidth:'عرض اللوح', sheetLength:'طول اللوح', betweenPieces:'بين القطع', toEdge:'حتى الحافة', rotationsAllowed:'الدورانات المسموحة', rotNone:'بدون دوران', rotFree:'حر', attempts:'المحاولات', maxSheets:'أقصى عدد للألواح', optimize:'تحسين التعشيش', progressPreparing:'جارٍ التحضير…', analyzing:'تحليل القطع والدورانات', cuttingPlan:'خطة القطع', addToStart:'أضف قطعًا للبدء', fitDrawing:'ملاءمة الرسم', report:'التقرير', exportDxf:'تصدير DXF', emptyTitle:'سيظهر التعشيش هنا', emptyBody:'استورد DXF، وأدخل حجم اللوح<br>ثم انقر «تحسين التعشيش».', zoomHint:'مرّر للتكبير · اسحب للتحريك', sheets:'الألواح', utilization:'الاستفادة', estimatedWaste:'الهدر المقدّر', footerPrivacy:'DXF ASCII · تبقى جميع البيانات على هذا الجهاز', progressDone:'اكتمل التحسين', progressDoing:'جارٍ تحسين خطة القطع', configure:'اضبط اللوح وشغّل التحسين', calculating:'حساب أفضل ترتيب…', selectDxf:'اختر ملفات بامتداد .dxf.', imported:'تم استيراد {files} ملف، واكتشاف {pieces} قطعة.', quantity:'الكمية', remove:'إزالة', resultSummary:'{pieces} قطعة في {sheets} لوح · {elapsed} · {attempts} محاولة', completed:'اكتمل التعشيش: {pieces} قطعة في {sheets} لوح.', trial:'المحاولة {current} من {total}', trialPiece:'محاولة {current}/{attempts} · قطعة {piece}/{total}: {name}', finalizing:'تحضير المعاينة وملف الإخراج', sheetUpper:'لوح'
    },
    'fr-FR': {
      pageTitle:'NestDXF — Optimiseur de tôles', tagline:'Imbrication intelligente pour la découpe de tôles', localProcessing:'Traitement 100 % local', pieces:'Pièces', piecesAuto:'Séparées automatiquement dans chaque DXF', addDxf:'Ajouter des fichiers DXF', dragHere:'ou glissez-les ici', sheetAndGaps:'Tôle et espacements', dimensionsMm:'Dimensions en millimètres', sheetWidth:'Largeur de la tôle', sheetLength:'Longueur de la tôle', betweenPieces:'Entre les pièces', toEdge:"Jusqu'au bord", rotationsAllowed:'Rotations autorisées', rotNone:'Sans rotation', rotFree:'Libre', attempts:'Tentatives', maxSheets:'Tôles max.', optimize:"Optimiser l'imbrication", progressPreparing:"Préparation de l'optimisation…", analyzing:'Analyse des pièces et rotations', cuttingPlan:'Plan de coupe', addToStart:'Ajoutez des pièces pour commencer', fitDrawing:'Ajuster le dessin', report:'Rapport', exportDxf:'Exporter DXF', emptyTitle:'Votre imbrication apparaîtra ici', emptyBody:'Importez les DXF, indiquez la taille de la tôle<br>et cliquez sur « Optimiser ».', zoomHint:'Défilez pour zoomer · Faites glisser pour déplacer', sheets:'Tôles', utilization:'Utilisation', estimatedWaste:'Chute estimée', footerPrivacy:'DXF ASCII · Toutes les données restent sur cet appareil', progressDone:'Optimisation terminée', progressDoing:'Optimisation du plan de coupe', configure:'Configurez la tôle et lancez l’optimisation', calculating:'Calcul de la meilleure disposition…', selectDxf:"Sélectionnez des fichiers avec l'extension .dxf.", imported:'{files} fichier(s) importé(s) : {pieces} pièce(s) détectée(s).', quantity:'Quantité', remove:'Supprimer', resultSummary:'{pieces} pièces sur {sheets} tôle(s) · {elapsed} · {attempts} tentative(s)', completed:'Imbrication terminée : {pieces} pièces sur {sheets} tôle(s).', trial:'Tentative {current} sur {total}', trialPiece:'Tentative {current}/{attempts} · pièce {piece}/{total} : {name}', finalizing:'Préparation de l’aperçu et du fichier de sortie', sheetUpper:'TÔLE'
    },
    'bn-BD': {
      pageTitle:'NestDXF — শিট অপ্টিমাইজার', tagline:'শিট কাটার জন্য স্মার্ট নেস্টিং', localProcessing:'100% লোকাল প্রসেসিং', pieces:'পার্টস', piecesAuto:'প্রতিটি DXF-এ স্বয়ংক্রিয়ভাবে আলাদা', addDxf:'DXF ফাইল যোগ করুন', dragHere:'বা এখানে টানুন', sheetAndGaps:'শিট ও ফাঁক', dimensionsMm:'মিলিমিটারে মাপ', sheetWidth:'শিটের প্রস্থ', sheetLength:'শিটের দৈর্ঘ্য', betweenPieces:'পার্টের মধ্যে', toEdge:'প্রান্ত পর্যন্ত', rotationsAllowed:'অনুমোদিত ঘূর্ণন', rotNone:'ঘূর্ণন নয়', rotFree:'মুক্ত', attempts:'চেষ্টা', maxSheets:'সর্বোচ্চ শিট', optimize:'নেস্টিং অপ্টিমাইজ করুন', progressPreparing:'অপ্টিমাইজেশন প্রস্তুত হচ্ছে…', analyzing:'পার্ট ও ঘূর্ণন বিশ্লেষণ', cuttingPlan:'কাটিং প্ল্যান', addToStart:'শুরু করতে পার্ট যোগ করুন', fitDrawing:'ড্রয়িং ফিট করুন', report:'রিপোর্ট', exportDxf:'DXF রপ্তানি', emptyTitle:'আপনার নেস্টিং এখানে দেখা যাবে', emptyBody:'DXF আমদানি করুন, শিটের মাপ দিন<br>এবং “নেস্টিং অপ্টিমাইজ” ক্লিক করুন।', zoomHint:'জুম করতে স্ক্রল · সরাতে টানুন', sheets:'শিট', utilization:'ব্যবহার', estimatedWaste:'আনুমানিক অপচয়', footerPrivacy:'DXF ASCII · সব ডেটা এই ডিভাইসে থাকে', progressDone:'অপ্টিমাইজেশন সম্পন্ন', progressDoing:'কাটিং প্ল্যান অপ্টিমাইজ হচ্ছে', configure:'শিট সেট করুন এবং অপ্টিমাইজেশন চালান', calculating:'সেরা লেআউট গণনা…', selectDxf:'.dxf ফাইল নির্বাচন করুন।', imported:'{files} ফাইল আমদানি: {pieces} পার্ট পাওয়া গেছে।', quantity:'পরিমাণ', remove:'সরান', resultSummary:'{pieces} পার্ট, {sheets} শিট · {elapsed} · {attempts} চেষ্টা', completed:'নেস্টিং সম্পন্ন: {pieces} পার্ট, {sheets} শিট।', trial:'চেষ্টা {current}/{total}', trialPiece:'চেষ্টা {current}/{attempts} · পার্ট {piece}/{total}: {name}', finalizing:'প্রিভিউ ও আউটপুট প্রস্তুত হচ্ছে', sheetUpper:'শিট'
    },
    'ru-RU': {
      pageTitle:'NestDXF — Оптимизатор листов', tagline:'Умный раскрой листов', localProcessing:'100% локальная обработка', pieces:'Детали', piecesAuto:'Автоматически разделяются в каждом DXF', addDxf:'Добавить DXF', dragHere:'или перетащите сюда', sheetAndGaps:'Лист и зазоры', dimensionsMm:'Размеры в миллиметрах', sheetWidth:'Ширина листа', sheetLength:'Длина листа', betweenPieces:'Между деталями', toEdge:'До края', rotationsAllowed:'Допустимые повороты', rotNone:'Без поворота', rotFree:'Свободно', attempts:'Попытки', maxSheets:'Макс. листов', optimize:'Оптимизировать', progressPreparing:'Подготовка оптимизации…', analyzing:'Анализ деталей и поворотов', cuttingPlan:'План раскроя', addToStart:'Добавьте детали', fitDrawing:'Вписать чертёж', report:'Отчёт', exportDxf:'Экспорт DXF', emptyTitle:'Здесь появится раскрой', emptyBody:'Импортируйте DXF, задайте размер листа<br>и нажмите «Оптимизировать».', zoomHint:'Колесо — масштаб · Перетаскивание — панорама', sheets:'Листы', utilization:'Использование', estimatedWaste:'Оценка отходов', footerPrivacy:'DXF ASCII · Все данные остаются на устройстве', progressDone:'Оптимизация завершена', progressDoing:'Оптимизация плана раскроя', configure:'Настройте лист и запустите оптимизацию', calculating:'Расчёт лучшей раскладки…', selectDxf:'Выберите файлы .dxf.', imported:'Импортировано файлов: {files}; обнаружено деталей: {pieces}.', quantity:'Количество', remove:'Удалить', resultSummary:'{pieces} дет., {sheets} лист. · {elapsed} · {attempts} попыт.', completed:'Раскрой завершён: {pieces} дет., {sheets} лист.', trial:'Попытка {current} из {total}', trialPiece:'Попытка {current}/{attempts} · деталь {piece}/{total}: {name}', finalizing:'Подготовка предпросмотра и файла', sheetUpper:'ЛИСТ'
    },
    'de-DE': {
      pageTitle:'NestDXF — Blechoptimierer', tagline:'Intelligentes Nesting für den Blechzuschnitt', localProcessing:'100 % lokale Verarbeitung', pieces:'Teile', piecesAuto:'In jeder DXF automatisch getrennt', addDxf:'DXF-Dateien hinzufügen', dragHere:'oder hierher ziehen', sheetAndGaps:'Blech und Abstände', dimensionsMm:'Maße in Millimetern', sheetWidth:'Blechbreite', sheetLength:'Blechlänge', betweenPieces:'Zwischen Teilen', toEdge:'Zum Rand', rotationsAllowed:'Zulässige Drehungen', rotNone:'Keine Drehung', rotFree:'Frei', attempts:'Versuche', maxSheets:'Max. Bleche', optimize:'Nesting optimieren', progressPreparing:'Optimierung wird vorbereitet…', analyzing:'Teile und Drehungen werden analysiert', cuttingPlan:'Schnittplan', addToStart:'Teile hinzufügen, um zu beginnen', fitDrawing:'Zeichnung einpassen', report:'Bericht', exportDxf:'DXF exportieren', emptyTitle:'Ihr Nesting erscheint hier', emptyBody:'DXF-Dateien importieren, Blechgröße eingeben<br>und auf „Nesting optimieren“ klicken.', zoomHint:'Scrollen zum Zoomen · Ziehen zum Verschieben', sheets:'Bleche', utilization:'Ausnutzung', estimatedWaste:'Geschätzter Rest', footerPrivacy:'DXF ASCII · Alle Daten bleiben auf diesem Gerät', progressDone:'Optimierung abgeschlossen', progressDoing:'Schnittplan wird optimiert', configure:'Blech konfigurieren und Optimierung starten', calculating:'Beste Anordnung wird berechnet…', selectDxf:'Wählen Sie Dateien mit der Endung .dxf.', imported:'{files} Datei(en) importiert: {pieces} Teil(e) erkannt.', quantity:'Menge', remove:'Entfernen', resultSummary:'{pieces} Teile auf {sheets} Blech(en) · {elapsed} · {attempts} Versuch(e)', completed:'Nesting abgeschlossen: {pieces} Teile auf {sheets} Blech(en).', trial:'Versuch {current} von {total}', trialPiece:'Versuch {current}/{attempts} · Teil {piece}/{total}: {name}', finalizing:'Vorschau und Ausgabedatei werden vorbereitet', sheetUpper:'BLECH'
    },
    'it-IT': {
      pageTitle:'NestDXF — Ottimizzatore di lamiere', tagline:'Nesting intelligente per il taglio lamiera', localProcessing:'Elaborazione 100% locale', pieces:'Pezzi', piecesAuto:'Separati automaticamente in ogni DXF', addDxf:'Aggiungi file DXF', dragHere:'o trascinali qui', sheetAndGaps:'Lamiera e distanze', dimensionsMm:'Dimensioni in millimetri', sheetWidth:'Larghezza lamiera', sheetLength:'Lunghezza lamiera', betweenPieces:'Tra i pezzi', toEdge:'Fino al bordo', rotationsAllowed:'Rotazioni consentite', rotNone:'Nessuna rotazione', rotFree:'Libera', attempts:'Tentativi', maxSheets:'Max. lamiere', optimize:'Ottimizza nesting', progressPreparing:'Preparazione ottimizzazione…', analyzing:'Analisi di pezzi e rotazioni', cuttingPlan:'Piano di taglio', addToStart:'Aggiungi pezzi per iniziare', fitDrawing:'Adatta disegno', report:'Rapporto', exportDxf:'Esporta DXF', emptyTitle:'Il nesting apparirà qui', emptyBody:'Importa i DXF, inserisci le dimensioni della lamiera<br>e fai clic su “Ottimizza nesting”.', zoomHint:'Scorri per ingrandire · Trascina per spostare', sheets:'Lamiere', utilization:'Utilizzo', estimatedWaste:'Scarto stimato', footerPrivacy:'DXF ASCII · Tutti i dati restano su questo dispositivo', progressDone:'Ottimizzazione completata', progressDoing:'Ottimizzazione del piano di taglio', configure:'Configura la lamiera e avvia l’ottimizzazione', calculating:'Calcolo della disposizione migliore…', selectDxf:'Seleziona file con estensione .dxf.', imported:'{files} file importati: {pieces} pezzi rilevati.', quantity:'Quantità', remove:'Rimuovi', resultSummary:'{pieces} pezzi su {sheets} lamiera/e · {elapsed} · {attempts} tentativi', completed:'Nesting completato: {pieces} pezzi su {sheets} lamiera/e.', trial:'Tentativo {current} di {total}', trialPiece:'Tentativo {current}/{attempts} · pezzo {piece}/{total}: {name}', finalizing:'Preparazione anteprima e file di output', sheetUpper:'LAMIERA'
    },
    'ja-JP': {
      pageTitle:'NestDXF — 板材最適化', tagline:'板材切断のスマートネスティング', localProcessing:'100% ローカル処理', pieces:'部品', piecesAuto:'各 DXF から自動分離', addDxf:'DXF ファイルを追加', dragHere:'またはここにドラッグ', sheetAndGaps:'板材と間隔', dimensionsMm:'寸法（mm）', sheetWidth:'板材幅', sheetLength:'板材長さ', betweenPieces:'部品間', toEdge:'端面まで', rotationsAllowed:'許可する回転', rotNone:'回転なし', rotFree:'自由', attempts:'試行回数', maxSheets:'最大板数', optimize:'ネスティングを最適化', progressPreparing:'最適化を準備中…', analyzing:'部品と回転を解析中', cuttingPlan:'切断プラン', addToStart:'部品を追加して開始', fitDrawing:'図面をフィット', report:'レポート', exportDxf:'DXF をエクスポート', emptyTitle:'ネスティング結果がここに表示されます', emptyBody:'DXF をインポートし、板材サイズを入力して<br>「ネスティングを最適化」をクリックします。', zoomHint:'スクロールで拡大 · ドラッグで移動', sheets:'板材', utilization:'利用率', estimatedWaste:'推定残材', footerPrivacy:'DXF ASCII · すべてのデータはこのデバイス内に保存', progressDone:'最適化完了', progressDoing:'切断プランを最適化中', configure:'板材を設定して最適化を実行', calculating:'最適な配置を計算中…', selectDxf:'.dxf ファイルを選択してください。', imported:'{files} ファイルを読み込み、{pieces} 部品を検出しました。', quantity:'数量', remove:'削除', resultSummary:'{pieces} 部品、{sheets} 枚 · {elapsed} · {attempts} 回試行', completed:'ネスティング完了：{pieces} 部品、{sheets} 枚。', trial:'試行 {current}/{total}', trialPiece:'試行 {current}/{attempts} · 部品 {piece}/{total}: {name}', finalizing:'プレビューと出力ファイルを準備中', sheetUpper:'板材'
    }
  };

  // O nome do produto é o mesmo em todos os idiomas e não possui subtítulo.
  Object.values(translations).forEach(locale => { locale.pageTitle = 'EZ Nester'; delete locale.tagline; });

  const stockTranslations = {
    'pt-BR': ['Estoque de chapas', 'Adicionar tamanho de chapa', 'Remover tamanho', 'A quantidade de cada chapa deve ser ao menos 1.', 'O estoque de chapas terminou antes de posicionar todas as peças.'],
    'en-US': ['Sheet stock', 'Add sheet size', 'Remove size', 'Each sheet quantity must be at least 1.', 'The sheet stock ran out before all parts could be placed.'],
    'es-ES': ['Inventario de chapas', 'Añadir tamaño de chapa', 'Eliminar tamaño', 'La cantidad de cada chapa debe ser al menos 1.', 'El inventario de chapas se agotó antes de colocar todas las piezas.'],
    'zh-CN': ['板材库存', '添加板材尺寸', '移除尺寸', '每种板材的数量至少为 1。', '所有零件放置完成前板材库存已用尽。'],
    'hi-IN': ['शीट स्टॉक', 'शीट आकार जोड़ें', 'आकार हटाएँ', 'हर शीट की मात्रा कम से कम 1 होनी चाहिए।', 'सभी पार्ट रखने से पहले शीट स्टॉक समाप्त हो गया।'],
    'ar-SA': ['مخزون الألواح', 'إضافة مقاس لوح', 'إزالة المقاس', 'يجب ألا تقل كمية كل لوح عن 1.', 'نفد مخزون الألواح قبل وضع جميع القطع.'],
    'fr-FR': ['Stock de tôles', 'Ajouter un format de tôle', 'Supprimer le format', 'La quantité de chaque tôle doit être au moins 1.', 'Le stock de tôles est épuisé avant le placement de toutes les pièces.'],
    'bn-BD': ['শিট স্টক', 'শিটের মাপ যোগ করুন', 'মাপ সরান', 'প্রতিটি শিটের পরিমাণ কমপক্ষে ১ হতে হবে।', 'সব পার্ট বসানোর আগেই শিট স্টক শেষ হয়েছে।'],
    'ru-RU': ['Запас листов', 'Добавить размер листа', 'Удалить размер', 'Количество каждого листа должно быть не менее 1.', 'Запас листов закончился до размещения всех деталей.'],
    'de-DE': ['Blechbestand', 'Blechgröße hinzufügen', 'Größe entfernen', 'Die Menge jedes Blechs muss mindestens 1 sein.', 'Der Blechbestand war aufgebraucht, bevor alle Teile platziert wurden.'],
    'it-IT': ['Scorte lamiere', 'Aggiungi formato lamiera', 'Rimuovi formato', 'La quantità di ogni lamiera deve essere almeno 1.', 'Le scorte sono terminate prima di posizionare tutti i pezzi.'],
    'ja-JP': ['板材在庫', '板材サイズを追加', 'サイズを削除', '各板材の数量は1以上にしてください。', 'すべての部品を配置する前に板材在庫がなくなりました。']
  };
  Object.entries(stockTranslations).forEach(([language, values]) => Object.assign(translations[language], {
    sheetStock: values[0], addSheetSize: values[1], removeSheet: values[2], invalidSheetQuantity: values[3], sheetStockExhausted: values[4]
  }));

  Object.assign(translations['pt-BR'], {
    binaryDxf:'DXF binário não é aceito; salve-o como DXF ASCII.', noGeometry:'Nenhuma geometria compatível encontrada na seção ENTITIES.', invalidGeometry:'A geometria não forma uma peça válida.', noOutline:'Não foi possível determinar o contorno externo da peça.', sheetLimit:'O limite de {count} chapas foi atingido.', partDoesNotFit:'A peça “{name}” não cabe na chapa, mesmo com as rotações permitidas.', addPiece:'Adicione pelo menos uma peça.', finalConflict:'A validação geométrica final encontrou conflito entre “{first}” e “{second}”.', invalidSheet:'Informe dimensões válidas para a chapa.', negativeDistances:'As distâncias não podem ser negativas.', edgeTooLarge:'A distância da borda é grande demais para esta chapa.', attemptsRange:'Use entre 1 e 100 tentativas.', maxSheetsMin:'O máximo de chapas deve ser ao menos 1.'
  });
  Object.assign(translations['en-US'], {
    binaryDxf:'Binary DXF is not supported; save it as ASCII DXF.', noGeometry:'No supported geometry was found in the ENTITIES section.', invalidGeometry:'The geometry does not form a valid part.', noOutline:'The outer contour of the part could not be determined.', sheetLimit:'The limit of {count} sheets was reached.', partDoesNotFit:'Part “{name}” does not fit on the sheet with the allowed rotations.', addPiece:'Add at least one part.', finalConflict:'Final geometry validation found a conflict between “{first}” and “{second}”.', invalidSheet:'Enter valid sheet dimensions.', negativeDistances:'Distances cannot be negative.', edgeTooLarge:'The edge clearance is too large for this sheet.', attemptsRange:'Use between 1 and 100 attempts.', maxSheetsMin:'The maximum number of sheets must be at least 1.'
  });
  Object.assign(translations['pt-BR'], { generatedAt:'Gerado em', reportRotations:'Rotações', finalValidation:'Validação geométrica final', approved:'Aprovada', notRun:'Não executada', positionedPieces:'Peças posicionadas', rotation:'rotação', outerAreaNote:'Observação: o aproveitamento usa a área dos contornos externos. Furos internos não são descontados.' });
  Object.assign(translations['en-US'], { generatedAt:'Generated at', finalValidation:'Final geometry validation', approved:'Approved', notRun:'Not run', positionedPieces:'Positioned parts', rotation:'rotation', outerAreaNote:'Note: utilization uses the area of the outer contours. Internal holes are not deducted.' });
  Object.assign(translations['es-ES'], { generatedAt:'Generado el', finalValidation:'Validación geométrica final', approved:'Aprobada', notRun:'No ejecutada', positionedPieces:'Piezas colocadas', rotation:'rotación', outerAreaNote:'Nota: el aprovechamiento usa el área de los contornos externos. Los huecos internos no se descuentan.' });
  Object.assign(translations['zh-CN'], { generatedAt:'生成时间', finalValidation:'最终几何验证', approved:'通过', notRun:'未执行', positionedPieces:'已放置零件', rotation:'旋转', outerAreaNote:'注：利用率按外轮廓面积计算，不扣除内部孔。' });
  Object.assign(translations['hi-IN'], { generatedAt:'बनाया गया', finalValidation:'अंतिम ज्यामितीय सत्यापन', approved:'स्वीकृत', notRun:'नहीं चलाया', positionedPieces:'रखे गए पार्ट्स', rotation:'घुमाव', outerAreaNote:'नोट: उपयोग बाहरी रेखाओं के क्षेत्रफल पर आधारित है।' });
  Object.assign(translations['ar-SA'], { generatedAt:'تم الإنشاء في', finalValidation:'التحقق الهندسي النهائي', approved:'معتمد', notRun:'لم يُنفذ', positionedPieces:'القطع الموضوعة', rotation:'الدوران', outerAreaNote:'ملاحظة: يستخدم الاستفادة مساحة الحدود الخارجية.' });
  Object.assign(translations['fr-FR'], { generatedAt:'Généré le', finalValidation:'Validation géométrique finale', approved:'Approuvée', notRun:'Non exécutée', positionedPieces:'Pièces placées', rotation:'rotation', outerAreaNote:'Remarque : l’utilisation emploie la surface des contours extérieurs. Les trous internes ne sont pas déduits.' });
  Object.assign(translations['bn-BD'], { generatedAt:'তৈরির সময়', finalValidation:'চূড়ান্ত জ্যামিতিক যাচাই', approved:'অনুমোদিত', notRun:'চালানো হয়নি', positionedPieces:'স্থাপিত পার্ট', rotation:'ঘূর্ণন', outerAreaNote:'নোট: ব্যবহার বাহ্যিক কনটুরের ক্ষেত্রফল ব্যবহার করে।' });
  Object.assign(translations['ru-RU'], { generatedAt:'Создано', finalValidation:'Итоговая проверка геометрии', approved:'Успешно', notRun:'Не выполнена', positionedPieces:'Размещено деталей', rotation:'поворот', outerAreaNote:'Примечание: расчёт использует площадь внешних контуров.' });
  Object.assign(translations['de-DE'], { generatedAt:'Erstellt am', finalValidation:'Abschließende Geometrieprüfung', approved:'Bestanden', notRun:'Nicht ausgeführt', positionedPieces:'Platzierte Teile', rotation:'Drehung', outerAreaNote:'Hinweis: Die Ausnutzung verwendet die Fläche der Außenkonturen. Innenlöcher werden nicht abgezogen.' });
  Object.assign(translations['it-IT'], { generatedAt:'Generato il', finalValidation:'Convalida geometrica finale', approved:'Approvata', notRun:'Non eseguita', positionedPieces:'Pezzi posizionati', rotation:'rotazione', outerAreaNote:'Nota: l’utilizzo considera l’area dei contorni esterni. I fori interni non vengono sottratti.' });
  Object.assign(translations['ja-JP'], { generatedAt:'生成日時', finalValidation:'最終形状検証', approved:'承認', notRun:'未実行', positionedPieces:'配置済み部品', rotation:'回転', outerAreaNote:'注：利用率は外形面積を使用し、内部の穴は差し引きません。' });

  // Italiano e alemão estão completos acima; os textos comuns de rotação
  // mantêm a notação internacional quando não precisam de tradução.
  const languageCodes = Object.keys(translations);
  const languageMeta = {
    'pt-BR': { label:'Português', flag:'br' }, 'en-US': { label:'English', flag:'us' },
    'es-ES': { label:'Español', flag:'es' }, 'zh-CN': { label:'中文', flag:'cn' },
    'hi-IN': { label:'हिन्दी', flag:'in' }, 'ar-SA': { label:'العربية', flag:'sa' },
    'fr-FR': { label:'Français', flag:'fr' }, 'bn-BD': { label:'বাংলা', flag:'bd' },
    'ru-RU': { label:'Русский', flag:'ru' }, 'de-DE': { label:'Deutsch', flag:'de' },
    'it-IT': { label:'Italiano', flag:'it' }, 'ja-JP': { label:'日本語', flag:'jp' }
  };
  function initialLanguage() {
    let saved = '';
    try { saved = localStorage.getItem('nestdxf-language') || ''; } catch (_) {}
    if (languageCodes.includes(saved)) return saved;
    const browser = navigator.language || 'pt-BR';
    return languageCodes.find(code => code.toLowerCase() === browser.toLowerCase()) || languageCodes.find(code => code.split('-')[0] === browser.split('-')[0]) || 'pt-BR';
  }

  const state = {
    parts: [], result: null, nextId: 1, nextSheetId: 1, progressHideTimer: null, nfpCache: new Map(),
    language: initialLanguage(),
    view: { scale: 1, offsetX: 0, offsetY: 0, dragging: false, lastX: 0, lastY: 0 }
  };
  const palette = ['#ef6a32', '#218782', '#5177a4', '#d19a3d', '#8c68a6', '#4290b0', '#a95d63'];

  function t(key, values = {}) {
    const template = translations[state.language]?.[key] ?? translations['en-US'][key] ?? translations['pt-BR'][key] ?? key;
    return String(template).replace(/\{(\w+)\}/g, (_, name) => values[name] ?? `{${name}}`);
  }
  function numberValue(element) { return Number.parseFloat(element.value); }
  function fmt(value, digits = 1) { return Number(value).toLocaleString(state.language, { maximumFractionDigits: digits }); }
  function setMessage(text, type = '') { ui.message.textContent = text; ui.message.className = `message ${type}`.trim(); }
  function applyLanguage(language, persist = true) {
    state.language = languageCodes.includes(language) ? language : 'pt-BR';
    document.documentElement.lang = state.language;
    document.documentElement.dir = state.language.startsWith('ar') ? 'rtl' : 'ltr';
    ui.languageSelect.value = state.language;
    const meta = languageMeta[state.language];
    ui.currentFlag.src = `flags/${meta.flag}.svg`;
    ui.currentFlag.alt = '';
    ui.currentLanguage.textContent = meta.label;
    ui.languageMenu.querySelectorAll('[data-language]').forEach(button => button.setAttribute('aria-selected', String(button.dataset.language === state.language)));
    document.querySelectorAll('[data-i18n]').forEach(element => { element.textContent = t(element.dataset.i18n); });
    document.querySelectorAll('[data-i18n-html]').forEach(element => { element.innerHTML = t(element.dataset.i18nHtml); });
    document.querySelectorAll('[data-i18n-title]').forEach(element => { element.title = t(element.dataset.i18nTitle); });
    refreshSheetRowsLanguage();
    ui.languageButton.setAttribute('aria-label', `Language: ${meta.label}`);
    if (persist) try { localStorage.setItem('nestdxf-language', state.language); } catch (_) {}
    renderFiles();
    refreshResultText();
    drawPreview();
  }
  function setLanguageMenu(open) {
    ui.languageMenu.hidden = !open;
    ui.languageButton.setAttribute('aria-expanded', String(open));
    if (open) ui.languageMenu.querySelector(`[data-language="${state.language}"]`)?.focus();
  }
  function updateProgress(value, detail = '') {
    const percent = Math.max(0, Math.min(100, Math.round(value * 100)));
    ui.progressBar.style.width = `${percent}%`;
    ui.progressPercent.textContent = `${percent}%`;
    ui.progressTrack.setAttribute('aria-valuenow', String(percent));
    ui.progressLabel.textContent = percent >= 100 ? t('progressDone') : t('progressDoing');
    if (detail) ui.progressDetail.textContent = detail;
  }

  // ---------- DXF reader ----------
  function parseDxfParts(text, filename) {
    if (/AutoCAD Binary DXF/i.test(text.slice(0, 80))) throw new Error(t('binaryDxf'));
    const lines = text.replace(/^\uFEFF/, '').split(/\r?\n/);
    const pairs = [];
    for (let i = 0; i + 1 < lines.length; i += 2) {
      const code = Number.parseInt(lines[i].trim(), 10);
      if (Number.isFinite(code)) pairs.push({ code, value: lines[i + 1].trim() });
    }
    let inEntities = false;
    const records = [];
    let current = null;
    for (let i = 0; i < pairs.length; i++) {
      const p = pairs[i];
      if (p.code === 0 && p.value.toUpperCase() === 'SECTION' && pairs[i + 1]?.code === 2) {
        inEntities = pairs[i + 1].value.toUpperCase() === 'ENTITIES';
        i++;
        continue;
      }
      if (inEntities && p.code === 0 && p.value.toUpperCase() === 'ENDSEC') {
        if (current) records.push(current);
        current = null; inEntities = false; continue;
      }
      if (!inEntities) continue;
      if (p.code === 0) {
        if (current) records.push(current);
        current = { type: p.value.toUpperCase(), pairs: [] };
      } else if (current) current.pairs.push(p);
    }
    if (current) records.push(current);

    const paths = [];
    const val = (rec, code, fallback = 0) => {
      const p = rec.pairs.find(x => x.code === code);
      const n = Number.parseFloat(p?.value);
      return Number.isFinite(n) ? n : fallback;
    };
    const flag = (rec, code) => Math.trunc(val(rec, code, 0));

    for (let i = 0; i < records.length; i++) {
      const rec = records[i];
      if (rec.type === 'LINE') {
        paths.push({ points: [{ x: val(rec, 10), y: val(rec, 20) }, { x: val(rec, 11), y: val(rec, 21) }], closed: false });
      } else if (rec.type === 'LWPOLYLINE') {
        const vertices = [];
        let vertex = null;
        for (const p of rec.pairs) {
          if (p.code === 10) { if (vertex) vertices.push(vertex); vertex = { x: +p.value, y: 0, bulge: 0 }; }
          else if (p.code === 20 && vertex) vertex.y = +p.value;
          else if (p.code === 42 && vertex) vertex.bulge = +p.value;
        }
        if (vertex) vertices.push(vertex);
        const closed = (flag(rec, 70) & 1) !== 0;
        const points = expandBulges(vertices, closed);
        if (points.length > 1) paths.push({ points, closed });
      } else if (rec.type === 'POLYLINE') {
        const vertices = [];
        const closed = (flag(rec, 70) & 1) !== 0;
        while (records[i + 1]?.type === 'VERTEX') {
          const vr = records[++i];
          vertices.push({ x: val(vr, 10), y: val(vr, 20), bulge: val(vr, 42) });
        }
        if (records[i + 1]?.type === 'SEQEND') i++;
        const points = expandBulges(vertices, closed);
        if (points.length > 1) paths.push({ points, closed });
      } else if (rec.type === 'CIRCLE') {
        const cx = val(rec, 10), cy = val(rec, 20), r = Math.abs(val(rec, 40));
        if (r > 0) paths.push({ points: sampleArc(cx, cy, r, 0, Math.PI * 2), closed: true });
      } else if (rec.type === 'ARC') {
        const cx = val(rec, 10), cy = val(rec, 20), r = Math.abs(val(rec, 40));
        let a0 = degToRad(val(rec, 50)), a1 = degToRad(val(rec, 51));
        while (a1 <= a0) a1 += Math.PI * 2;
        if (r > 0) paths.push({ points: sampleArc(cx, cy, r, a0, a1), closed: false });
      } else if (rec.type === 'ELLIPSE') {
        const cx = val(rec, 10), cy = val(rec, 20), mx = val(rec, 11), my = val(rec, 21);
        const ratio = Math.abs(val(rec, 40, 1)), t0 = val(rec, 41, 0), t1raw = val(rec, 42, Math.PI * 2);
        let t1 = t1raw; while (t1 <= t0) t1 += Math.PI * 2;
        const count = Math.max(16, Math.ceil((t1 - t0) / (Math.PI / 36)));
        const points = [];
        for (let j = 0; j <= count; j++) {
          const t = t0 + (t1 - t0) * j / count;
          points.push({ x: cx + mx * Math.cos(t) - my * ratio * Math.sin(t), y: cy + my * Math.cos(t) + mx * ratio * Math.sin(t) });
        }
        const closed = Math.abs((t1 - t0) - Math.PI * 2) < .01;
        if (closed) points.pop();
        paths.push({ points, closed });
      } else if (rec.type === 'SPLINE') {
        const points = [];
        let point = null;
        for (const p of rec.pairs) {
          if (p.code === 10) { if (point) points.push(point); point = { x: +p.value, y: 0 }; }
          else if (p.code === 20 && point) point.y = +p.value;
        }
        if (point) points.push(point);
        if (points.length > 1) paths.push({ points, closed: (flag(rec, 70) & 1) !== 0 });
      }
    }
    if (!paths.length) throw new Error(t('noGeometry'));

    return splitDxfParts(paths, filename);
  }

  function parseDxf(text, filename) {
    return parseDxfParts(text, filename)[0];
  }

  function degToRad(v) { return v * Math.PI / 180; }
  function sampleArc(cx, cy, radius, start, end) {
    const steps = Math.max(8, Math.ceil(Math.abs(end - start) / (Math.PI / 36)));
    const points = [];
    for (let i = 0; i <= steps; i++) {
      const a = start + (end - start) * i / steps;
      points.push({ x: cx + radius * Math.cos(a), y: cy + radius * Math.sin(a) });
    }
    if (Math.abs((end - start) - Math.PI * 2) < .001) points.pop();
    return points;
  }

  function expandBulges(vertices, closed) {
    if (vertices.length < 2) return vertices.map(v => ({ x: v.x, y: v.y }));
    const result = [];
    const count = closed ? vertices.length : vertices.length - 1;
    for (let i = 0; i < count; i++) {
      const a = vertices[i], b = vertices[(i + 1) % vertices.length];
      result.push({ x: a.x, y: a.y });
      const bulge = Number.isFinite(a.bulge) ? a.bulge : 0;
      if (Math.abs(bulge) > 1e-9) {
        const dx = b.x - a.x, dy = b.y - a.y, chord = Math.hypot(dx, dy);
        if (chord > 1e-9) {
          const theta = 4 * Math.atan(bulge);
          const midX = (a.x + b.x) / 2, midY = (a.y + b.y) / 2;
          const d = chord * (1 - bulge * bulge) / (4 * bulge);
          const cx = midX - dy / chord * d, cy = midY + dx / chord * d;
          const start = Math.atan2(a.y - cy, a.x - cx);
          const steps = Math.max(2, Math.ceil(Math.abs(theta) / (Math.PI / 36)));
          for (let s = 1; s < steps; s++) {
            const angle = start + theta * s / steps;
            const radius = Math.hypot(a.x - cx, a.y - cy);
            result.push({ x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle) });
          }
        }
      }
    }
    if (!closed) result.push({ x: vertices.at(-1).x, y: vertices.at(-1).y });
    return cleanPoints(result);
  }

  function stitchConnectedPaths(paths) {
    const ready = paths.filter(path => path.closed || path.points.length < 2).map(path => ({ ...path, points: cleanPoints(path.points) }));
    const pending = paths.filter(path => !path.closed && path.points.length >= 2).map(path => ({ ...path, points: cleanPoints(path.points) }));
    const all = paths.flatMap(path => path.points);
    const drawingBounds = bounds(all);
    const tolerance = Math.max(1e-5, Math.hypot(drawingBounds.width, drawingBounds.height) * 1e-6);
    const close = (a, b) => Math.hypot(a.x - b.x, a.y - b.y) <= tolerance;

    while (pending.length) {
      const seed = pending.shift();
      const chain = [...seed.points];
      let changed = true;
      while (changed && pending.length) {
        changed = false;
        const start = chain[0], end = chain.at(-1);
        for (let i = 0; i < pending.length; i++) {
          const candidate = pending[i], first = candidate.points[0], last = candidate.points.at(-1);
          if (close(end, first)) chain.push(...candidate.points.slice(1));
          else if (close(end, last)) chain.push(...[...candidate.points].reverse().slice(1));
          else if (close(start, last)) chain.unshift(...candidate.points.slice(0, -1));
          else if (close(start, first)) chain.unshift(...[...candidate.points].reverse().slice(0, -1));
          else continue;
          pending.splice(i, 1); changed = true; break;
        }
      }
      const closed = chain.length >= 3 && close(chain[0], chain.at(-1));
      ready.push({ points: cleanPoints(chain), closed });
    }
    return ready.filter(path => path.points.length >= 2);
  }

  function splitDxfParts(rawPaths, filename) {
    const paths = stitchConnectedPaths(rawPaths);
    const allPoints = paths.flatMap(path => path.points).filter(p => Number.isFinite(p.x) && Number.isFinite(p.y));
    if (allPoints.length < 3) throw new Error(t('invalidGeometry'));
    const closed = paths
      .map((path, index) => ({ path, index, area: Math.abs(polygonArea(path.points)), parent: -1 }))
      .filter(item => item.path.closed && item.path.points.length >= 3 && item.area > 1e-7);

    if (!closed.length) {
      const outline = convexHull(allPoints);
      if (outline.length < 3) throw new Error(t('noOutline'));
      return [buildPart(paths, outline, filename, 0, 1)];
    }

    for (const item of closed) {
      let parent = null;
      const probe = item.path.points[0];
      for (const candidate of closed) {
        if (candidate === item || candidate.area <= item.area + 1e-7) continue;
        if (pointInPolygon(probe, candidate.path.points) && (!parent || candidate.area < parent.area)) parent = candidate;
      }
      item.parent = parent?.index ?? -1;
    }

    const byIndex = new Map(closed.map(item => [item.index, item]));
    const rootOf = item => {
      let current = item;
      while (current.parent >= 0 && byIndex.has(current.parent)) current = byIndex.get(current.parent);
      return current;
    };
    const roots = closed.filter(item => item.parent < 0).sort((a, b) => {
      const ba = bounds(a.path.points), bb = bounds(b.path.points);
      return bb.maxY - ba.maxY || ba.minX - bb.minX;
    });
    const groups = new Map(roots.map(root => [root.index, []]));
    for (const item of closed) groups.get(rootOf(item).index).push(item.path);

    const openPaths = paths.filter(path => !path.closed);
    for (const path of openPaths) {
      const center = path.points.reduce((sum, p) => ({ x: sum.x + p.x / path.points.length, y: sum.y + p.y / path.points.length }), { x: 0, y: 0 });
      let root = roots.find(candidate => pointInPolygon(center, candidate.path.points));
      if (!root) root = roots.reduce((best, candidate) => {
        const box = bounds(candidate.path.points), distance = Math.hypot(center.x - (box.minX + box.maxX) / 2, center.y - (box.minY + box.maxY) / 2);
        return !best || distance < best.distance ? { candidate, distance } : best;
      }, null)?.candidate;
      if (root) groups.get(root.index).push(path);
    }

    return roots.map((root, index) => buildPart(groups.get(root.index), root.path.points, filename, index, roots.length));
  }

  function buildPart(paths, outline, filename, pieceIndex, pieceCount) {
    const box = bounds(outline);
    const normalizedPaths = paths.map(path => ({ closed: path.closed, points: cleanPoints(path.points.map(p => ({ x: p.x - box.minX, y: p.y - box.minY }))) }));
    const normalizedOutline = cleanPoints(outline.map(p => ({ x: p.x - box.minX, y: p.y - box.minY })));
    const finalBox = bounds(normalizedOutline), baseName = filename.replace(/\.dxf$/i, '');
    // O proxy de nesting não precisa carregar centenas de pontos de SPLINE.
    // O erro conhecido é somado à folga nas colisões, preservando o contorno
    // completo para a validação e para o DXF exportado.
    const nestingTolerance = Math.max(0.08, Math.min(2, Math.hypot(finalBox.width, finalBox.height) * 0.0012));
    const nestingOutline = simplifyClosedPolygon(normalizedOutline, nestingTolerance);
    return {
      id: state.nextId++, name: pieceCount > 1 ? `${baseName} — peça ${pieceIndex + 1}` : baseName,
      filename, sourceIndex: pieceIndex, sourceKey: `${filename.toLowerCase()}::${pieceIndex}`, quantity: 1,
      paths: normalizedPaths, outline: normalizedOutline, nestingOutline, nestingTolerance,
      width: finalBox.width, height: finalBox.height, area: Math.abs(polygonArea(normalizedOutline)), cache: new Map()
    };
  }

  // ---------- Geometry ----------
  function cleanPoints(points) {
    const result = [];
    for (const p of points) {
      if (!Number.isFinite(p.x) || !Number.isFinite(p.y)) continue;
      const previous = result.at(-1);
      if (!previous || Math.hypot(p.x - previous.x, p.y - previous.y) > 1e-7) result.push(p);
    }
    if (result.length > 2 && Math.hypot(result[0].x - result.at(-1).x, result[0].y - result.at(-1).y) < 1e-7) result.pop();
    return result;
  }
  function simplifyOpenPath(points, tolerance) {
    if (points.length <= 2) return [...points];
    const keep = new Uint8Array(points.length); keep[0] = keep[points.length - 1] = 1;
    const stack = [[0, points.length - 1]];
    while (stack.length) {
      const [start, end] = stack.pop();
      let farthest = -1, maximum = tolerance;
      for (let i = start + 1; i < end; i++) {
        const distance = pointSegmentDistance(points[i], points[start], points[end]);
        if (distance > maximum) { maximum = distance; farthest = i; }
      }
      if (farthest >= 0) { keep[farthest] = 1; stack.push([start, farthest], [farthest, end]); }
    }
    return points.filter((_, index) => keep[index]);
  }
  function simplifyClosedPolygon(points, tolerance) {
    if (points.length <= 12 || tolerance <= 0) return [...points];
    let opposite = 1, maximum = 0;
    for (let i = 1; i < points.length; i++) {
      const distance = Math.hypot(points[i].x - points[0].x, points[i].y - points[0].y);
      if (distance > maximum) { maximum = distance; opposite = i; }
    }
    const first = simplifyOpenPath(points.slice(0, opposite + 1), tolerance);
    const second = simplifyOpenPath(points.slice(opposite).concat(points[0]), tolerance);
    const simplified = cleanPoints(first.slice(0, -1).concat(second.slice(0, -1)));
    return simplified.length >= 3 ? simplified : [...points];
  }
  function polygonArea(points) {
    let sum = 0;
    for (let i = 0; i < points.length; i++) {
      const a = points[i], b = points[(i + 1) % points.length]; sum += a.x * b.y - b.x * a.y;
    }
    return sum / 2;
  }
  function bounds(points) {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const p of points) { minX = Math.min(minX, p.x); minY = Math.min(minY, p.y); maxX = Math.max(maxX, p.x); maxY = Math.max(maxY, p.y); }
    return { minX, minY, maxX, maxY, width: maxX - minX, height: maxY - minY };
  }
  function convexHull(points) {
    const pts = [...points].sort((a, b) => a.x - b.x || a.y - b.y);
    if (pts.length <= 2) return pts;
    const cross = (o, a, b) => (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
    const lower = [], upper = [];
    for (const p of pts) { while (lower.length >= 2 && cross(lower.at(-2), lower.at(-1), p) <= 0) lower.pop(); lower.push(p); }
    for (let i = pts.length - 1; i >= 0; i--) { const p = pts[i]; while (upper.length >= 2 && cross(upper.at(-2), upper.at(-1), p) <= 0) upper.pop(); upper.push(p); }
    lower.pop(); upper.pop(); return lower.concat(upper);
  }
  function orient(a, b, c) { return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x); }
  function onSegment(a, b, p) { return Math.abs(orient(a, b, p)) < 1e-8 && p.x >= Math.min(a.x, b.x) - 1e-8 && p.x <= Math.max(a.x, b.x) + 1e-8 && p.y >= Math.min(a.y, b.y) - 1e-8 && p.y <= Math.max(a.y, b.y) + 1e-8; }
  function segmentsIntersect(a, b, c, d) {
    const o1 = orient(a, b, c), o2 = orient(a, b, d), o3 = orient(c, d, a), o4 = orient(c, d, b);
    if (((o1 > 1e-8 && o2 < -1e-8) || (o1 < -1e-8 && o2 > 1e-8)) && ((o3 > 1e-8 && o4 < -1e-8) || (o3 < -1e-8 && o4 > 1e-8))) return true;
    return onSegment(a, b, c) || onSegment(a, b, d) || onSegment(c, d, a) || onSegment(c, d, b);
  }
  function pointInPolygon(point, polygon) {
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const a = polygon[i], b = polygon[j];
      if (onSegment(a, b, point)) return true;
      if ((a.y > point.y) !== (b.y > point.y) && point.x < (b.x - a.x) * (point.y - a.y) / (b.y - a.y) + a.x) inside = !inside;
    }
    return inside;
  }
  function pointSegmentDistance(p, a, b) {
    const dx = b.x - a.x, dy = b.y - a.y, len2 = dx * dx + dy * dy;
    if (len2 < 1e-16) return Math.hypot(p.x - a.x, p.y - a.y);
    const t = Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / len2));
    return Math.hypot(p.x - (a.x + t * dx), p.y - (a.y + t * dy));
  }
  function segmentDistance(a, b, c, d) {
    if (segmentsIntersect(a, b, c, d)) return 0;
    return Math.min(pointSegmentDistance(a, c, d), pointSegmentDistance(b, c, d), pointSegmentDistance(c, a, b), pointSegmentDistance(d, a, b));
  }
  function boxesOverlap(ba, bb, gap = 0) {
    return !(ba.maxX + gap < bb.minX || bb.maxX + gap < ba.minX || ba.maxY + gap < bb.minY || bb.maxY + gap < ba.minY);
  }
  function polygonsTooClose(a, b, gap, ba = bounds(a), bb = bounds(b)) {
    if (!boxesOverlap(ba, bb, gap)) return false;
    if (pointInPolygon(a[0], b) || pointInPolygon(b[0], a)) return true;
    let minimum = Infinity;
    for (let i = 0; i < a.length; i++) {
      const a1 = a[i], a2 = a[(i + 1) % a.length];
      const edgeA = { minX: Math.min(a1.x, a2.x), maxX: Math.max(a1.x, a2.x), minY: Math.min(a1.y, a2.y), maxY: Math.max(a1.y, a2.y) };
      for (let j = 0; j < b.length; j++) {
        const b1 = b[j], b2 = b[(j + 1) % b.length];
        const edgeB = { minX: Math.min(b1.x, b2.x), maxX: Math.max(b1.x, b2.x), minY: Math.min(b1.y, b2.y), maxY: Math.max(b1.y, b2.y) };
        if (!boxesOverlap(edgeA, edgeB, gap)) continue;
        const distance = segmentDistance(a1, a2, b1, b2);
        if (distance < 1e-7) return true;
        minimum = Math.min(minimum, distance);
        if (minimum + 1e-7 < gap) return true;
      }
    }
    return false;
  }

  // ---------- Nesting ----------
  function rotatedShape(part, angle) {
    const key = ((angle % 360) + 360) % 360;
    if (part.cache.has(key)) return part.cache.get(key);
    const rad = degToRad(key), cos = Math.cos(rad), sin = Math.sin(rad);
    const rotate = p => ({ x: p.x * cos - p.y * sin, y: p.x * sin + p.y * cos });
    const rawFullOutline = part.outline.map(rotate), box = bounds(rawFullOutline);
    const rawOutline = (part.nestingOutline || part.outline).map(rotate);
    const shift = p => ({ x: p.x - box.minX, y: p.y - box.minY });
    const shape = {
      angle: key, partId: part.id, outline: rawOutline.map(shift),
      fullOutline: rawFullOutline.map(shift), tolerance: part.nestingTolerance || 0,
      paths: part.paths.map(path => ({ closed: path.closed, points: path.points.map(rotate).map(shift) })),
      width: box.width, height: box.height
    };
    part.cache.set(key, shape); return shape;
  }

  function freeRotationCandidates(part) {
    if (part.freeRotations) return part.freeRotations;
    const normalize = angle => ((angle % 360) + 360) % 360;
    const angles = [0];
    for (let i = 0; i < part.outline.length; i++) {
      const a = part.outline[i], b = part.outline[(i + 1) % part.outline.length];
      if (Math.hypot(b.x - a.x, b.y - a.y) < 1e-7) continue;
      const edgeAngle = Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI;
      angles.push(normalize(-edgeAngle), normalize(90 - edgeAngle));
    }
    const uniqueAngles = [...new Map(angles.map(angle => {
      const rounded = Math.round(normalize(angle) * 10) / 10;
      return [rounded.toFixed(1), rounded];
    })).values()];
    // Elimina rotações geometricamente equivalentes, comum em círculos e peças simétricas.
    const signatures = new Set(), candidates = [];
    for (const angle of uniqueAngles) {
      const shape = rotatedShape(part, angle);
      const signature = shape.outline
        .map(p => `${Math.round(p.x * 100) / 100},${Math.round(p.y * 100) / 100}`)
        .sort().join(';');
      if (!signatures.has(signature)) { signatures.add(signature); candidates.push(angle); }
    }
    // Distribui a busca entre orientações compactas e variadas. O limite evita
    // uma explosão combinatória em contornos com milhares de segmentos.
    if (candidates.length > 32) {
      candidates.sort((a, b) => {
      const sa = rotatedShape(part, a), sb = rotatedShape(part, b);
      return sa.width * sa.height - sb.width * sb.height;
      });
      const compact = candidates.slice(0, 20);
      const spread = [];
      for (let i = 20; i < candidates.length && spread.length < 12; i += Math.max(1, Math.floor((candidates.length - 20) / 12))) spread.push(candidates[i]);
      candidates.splice(0, candidates.length, ...new Set(compact.concat(spread)));
    }
    part.freeRotations = candidates;
    return candidates;
  }
  function transformedOutline(shape, x, y) { return shape.outline.map(p => ({ x: p.x + x, y: p.y + y })); }
  function seededRandom(seed) { return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function yieldToBrowser() { return new Promise(resolve => setTimeout(resolve, 0)); }

  function createSheet(config, sheetType, stockIndex) {
    return {
      width: sheetType.width, height: sheetType.height, sheetTypeId: sheetType.id, stockIndex,
      placements: [], usedMaxX: config.edgeGap, usedMaxY: config.edgeGap,
      spatialGrid: new Map(), cellSize: Math.max(1, Math.min(sheetType.width, sheetType.height) / 16), maxTolerance: 0
    };
  }
  function gridCells(box, cellSize, padding = 0) {
    const cells = [];
    const minX = Math.floor((box.minX - padding) / cellSize), maxX = Math.floor((box.maxX + padding) / cellSize);
    const minY = Math.floor((box.minY - padding) / cellSize), maxY = Math.floor((box.maxY + padding) / cellSize);
    for (let x = minX; x <= maxX; x++) for (let y = minY; y <= maxY; y++) cells.push(`${x}:${y}`);
    return cells;
  }
  function indexPlacement(sheet, placement) {
    for (const key of gridCells(placement.box, sheet.cellSize)) {
      if (!sheet.spatialGrid.has(key)) sheet.spatialGrid.set(key, []);
      sheet.spatialGrid.get(key).push(placement);
    }
    sheet.maxTolerance = Math.max(sheet.maxTolerance, placement.shape.tolerance || 0);
  }
  function nearbyPlacements(sheet, box, padding) {
    const result = new Set();
    for (const key of gridCells(box, sheet.cellSize, padding)) for (const placement of sheet.spatialGrid.get(key) || []) result.add(placement);
    return result;
  }

  function offsetPolygons(polygons, distance) {
    if (!(distance > 1e-7) || !window.ClipperLib) return polygons;
    const scale = 1000;
    const paths = polygons.filter(path => path.length > 2).map(path => path.map(p => ({ X: Math.round(p.x * scale), Y: Math.round(p.y * scale) })));
    if (!paths.length) return polygons;
    const offset = new ClipperLib.ClipperOffset(2, .25 * scale);
    offset.AddPaths(paths, ClipperLib.JoinType.jtRound, ClipperLib.EndType.etClosedPolygon);
    const result = new ClipperLib.Paths();
    offset.Execute(result, distance * scale);
    return result.map(path => path.map(p => ({ x: p.X / scale, y: p.Y / scale })));
  }

  function minkowskiContactPolygon(a, b) {
    if (!window.ClipperLib || a.length < 3 || b.length < 3) return [];
    const scale = 1000;
    const fixed = path => path.map(p => ({ X: Math.round(p.x * scale), Y: Math.round(p.y * scale) }));
    const ac = fixed(a);
    const bc = fixed(b).map(p => ({ X: -p.X, Y: -p.Y }));
    const solution = ClipperLib.Clipper.MinkowskiSum(ac, bc, true) || [];
    let outer = null, largest = -Infinity;
    for (const path of solution) {
      const area = Math.abs(ClipperLib.Clipper.Area(path));
      if (area > largest) { largest = area; outer = path; }
    }
    if (!outer) return [];
    // O NFP usa o primeiro vértice de B como ponto de referência.
    return [[...outer].map(p => ({ x: p.X / scale + b[0].x, y: p.Y / scale + b[0].y }))];
  }

  function contactPolygons(placed, instance, shape, config) {
    if (!window.ClipperLib) return [];
    const safeGap = config.partGap + (shape.tolerance || 0) + (placed.shape.tolerance || 0);
    const key = `${placed.part.id}@${placed.shape.angle.toFixed(1)}|${instance.part.id}@${shape.angle.toFixed(1)}|${safeGap.toFixed(3)}`;
    if (state.nfpCache.has(key)) return state.nfpCache.get(key);
    let result = [];
    try {
      const a = placed.shape.outline.map(p => ({ x: p.x, y: p.y }));
      const b = shape.outline.map(p => ({ x: p.x, y: p.y }));
      const raw = minkowskiContactPolygon(a, b);
      result = offsetPolygons(raw, safeGap);
    } catch (_) { result = []; }
    // Impede que arquivos muito grandes mantenham combinações antigas indefinidamente.
    if (state.nfpCache.size > 30000) state.nfpCache.clear();
    state.nfpCache.set(key, result);
    return result;
  }

  function placementScore(sheet, shape, x, y, config) {
    const usedWidth = Math.max(sheet.usedMaxX, x + shape.width) - config.edgeGap;
    const usedHeight = Math.max(sheet.usedMaxY, y + shape.height) - config.edgeGap;
    const envelope = usedWidth * usedHeight;
    const balance = (usedWidth / sheet.width + usedHeight / sheet.height) * sheet.width * sheet.height * .025;
    return envelope + balance + (x + y) * 1e-4;
  }

  function candidatePositions(sheet, instance, shape, config) {
    const candidates = new Map();
    const add = (x, y, source = 0) => {
      if (!Number.isFinite(x) || !Number.isFinite(y)) return;
      if (x < config.edgeGap - 1e-6 || y < config.edgeGap - 1e-6 || x + shape.width > sheet.width - config.edgeGap + 1e-6 || y + shape.height > sheet.height - config.edgeGap + 1e-6) return;
      const key = `${Math.round(x * 100)}/${Math.round(y * 100)}`;
      if (!candidates.has(key)) candidates.set(key, { x, y, source });
    };

    // Bordas e cantos da chapa continuam sendo candidatos essenciais.
    const left = config.edgeGap, right = sheet.width - config.edgeGap - shape.width;
    const bottom = config.edgeGap, top = sheet.height - config.edgeGap - shape.height;
    add(left, bottom); add(right, bottom); add(left, top); add(right, top);

    const contactSet = new Set(sheet.placements.slice(-6));
    for (const placed of sheet.placements) {
      // Vértices do NFP são posições reais de contato entre contornos,
      // inclusive para peças inclinadas e côncavas.
      if (contactSet.has(placed)) {
        const anchor = shape.outline[0];
        for (const polygon of contactPolygons(placed, instance, shape, config)) {
          for (const point of polygon) add(placed.x + point.x - anchor.x, placed.y + point.y - anchor.y, 1);
        }
      }
      // Fallback barato para geometrias degeneradas que não geram NFP.
      add(placed.box.maxX + config.partGap, placed.box.minY);
      add(placed.box.minX - shape.width - config.partGap, placed.box.minY);
      add(placed.box.minX, placed.box.maxY + config.partGap);
      add(placed.box.minX, placed.box.minY - shape.height - config.partGap);
    }
    const ranked = [...candidates.values()];
    ranked.sort((a, b) => placementScore(sheet, shape, a.x, a.y, config) - placementScore(sheet, shape, b.x, b.y, config) || b.source - a.source);
    return ranked.slice(0, 480);
  }

  function canPlace(sheet, shape, x, y, config) {
    if (x < config.edgeGap - 1e-7 || y < config.edgeGap - 1e-7 || x + shape.width > sheet.width - config.edgeGap + 1e-7 || y + shape.height > sheet.height - config.edgeGap + 1e-7) return null;
    const box = { minX: x, minY: y, maxX: x + shape.width, maxY: y + shape.height };
    const outline = transformedOutline(shape, x, y);
    const maximumGap = config.partGap + (shape.tolerance || 0) + sheet.maxTolerance;
    for (const placed of nearbyPlacements(sheet, box, maximumGap)) {
      const safeGap = config.partGap + (shape.tolerance || 0) + (placed.shape.tolerance || 0);
      if (polygonsTooClose(outline, placed.outline, safeGap, box, placed.box)) return null;
    }
    return outline;
  }

  async function placeOnSheet(sheet, instance, rotations, config, random, varied) {
    let rotationOrder = [...(config.freeRotation ? freeRotationCandidates(instance.part) : rotations)];
    if (varied) rotationOrder.sort(() => random() - .5);
    if (config.freeRotation && rotationOrder.length > 4) rotationOrder = rotationOrder.slice(0, 4);
    let best = null;
    let lastYield = performance.now();
    for (const angle of rotationOrder) {
      const shape = rotatedShape(instance.part, angle);
      if (shape.width > sheet.width - 2 * config.edgeGap + 1e-7 || shape.height > sheet.height - 2 * config.edgeGap + 1e-7) continue;
      let validForRotation = 0;
      for (const pos of candidatePositions(sheet, instance, shape, config)) {
        if (performance.now() - lastYield > 28) { await yieldToBrowser(); lastYield = performance.now(); }
        const outline = canPlace(sheet, shape, pos.x, pos.y, config);
        if (!outline) continue;
        const score = placementScore(sheet, shape, pos.x, pos.y, config) + (varied ? random() * .001 : 0);
        if (!best || score < best.score) best = { x: pos.x, y: pos.y, shape, outline, score };
        // Compara mais de um contato válido; isso evita o viés que criava a
        // terceira chapa, sem testar centenas de posições equivalentes.
        if (++validForRotation >= 8) break;
      }
    }
    if (!best) return false;
    const box = { minX: best.x, minY: best.y, maxX: best.x + best.shape.width, maxY: best.y + best.shape.height };
    const placement = { ...best, box, part: instance.part, instanceNumber: instance.instanceNumber };
    sheet.placements.push(placement); indexPlacement(sheet, placement);
    sheet.usedMaxX = Math.max(sheet.usedMaxX, box.maxX); sheet.usedMaxY = Math.max(sheet.usedMaxY, box.maxY);
    return true;
  }

  async function runTrial(instances, config, trial, onPiece) {
    const random = seededRandom(9137 + trial * 7919);
    const ordered = [...instances];
    if (trial === 0) ordered.sort((a, b) => b.part.area - a.part.area);
    else if (trial === 1) ordered.sort((a, b) => Math.max(b.part.width, b.part.height) - Math.max(a.part.width, a.part.height));
    else if (trial === 2) ordered.sort((a, b) => b.part.height - a.part.height || b.part.width - a.part.width);
    else if (trial === 3) ordered.sort((a, b) => b.part.width - a.part.width || b.part.area - a.part.area);
    else {
      const randomized = ordered.map(item => ({ item, score: item.part.area * (.65 + random() * .7) }));
      randomized.sort((a, b) => b.score - a.score);
      ordered.splice(0, ordered.length, ...randomized.map(entry => entry.item));
    }
    const sheets = [];
    const stockUsage = new Map(config.sheetTypes.map(type => [type.id, 0]));
    const sheetArea = type => type.width * type.height;
    const orderedAvailableStock = () => {
      const available = config.sheetTypes.filter(type => (stockUsage.get(type.id) || 0) < type.quantity);
      if (trial % 4 === 0) available.sort((a, b) => sheetArea(a) - sheetArea(b));
      else if (trial % 4 === 1) available.sort((a, b) => sheetArea(b) - sheetArea(a));
      else if (trial % 4 === 2) available.sort((a, b) => Math.max(a.width, a.height) - Math.max(b.width, b.height) || sheetArea(a) - sheetArea(b));
      else available.sort((a, b) => sheetArea(a) * (.8 + random() * .4) - sheetArea(b) * (.8 + random() * .4));
      return available;
    };
    for (let instanceIndex = 0; instanceIndex < ordered.length; instanceIndex++) {
      const instance = ordered[instanceIndex];
      let placed = false;
      for (const sheet of sheets) {
        if (await placeOnSheet(sheet, instance, config.rotations, config, random, trial > 3)) { placed = true; break; }
      }
      if (!placed) {
        for (const type of orderedAvailableStock()) {
          const stockIndex = (stockUsage.get(type.id) || 0) + 1;
          const candidateSheet = createSheet(config, type, stockIndex);
          if (!await placeOnSheet(candidateSheet, instance, config.rotations, config, random, trial > 3)) continue;
          sheets.push(candidateSheet);
          stockUsage.set(type.id, stockIndex);
          placed = true;
          break;
        }
        if (!placed) {
          const angles = config.freeRotation ? freeRotationCandidates(instance.part) : config.rotations;
          const fitsConfiguredSize = config.sheetTypes.some(type => angles.some(angle => {
            const shape = rotatedShape(instance.part, angle);
            return shape.width <= type.width - 2 * config.edgeGap + 1e-7 && shape.height <= type.height - 2 * config.edgeGap + 1e-7;
          }));
          throw new Error(fitsConfiguredSize ? t('sheetStockExhausted') : t('partDoesNotFit', { name: instance.part.name }));
        }
      }
      onPiece?.(instanceIndex + 1, ordered.length, instance.part.name);
      await yieldToBrowser();
    }
    const occupied = sheets.reduce((sum, s) => sum + (s.usedMaxY - config.edgeGap) * (s.usedMaxX - config.edgeGap), 0);
    const totalSheetArea = sheets.reduce((sum, sheet) => sum + sheet.width * sheet.height, 0);
    return { sheets, totalSheetArea, occupied };
  }

  async function optimize(parts, config, onProgress = () => {}) {
    const sheetTypes = Array.isArray(config.sheetTypes) && config.sheetTypes.length
      ? config.sheetTypes.map((type, index) => ({ id: String(type.id ?? `sheet-${index + 1}`), width: Number(type.width), height: Number(type.height), quantity: Math.max(1, Math.trunc(Number(type.quantity) || 1)) }))
      : [{ id: 'sheet-1', width: Number(config.sheetWidth), height: Number(config.sheetHeight), quantity: Math.max(1, Math.trunc(Number(config.maxSheets) || 1)) }];
    config = { ...config, sheetTypes, maxSheets: sheetTypes.reduce((sum, type) => sum + type.quantity, 0) };
    const instances = [];
    for (const part of parts) for (let n = 1; n <= part.quantity; n++) instances.push({ part, instanceNumber: n });
    if (!instances.length) throw new Error(t('addPiece'));
    const totalArea = instances.reduce((sum, item) => sum + item.part.area, 0);
    const onlySheetType = config.sheetTypes.length === 1 ? config.sheetTypes[0] : null;
    const usableSheetArea = onlySheetType ? (onlySheetType.width - 2 * config.edgeGap) * (onlySheetType.height - 2 * config.edgeGap) : 0;
    const theoreticalMinimum = onlySheetType ? Math.max(1, Math.ceil(totalArea / usableSheetArea)) : 0;
    let best = null, lastError = null, stagnantTrials = 0, iterationsRun = 0;
    const minimumTrials = Math.min(config.iterations, Math.max(4, Math.ceil(Math.sqrt(instances.length))));
    const patience = Math.max(4, Math.ceil(minimumTrials * .75));
    for (let trial = 0; trial < config.iterations; trial++) {
      onProgress(trial / config.iterations, t('trial', { current: trial + 1, total: config.iterations }));
      let result;
      try {
        result = await runTrial(instances, config, trial, (piece, total, name) => {
          onProgress((trial + piece / total) / config.iterations, t('trialPiece', { current: trial + 1, attempts: config.iterations, piece, total, name }));
        });
      } catch (error) {
        lastError = error; iterationsRun++; stagnantTrials++;
        continue;
      }
      iterationsRun++;
      const isBetter = !best || result.totalSheetArea < best.totalSheetArea - 1e-6 ||
        (Math.abs(result.totalSheetArea - best.totalSheetArea) <= 1e-6 && (result.sheets.length < best.sheets.length ||
        (result.sheets.length === best.sheets.length && result.occupied < best.occupied - 1e-6)));
      if (isBetter) { best = result; stagnantTrials = 0; }
      else stagnantTrials++;
      // Se a quantidade de chapas atingiu o limite inferior por área, nenhuma
      // outra tentativa pode reduzi-la. Faz apenas três variações para refinar
      // o arranjo e encerra a busca.
      if (onlySheetType && best.sheets.length === theoreticalMinimum && iterationsRun >= Math.min(3, config.iterations)) break;
      if (iterationsRun >= minimumTrials && stagnantTrials >= patience) break;
    }
    if (!best) throw lastError || new Error(t('sheetStockExhausted'));
    onProgress(1, t('finalizing'));
    const finalResult = {
      ...best, config, totalArea, partCount: instances.length, createdAt: new Date(),
      iterationsRun,
      originalVertices: parts.reduce((sum, part) => sum + part.outline.length, 0),
      nestingVertices: parts.reduce((sum, part) => sum + (part.nestingOutline || part.outline).length, 0)
    };
    const validation = validateNestingResult(finalResult);
    if (!validation.valid) throw new Error(t('finalConflict', { first: validation.first, second: validation.second }));
    finalResult.geometryValidated = true;
    return finalResult;
  }

  function validateNestingResult(result) {
    for (const sheet of result.sheets) {
      const exact = sheet.placements.map(placement => ({
        placement,
        outline: transformedOutline({ outline: placement.shape.fullOutline || placement.shape.outline }, placement.x, placement.y)
      }));
      for (let i = 0; i < exact.length; i++) for (let j = i + 1; j < exact.length; j++) {
        if (!boxesOverlap(exact[i].placement.box, exact[j].placement.box, result.config.partGap)) continue;
        if (polygonsTooClose(exact[i].outline, exact[j].outline, result.config.partGap, exact[i].placement.box, exact[j].placement.box)) {
          return { valid: false, first: exact[i].placement.part.name, second: exact[j].placement.part.name };
        }
      }
    }
    return { valid: true };
  }

  // ---------- DXF writer ----------
  function dxfNumber(value) { return Math.abs(value) < 1e-10 ? '0' : Number(value.toFixed(6)).toString(); }
  function safeLayer(name) { return ('P_' + name).normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^A-Za-z0-9_-]/g, '_').slice(0, 31); }
  function createDxf(result) {
    const out = [];
    const pair = (code, value) => { out.push(String(code), String(value)); };
    const layout = previewLayout(result), spacing = layout.spacing;
    const drawingWidth = layout.width;
    const drawingHeight = layout.height + spacing * .5;

    // DXF R12 ASCII usa entidades POLYLINE/VERTEX e é aceito por leitores
    // mais rígidos, incluindo SolidWorks e eDrawings.
    pair(0, 'SECTION'); pair(2, 'HEADER');
    pair(9, '$ACADVER'); pair(1, 'AC1009');
    pair(9, '$MEASUREMENT'); pair(70, 1);
    pair(9, '$EXTMIN'); pair(10, 0); pair(20, 0); pair(30, 0);
    pair(9, '$EXTMAX'); pair(10, dxfNumber(drawingWidth)); pair(20, dxfNumber(drawingHeight)); pair(30, 0);
    pair(0, 'ENDSEC');

    const resultLayers = result.sheets.flatMap(sheet => sheet.placements.map(placed => safeLayer(placed.part.name)));
    const layers = ['0', 'CHAPAS', 'MARGENS', ...new Set(resultLayers)];
    pair(0, 'SECTION'); pair(2, 'TABLES');
    pair(0, 'TABLE'); pair(2, 'LTYPE'); pair(70, 1);
    pair(0, 'LTYPE'); pair(2, 'CONTINUOUS'); pair(70, 0); pair(3, 'Solid line'); pair(72, 65); pair(73, 0); pair(40, 0);
    pair(0, 'ENDTAB');
    pair(0, 'TABLE'); pair(2, 'LAYER'); pair(70, layers.length);
    layers.forEach((layer, i) => { pair(0, 'LAYER'); pair(2, layer); pair(70, 0); pair(62, i === 1 ? 8 : i === 2 ? 9 : ((i * 2) % 7) + 1); pair(6, 'CONTINUOUS'); });
    pair(0, 'ENDTAB'); pair(0, 'ENDSEC');
    pair(0, 'SECTION'); pair(2, 'BLOCKS'); pair(0, 'ENDSEC');
    pair(0, 'SECTION'); pair(2, 'ENTITIES');
    const polyline = (points, closed, layer) => {
      if (points.length < 2) return;
      pair(0, 'POLYLINE'); pair(8, layer); pair(66, 1); pair(10, 0); pair(20, 0); pair(30, 0); pair(70, closed ? 1 : 0);
      for (const p of points) {
        pair(0, 'VERTEX'); pair(8, layer); pair(10, dxfNumber(p.x)); pair(20, dxfNumber(p.y)); pair(30, 0); pair(70, 0);
      }
      pair(0, 'SEQEND'); pair(8, layer);
    };
    result.sheets.forEach((sheet, index) => {
      const ox = layout.offsets[index];
      polyline([{x:ox,y:0},{x:ox+sheet.width,y:0},{x:ox+sheet.width,y:sheet.height},{x:ox,y:sheet.height}], true, 'CHAPAS');
      const m = result.config.edgeGap;
      if (m > 0 && m * 2 < sheet.width && m * 2 < sheet.height) polyline([{x:ox+m,y:m},{x:ox+sheet.width-m,y:m},{x:ox+sheet.width-m,y:sheet.height-m},{x:ox+m,y:sheet.height-m}], true, 'MARGENS');
      for (const placed of sheet.placements) {
        const layer = safeLayer(placed.part.name);
        for (const path of placed.shape.paths) polyline(path.points.map(p => ({ x: p.x + placed.x + ox, y: p.y + placed.y })), path.closed, layer);
      }
      pair(0, 'TEXT'); pair(8, 'CHAPAS'); pair(10, dxfNumber(ox)); pair(20, dxfNumber(sheet.height + spacing * .25)); pair(30, 0); pair(40, dxfNumber(Math.max(10, Math.min(40, spacing * .18)))); pair(1, `CHAPA ${index + 1} - ${dxfNumber(sheet.width)} x ${dxfNumber(sheet.height)} mm`); pair(50, 0);
    });
    pair(0, 'ENDSEC'); pair(0, 'EOF');
    return out.join('\r\n') + '\r\n';
  }

  function createReport(result) {
    const usage = result.totalArea / result.totalSheetArea * 100;
    const lines = [
      `${t('report').toLocaleUpperCase(state.language)} NESTING — EZ Nester`,
      `${t('generatedAt')}: ${result.createdAt.toLocaleString(state.language)}`,
      '',
      `${t('sheetStock')}:`,
      ...result.config.sheetTypes.map(type => `  ${fmt(type.width)} × ${fmt(type.height)} mm — ${t('quantity')}: ${type.quantity}`),
      `${t('betweenPieces')}: ${fmt(result.config.partGap)} mm`,
      `${t('toEdge')}: ${fmt(result.config.edgeGap)} mm`,
      `${translations[state.language].reportRotations ?? t('rotationsAllowed')}: ${result.config.freeRotation ? t('rotFree') : result.config.rotations.map(v => v + '°').join(', ')}`,
      `${t('attempts')}: ${result.iterationsRun ?? result.config.iterations}`,
      `${t('finalValidation')}: ${result.geometryValidated ? t('approved') : t('notRun')}`,
      '',
      `${t('sheets')}: ${result.sheets.length}`,
      `${t('positionedPieces')}: ${result.partCount}`,
      `${t('utilization')}: ${fmt(usage, 2)}%`,
      `${t('estimatedWaste')}: ${fmt(100 - usage, 2)}%`,
      ''
    ];
    result.sheets.forEach((sheet, index) => {
      lines.push(`${t('sheetUpper')} ${index + 1} — ${fmt(sheet.width)} × ${fmt(sheet.height)} mm — ${sheet.placements.length} ${t('pieces').toLocaleLowerCase(state.language)}`);
      sheet.placements.forEach(p => lines.push(`  ${p.part.name} #${p.instanceNumber} | X=${fmt(p.x, 2)} Y=${fmt(p.y, 2)} | ${t('rotation')}=${p.shape.angle}°`));
      lines.push('');
    });
    lines.push(t('outerAreaNote'));
    return lines.join('\r\n');
  }

  function download(content, filename, type) {
    const blob = new Blob([content], { type }); const url = URL.createObjectURL(blob);
    const link = document.createElement('a'); link.href = url; link.download = filename; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  // ---------- Preview ----------
  function previewLayout(result) {
    const maxWidth = Math.max(...result.sheets.map(sheet => sheet.width), 1);
    const spacing = Math.max(100, maxWidth * .05), offsets = [];
    let width = 0;
    result.sheets.forEach((sheet, index) => { offsets.push(width); width += sheet.width + (index < result.sheets.length - 1 ? spacing : 0); });
    return { spacing, offsets, width, height: Math.max(...result.sheets.map(sheet => sheet.height), 1) };
  }
  function resizeCanvas() {
    const rect = ui.canvas.getBoundingClientRect(), dpr = window.devicePixelRatio || 1;
    const width = Math.max(1, Math.round(rect.width * dpr)), height = Math.max(1, Math.round(rect.height * dpr));
    if (ui.canvas.width !== width || ui.canvas.height !== height) { ui.canvas.width = width; ui.canvas.height = height; }
    drawPreview();
  }
  function fitView() {
    if (!state.result) return;
    const layout = previewLayout(state.result), rect = ui.canvas.getBoundingClientRect(), pad = 38;
    state.view.scale = Math.min((rect.width - pad * 2) / layout.width, (rect.height - pad * 2) / layout.height);
    state.view.offsetX = (rect.width - layout.width * state.view.scale) / 2;
    state.view.offsetY = (rect.height + layout.height * state.view.scale) / 2;
    drawPreview();
  }
  function drawPreview() {
    const ctx = ui.canvas.getContext('2d'), dpr = window.devicePixelRatio || 1, rect = ui.canvas.getBoundingClientRect();
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, rect.width, rect.height);
    if (!state.result) return;
    const { scale, offsetX, offsetY } = state.view;
    const toScreen = (x, y) => ({ x: offsetX + x * scale, y: offsetY - y * scale });
    const result = state.result, layout = previewLayout(result);
    result.sheets.forEach((sheet, sheetIndex) => {
      const originX = layout.offsets[sheetIndex];
      const tl = toScreen(originX, sheet.height), br = toScreen(originX + sheet.width, 0);
      ctx.fillStyle = '#fff'; ctx.strokeStyle = '#8da0a8'; ctx.lineWidth = 1.25; ctx.fillRect(tl.x, tl.y, br.x - tl.x, br.y - tl.y); ctx.strokeRect(tl.x, tl.y, br.x - tl.x, br.y - tl.y);
      if (result.config.edgeGap > 0) {
        const m1 = toScreen(originX + result.config.edgeGap, sheet.height - result.config.edgeGap), m2 = toScreen(originX + sheet.width - result.config.edgeGap, result.config.edgeGap);
        ctx.save(); ctx.strokeStyle = '#d4dcdf'; ctx.setLineDash([4, 4]); ctx.strokeRect(m1.x, m1.y, m2.x - m1.x, m2.y - m1.y); ctx.restore();
      }
      const label = toScreen(originX, sheet.height); ctx.fillStyle = document.documentElement.dataset.theme==='dark'?'#b6cbd6':'#56666f'; ctx.font = '600 11px system-ui'; ctx.fillText(`${t('sheetUpper')} ${sheetIndex + 1} · ${fmt(sheet.width, 0)} × ${fmt(sheet.height, 0)} mm`, label.x, label.y - 8);
      sheet.placements.forEach(placed => {
        const color = palette[state.parts.findIndex(p => p.id === placed.part.id) % palette.length];
        ctx.beginPath();
        for (const path of placed.shape.paths) {
          if (path.points.length < 2) continue;
          path.points.forEach((p, i) => { const s = toScreen(originX + placed.x + p.x, placed.y + p.y); if (i === 0) ctx.moveTo(s.x, s.y); else ctx.lineTo(s.x, s.y); });
          if (path.closed) ctx.closePath();
        }
        ctx.globalAlpha = .79; ctx.fillStyle = color; ctx.fill('evenodd'); ctx.globalAlpha = 1; ctx.strokeStyle = color; ctx.lineWidth = Math.max(.7, Math.min(1.4, scale * .3)); ctx.stroke();
      });
    });
  }

  // ---------- UI ----------
  async function addFiles(fileList) {
    const files = [...fileList].filter(f => /\.dxf$/i.test(f.name));
    if (!files.length) { setMessage(t('selectDxf'), 'error'); return; }
    const errors = [];
    let detectedPieces = 0;
    for (const file of files) {
      try {
        const text = await file.text();
        const importedParts = parseDxfParts(text, file.name);
        detectedPieces += importedParts.length;
        for (const part of importedParts) {
          const duplicate = state.parts.find(p => p.sourceKey === part.sourceKey);
          if (duplicate) duplicate.quantity++;
          else state.parts.push(part);
        }
      } catch (error) { errors.push(`${file.name}: ${error.message}`); }
    }
    state.result = null; renderFiles(); resetResult();
    if (errors.length) setMessage(errors.join(' '), 'error');
    else setMessage(t('imported', { files: files.length, pieces: detectedPieces }), 'success');
    ui.fileInput.value = '';
  }
  function renderFiles() {
    ui.fileList.innerHTML = '';
    state.parts.forEach(part => {
      const row = document.createElement('div'); row.className = 'file-item';
      row.innerHTML = `<span class="file-badge">DXF</span><div class="file-meta"><strong title="${escapeHtml(part.filename)}">${escapeHtml(part.name)}</strong><small>${fmt(part.width)} × ${fmt(part.height)} mm</small></div><label class="qty-control" title="${escapeHtml(t('quantity'))}"><input type="number" min="1" max="999" value="${part.quantity}" aria-label="${escapeHtml(t('quantity'))}: ${escapeHtml(part.name)}"></label><button class="remove-file" title="${escapeHtml(t('remove'))}" aria-label="${escapeHtml(t('remove'))}: ${escapeHtml(part.name)}">×</button>`;
      row.querySelector('input').addEventListener('change', e => { part.quantity = Math.max(1, Math.min(999, Math.trunc(+e.target.value || 1))); e.target.value = part.quantity; resetResult(); });
      row.querySelector('button').addEventListener('click', () => { state.parts = state.parts.filter(p => p.id !== part.id); renderFiles(); resetResult(); });
      ui.fileList.appendChild(row);
    });
    ui.nestButton.disabled = state.parts.length === 0;
  }
  function escapeHtml(text) { const div = document.createElement('div'); div.textContent = text; return div.innerHTML; }
  function refreshSheetRowsLanguage() {
    if (!ui.sheetList) return;
    ui.sheetList.querySelectorAll('.remove-sheet').forEach((button, index) => {
      button.title = t('removeSheet');
      button.setAttribute('aria-label', `${t('removeSheet')} ${index + 1}`);
    });
  }
  function updateSheetRemoveButtons() {
    const rows = [...ui.sheetList.querySelectorAll('.sheet-row')];
    rows.forEach(row => { row.querySelector('.remove-sheet').disabled = rows.length === 1; });
    refreshSheetRowsLanguage();
  }
  function addSheetRow(values = {}) {
    const row = document.createElement('div');
    row.className = 'sheet-row';
    row.dataset.sheetId = `sheet-${state.nextSheetId++}`;
    const width = Number(values.width) > 0 ? Number(values.width) : 3000;
    const height = Number(values.height) > 0 ? Number(values.height) : 1500;
    const quantity = Number(values.quantity) > 0 ? Math.trunc(Number(values.quantity)) : 1;
    row.innerHTML = `<label><span data-i18n="sheetWidth">${escapeHtml(t('sheetWidth'))}</span><input class="sheet-width" type="number" value="${width}" min="1" step="1"></label><label><span data-i18n="sheetLength">${escapeHtml(t('sheetLength'))}</span><input class="sheet-height" type="number" value="${height}" min="1" step="1"></label><label><span data-i18n="quantity">${escapeHtml(t('quantity'))}</span><input class="sheet-quantity" type="number" value="${quantity}" min="1" max="999" step="1"></label><button class="remove-sheet" type="button" title="${escapeHtml(t('removeSheet'))}">×</button>`;
    row.querySelectorAll('input').forEach(input => input.addEventListener('change', () => { if (state.result) resetResult(); }));
    row.querySelector('.remove-sheet').addEventListener('click', () => {
      if (ui.sheetList.children.length <= 1) return;
      row.remove(); updateSheetRemoveButtons();
      if (state.result) resetResult();
    });
    ui.sheetList.appendChild(row);
    updateSheetRemoveButtons();
    if (state.result) resetResult();
    return row;
  }
  function refreshResultText() {
    if (!state.result) {
      ui.resultSubtitle.textContent = state.parts.length ? t('configure') : t('addToStart');
      return;
    }
    const result = state.result;
    const usage = result.totalArea / result.totalSheetArea * 100;
    ui.metricSheets.textContent = result.sheets.length; ui.metricParts.textContent = result.partCount;
    ui.metricUsage.textContent = `${fmt(usage, 1)}%`; ui.metricWaste.textContent = `${fmt(100 - usage, 1)}%`;
    const elapsed = result.elapsedMs || 0;
    const elapsedLabel = elapsed >= 1000 ? `${fmt(elapsed / 1000, 1)} s` : `${fmt(elapsed, 0)} ms`;
    ui.resultSubtitle.textContent = t('resultSummary', { pieces: result.partCount, sheets: result.sheets.length, elapsed: elapsedLabel, attempts: result.iterationsRun });
  }
  function resetResult() {
    state.result = null; ui.emptyState.classList.remove('hidden'); ui.resultSubtitle.textContent = state.parts.length ? t('configure') : t('addToStart');
    ui.fitButton.disabled = ui.exportButton.disabled = ui.exportReportButton.disabled = true;
    ui.metricSheets.textContent = ui.metricUsage.textContent = ui.metricParts.textContent = ui.metricWaste.textContent = '—'; drawPreview();
  }
  function readConfig() {
    const rotationMode = ui.rotations.value;
    const sheetTypes = [...ui.sheetList.querySelectorAll('.sheet-row')].map(row => ({
      id: row.dataset.sheetId,
      width: numberValue(row.querySelector('.sheet-width')),
      height: numberValue(row.querySelector('.sheet-height')),
      quantity: Math.trunc(numberValue(row.querySelector('.sheet-quantity')))
    }));
    const config = {
      sheetTypes, partGap: numberValue(ui.partGap), edgeGap: numberValue(ui.edgeGap),
      rotations: rotationMode === 'free' ? [] : rotationMode.split(',').map(Number), freeRotation: rotationMode === 'free',
      iterations: Math.trunc(numberValue(ui.iterations))
    };
    if (!config.sheetTypes.length || config.sheetTypes.some(type => !(type.width > 0 && type.height > 0))) throw new Error(t('invalidSheet'));
    if (config.sheetTypes.some(type => !(type.quantity >= 1))) throw new Error(t('invalidSheetQuantity'));
    if (!(config.partGap >= 0 && config.edgeGap >= 0)) throw new Error(t('negativeDistances'));
    if (config.sheetTypes.some(type => config.edgeGap * 2 >= type.width || config.edgeGap * 2 >= type.height)) throw new Error(t('edgeTooLarge'));
    if (!(config.iterations >= 1 && config.iterations <= 100)) throw new Error(t('attemptsRange'));
    return config;
  }
  async function executeNesting() {
    let completed = false;
    try {
      const config = readConfig(); ui.nestButton.disabled = true; ui.nestButton.classList.add('loading');
      if (state.progressHideTimer) { clearTimeout(state.progressHideTimer); state.progressHideTimer = null; }
      ui.progressPanel.hidden = false; updateProgress(0, t('analyzing')); setMessage(t('calculating'));
      await new Promise(resolve => setTimeout(resolve, 30));
      const started = performance.now(); state.result = await optimize(state.parts, config, updateProgress); state.result.elapsedMs = performance.now() - started;
      refreshResultText();
      ui.emptyState.classList.add('hidden'); ui.fitButton.disabled = ui.exportButton.disabled = ui.exportReportButton.disabled = false;
      setMessage(t('completed', { pieces: state.result.partCount, sheets: state.result.sheets.length }), 'success');
      completed = true;
      requestAnimationFrame(fitView);
    } catch (error) { setMessage(error.message, 'error'); }
    finally {
      ui.nestButton.disabled = state.parts.length === 0; ui.nestButton.classList.remove('loading');
      if (completed) state.progressHideTimer = setTimeout(() => { ui.progressPanel.hidden = true; state.progressHideTimer = null; }, 1400);
      else ui.progressPanel.hidden = true;
    }
  }

  ui.fileInput.addEventListener('change', e => addFiles(e.target.files));
  ['dragenter', 'dragover'].forEach(type => ui.dropZone.addEventListener(type, e => { e.preventDefault(); ui.dropZone.classList.add('drag'); }));
  ['dragleave', 'drop'].forEach(type => ui.dropZone.addEventListener(type, e => { e.preventDefault(); ui.dropZone.classList.remove('drag'); }));
  ui.dropZone.addEventListener('drop', e => addFiles(e.dataTransfer.files));
  ui.languageSelect.addEventListener('change', e => applyLanguage(e.target.value));
  ui.languageButton.addEventListener('click', () => setLanguageMenu(ui.languageMenu.hidden));
  ui.languageMenu.addEventListener('click', e => {
    const option = e.target.closest('[data-language]');
    if (!option) return;
    applyLanguage(option.dataset.language); setLanguageMenu(false); ui.languageButton.focus();
  });
  ui.languagePicker.addEventListener('keydown', e => {
    if (e.key === 'Escape') { setLanguageMenu(false); ui.languageButton.focus(); return; }
    if (!['ArrowDown', 'ArrowUp'].includes(e.key)) return;
    e.preventDefault(); setLanguageMenu(true);
    const options = [...ui.languageMenu.querySelectorAll('[data-language]')];
    const current = Math.max(0, options.indexOf(document.activeElement));
    options[(current + (e.key === 'ArrowDown' ? 1 : -1) + options.length) % options.length].focus();
  });
  document.addEventListener('click', e => { if (!ui.languagePicker.contains(e.target)) setLanguageMenu(false); });
  ui.nestButton.addEventListener('click', executeNesting); ui.fitButton.addEventListener('click', fitView);
  ui.addSheetButton.addEventListener('click', () => {
    const last = ui.sheetList.lastElementChild;
    addSheetRow(last ? { width: numberValue(last.querySelector('.sheet-width')), height: numberValue(last.querySelector('.sheet-height')), quantity: 1 } : undefined);
  });
  ui.exportButton.addEventListener('click', () => state.result && download(createDxf(state.result), `nesting_${new Date().toISOString().slice(0,10)}.dxf`, 'application/dxf'));
  ui.exportReportButton.addEventListener('click', () => state.result && download(createReport(state.result), `relatorio_nesting_${new Date().toISOString().slice(0,10)}.txt`, 'text/plain;charset=utf-8'));
  [ui.partGap, ui.edgeGap, ui.rotations, ui.iterations].forEach(el => el.addEventListener('change', () => { if (state.result) resetResult(); }));
  ui.canvas.addEventListener('wheel', e => {
    if (!state.result) return; e.preventDefault(); const rect = ui.canvas.getBoundingClientRect(), mx = e.clientX - rect.left, my = e.clientY - rect.top;
    const factor = Math.exp(-e.deltaY * .001); const newScale = Math.max(.01, Math.min(100, state.view.scale * factor));
    state.view.offsetX = mx - (mx - state.view.offsetX) * newScale / state.view.scale; state.view.offsetY = my - (my - state.view.offsetY) * newScale / state.view.scale; state.view.scale = newScale; drawPreview();
  }, { passive: false });
  ui.canvas.addEventListener('pointerdown', e => { if (!state.result) return; state.view.dragging = true; state.view.lastX = e.clientX; state.view.lastY = e.clientY; ui.canvas.setPointerCapture(e.pointerId); ui.canvasWrap.classList.add('dragging'); });
  ui.canvas.addEventListener('pointermove', e => { if (!state.view.dragging) return; state.view.offsetX += e.clientX - state.view.lastX; state.view.offsetY += e.clientY - state.view.lastY; state.view.lastX = e.clientX; state.view.lastY = e.clientY; drawPreview(); });
  ui.canvas.addEventListener('pointerup', e => { state.view.dragging = false; ui.canvas.releasePointerCapture(e.pointerId); ui.canvasWrap.classList.remove('dragging'); });
  document.addEventListener('themechange',drawPreview);
  new ResizeObserver(resizeCanvas).observe(ui.canvasWrap);
  // API somente-leitura usada pelos testes locais e por futuras integrações.
  window.NestDXFCore = Object.freeze({ parseDxf, parseDxfParts, optimize, createDxf, createReport, rotatedShape });
  addSheetRow({ width: 3000, height: 1500, quantity: 1 });
  applyLanguage(state.language, false);
  resizeCanvas();
})();
