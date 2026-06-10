import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout.jsx'
import PageMeta from '../components/PageMeta.jsx'
import HlsPlayer from '../components/HlsPlayer.jsx'
import AdUnit from '../components/AdUnit.jsx'
import { loadTvChannels, blankChannel, TV_CHANNEL_COUNT } from '../lib/tvChannels.js'

// One TV page = one HLS player fed by up to 3 admin-configured m3u8 servers.
export default function TvChannel({ number }) {
  const [channel, setChannel] = useState(() => blankChannel(number))

  useEffect(() => {
    let cancelled = false
    loadTvChannels()
      .then((list) => {
        if (cancelled) return
        const found = list.find((c) => Number(c.id) === Number(number))
        if (found) setChannel(found)
      })
      .catch(() => { /* keep blank fallback */ })
    return () => { cancelled = true }
  }, [number])

  const title = channel.title || `TV ${number}`

  const otherChannels = useMemo(
    () => Array.from({ length: TV_CHANNEL_COUNT }, (_, i) => i + 1).filter((n) => n !== Number(number)),
    [number]
  )

  return (
    <Layout>
      <PageMeta
        title={`${title} — Live TV | Yalla Live`}
        description={`Watch ${title} live stream in HD on Yalla Live. Switch between multiple servers for the smoothest football broadcast.`}
        keywords={`${title}, yalla live tv, live football tv, m3u8 stream, yalla shoot tv, live soccer tv`}
        ogTitle={`${title} — Live TV | Yalla Live`}
        ogDescription={`Watch ${title} live stream in HD on Yalla Live.`}
        robots="noindex, nofollow"
      />

      <main className="pt-[100px] md:pt-[96px] pb-10 md:pb-16 max-w-[1000px] mx-auto min-h-screen px-4">
        <div className="mb-5">
          <h1 className="green-sub-bar shadow-sm block m-0">{title} — Live Stream</h1>
        </div>

        <nav className="mb-5 flex flex-wrap items-center gap-2" aria-label="TV channels">
          {Array.from({ length: TV_CHANNEL_COUNT }, (_, i) => i + 1).map((n) => (
            <Link
              key={n}
              to={`/tv-${n}.html`}
              className={`rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                n === Number(number)
                  ? 'bg-[#ee335f] text-white shadow-sm'
                  : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700'
              }`}
            >
              TV {n}
            </Link>
          ))}
        </nav>

        <HlsPlayer servers={channel.servers} title={title} />

        <div className="mt-6 flex justify-center">
          <AdUnit adKey="318cbafdeb9f624f0bf9a42881b6c70a" width={468} height={60} className="hidden sm:flex" />
          <AdUnit adKey="b9358877b73e23101415bc0260a77523" width={300} height={250} className="flex sm:hidden" />
        </div>

        <section className="mt-8 bg-white dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800 rounded-2xl p-5 md:p-7 shadow-sm">
          <h2 className="text-lg md:text-xl font-extrabold text-gray-900 dark:text-white mb-3 tracking-tight">
            How to watch {title}
          </h2>
          <p className="text-sm md:text-base text-gray-700 dark:text-slate-300 leading-relaxed mb-3">
            Press play on the stream above to start watching <strong className="text-[#ee335f]">{title}</strong> live in HD.
            If a stream buffers or stops, tap one of the <strong>server</strong> buttons under the player to switch instantly —
            each channel carries up to three independent servers so the action keeps rolling even if one mirror slows down.
          </p>
          <p className="text-sm md:text-base text-gray-700 dark:text-slate-300 leading-relaxed">
            Streams are mobile-optimised and play directly in your browser — no app, no signup. Looking for a different match?
            Check the <Link to="/" className="text-[#ee335f] font-semibold hover:underline">full schedule on the homepage</Link>{' '}
            or jump to another channel below.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-sm font-extrabold uppercase tracking-widest text-gray-500 dark:text-slate-400 mb-3">More channels</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {otherChannels.map((n) => (
              <Link
                key={n}
                to={`/tv-${n}.html`}
                className="flex flex-col items-center justify-center gap-2 bg-white dark:bg-slate-900/40 border border-gray-200 dark:border-slate-800 rounded-2xl p-5 hover:border-[#ee335f] dark:hover:border-[#ee335f] hover:shadow-md transition-all"
              >
                <span className="material-symbols-outlined text-3xl text-[#ee335f]">live_tv</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">TV {n}</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  )
}
