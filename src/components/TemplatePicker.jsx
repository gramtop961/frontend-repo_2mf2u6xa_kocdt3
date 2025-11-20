import React from 'react'

export default function TemplatePicker({ templates = [], value, onChange }) {
  if (!Array.isArray(templates) || templates.length === 0) {
    return <div className="text-slate-500">No templates available.</div>
  }
  return (
    <div id="templates" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {templates.map((tpl) => (
        <button
          key={tpl.id}
          onClick={() => onchangeSafe(onChange, tpl.id)}
          className={`group rounded-xl border p-4 text-left transition hover:shadow ${
            value === tpl.id ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="font-semibold">{tpl.name}</div>
          {Array.isArray(tpl.branches) && (
            <div className={`mt-2 text-sm ${value === tpl.id ? 'text-slate-200' : 'text-slate-500'}`}>
              {tpl.branches.slice(0, 4).join(' • ')}{tpl.branches.length > 4 ? '…' : ''}
            </div>
          )}
        </button>
      ))}
    </div>
  )
}

function onchangeSafe(cb, v){
  try{ if(typeof cb==='function') cb(v) }catch(e){}
}
