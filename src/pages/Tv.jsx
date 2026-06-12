import { useEffect, useState } from 'react'
import Layout from '../components/Layout.jsx'
import PageMeta from '../components/PageMeta.jsx'
import HlsPlayer from '../components/HlsPlayer.jsx'
import { loadTvChannels, blankChannel, TV_CHANNEL_COUNT } from '../lib/tvChannels.js'

const FALLBACK = Array.from({ length: TV_CHANNEL_COUNT }, (_, i) => blankChannel(i + 1))

// Single page that hosts all TV channels (TV1–TV5) behind tabs: one player is
// mounted at a time for the selected channel, so only one stream ever loads.
// Intentionally ad-free — no GutterAds / banner / native ad units here.
export default function Tv() {
  const [channels, setChannels] = useState(FALLBACK)
  const [active, setActive] = useState(0)

  useEffect(() => {
    let cancelled = false
    loadTvChannels()
      .then((list) => { if (!cancelled) setChannels(list) })
      .catch(() => { /* keep fallback */ })
    return () => { cancelled = true }
  }, [])

  const channel = channels[active] || FALLBACK[0]
  const title = channel.title || `TV ${channel.id}`

  return (
    <Layout>
      <PageMeta
        title="Live TV Channels | Yalla Live"
        description="Watch all live football TV channels in HD on Yalla Live. Switch between channels and servers instantly on one page."
        keywords="yalla live tv, live football tv, yalla shoot tv, live soccer tv, m3u8 live stream"
        ogTitle="Live TV Channels | Yalla Live"
        ogDescription="Watch all live football TV channels in HD on Yalla Live."
        robots="noindex, nofollow"
      />

      <main className="pt-[100px] md:pt-[96px] pb-10 md:pb-16 max-w-[1000px] mx-auto min-h-screen px-4">
        <div className="mb-5">
          <h1 className="green-sub-bar shadow-sm block m-0">Yalla Live TV — Watch Live Channels</h1>
        </div>

        {/* Channel tabs — pick a channel, only that stream loads */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-5">
          {channels.map((c, i) => {
            const live = c.servers.filter(Boolean).length
            return (
              <button
                key={c.id}
                onClick={() => setActive(i)}
                className={`flex items-center gap-1.5 rounded-xl px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all ${
                  i === active
                    ? 'bg-[#ee335f] text-white shadow-md scale-[1.02]'
                    : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700'
                }`}
              >
                <span className="material-symbols-outlined text-base">live_tv</span>
                {c.title || `TV ${c.id}`}
                {live === 0 && <span className="text-[10px] font-semibold opacity-70">(offline)</span>}
              </button>
            )
          })}
        </div>

        {/* Remount per channel so the previous hls.js instance is torn down cleanly */}
        <HlsPlayer key={channel.id} servers={channel.servers} title={title} />
      </main>
    </Layout>
  )
}
