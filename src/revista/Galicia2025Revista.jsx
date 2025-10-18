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

  const navItems = [
    { id: "portada", label: "Portada" },
    { id: "indice", label: "Índice" },
    { id: "introduccion", label: "Introducción" },
    { id: "mapa", label: "Mapa del Recorrido" },
    { id: "timeline", label: "Línea de Tiempo" },
    { id: "destinos", label: "Destinos" },
    { id: "sabores", label: "Sabores de Galicia" },
    { id: "momentos", label: "Momentos y Gente" },
    { id: "galeria", label: "Galería" },
    { id: "conclusion", label: "Conclusión" },
    { id: "creditos", label: "Créditos" },
  ];

  return (
    <div className="scroll-smooth text-gray-900">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="font-serif text-lg md:text-xl tracking-wide text-emerald-800">Galicia 2025</div>
            <nav className="hidden md:flex gap-5 text-sm">
              {navItems.map((item) => (
                <a key={item.id} href={`#${item.id}`} className="hover:underline underline-offset-4">
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
        <div className="h-1 bg-gray-100">
          <div className="h-1 bg-emerald-700 transition-all" style={{ width: `${progress}%` }} />
        </div>
      </header>

      <main className="pt-20">
        <section id="portada" className="relative">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-12 gap-6 items-center min-h-[70vh]">
              <div className="md:col-span-7">
                <h1 className="font-serif text-4xl md:text-6xl leading-tight text-emerald-800">Galicia 2025</h1>
                <p className="mt-4 text-lg md:text-xl text-gray-700">Subtítulo o lema del viaje — añade una frase evocadora aquí.</p>
              </div>
              <div className="md:col-span-5">
                <div className="aspect-[4/5] bg-gray-200 rounded-xl shadow-inner" aria-label="Imagen de portada"></div>
              </div>
            </div>
          </div>
        </section>

        <section id="indice" className="mt-16 md:mt-24 print:break-before-page">
          <div className="max-w-6xl mx-auto px-4">
            <div className="border-y py-8">
              <h2 className="font-serif text-2xl md:text-3xl text-emerald-800">Índice</h2>
              <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                {navItems.slice(2).map((item, i) => (
                  <a key={item.id} href={`#${item.id}`} className="group">
                    <div className="flex items-start gap-3 p-3 rounded-lg border hover:shadow-sm transition">
                      <span className="mt-0.5 text-sm tabular-nums w-8">{String(i + 1).padStart(2, "0")}</span>
                      <div>
                        <div className="font-medium text-emerald-800 group-hover:underline underline-offset-4">{item.label}</div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="introduccion" className="mt-16 md:mt-24">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="font-serif text-3xl text-emerald-800">Introducción</h2>
            <p className="mt-4 leading-7 text-gray-700">Describe la motivación y el contexto del viaje.</p>
          </div>
        </section>

        <section id="mapa" className="mt-16 md:mt-24">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="font-serif text-3xl text-emerald-800">Mapa del Recorrido</h2>
            <div className="mt-6 aspect-video rounded-lg overflow-hidden border" aria-label="Mapa embebido">
              <div className="w-full h-full bg-gray-100 grid place-content-center text-sm text-gray-600">Añade aquí el iframe del mapa</div>
            </div>
          </div>
        </section>

        <section id="timeline" className="mt-16 md:mt-24">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="font-serif text-3xl text-emerald-800">Línea de tiempo</h2>
            <ol className="mt-8 relative border-s-2 border-emerald-200 ps-6 space-y-8">
              {[1, 2, 3].map((dia) => (
                <li key={dia} className="relative">
                  <span className="absolute -start-3 top-1.5 w-5 h-5 rounded-full bg-white border-2 border-emerald-600" />
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <h3 className="font-serif text-xl text-emerald-700">Día {dia} — Ciudad / Lugar</h3>
                      <p className="text-gray-700">Resumen breve de la jornada.</p>
                    </div>
                    <time className="text-sm text-emerald-700">Fecha</time>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="destinos" className="mt-16 md:mt-24 print:break-before-page">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="font-serif text-3xl text-emerald-800">Destinos</h2>
            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, idx) => (
                <article key={idx} className="border rounded-xl overflow-hidden group">
                  <div className="aspect-[4/3] bg-gray-200" aria-label="Foto del destino"></div>
                  <div className="p-4">
                    <h3 className="font-serif text-xl text-emerald-800">Nombre del destino</h3>
                    <p className="mt-2 text-sm leading-6 text-gray-700">Descripción breve.</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="sabores" className="mt-16 md:mt-24">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="font-serif text-3xl text-emerald-800">Sabores de Galicia</h2>
          </div>
        </section>

        <section id="momentos" className="mt-16 md:mt-24">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="font-serif text-3xl text-emerald-800">Momentos y Gente</h2>
          </div>
        </section>

        <section id="galeria" className="mt-16 md:mt-24">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="font-serif text-3xl text-emerald-800">Galería</h2>
          </div>
        </section>

        <section id="conclusion" className="mt-16 md:mt-24 print:break-before-page">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="font-serif text-3xl text-emerald-800">Conclusión</h2>
            <p className="mt-4 text-gray-700 leading-7">Cierra la revista con reflexiones y aprendizajes del viaje.</p>
          </div>
        </section>

        <section id="creditos" className="mt-16 md:mt-24 mb-24">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="font-serif text-2xl text-emerald-800">Créditos & Agradecimientos</h2>
          </div>
        </section>
      </main>

      <a href="#portada" className="fixed bottom-6 right-6 inline-flex items-center justify-center w-11 h-11 rounded-full border shadow bg-white hover:shadow-md" aria-label="Volver arriba">↑</a>

      <footer className="border-t py-6 text-center text-xs text-gray-500">© {new Date().getFullYear()} — Galicia 2025 · Plantilla editorial</footer>
    </div>
  );
}
