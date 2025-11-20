import React from 'react'

function NodeBadge({ level }) {
  const labels = ['Subject', 'Topic', 'Detail']
  const bg = ['bg-slate-800 text-white', 'bg-slate-100 text-slate-700', 'bg-slate-50 text-slate-600']
  return (
    <span className={`ml-2 inline-block text-[10px] px-2 py-0.5 rounded-full ${bg[level] || bg[2]}`}>{labels[level] || 'Node'}</span>
  )
}

function NodeCard({ node, level = 0, theme }) {
  const isRoot = level === 0
  const palette = theme?.palette || { primary: '#0f172a', surface: '#ffffff', border: '#e2e8f0', line: '#cbd5e1', text: '#0f172a' }
  return (
    <div
      className={`rounded-xl border px-4 py-3 shadow-sm transition-colors ${
        isRoot ? 'text-white' : 'text-slate-800'
      }`}
      style={{
        backgroundColor: isRoot ? palette.primary : palette.surface,
        borderColor: isRoot ? palette.primary : palette.border,
      }}
    >
      <div className="font-semibold flex items-center">
        <span>{node.label}</span>
        <NodeBadge level={level} />
      </div>
    </div>
  )
}

function Connector({ }){
  return <div className="pl-6 border-l-2 border-dashed border-slate-300" />
}

function NodeTree({ node, level = 0, theme }) {
  return (
    <div className="flex flex-col gap-4">
      <NodeCard node={node} level={level} theme={theme} />
      {node.children && node.children.length > 0 && (
        <div className="pl-6 border-l-2 border-dashed border-slate-300 flex flex-col gap-4">
          {node.children.map((child) => (
            <NodeTree key={child.id} node={child} level={level + 1} theme={theme} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function MapCanvas({ data }) {
  if (!data) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-slate-500 text-center">
        Your map will appear here.
      </div>
    )
  }

  const theme = data?.theme || null
  const bg = theme?.background || '#ffffff'
  return (
    <div className="rounded-2xl border p-6 overflow-auto max-h-[60vh]" style={{ background: bg, borderColor: theme?.border || '#e5e7eb' }}>
      <NodeTree node={data.root} theme={theme} />
    </div>
  )
}
