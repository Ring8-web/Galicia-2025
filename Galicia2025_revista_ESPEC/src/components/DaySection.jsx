import Timeline from './Timeline'

export default function DaySection({ id, titulo, timeline=[], fotos=[], audio=null, version='' }){
  return (
    <section id={id} className="max-w-7xl mx-auto px-4 md:px-6 mt-16 pb-16 print:break-before-page">
      <header className="flex items-center justify-between flex-wrap gap-3">
        <h3 className="font-serif text-3xl">{titulo}</h3>
        <nav className="flex flex-wrap gap-2 text-sm">
          <a href={`#${id}-mapa`} className="px-3 py-1 rounded-full border hover:bg-slate-50">Mapa</a>
          <a href={`#${id}-timeline`} className="px-3 py-1 rounded-full border hover:bg-slate-50">Timeline</a>
          <a href={`#${id}-destinos`} className="px-3 py-1 rounded-full border hover:bg-slate-50">Destinos</a>
          <a href={`#${id}-sabores`} className="px-3 py-1 rounded-full border hover:bg-slate-50">Sabores</a>
          <a href={`#${id}-momentos`} className="px-3 py-1 rounded-full border hover:bg-slate-50">Momentos</a>
          <a href={`#${id}-galeria`} className="px-3 py-1 rounded-full border hover:bg-slate-50">Galería</a>
          {audio && <a href={`#${id}-audio`} className="px-3 py-1 rounded-full border hover:bg-slate-50">Audio</a>}
        </nav>
      </header>

      <section id={`${id}-mapa`} className="mt-8">
        <h4 className="font-serif text-2xl">Mapa</h4>
        <div className="mt-3 aspect-video bg-slate-100 rounded-lg grid place-items-center text-slate-500">
          <div className="text-center text-sm">
            Pon el mapa en <code>{`/fotos/${id}-mapa.jpg`}</code> y sustitúyelo por una etiqueta &lt;img src={`/fotos/${id}-mapa.jpg?v=${version}`} /&gt; si quieres.
          </div>
        </div>
      </section>

      <section id={`${id}-timeline`} className="mt-10">
        <h4 className="font-serif text-2xl">Timeline</h4>
        <div className="mt-3"><Timeline items={timeline} /></div>
      </section>

      <section id={`${id}-destinos`} className="mt-10">
        <h4 className="font-serif text-2xl">Destinos</h4>
        <div className="mt-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3].map(i=>(
            <article key={i} className="border rounded-xl overflow-hidden">
              <div className="aspect-[4/3] bg-slate-100" />
              <div className="p-4">
                <h5 className="font-serif text-lg">Lugar #{i}</h5>
                <p className="mt-2 text-sm text-slate-700">Descripción breve, impresiones y recomendaciones.</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id={`${id}-sabores`} className="mt-10">
        <h4 className="font-serif text-2xl">Sabores</h4>
        <div className="mt-3 grid md:grid-cols-12 gap-6">
          <div className="md:col-span-7">
            <div className="aspect-video bg-slate-100 rounded-lg" />
          </div>
          <div className="md:col-span-5">
            <h5 className="font-medium text-lg">Plato/experiencia</h5>
            <p className="mt-2 text-slate-700 text-sm">Describe sabores, lugares y recomendaciones.</p>
            <ul className="mt-2 list-disc list-inside text-sm text-slate-700">
              <li>Restaurante #1</li>
              <li>Taberna #2</li>
              <li>Mercado #3</li>
            </ul>
          </div>
        </div>
      </section>

      <section id={`${id}-momentos`} className="mt-10">
        <h4 className="font-serif text-2xl">Momentos</h4>
        <p className="mt-2 text-slate-700 text-sm">Anécdotas y pequeñas historias del día.</p>
        <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3].map(i=>(
            <figure key={i} className="border rounded-xl overflow-hidden">
              <div className="aspect-square bg-slate-100" />
              <figcaption className="p-3 text-sm text-slate-700">Pie de foto #{i}.</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id={`${id}-galeria`} className="mt-10">
        <h4 className="font-serif text-2xl">Galería</h4>
        <p className="text-sm text-slate-500 mt-1">Desde <code>/fotos/</code>, con descarga por imagen.</p>
        <div className="mt-3 columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
          {fotos.map((f,i)=>(
            <a key={i} href={f.href} download={f.name} className="group relative mb-4 block rounded-lg overflow-hidden break-inside-avoid">
              <img src={f.src} alt={`${titulo} ${i+1}`} loading="lazy" className="w-full h-auto" onError={(e)=>{e.currentTarget.style.opacity='0.35'; e.currentTarget.alt='No encontrada';}}/>
              <span className="pointer-events-none absolute bottom-2 right-2 text-xs px-2 py-1 rounded-md bg-black/60 text-white opacity-0 group-hover:opacity-100 transition">Descargar</span>
            </a>
          ))}
        </div>
      </section>

      {audio && (
        <section id={`${id}-audio`} className="mt-10">
          <h4 className="font-serif text-2xl">Audio</h4>
          <audio controls className="mt-2 w-full">
            <source src={audio} type="audio/mpeg" />
          </audio>
        </section>
      )}
    </section>
  )
}
