
import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  FileText, Download, Zap, ShoppingCart,
  CheckCircle, ArrowRight, Shield, RefreshCcw, Users, X,
} from 'lucide-react';
import EmailCapture from '@/components/EmailCapture';

const features = [
  { icon: '⚡', label: 'Instant Download', desc: 'Get your ZIP file the moment you purchase — no waiting.' },
  { icon: '🔄', label: 'Lifetime Updates', desc: 'As AI evolves, so do our packs. All future updates included.' },
  { icon: '🔒', label: 'Secure Checkout', desc: 'Stripe & PayPal — your preferred way to pay, fully protected.' },
];

const volumes = [
  { label: 'Creator Prompt Starter Library', href: '/prompt-library.html' },
  { label: 'Advanced Creator Prompt Library', href: '/prompt-library-2.html' },
  { label: 'Content Ideas Starter Pack', href: '/ideas-prompt-library.html' },
  { label: 'Viral Content Ideas Pack', href: '/ideas-prompt-library-1.html' },
  { label: 'Audience Growth Ideas Pack', href: '/ideas-prompt-library-2.html' },
  { label: 'Monetisation Ideas Pack', href: '/ideas-prompt-library-3.html' },
];

const Index = () => {
  const [emailModal, setEmailModal] = useState(false)

  // Show email modal after the visitor has had time to understand the offer
  useEffect(() => {
    const timer = setTimeout(() => {
      setEmailModal(true)
    }, 14000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-[#08101f] text-white overflow-x-hidden">
      {/* Email Capture Modal */}
      <EmailCapture
        isOpen={emailModal}
        onClose={() => setEmailModal(false)}
        title="Get 10 Free High-Performing Prompts"
        subtitle="Try our prompt style before you buy — instant download, no credit card needed"
        incentive="FREE STARTER PACK · INSTANT DOWNLOAD"
      />
      
      <Navigation />

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 bg-grid overflow-hidden">
        {/* Ambient glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-cyan-600/8 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-blue-800/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-500/25 rounded-full px-4 py-1.5 text-xs font-semibold text-blue-300 mb-8 tracking-wider uppercase animate-fade-in">
            <Zap className="h-3 w-3 text-blue-400" />
            AI prompts, PDF guides & instant-download creator tools
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6 animate-slide-up">
            Ready-to-use AI prompts that help you{' '}
            <span className="relative">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                create faster
              </span>
            </span>
            , post smarter, and sell more.
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed animate-fade-in delay-200">
            Instant-download prompt packs and PDF libraries for creators, marketers, and small businesses. Start with free samples, grab focused low-cost packs, or unlock the full bundle when you want the whole system.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-in delay-400">
            <Link to="/prompt-store">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-6 text-base rounded-xl shadow-xl shadow-blue-900/50 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-blue-600/40"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Browse Prompt Store
              </Button>
            </Link>
            <a href="/prompt-library.html">
              <Button
                size="lg"
                variant="outline"
                className="border-slate-700 text-slate-300 hover:border-blue-500/60 hover:text-blue-300 hover:bg-blue-900/10 px-8 py-6 text-base rounded-xl transition-all duration-200"
              >
                <FileText className="mr-2 h-5 w-5" />
                Free Prompt Library
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>

          {/* Trust row */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-sm text-slate-500 animate-fade-in delay-600">
            {[
              { icon: <CheckCircle className="h-4 w-4 text-blue-400" />, label: 'Instant ZIP Download' },
              { icon: <CheckCircle className="h-4 w-4 text-blue-400" />, label: 'Lifetime Access' },
              { icon: <CheckCircle className="h-4 w-4 text-blue-400" />, label: 'Free Updates' },
              { icon: <Shield className="h-4 w-4 text-blue-400" />, label: '30-Day Guarantee' },
            ].map(({ icon, label }) => (
              <span key={label} className="flex items-center gap-1.5">
                {icon} {label}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 text-left animate-fade-in delay-700">
            {[
              {
                title: '1. Start free',
                desc: 'Browse the free prompt libraries and test the quality before spending anything.',
              },
              {
                title: '2. Buy focused packs',
                desc: 'Pick a cheap prompt pack built for a specific outcome like hooks, ads, visuals, or strategy.',
              },
              {
                title: '3. Upgrade when ready',
                desc: 'Unlock the full bundle when you want the fastest, cheapest path to everything.',
              },
            ].map(({ title, desc }) => (
              <div key={title} className="rounded-2xl border border-blue-900/30 bg-[#0c1830]/70 p-5 backdrop-blur-sm">
                <p className="text-sm font-semibold text-white mb-2">{title}</p>
                <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Two Pillars ── */}
      <section className="py-28 bg-[#09121f] border-t border-blue-900/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-bold tracking-widest text-blue-400 uppercase mb-3">What We Do</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Free samples for trust.{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Paid packs for results.
              </span>
            </h2>
            <p className="text-slate-400 text-lg mt-4 max-w-2xl mx-auto">
              The model is simple: try the free libraries, buy the focused packs that solve a real problem, then upgrade to the full bundle if you want maximum value.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Card — Prompt Packs */}
            <div className="group relative bg-[#0c1830] border border-blue-900/40 rounded-2xl p-8 hover:border-blue-600/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/30 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-600/15 border border-blue-500/20 mb-6">
                  <Zap className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Low-Cost Prompt Packs</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Focused, outcome-driven prompt bundles for viral hooks, ad copy, content planning, image generation, and more. Buy what you need now, download instantly, and put it to work today.
                </p>
                <ul className="space-y-2 mb-8">
                  {[
                    'Focused packs priced for impulse buys',
                    'Video, ads, captions, visuals & strategy',
                    'Upgrade to the Ultimate Bundle for best value',
                    'Pay securely via Stripe or PayPal',
                  ].map(f => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-slate-400">
                      <CheckCircle className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/prompt-store">
                  <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl h-11 transition-all duration-200 hover:-translate-y-px">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Shop Low-Cost Packs
                  </Button>
                </Link>
              </div>
            </div>

            {/* Card — PDF Libraries */}
            <div className="group relative bg-[#0c1830] border border-blue-900/40 rounded-2xl p-8 hover:border-cyan-600/50 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-900/20 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-cyan-600/15 border border-cyan-500/20 mb-6">
                  <FileText className="h-6 w-6 text-cyan-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Free PDF Prompt Libraries</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Browse structured PDF libraries organised by niche, goal, and use-case. They are built to prove the quality first, so buying the premium packs feels like the obvious next move.
                </p>
                <ul className="space-y-2 mb-8">
                  {[
                    'Free samples visitors can browse right now',
                    'Sorted by niche, topic & goal',
                    'Built to reduce risk before purchase',
                    'Natural upsell path into premium packs',
                  ].map(f => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-slate-400">
                      <CheckCircle className="h-4 w-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="/prompt-library.html">
                  <Button variant="outline" className="w-full border-slate-700 text-slate-300 hover:border-cyan-600/50 hover:text-cyan-300 hover:bg-cyan-900/10 font-semibold rounded-xl h-11 transition-all duration-200">
                    <Download className="mr-2 h-4 w-4" />
                    Browse Free Libraries
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Library Volumes Grid ── */}
      <section className="py-20 bg-[#08101f] border-t border-blue-900/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-bold tracking-widest text-blue-400 uppercase mb-3">Free Access</p>
            <h2 className="text-3xl font-bold">
              Start with the{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                free libraries
              </span>
            </h2>
            <p className="text-slate-500 mt-3 text-sm max-w-xl mx-auto">
              Browse free samples first. If the style fits your workflow, move up to the paid packs and bundle for deeper, more targeted prompt systems.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {volumes.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="flex flex-col items-center justify-center gap-2.5 bg-[#0c1830] border border-blue-900/40 rounded-xl p-5 hover:border-blue-500/50 hover:bg-blue-900/10 transition-all duration-200 group"
              >
                <FileText className="h-5 w-5 text-blue-500 group-hover:text-blue-300 transition-colors" />
                <span className="text-xs font-medium text-slate-400 group-hover:text-white transition-colors text-center leading-tight">
                  {label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Support / donation block ── */}
      <section className="py-16 bg-[#08101f] border-t border-blue-900/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-blue-900/30 bg-gradient-to-br from-[#0c1830] to-[#09121f] p-8 md:p-10 text-center shadow-2xl shadow-blue-900/20">
            <p className="text-xs font-bold tracking-widest text-blue-400 uppercase mb-3">Support the free library</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              If the free prompts helped, you can{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                support the project
              </span>
              .
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed">
              Donations help keep the free prompt libraries live, fund new releases, and let us keep publishing useful creator tools for people who are not ready to buy yet.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/prompt-store">
                <Button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-6 rounded-xl">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Shop Premium Packs
                </Button>
              </Link>
              <a href="#donate">
                <Button variant="outline" className="border-slate-700 text-slate-300 hover:border-blue-500/60 hover:text-blue-300 hover:bg-blue-900/10 px-8 py-6 rounded-xl">
                  Support with a Donation
                </Button>
              </a>
            </div>
            <p className="text-slate-600 text-sm mt-5">Best used after visitors have seen value — support the free library without competing with product sales.</p>
          </div>
        </div>
      </section>

      {/* ── Trust Pillars ── */}
      <section className="py-20 bg-[#09121f] border-t border-blue-900/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Zap className="h-6 w-6 text-blue-400" />,
                title: 'Instant Download',
                desc: 'Get your ZIP file immediately after purchase. No approval, no waiting.',
              },
              {
                icon: <RefreshCcw className="h-6 w-6 text-cyan-400" />,
                title: 'Lifetime Updates',
                desc: 'AI evolves fast. All our packs include every future update, free.',
              },
              {
                icon: <Users className="h-6 w-6 text-blue-300" />,
                title: 'Stripe & PayPal',
                desc: 'Pay your way — both Stripe and PayPal are fully supported at checkout.',
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="flex gap-4 bg-[#0c1830] border border-blue-900/30 rounded-2xl p-6 hover:border-blue-700/40 transition-colors"
              >
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-blue-900/30 border border-blue-800/40 flex items-center justify-center">
                  {icon}
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer CTA ── */}
      <section className="py-24 bg-gradient-to-b from-[#08101f] to-[#060d18] border-t border-blue-900/20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <p className="text-xs font-bold tracking-widest text-blue-400 uppercase mb-4">Best Value</p>
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            Get Everything.{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Save 60%.
            </span>
          </h2>
          <p className="text-slate-400 mb-8 max-w-md mx-auto">
            The Ultimate Bundle includes every prompt pack — 855+ prompts — at our deepest discount.
          </p>
          <Link to="/prompt-store">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg px-10 py-6 rounded-xl shadow-2xl shadow-blue-900/50 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-blue-600/40"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Shop the Ultimate Bundle
            </Button>
          </Link>
          <p className="text-slate-600 text-sm mt-5">30-day money-back guarantee · Stripe & PayPal accepted</p>
        </div>
      </section>
    </div>
  );
};

export default Index;
