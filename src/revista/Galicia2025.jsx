// src/revista/Galicia2025.jsx
// Galicia 2025 — Revista web (scroll vertical, clásico) — MODELO VACÍO EDITABLE

const ALL_IMAGES   = import.meta.glob('/src/fotos/**/*.{jpg,jpeg,png,webp,avif}', { eager: true, as: 'url' });
const ALL_AUDIOS   = import.meta.glob('/src/fotos/**/*.{mp3,ogg,wav}',            { eager: true, as: 'url' });
const ALL_CAPTIONS = import.meta.glob('/src/fotos/**/captions.json',              { eager: true });

import { useEffect, useState } from 'react';

function normalize(p){ return p.replace(/\\/g,'/'); }

function useDayGallery(dayId){
  const prefix = `/src/fotos/${dayId}/`;

  const images = Object.entries(ALL_IMAGES)
    .map(([p,url])=>({ path: normalize(p), url }))
    .filter(({path})=> path.startsWith(prefix))
    .sort((a,b)=> a.path.localeCompare(b.path));

  const audioMap = new Map(
    Object.entries(ALL_AUDIOS)
      .map(([p,url])=> [normalize(p), url])
      .filter(([p])=> p.startsWith(prefix))
      .map(([p,url])=> [p.replace(/\.(mp3|ogg|wav)$/i,'' ).toLowerCase(), url])
  );

  const captionsEntry = Object.entries(ALL_CAPTIONS)
    .map(([p,obj])=> [normalize(p), obj])
    .find(([p])=> p === `${prefix}captions.json`);
  const captions = captionsEntry ? captionsEntry[1] : {};

  return images.map(({path,url})=>{
    const base = path.replace(/\.(jpg|jpeg|png|webp|avif)$/i,'').toLowerCase();
    const audioUrl = audioMap.get(base) || null;
    const fileName = path.split('/').pop();
    const caption = captions[fileName] || '';
    return { src:url, downloadHref:url, caption, audio:audioUrl, name:fileName };
  });
}

function Timeline({ items = [] }) {
  return (
    <ol className="relative border-s border-gray-200 pl-6 space-y-4">
      {items.map((it, i) => (
        <li key={i} className="relative">
          <span className="absolute -left-2 top-1.5 w-3 h-3 rounded-full bg-emerald-600" />
          <div className="text-sm text-gray-500">{it.hora}</div>
          <div className="font-medium">{it.titulo}</div>
          {it.nota && <p className="text-sm text-gray-600">{it.nota}</p>}
        </li>
      ))}
    </ol>
  );
}

function PhotoCard({ item }) {
  return (
    <figure className="mb-4 break-inside-avoid rounded-lg overflow-hidden border bg-white">
      <a href={item.downloadHref} download={item.name} className="group block relative">
        <img src={item.src} alt={item.caption || item.name} loading="lazy" className="w-full h-auto block" onError={(e)=>{ e.currentTarget.style.opacity='0.35'; }} />
        <span className="pointer-events-none absolute bottom-2 right-2 text-xs px-2 py-1 rounded-md bg-black/60 text-white opacity-0 group-hover:opacity-100 transition">Descargar</span>
      </a>
      {(item.caption || item.audio) && (
        <figcaption className="p-3 text-sm text-gray-700">
          {item.caption && <p className="leading-6">{item.caption}</p>}
          {item.audio && (<audio controls className="mt-2 w-full"><source src={item.audio} /></audio>)}
        </figcaption>
      )}
    </figure>
  );
}

function DayGallery({ dayId, title }) {
  const items = useDayGallery(dayId);
  return (
    <section id={`${dayId}-galeria`} className="mt-10">
      <h4 className="font-serif text-2xl">Galería — {title}</h4>
      <p className="text-sm text-gray-500 mt-1">
        Añade tus fotos en <code>/src/fotos/{dayId}/</code>. Pies opcionales: <code>captions.json</code>. Audios: mismo nombre que la foto.
      </p>
      <div className="mt-4 columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
        {items.length === 0 ? (<div className="text-sm text-gray-500">(Sin fotos todavía)</div>) : (items.map((it,i)=><PhotoCard key={i} item={it}/>))}
      </div>
    </section>
  );
}

function DaySection({ id, titulo, timeline = [] }) {
  return (
    <section id={id} className="max-w-7xl mx-auto px-4 md:px-6 mt-16 pb-16 print:break-before-page">
      <header className="flex items-center justify-between flex-wrap gap-3">
        <h3 className="font-serif text-3xl">{titulo}</h3>
        <nav className="flex flex-wrap gap-2 text-sm">
          <a href={`#${id}-mapa`} className="px-3 py-1 rounded-full border hover:bg-gray-50">Mapa</a>
          <a href={`#${id}-timeline`} className="px-3 py-1 rounded-full border hover:bg-gray-50">Timeline</a>
          <a href={`#${id}-destinos`} className="px-3 py-1 rounded-full border hover:bg-gray-50">Destinos</a>
          <a href={`#${id}-sabores`} className="px-3 py-1 rounded-full border hover:bg-gray-50">Sabores</a>
          <a href={`#${id}-momentos`} className="px-3 py-1 rounded-full border hover:bg-gray-50">Momentos</a>
          <a href={`#${id}-galeria`} className="px-3 py-1 rounded-full border hover:bg-gray-50">Galería</a>
        </nav>
      </header>

      <section id={`${id}-mapa`} className="mt-8">
        <h4 className="font-serif text-2xl">Mapa</h4>
        <div className="mt-3 aspect-video bg-gray-100 rounded-lg grid place-items-center text-gray-500">
          <div className="text-center text-sm">Coloca tu mapa en <code>/src/fotos/{id}/{id}-mapa.jpg</code> (opcional).</div>
        </div>
      </section>

      <section id={`${id}-timeline`} className="mt-10">
        <h4 className="font-serif text-2xl">Timeline</h4>
        <div className="mt-3">
          <Timeline items={timeline} />
        </div>
      </section>

      <section id={`${id}-destinos`} className="mt-10">
        <h4 className="font-serif text-2xl">Destinos</h4>
        <div className="mt-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3].map(i=>(
            <article key={i} className="border rounded-xl overflow-hidden">
              <div className="aspect-[4/3] bg-gray-100" />
              <div className="p-4">
                <h5 className="font-serif text-lg">Lugar #{i}</h5>
                <p className="mt-2 text-sm text-gray-700">Descripción breve, impresiones y recomendaciones.</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id={`${id}-sabores`} className="mt-10">
        <h4 className="font-serif text-2xl">Sabores</h4>
        <div className="mt-3 grid md:grid-cols-12 gap-6">
          <div className="md:col-span-7"><div className="aspect-video bg-gray-100 rounded-lg" /></div>
          <div className="md:col-span-5">
            <h5 className="font-medium text-lg">Plato / experiencia</h5>
            <p className="mt-2 text-gray-700 text-sm">Describe sabores, lugares y recomendaciones.</p>
            <ul className="mt-2 list-disc list-inside text-sm text-gray-700">
              <li>Restaurante #1</li><li>Taberna #2</li><li>Mercado #3</li>
            </ul>
          </div>
        </div>
      </section>

      <section id={`${id}-momentos`} className="mt-10">
        <h4 className="font-serif text-2xl">Momentos</h4>
        <p className="mt-2 text-gray-700 text-sm">Anécdotas y pequeñas historias del día.</p>
        <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3].map(i=>(
            <figure key={i} className="border rounded-xl overflow-hidden">
              <div className="aspect-square bg-gray-100" />
              <figcaption className="p-3 text-sm text-gray-700">Pie de foto #{i}.</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <DayGallery dayId={id} title={titulo} />
    </section>
  );
}

export default function Galicia2025(){
  const [progress,setProgress]=useState(0);
  useEffect(()=>{const onScroll=()=>{const h=document.documentElement; const scrolled=(h.scrollTop/(h.scrollHeight-h.clientHeight))*100; setProgress(scrolled)}; window.addEventListener('scroll',onScroll); return()=>window.removeEventListener('scroll',onScroll)},[]);

  const navItems=[
    {id:'portada',label:'Portada'},{id:'indice',label:'Índice'},{id:'introduccion',label:'Introducción'},
    {id:'dia1',label:'Día 1'},{id:'dia2',label:'Día 2'},{id:'dia3',label:'Día 3'},{id:'dia4',label:'Día 4'},{id:'dia5',label:'Día 5'},
    {id:'galeria',label:'Galería (todas)'},{id:'creditos',label:'Créditos'},
  ];

  const dia1Timeline=[
    {hora:'09:00', titulo:'Salida', nota:'Inicio desde el alojamiento.'},
    {hora:'10:30', titulo:'Catedral', nota:'Visita guiada breve.'},
    {hora:'14:00', titulo:'Mercado', nota:'Pulpo y empanada.'},
    {hora:'18:00', titulo:'Paseo casco antiguo', nota:'Café y fotos.'},
  ];

  function GlobalGallery(){
    const [active,setActive]=useState('dia1');
    const dias=['dia1','dia2','dia3','dia4','dia5'];
    const items = useDayGallery(active);
    return (
      <section id="galeria" className="mt-16 md:mt-24 print:break-before-page">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h2 className="font-serif text-3xl">Galería — Todas las fotos</h2>
            <nav className="flex flex-wrap gap-2 text-sm">
              {dias.map(d=>(
                <button key={d} onClick={()=>setActive(d)} className={`px-3 py-1 rounded-full border ${active===d?'bg-gray-900 text-white':'hover:bg-gray-50'}`}>{d.replace('dia','Día ')}</button>
              ))}
            </nav>
          </div>
          <p className="text-sm text-gray-600 mt-2">Añade o elimina fotos en <code>/src/fotos/diaX/</code>. Descarga disponible por imagen.</p>
          <div className="mt-6 columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
            {items.length===0 ? (<div className="text-sm text-gray-500">(Sin fotos en la pestaña actual)</div>) : (items.map((it,i)=><PhotoCard key={i} item={it}/>))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="scroll-smooth text-gray-900">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="font-serif text-lg md:text-xl tracking-wide">Galicia 2025</div>
            <nav className="hidden md:flex gap-5 text-sm">
              {navItems.map(item=>(<a key={item.id} href={`#${item.id}`} className="hover:underline underline-offset-4">{item.label}</a>))}
            </nav>
          </div>
        </div>
        <div className="h-1 bg-gray-100"><div className="h-1 bg-gray-800 transition-all" style={{width:`${progress}%`}}/></div>
      </header>

      <main className="pt-20">
        <section id="portada" className="relative">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-12 gap-6 items-center min-h-[70vh]">
              <div className="md:col-span-7">
                <h1 className="font-serif text-4xl md:text-6xl leading-tight">Galicia 2025</h1>
                <p className="mt-4 text-lg md:text-xl text-gray-700">Subtítulo o lema del viaje — añade una frase evocadora aquí.</p>
                <p className="mt-6 max-w-prose text-gray-600">Breve resumen: ¿por qué este viaje? ¿Qué esperas que el lector encuentre? Puedes mencionar ciudades, naturaleza, gastronomía y cultura.</p>
              </div>
              <div className="md:col-span-5"><div className="aspect-[4/5] bg-gray-200 rounded-xl shadow-inner" aria-label="Imagen de portada" /></div>
            </div>
          </div>
        </section>

        <section id="indice" className="mt-16 md:mt-24 print:break-before-page">
          <div className="max-w-7xl mx-auto px-4">
            <div className="border-y py-8">
              <h2 className="font-serif text-2xl md:text-3xl">Índice</h2>
              <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                {navItems.slice(2).map((item,i)=>(
                  <a key={item.id} href={`#${item.id}`} className="group">
                    <div className="flex items-start gap-3 p-3 rounded-lg border hover:shadow-sm transition">
                      <span className="mt-0.5 text-sm tabular-nums w-8">{str(i+1).zfill(2)}</span>
                      <div><div className="font-medium group-hover:underline underline-offset-4">{item.label}</div><div className="text-xs text-gray-600">Descripción breve (opcional).</div></div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="introduccion" className="mt-16 md:mt-24">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="font-serif text-3xl">Introducción</h2>
            <p className="mt-4 leading-7 text-gray-700">Escribe aquí el contexto del viaje: la motivación, la ruta general y el tono que tendrá la revista. Añade anécdotas personales y expectativas.</p>
            <p className="mt-4 leading-7 text-gray-700">Consejo: incluye un pequeño mapa general o una línea de tiempo del recorrido.</p>
          </div>
        </section>

        <section id="dia1" className="print:break-before-page"><div className="max-w-7xl mx-auto px-4"><DaySection id="dia1" titulo="Día 1 — (Añade título)" timeline={[{hora:'09:00',titulo:'Salida',nota:'Inicio desde el alojamiento.'},{hora:'10:30',titulo:'Catedral',nota:'Visita guiada breve.'},{hora:'14:00',titulo:'Mercado',nota:'Pulpo y empanada.'},{hora:'18:00',titulo:'Paseo casco antiguo',nota:'Café y fotos.'},]} /></div></section>
        <section id="dia2" className="print:break-before-page"><div className="max-w-7xl mx-auto px-4"><DaySection id="dia2" titulo="Día 2 — (Añade título)" /></div></section>
        <section id="dia3" className="print:break-before-page"><div className="max-w-7xl mx-auto px-4"><DaySection id="dia3" titulo="Día 3 — (Añade título)" /></div></section>
        <section id="dia4" className="print:break-before-page"><div className="max-w-7xl mx-auto px-4"><DaySection id="dia4" titulo="Día 4 — (Añade título)" /></div></section>
        <section id="dia5" className="print:break-before-page"><div className="max-w-7xl mx-auto px-4"><DaySection id="dia5" titulo="Día 5 — (Añade título)" /></div></section>

        <section id="galeria" className="mt-16 md:mt-24 print:break-before-page">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h2 className="font-serif text-3xl">Galería — Todas las fotos</h2>
              <nav className="flex flex-wrap gap-2 text-sm">
                {['dia1','dia2','dia3','dia4','dia5'].map(d=>(<a key={d} href={`#${d}-galeria`} className="px-3 py-1 rounded-full border hover:bg-gray-50">{d.replace('dia','Día ')}</a>))}
              </nav>
            </div>
            <p className="text-sm text-gray-600 mt-2">Ve a la galería del día desde las pestañas o el índice.</p>
          </div>
        </section>

        <section id="creditos" className="mt-16 md:mt-24 mb-24">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="font-serif text-2xl">Créditos & Agradecimientos</h2>
            <div className="mt-4 grid sm:grid-cols-2 gap-6 text-sm text-gray-700">
              <div><div className="font-medium">Fotografía</div><p>Tu nombre aquí</p></div>
              <div><div className="font-medium">Textos</div><p>Tu nombre aquí</p></div>
              <div><div className="font-medium">Edición & Diseño</div><p>Tu nombre aquí</p></div>
              <div><div className="font-medium">Agradecimientos</div><p>Personas o lugares a mencionar</p></div>
            </div>
          </div>
        </section>
      </main>

      <a href="#portada" className="fixed bottom-6 right-6 inline-flex items-center justify-center w-11 h-11 rounded-full border shadow bg-white hover:shadow-md" aria-label="Volver arriba" title="Volver arriba">↑</a>

      <style jsx global>{`
        @media print {
          header { display: none; }
          a[href^="#"] { text-decoration: none; }
          .print\:break-before-page { break-before: page; }
        }
      `}</style>

      <footer className="border-t py-6 text-center text-xs text-gray-500">© {new Date().getFullYear()} — Galicia 2025 · Plantilla editorial</footer>
    </div>
  );
}
