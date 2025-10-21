import { useEffect, useState } from 'react'
import Timeline from '../components/Timeline'
const VERSION = import.meta.env.VITE_BUILD_ID || ''
export default function Galicia2025Revista(){
 const [progress,setProgress]=useState(0)
 useEffect(()=>{const onScroll=()=>{const h=document.documentElement;setProgress((h.scrollTop/(h.scrollHeight-h.clientHeight))*100)};window.addEventListener('scroll',onScroll);return()=>window.removeEventListener('scroll',onScroll)},[])
 const timelineDia1=[{hora:'09:00',titulo:'Salida',nota:'Inicio desde el alojamiento.'},{hora:'10:30',titulo:'Catedral',nota:'Visita guiada breve.'},{hora:'14:00',titulo:'Mercado',nota:'Pulpo y empanada.'},{hora:'18:00',titulo:'Paseo casco antiguo',nota:'Café y fotos.'}]
 const fotosBase=['/fotos/dia1-1.jpg','/fotos/dia1-2.jpg','/fotos/dia1-3.jpg','/fotos/dia1-4.jpg','/fotos/dia1-5.jpg','/fotos/dia1-6.jpg']
 const fotos=fotosBase.map(p=>({src:`${p}?v=${VERSION}`,href:p,name:p.split('/').pop()}))
 return(<div className='scroll-smooth text-slate-900'>
 <header className='fixed top-0 inset-x-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur'>
   <div className='max-w-7xl mx-auto px-4'><div className='h-16 flex items-center justify-between'>
     <a href='#portada' className='font-serif text-lg md:text-xl tracking-wide'>Galicia 2025</a>
   </div></div><div className='h-1 bg-slate-100'><div className='h-1 bg-emerald-600 transition-all' style={{width:`${progress}%`}}/></div>
 </header>
 <main className='pt-16'>
   <section id='portada' className='relative min-h-[70vh] grid place-items-center'>
     <div className='absolute inset-0 bg-slate-900'/><div className='relative max-w-4xl mx-auto px-6 text-center text-white'>
     <h1 className='font-serif text-5xl md:text-7xl leading-tight'>Galicia 2025</h1><p className='mt-4 text-lg md:text-xl text-slate-100'>Revista visual scroll vertical</p></div></section>
   <section id='dia1' className='max-w-7xl mx-auto px-4 mt-12'>
     <h4 className='font-serif text-2xl'>Galería Día 1 (Descargable)</h4>
     <div className='mt-3 columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]'>
       {fotos.map((f,i)=>(<a key={i} href={f.href} download={f.name} className='group relative mb-4 block rounded-lg overflow-hidden break-inside-avoid' aria-label={`Descargar ${f.name}`} title={`Descargar ${f.name}`}>
         <img src={f.src} alt={`Día 1 ${i+1}`} loading='lazy' className='w-full h-auto' onError={e=>{e.currentTarget.style.opacity='0.35';e.currentTarget.alt='No encontrada';}}/>
         <span className='pointer-events-none absolute bottom-2 right-2 text-xs px-2 py-1 rounded-md bg-black/60 text-white opacity-0 group-hover:opacity-100 transition'>Descargar</span>
       </a>))}
     </div>
   </section>
 </main>
 <footer className='border-t py-6 text-center text-xs text-slate-500 mt-8'>© {new Date().getFullYear()} — Galicia 2025</footer>
</div>) }
