// Galicia 2025 — Producción con "Día 1" relleno de ejemplo
import { useEffect, useState } from "react";

export default function Galicia2025Revista() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      setProgress(scrolled);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const sections = [
    { id: "portada", label: "Portada" },
    { id: "indice", label: "Índice" },
    { id: "prologo", label: "Prólogo" },
    { id: "dias", label: "Días" },
    { id: "itinerario", label: "Itinerario" },
    { id: "destinos", label: "Destinos" },
    { id: "sabores", label: "Sabores" },
    { id: "momentos", label: "Momentos" },
    { id: "galeria", label: "Galería" },
    { id: "mapa", label: "Mapa" },
    { id: "creditos", label: "Créditos" },
  ];

  return (
    <div className="scroll-smooth text-slate-900">
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            <a href="#portada" className="font-serif text-lg md:text-xl tracking-wide text-slate-800">
              Galicia 2025
            </a>
            <nav className="md:hidden overflow-x-auto no-scrollbar flex gap-3">
              {sections.slice(2).map((s) => (
                <a key={s.id} href={`#${s.id}`} className="shrink-0 px-3 py-1 rounded-full border text-sm hover:bg-slate-50">
                  {s.label}
                </a>
              ))}
            </nav>
            <nav className="hidden md:flex gap-6 text-sm">
              {sections.map((s) => (
                <a key={s.id} href={`#${s.id}`} className="hover:underline underline-offset-4">
                  {s.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
        <div className="h-1 bg-slate-100">
          <div className="h-1 bg-emerald-600 transition-all" style={{ width: `${progress}%` }} />
        </div>
      </header>

      <main className="pt-16">
        {/* PORTADA */}
        <section id="portada" className="relative min-h-[88vh] grid place-items-center">
          <div className="absolute inset-0 bg-slate-900">
            <div className="w-full h-full bg-[url('/fotos/Galicia.jpg')] bg-contain bg-center bg-no-repeat" />
          </div>
          <div className="absolute inset-0 bg-slate-900/40" />
          <div className="relative max-w-4xl mx-auto px-6 text-center text-white">
            <h1 className="font-serif text-5xl md:text-7xl leading-tight">Galicia 2025</h1>
            <p className="mt-4 text-lg md:text-xl text-slate-100">Costa, bosques y piedra. Un viaje por lugares, sabores y gentes.</p>
          </div>
          <a href="#indice" className="absolute bottom-6 inline-flex items-center gap-2 text-slate-100 text-sm">
            ↓ Explorar
          </a>
        </section>

        {/* LAYOUT */}
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-8 px-4 md:px-6 mt-12">
          {/* ÍNDICE LATERAL */}
          <aside id="indice" className="hidden md:block md:col-span-3">
            <div className="sticky top-24 space-y-1">
              <div className="text-xs uppercase tracking-widest text-slate-500">Índice</div>
              {sections.slice(2).map((s, i) => (
                <a key={s.id} href={`#${s.id}`} className="block py-2 px-3 rounded-lg hover:bg-slate-50">
                  <span className="mr-2 text-slate-400 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                  {s.label}
                </a>
              ))}
            </div>
          </aside>

          {/* CONTENIDO */}
          <div className="md:col-span-9 space-y-20">
            {/* PRÓLOGO */}
            <section id="prologo">
              <h2 className="font-serif text-4xl text-slate-800">Prólogo</h2>
              <p className="mt-4 leading-7 text-slate-700 max-w-prose">
                Presenta el espíritu del viaje: qué te llevó a Galicia, qué esperas
                transmitir al lector y cómo está organizada esta revista.
              </p>
              <blockquote className="mt-6 border-l-4 border-emerald-600 pl-4 italic text-slate-700">
                “Añade aquí una cita o pensamiento que resuma tu experiencia.”
              </blockquote>
            </section>

            {/* DÍAS */}
            <section id="dias">
              <h2 className="font-serif text-4xl text-slate-800">Días del viaje</h2>
              <p className="mt-2 text-slate-600">Cada día incluye mapa, timeline, destinos, sabores, momentos y galería.</p>

              <div className="mt-8 space-y-16">
                {/* DÍA 1 — EJEMPLO RELLENO */}
                <article id="dia1" className="border rounded-2xl p-5 md:p-6">
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <h3 className="font-serif text-3xl text-slate-800">Día 1 — Santiago de Compostela</h3>
                    <nav className="flex flex-wrap gap-2 text-sm">
                      <a href="#dia1-mapa" className="px-3 py-1 rounded-full border hover:bg-slate-50">Mapa</a>
                      <a href="#dia1-timeline" className="px-3 py-1 rounded-full border hover:bg-slate-50">Timeline</a>
                      <a href="#dia1-destinos" className="px-3 py-1 rounded-full border hover:bg-slate-50">Destinos</a>
                      <a href="#dia1-sabores" className="px-3 py-1 rounded-full border hover:bg-slate-50">Sabores</a>
                      <a href="#dia1-momentos" className="px-3 py-1 rounded-full border hover:bg-slate-50">Momentos</a>
                      <a href="#dia1-galeria" className="px-3 py-1 rounded-full border hover:bg-slate-50">Galería</a>
                    </nav>
                  </div>

                  {/* MAPA */}
                  <section id="dia1-mapa" className="mt-6">
                    <h4 className="font-serif text-2xl text-slate-800">Mapa</h4>
                    <div className="mt-3 aspect-video rounded-xl overflow-hidden border">
                      {/* Ejemplo con Google Maps (puedes reemplazar por tu My Maps) */}
                      <iframe
                        src="https://www.google.com/maps?q=Catedral+de+Santiago+de+Compostela&output=embed"
                        className="w-full h-full"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Mapa Santiago"
                      />
                    </div>
                  </section>

                  {/* TIMELINE */}
                  <section id="dia1-timeline" className="mt-8">
                    <h4 className="font-serif text-2xl text-slate-800">Timeline</h4>
                    <ol className="mt-4 relative border-s-2 border-emerald-200 ps-6 space-y-6">
                      {[
                        { hora: "10:00", titulo: "Plaza del Obradoiro", desc: "Llegada y primera vista de la Catedral." },
                        { hora: "12:00", titulo: "Mercado de Abastos", desc: "Tapas y ambiente local." },
                        { hora: "17:30", titulo: "Parque de la Alameda", desc: "Paseo al atardecer con vistas." },
                      ].map((h, i) => (
                        <li key={i} className="relative">
                          <span className="absolute -start-3 top-1.5 w-5 h-5 rounded-full bg-white border-2 border-emerald-600" />
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <div>
                              <div className="font-medium">{h.titulo}</div>
                              <p className="text-slate-700">{h.desc}</p>
                            </div>
                            <time className="text-sm text-emerald-700">{h.hora}</time>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </section>

                  {/* DESTINOS */}
                  <section id="dia1-destinos" className="mt-8">
                    <h4 className="font-serif text-2xl text-slate-800">Destinos</h4>
                    <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[
                        { nombre: "Catedral de Santiago", img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800&auto=format&fit=crop", nota: "Fachada del Obradoiro, imprescindible." },
                        { nombre: "Mercado de Abastos", img: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=800&auto=format&fit=crop", nota: "Productos frescos y tapas." },
                        { nombre: "Parque de la Alameda", img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=800&auto=format&fit=crop", nota: "Vistas a la ciudad desde el paseo." },
                      ].map((d, i) => (
                        <article key={i} className="border rounded-xl overflow-hidden">
                          <img src={d.img} alt={d.nombre} className="w-full h-48 object-cover" />
                          <div className="p-3">
                            <div className="font-serif text-lg">{d.nombre}</div>
                            <p className="text-sm text-slate-700 mt-1">{d.nota}</p>
                          </div>
                        </article>
                      ))}
                    </div>
                  </section>

                  {/* SABORES */}
                  <section id="dia1-sabores" className="mt-8">
                    <h4 className="font-serif text-2xl text-slate-800">Sabores</h4>
                    <div className="mt-4 grid md:grid-cols-12 gap-4">
                      <div className="md:col-span-7">
                        <img
                          src="https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1200&auto=format&fit=crop"
                          alt="Pulpo a la gallega"
                          className="w-full h-full object-cover rounded-lg aspect-video"
                        />
                      </div>
                      <div className="md:col-span-5">
                        <div className="font-medium">Pulpo a la gallega</div>
                        <p className="text-slate-700 mt-1">
                          Clásico imprescindible. Busca pulpeiras tradicionales y acompáñalo con cachelos.
                        </p>
                        <ul className="text-sm text-slate-700 list-disc list-inside mt-2">
                          <li>Taberna recomendada</li>
                          <li>Postre: Tarta de Santiago</li>
                          <li>Bebida: Albariño</li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  {/* MOMENTOS */}
                  <section id="dia1-momentos" className="mt-8">
                    <h4 className="font-serif text-2xl text-slate-800">Momentos</h4>
                    <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[
                        { alt: "Músico callejero", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop", pie: "Música en la Rúa do Vilar." },
                        { alt: "Peregrinos", img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop", pie: "Llegada de peregrinos a la plaza." },
                        { alt: "Piedra mojada", img: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=800&auto=format&fit=crop", pie: "Lluvia fina y brillo en la piedra." },
                      ].map((m, i) => (
                        <figure key={i} className="border rounded-xl overflow-hidden">
                          <img src={m.img} alt={m.alt} className="w-full h-64 object-cover" />
                          <figcaption className="p-2 text-sm text-slate-700">{m.pie}</figcaption>
                        </figure>
                      ))}
                    </div>
                    <audio controls className="mt-4 w-full">
                      <source src="/audios/dia1-nota.mp3" type="audio/mpeg" />
                      Tu navegador no soporta audio.
                    </audio>
                  </section>

                  {/* GALERÍA */}
                  <section id="dia1-galeria" className="mt-8">
                    <h4 className="font-serif text-2xl text-slate-800">Galería</h4>
                    <div className="mt-3 columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
                      {[
                        "/fotos/dia1-1.jpg",
                        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1200&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1200&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1200&auto=format&fit=crop",
                      ].map((src, i) => (
                        <img key={i} src={src} alt={`Día 1 ${i+1}`} className="mb-4 rounded-lg break-inside-avoid" />
                      ))}
                    </div>
                  </section>
                </article>

                {/* DÍA 2 — Plantilla vacía para que la completes */}
                <article id="dia2" className="border rounded-2xl p-5 md:p-6">
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <h3 className="font-serif text-3xl text-slate-800">Día 2 — (Ciudad / Lugar)</h3>
                    <nav className="flex flex-wrap gap-2 text-sm">
                      <a href="#dia2-mapa" className="px-3 py-1 rounded-full border hover:bg-slate-50">Mapa</a>
                      <a href="#dia2-timeline" className="px-3 py-1 rounded-full border hover:bg-slate-50">Timeline</a>
                      <a href="#dia2-destinos" className="px-3 py-1 rounded-full border hover:bg-slate-50">Destinos</a>
                      <a href="#dia2-sabores" className="px-3 py-1 rounded-full border hover:bg-slate-50">Sabores</a>
                      <a href="#dia2-momentos" className="px-3 py-1 rounded-full border hover:bg-slate-50">Momentos</a>
                      <a href="#dia2-galeria" className="px-3 py-1 rounded-full border hover:bg-slate-50">Galería</a>
                    </nav>
                  </div>
                  <section id="dia2-mapa" className="mt-6"><h4 className="font-serif text-2xl">Mapa</h4><div className="mt-3 aspect-video rounded-xl overflow-hidden border" /></section>
                  <section id="dia2-timeline" className="mt-8"><h4 className="font-serif text-2xl">Timeline</h4></section>
                  <section id="dia2-destinos" className="mt-8"><h4 className="font-serif text-2xl">Destinos</h4></section>
                  <section id="dia2-sabores" className="mt-8"><h4 className="font-serif text-2xl">Sabores</h4></section>
                  <section id="dia2-momentos" className="mt-8"><h4 className="font-serif text-2xl">Momentos</h4></section>
                  <section id="dia2-galeria" className="mt-8"><h4 className="font-serif text-2xl">Galería</h4></section>
                </article>

                {/* DÍA 3 — Plantilla vacía */}
                <article id="dia3" className="border rounded-2xl p-5 md:p-6">
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <h3 className="font-serif text-3xl text-slate-800">Día 3 — (Ciudad / Lugar)</h3>
                    <nav className="flex flex-wrap gap-2 text-sm">
                      <a href="#dia3-mapa" className="px-3 py-1 rounded-full border hover:bg-slate-50">Mapa</a>
                      <a href="#dia3-timeline" className="px-3 py-1 rounded-full border hover:bg-slate-50">Timeline</a>
                      <a href="#dia3-destinos" className="px-3 py-1 rounded-full border hover:bg-slate-50">Destinos</a>
                      <a href="#dia3-sabores" className="px-3 py-1 rounded-full border hover:bg-slate-50">Sabores</a>
                      <a href="#dia3-momentos" className="px-3 py-1 rounded-full border hover:bg-slate-50">Momentos</a>
                      <a href="#dia3-galeria" className="px-3 py-1 rounded-full border hover:bg-slate-50">Galería</a>
                    </nav>
                  </div>
                  <section id="dia3-mapa" className="mt-6"><h4 className="font-serif text-2xl">Mapa</h4><div className="mt-3 aspect-video rounded-xl overflow-hidden border" /></section>
                  <section id="dia3-timeline" className="mt-8"><h4 className="font-serif text-2xl">Timeline</h4></section>
                  <section id="dia3-destinos" className="mt-8"><h4 className="font-serif text-2xl">Destinos</h4></section>
                  <section id="dia3-sabores" className="mt-8"><h4 className="font-serif text-2xl">Sabores</h4></section>
                  <section id="dia3-momentos" className="mt-8"><h4 className="font-serif text-2xl">Momentos</h4></section>
                  <section id="dia3-galeria" className="mt-8"><h4 className="font-serif text-2xl">Galería</h4></section>
                </article>
              </div>
            </section>

            {/* Otras secciones globales (puedes dejarlas o eliminarlas) */}
            <section id="itinerario">
              <h2 className="font-serif text-4xl text-slate-800">Itinerario</h2>
              <p className="mt-2 text-slate-600">Resumen por días/etapas.</p>
            </section>

            <section id="destinos">
              <h2 className="font-serif text-4xl text-slate-800">Destinos</h2>
            </section>

            <section id="sabores">
              <h2 className="font-serif text-4xl text-slate-800">Sabores</h2>
            </section>

            <section id="momentos">
              <h2 className="font-serif text-4xl text-slate-800">Momentos y Gente</h2>
            </section>

            <section id="galeria">
              <h2 className="font-serif text-4xl text-slate-800">Galería</h2>
            </section>

            <section id="mapa">
              <h2 className="font-serif text-4xl text-slate-800">Mapa del recorrido</h2>
            </section>

            <section id="creditos" className="pb-16">
              <h2 className="font-serif text-3xl text-slate-800">Créditos & Agradecimientos</h2>
            </section>
          </div>
        </div>
      </main>

      <a href="#portada" className="fixed bottom-6 right-6 inline-flex items-center justify-center w-11 h-11 rounded-full border shadow bg-white hover:shadow-md" aria-label="Volver arriba">↑</a>

      <footer className="border-t py-6 text-center text-xs text-slate-500 mt-16">
        © {new Date().getFullYear()} — Galicia 2025 · Producción
      </footer>
    </div>
  );
}
