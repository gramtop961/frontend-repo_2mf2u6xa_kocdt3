import React from 'react'

function NodeCard({ node, level = 0 }) {
  return (
    <div className={`rounded-xl border ${level===0 ? 'bg-slate-900 text-white border-slate-900' : 'bg-white border-slate-200'} px-4 py-3 shadow-sm`}> 
      <div className={`font-semibold ${level===0 ? '' : 'text-slate-800'}`}>{node.label}</div>
    </div>
  )
}

function NodeTree({ node, level = 0 }) {
  return (
    <div className="flex flex-col gap-4">
      <NodeCard node={node} level={level} />
      {node.children && node.children.length > 0 && (
        <div className="pl-6 border-l-2 border-dashed border-slate-300 flex flex-col gap-4">
          {node.children.map((child) => (
            <NodeTree key={child.id} node={child} level={level + 1} />
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
  return (
    <div className="rounded-2xl border border-slate-200 p-6 bg-white overflow-auto max-h-[60vh]">
      <NodeTree node={data.root} />
    </div>
  )
}
