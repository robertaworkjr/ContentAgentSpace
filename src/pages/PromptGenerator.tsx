
import { useState } from 'react'
import Navigation from '@/components/Navigation'
import { Button } from '@/components/ui/button'
import { Zap, Copy, Check, RefreshCcw, ChevronDown } from 'lucide-react'

const hookTypes = ['Curiosity', 'Shock', 'Story', 'Value', 'Psychological']
const toneTypes  = ['Bold', 'Cinematic', 'Casual', 'Urgent']

function buildPrompt(topic: string, audience: string, hook: string, tone: string) {
  return `Create a viral short-form video script.

Topic:    ${topic}
Audience: ${audience}
Hook Style: ${hook}
Tone:     ${tone}

Hook the viewer in 3 seconds.
Keep it under 30 seconds.

Structure:
  Hook → Context → Value → Twist → CTA

Make it engaging, fast-paced, and scroll-stopping.`
}

const PromptGenerator = () => {
  const [topic,    setTopic]    = useState('')
  const [audience, setAudience] = useState('')
  const [hook,     setHook]     = useState(hookTypes[0])
  const [tone,     setTone]     = useState(toneTypes[0])
  const [output,   setOutput]   = useState('')
  const [copied,   setCopied]   = useState(false)

  const generate = () => {
    if (!topic.trim() || !audience.trim()) return
    setOutput(buildPrompt(topic, audience, hook, tone))
    setCopied(false)
  }

  const reset = () => {
    setTopic('')
    setAudience('')
    setHook(hookTypes[0])
    setTone(toneTypes[0])
    setOutput('')
    setCopied(false)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="min-h-screen bg-[#08101f] text-white">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-28 pb-12 bg-grid overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 left-1/3 w-96 h-96 bg-blue-700/10 rounded-full blur-3xl" />
          <div className="absolute top-0 right-1/4 w-64 h-64 bg-cyan-700/8 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-500/25 rounded-full px-4 py-1.5 text-xs font-semibold text-blue-300 mb-6 tracking-wider uppercase">
            <Zap className="h-3 w-3 text-blue-400" />
            Free Tool
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
            Short-Form{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Prompt Generator
            </span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Fill in the fields below and generate a ready-to-use script prompt for TikTok, Reels, and YouTube Shorts.
          </p>
        </div>
      </section>

      {/* Generator */}
      <section className="py-12 bg-[#08101f]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0c1830] border border-blue-900/40 rounded-2xl p-8 shadow-2xl shadow-blue-900/10">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Topic */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-blue-300 uppercase tracking-widest mb-2">
                  Topic
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. filmmaking tips"
                  className="w-full bg-[#08101f] border border-blue-900/50 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/40 transition-all"
                />
              </div>

              {/* Audience */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-blue-300 uppercase tracking-widest mb-2">
                  Target Audience
                </label>
                <input
                  type="text"
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  placeholder="e.g. beginner creators"
                  className="w-full bg-[#08101f] border border-blue-900/50 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/40 transition-all"
                />
              </div>

              {/* Hook Type */}
              <div>
                <label className="block text-xs font-semibold text-blue-300 uppercase tracking-widest mb-2">
                  Hook Type
                </label>
                <div className="relative">
                  <select
                    value={hook}
                    onChange={(e) => setHook(e.target.value)}
                    className="w-full appearance-none bg-[#08101f] border border-blue-900/50 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/40 transition-all cursor-pointer pr-10"
                  >
                    {hookTypes.map(h => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
                </div>
              </div>

              {/* Tone */}
              <div>
                <label className="block text-xs font-semibold text-blue-300 uppercase tracking-widest mb-2">
                  Tone
                </label>
                <div className="relative">
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full appearance-none bg-[#08101f] border border-blue-900/50 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/40 transition-all cursor-pointer pr-10"
                  >
                    {toneTypes.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-6">
              <Button
                onClick={generate}
                disabled={!topic.trim() || !audience.trim()}
                className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-semibold h-11 rounded-xl shadow-lg shadow-blue-900/40 transition-all duration-200 hover:-translate-y-px disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                <Zap className="mr-2 h-4 w-4" />
                Generate Prompt
              </Button>
              <Button
                onClick={reset}
                variant="outline"
                className="border-slate-700 text-slate-400 hover:border-blue-600/50 hover:text-blue-300 hover:bg-blue-900/10 h-11 px-4 rounded-xl transition-all duration-200"
                title="Reset"
              >
                <RefreshCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Output */}
          {output && (
            <div className="mt-6 bg-[#0c1830] border border-blue-900/40 rounded-2xl overflow-hidden shadow-xl animate-fade-in">
              <div className="flex items-center justify-between px-6 py-3 border-b border-blue-900/30">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-xs font-semibold text-blue-300 uppercase tracking-widest">
                    Generated Prompt
                  </span>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-blue-300 transition-colors px-2 py-1 rounded-lg hover:bg-blue-900/20"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-green-400" />
                      <span className="text-green-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <pre className="px-6 py-5 text-sm text-slate-300 leading-relaxed whitespace-pre-wrap font-mono">
                {output}
              </pre>
            </div>
          )}

          {/* Tip */}
          {!output && (
            <div className="mt-6 text-center text-slate-600 text-sm">
              Fill in all fields above and hit <span className="text-blue-400 font-medium">Generate Prompt</span> to create your script brief.
            </div>
          )}
        </div>
      </section>

      {/* Upsell */}
      <section className="py-16 border-t border-blue-900/20 bg-[#09121f]">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <p className="text-xs font-bold tracking-widest text-blue-400 uppercase mb-3">Want more?</p>
          <h2 className="text-3xl font-bold mb-3">
            Get 300+ Ready-Made{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Hook Prompts
            </span>
          </h2>
          <p className="text-slate-400 mb-6 text-sm max-w-md mx-auto">
            Stop generating one at a time. Our Viral Captions & Hooks Pack gives you 300 proven prompts — instant download.
          </p>
          <a href="/prompt-store">
            <Button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-5 rounded-xl shadow-xl shadow-blue-900/40 transition-all duration-200 hover:-translate-y-px">
              <Zap className="mr-2 h-4 w-4" />
              Browse Prompt Packs — from $3.99
            </Button>
          </a>
        </div>
      </section>
    </div>
  )
}

export default PromptGenerator
