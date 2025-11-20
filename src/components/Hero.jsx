import React from 'react'
import Spline from '@splinetool/react-spline'

export default function Hero({ onGetStarted }) {
  return (
    <section className="relative min-h-[70vh] w-full overflow-hidden bg-white">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/kow0cKDK6Tap7xO9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* White to transparent gradient to ensure text legibility */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white via-white/80 to-white/0" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-24 pb-16">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900">
            Turn any idea into a beautiful mind map
          </h1>
          <p className="mt-4 text-lg md:text-xl text-slate-600">
            Purpose-built for logo design and brand brainstorming. Start with a topic, pick a template and theme, and generate a clean, shareable map in seconds.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <button onClick={onGetStarted} className="inline-flex items-center rounded-xl bg-slate-900 px-5 py-3 text-white shadow hover:bg-slate-800 transition">
              Get started
            </button>
            <a href="#templates" className="text-slate-700 hover:text-slate-900">Browse templates</a>
          </div>
        </div>
      </div>
    </section>
  )
}
