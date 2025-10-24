export default function Timeline({items=[]}){
  return (<ol className="relative border-s border-slate-200 pl-6 space-y-4">
    {items.map((it,i)=>(<li key={i} className="relative">
      <span className="absolute -left-2 top-1.5 w-3 h-3 rounded-full bg-emerald-600"></span>
      <div className="text-sm text-slate-500">{it.hora}</div>
      <div className="font-medium">{it.titulo}</div>
      {it.nota && <p className="text-sm text-slate-600">{it.nota}</p>}
    </li>))}
  </ol>)
}