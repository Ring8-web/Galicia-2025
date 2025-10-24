import { useEffect, useState } from 'react'
import DaySection from '../components/DaySection'

const VERSION = import.meta.env.VITE_BUILD_ID || ''

export default function Galicia2025(){
  const [progress,setProgress]=useState(0)
  useEffect(()=>{const onScroll=()=>{const h=document.documentElement;setProgress((h.scrollTop/(h.scrollHeight-h.clientHeight))*100)};window.addEventListener('scroll',onScroll);return()=>window.removeEventListener('scroll',onScroll)},[])

  const nav=[
    {id:'portada',label:'Portada'},
    {id:'indice',label:'Índice'},
    {id:'introduccion',label:'Introducción'},
    {id:'dia1',label:'Día 1'},
    {id:'dia2',label:'Día 2'},
    {id:'dia3',label:'Día 3'},
    {id:'dia4',label:'Día 4'},
    {id:'dia5',label:'Día 5'},
  ]

  const dia1FotosBase=['/fotos/dia1-1.jpg','/fotos/dia1-2.jpg','/fotos/dia1-3.jpg','/fotos/dia1-4.jpg','/fotos/dia1-5.jpg','/fotos/dia1-6.jpg']
  const dia1Fotos=dia1FotosBase.map(p=>({src:`${p}?v=${VERSION}`, href:p, name:p.split('/').pop()}))
  const dia1Timeline=[
    {hora:'09:00', titulo:'Salida', nota:'Inicio desde el alojamiento.'},
    {hora:'10:30', titulo:'Catedral', nota:'Visita guiada breve.'},
    {hora:'14:00', titulo:'Mercado', nota:'Pulpo y empanada.'},
    {hora:'18:00', titulo:'Paseo casco antiguo', nota:'Café y fotos.'},
  ]

  return (
    <div className='scroll-smooth text-slate-900'>
      <header className='fixed top-0 inset-x-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur'>
        <div className='max-w-7xl mx-auto px-4'>
          <div className='h-16 flex items-center justify-between'>
            <a href='#portada' className='font-serif text-lg md:text-xl tracking-wide'>Galicia 2025</a>
            <nav className='hidden md:flex gap-6 text-sm'>
              {nav.map(n=><a key={n.id} href={`#${n.id}`} className='hover:underline underline-offset-4'>{n.label}</a>)}
            </nav>
          </div>
        </div>
        <div className='h-1 bg-slate-100'><div className='h-1 bg-emerald-600 transition-all' style={{width:`${progress}%`}}/></div>
      </header>

      <main className='pt-16'>
        <section id='portada' className='relative min-h-[64vh] grid place-items-center'>
          <div className='absolute inset-0 bg-slate-900'/>
          <div className='relative max-w-4xl mx-auto px-6 text-center text-white'>
            <h1 className='font-serif text-5xl md:text-7xl leading-tight'>Galicia 2025</h1>
            <p className='mt-4 text-lg md:text-xl text-slate-100'>Revista clásica de viajes · scroll vertical</p>
          </div>
          <a href='#indice' className='absolute bottom-6 inline-flex items-center gap-2 text-slate-100 text-sm'>↓ Explorar</a>
        </section>

        <section id='indice' className='max-w-7xl mx-auto px-4 md:px-6 mt-12'>
          <h2 className='font-serif text-3xl'>Índice</h2>
          <ul className='mt-4 grid sm:grid-cols-2 md:grid-cols-4 gap-3 text-sm'>
            {nav.slice(2).map((n,i)=>(
              <li key={n.id} className='p-3 rounded-lg border hover:bg-slate-50'>
                <a href={`#${n.id}`}><span className='text-slate-400 tabular-nums mr-2'>{String(i+1).padStart(2,'0')}</span>{n.label}</a>
              </li>
            ))}
          </ul>
        </section>

        <section id='introduccion' className='max-w-3xl mx-auto px-4 md:px-6 mt-16'>
          <h2 className='font-serif text-3xl'>Introducción</h2>
          <p className='mt-3 text-slate-700'>Escribe aquí la motivación del viaje, la ruta general y el tono de tu revista.</p>
        </section>

        <DaySection id='dia1' titulo='Día 1 — (Ciudad/Lugar)' timeline={dia1Timeline} fotos={dia1Fotos} audio={`/audios/dia1-nota.mp3?v=${VERSION}`} version={VERSION} />
        <DaySection id='dia2' titulo='Día 2 — (Añade título)' timeline={[]} fotos={[]} version={VERSION} />
        <DaySection id='dia3' titulo='Día 3 — (Añade título)' timeline={[]} fotos={[]} version={VERSION} />
        <DaySection id='dia4' titulo='Día 4 — (Añade título)' timeline={[]} fotos={[]} version={VERSION} />
        <DaySection id='dia5' titulo='Día 5 — (Añade título)' timeline={[]} fotos={[]} version={VERSION} />
      </main>

      <a href='#portada' className='fixed bottom-6 right-6 inline-flex items-center justify-center w-11 h-11 rounded-full border shadow bg-white hover:shadow-md' aria-label='Volver arriba'>↑</a>

      <footer className='border-t py-6 text-center text-xs text-slate-500 mt-8'>© {new Date().getFullYear()} — Galicia 2025</footer>
    </div>
  )
}
