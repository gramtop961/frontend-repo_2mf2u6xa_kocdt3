import React, { useEffect, useMemo, useState } from 'react'
import Hero from './components/Hero'
import TemplatePicker from './components/TemplatePicker'
import ThemePicker from './components/ThemePicker'
import MapCanvas from './components/MapCanvas'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function App() {
  const [subject, setSubject] = useState('Logo for a modern coffee brand')
  const [depth, setDepth] = useState(2)
  const [simpleMode, setSimpleMode] = useState(true)
  const [templates, setTemplates] = useState([])
  const [themes, setThemes] = useState([])
  const [template, setTemplate] = useState('classic')
  const [theme, setTheme] = useState('dark')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)

  useEffect(() => {
    async function boot() {
      try {
        const [tplRes, thRes] = await Promise.all([
          fetch(`${API_BASE}/templates`),
          fetch(`${API_BASE}/themes`)
        ])
        const [tplData, thData] = await Promise.all([tplRes.json(), thRes.json()])
        setTemplates(tplData || [])
        setThemes(thData || [])
      } catch (e) {
        console.error(e)
      }
    }
    boot()
  }, [])

  useEffect(() => {
    if (simpleMode) setDepth(2)
  }, [simpleMode])

  async function generate() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API_BASE}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, depth: simpleMode ? 2 : depth, template, style: theme })
      })
      if (!res.ok) throw new Error(await res.text())
      const data = await res.json()
      setResult(data)
    } catch (e) {
      setError('Failed to generate. Make sure the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  const handleGetStarted = () => {
    const el = document.getElementById('builder')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
      <Hero onGetStarted={handleGetStarted} />

      <section id="builder" className="relative z-10 mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700">Subject</label>
              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g., Logo for a fintech startup"
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 shadow-sm focus:border-slate-900 focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <input id="simple" type="checkbox" checked={simpleMode} onChange={(e)=> setSimpleMode(e.target.checked)} />
                <label htmlFor="simple" className="text-sm text-slate-700">Simple, explanatory mode</label>
              </div>
              <div className="text-xs text-slate-500">Keeps it to two easy levels</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Depth</label>
              <input type="range" min="1" max="3" value={depth} onChange={(e)=> setDepth(parseInt(e.target.value))} className="mt-2 w-full" disabled={simpleMode} />
              <div className="text-sm text-slate-500">{simpleMode ? '2 levels (simple)' : `${depth} levels`}</div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="block text-sm font-medium text-slate-700">Template</label>
                <span className="text-xs text-slate-500">Tip: "Classic" is the most readable</span>
              </div>
              <TemplatePicker templates={templates} value={template} onChange={setTemplate} />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Theme</label>
              <ThemePicker themes={themes} value={theme} onChange={setTheme} />
            </div>

            <div className="pt-2">
              <button
                onClick={generate}
                disabled={loading}
                className="inline-flex items-center rounded-xl bg-slate-900 px-5 py-3 text-white shadow hover:bg-slate-800 disabled:opacity-60"
              >
                {loading ? 'Generating…' : 'Generate map'}
              </button>
              {error && <div className="mt-3 text-sm text-red-600">{error}</div>}
            </div>
          </div>

          <div>
            <MapCanvas data={result} simple={simpleMode} />
          </div>
        </div>
      </section>

      <footer className="px-6 py-12 text-center text-slate-500">
        Built for brand creators. Turn briefs into clarity.
      </footer>
    </div>
  )
}
