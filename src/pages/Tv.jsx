import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout.jsx'
import PageMeta from '../components/PageMeta.jsx'
import { loadTvChannels, blankChannel, TV_CHANNEL_COUNT } from '../lib/tvChannels.js'

const FALLBACK = Array.from({ length: TV_CHANNEL_COUNT }, (_, i) => blankChannel(i + 1))

// Index page that links to each individual TV channel page.
export default function Tv() {
  const [channels, setChannels] = useState(FALLBACK)

  useEffect(() => {
    let cancelled = false
    loadTvChannels()
      .then((list) => { if (!cancelled) setChannels(list) })
      .catch(() => { /* keep fallback */ })
    return () => { cancelled = true }
  }, [])

  return (
    <Layout>
      <PageMeta
        title="Live TV Channels | Yalla Live"
        description="Watch live football TV channels in HD on Yalla Live. Pick a channel and switch between multiple servers for smooth streaming."
        keywords="yalla live tv, live football tv, yalla shoot tv, live soccer tv, m3u8 live stream"
        ogTitle="Live TV Channels | Yalla Live"
        ogDescription="Watch live football TV channels in HD on Yalla Live."
        robots="noindex, nofollow"
      />

      <main className="pt-[100px] md:pt-[96px] pb-10 md:pb-16 max-w-[1000px] mx-auto min-h-screen px-4">
        <div className="mb-6">
          <h1 className="green-sub-bar shadow-sm block m-0">Yalla Live TV — Watch Live Channels</h1>
        </div>

        <p className="text-sm md:text-base text-gray-700 dark:text-slate-300 leading-relaxed mb-6">
          Pick a channel to open its live HD stream. Each channel carries up to three independent servers —
          if one slows down, switch instantly from inside the player.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {channels.map((c) => {
            const live = c.servers.filter(Boolean).length
            return (
              <Link
                key={c.id}
                to={`/tv-${c.id}.html`}
                className="group flex items-center gap-4 bg-white dark:bg-slate-900/40 border border-gray-200 dark:border-slate-800 rounded-2xl p-5 hover:border-[#ee335f] dark:hover:border-[#ee335f] hover:shadow-md transition-all"
              >
                <span className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#ee335f]/10 flex-shrink-0">
                  <span className="material-symbols-outlined text-3xl text-[#ee335f]">live_tv</span>
                </span>
                <span className="flex flex-col min-w-0">
                  <span className="text-base md:text-lg font-bold text-gray-900 dark:text-white group-hover:text-[#ee335f] transition-colors truncate">
                    {c.title || `TV ${c.id}`}
                  </span>
                  <span className="text-xs font-semibold text-gray-500 dark:text-slate-400">
                    {live > 0 ? `${live} server${live > 1 ? 's' : ''} available` : 'Offline'}
                  </span>
                </span>
                <span className="material-symbols-outlined text-gray-400 ml-auto transition-transform group-hover:translate-x-1">arrow_forward</span>
              </Link>
            )
          })}
        </div>
      </main>
    </Layout>
  )
}
