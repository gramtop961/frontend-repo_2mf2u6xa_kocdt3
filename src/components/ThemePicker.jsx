import React from 'react'

export default function ThemePicker({ themes = [], value, onChange }) {
  if (!Array.isArray(themes) || themes.length === 0) {
    return <div className="text-slate-500">No themes available.</div>
  }
  return (
    <div className="flex flex-wrap gap-3">
      {themes.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange && onChange(t.id)}
          className={`rounded-xl border px-4 py-2 text-sm transition ${
            value === t.id
              ? 'border-slate-900 bg-slate-900 text-white'
              : 'border-slate-200 hover:border-slate-300 text-slate-700'
          }`}
          style={{ backgroundColor: value === t.id ? undefined : t.background, color: value === t.id ? undefined : t.text }}
        >
          {t.name}
        </button>
      ))}
    </div>
  )
}
