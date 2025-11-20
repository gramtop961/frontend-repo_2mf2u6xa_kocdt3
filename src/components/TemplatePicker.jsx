import React from 'react'

function TemplateThumb({ id, active }) {
  const stroke = active ? '#ffffff' : '#334155'
  const fill = active ? '#0f172a' : '#e2e8f0'
  const nodeFill = active ? '#ffffff' : '#ffffff'
  const edge = active ? '#cbd5e1' : '#94a3b8'

  if (id === 'logo_brief') {
    // Stacked sections
    return (
      <svg viewBox="0 0 160 96" className="w-full h-24" aria-hidden>
        <rect x="0" y="0" width="160" height="96" rx="10" fill={fill} />
        {[12, 38, 64].map((y, i) => (
          <g key={i}>
            <rect x="16" y={y} width="128" height="16" rx="6" fill={nodeFill} />
            <circle cx="24" cy={y + 8} r="3" fill={edge} />
          </g>
        ))}
      </svg>
    )
  }

  if (id === 'brainstorm') {
    // Clustered bubbles
    return (
      <svg viewBox="0 0 160 96" className="w-full h-24" aria-hidden>
        <rect x="0" y="0" width="160" height="96" rx="10" fill={fill} />
        <g stroke={edge} strokeWidth="2">
          <line x1="80" y1="48" x2="36" y2="24" />
          <line x1="80" y1="48" x2="124" y2="24" />
          <line x1="80" y1="48" x2="32" y2="72" />
          <line x1="80" y1="48" x2="128" y2="72" />
        </g>
        <g>
          <circle cx="80" cy="48" r="14" fill={nodeFill} stroke={stroke} />
          <circle cx="36" cy="24" r="10" fill={nodeFill} stroke={stroke} />
          <circle cx="124" cy="24" r="10" fill={nodeFill} stroke={stroke} />
          <circle cx="32" cy="72" r="10" fill={nodeFill} stroke={stroke} />
          <circle cx="128" cy="72" r="10" fill={nodeFill} stroke={stroke} />
        </g>
      </svg>
    )
  }

  // classic: central with branches
  return (
    <svg viewBox="0 0 160 96" className="w-full h-24" aria-hidden>
      <rect x="0" y="0" width="160" height="96" rx="10" fill={fill} />
      <g stroke={edge} strokeWidth="2">
        <line x1="80" y1="48" x2="40" y2="16" />
        <line x1="80" y1="48" x2="120" y2="16" />
        <line x1="80" y1="48" x2="40" y2="80" />
        <line x1="80" y1="48" x2="120" y2="80" />
      </g>
      <g>
        <rect x="66" y="40" width="28" height="16" rx="6" fill={nodeFill} stroke={stroke} />
        <rect x="28" y="8" width="24" height="14" rx="5" fill={nodeFill} stroke={stroke} />
        <rect x="108" y="8" width="24" height="14" rx="5" fill={nodeFill} stroke={stroke} />
        <rect x="28" y="74" width="24" height="14" rx="5" fill={nodeFill} stroke={stroke} />
        <rect x="108" y="74" width="24" height="14" rx="5" fill={nodeFill} stroke={stroke} />
      </g>
    </svg>
  )
}

export default function TemplatePicker({ templates = [], value, onChange }) {
  if (!Array.isArray(templates) || templates.length === 0) {
    return <div className="text-slate-500">No templates available.</div>
  }
  return (
    <div id="templates" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {templates.map((tpl) => {
        const active = value === tpl.id
        return (
          <button
            key={tpl.id}
            onClick={() => onchangeSafe(onChange, tpl.id)}
            className={`group rounded-2xl border text-left transition hover:shadow focus:outline-none focus:ring-2 focus:ring-slate-400 ${
              active ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="p-4">
              <TemplateThumb id={tpl.id} active={active} />
              <div className="mt-3 font-semibold flex items-center justify-between">
                <span>{tpl.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${active ? 'bg-white/10' : 'bg-slate-100 text-slate-600'}`}>{tpl.id}</span>
              </div>
              {Array.isArray(tpl.branches) && (
                <div className={`mt-2 text-sm ${active ? 'text-slate-200' : 'text-slate-500'}`}>
                  {tpl.branches.slice(0, 4).join(' • ')}{tpl.branches.length > 4 ? '…' : ''}
                </div>
              )}
            </div>
          </button>
        )
      })}
    </div>
  )
}

function onchangeSafe(cb, v){
  try{ if(typeof cb==='function') cb(v) }catch(e){}
}
