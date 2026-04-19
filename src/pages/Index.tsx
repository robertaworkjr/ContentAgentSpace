
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  FileText, Download, Zap, ShoppingCart,
  CheckCircle, ArrowRight, Shield, RefreshCcw, Users,
} from 'lucide-react';

const features = [
  { icon: '⚡', label: 'Instant Download', desc: 'Get your ZIP file the moment you purchase — no waiting.' },
  { icon: '🔄', label: 'Lifetime Updates', desc: 'As AI evolves, so do our packs. All future updates included.' },
  { icon: '🔒', label: 'Secure Checkout', desc: 'Stripe & PayPal — your preferred way to pay, fully protected.' },
];

const volumes = [
  { label: 'Prompts Vol. 1', href: '/prompt-library.html' },
  { label: 'Prompts Vol. 2', href: '/prompt-library-2.html' },
  { label: 'Ideas Pack 1',   href: '/ideas-prompt-library.html' },
  { label: 'Ideas Pack 2',   href: '/ideas-prompt-library-1.html' },
  { label: 'Ideas Pack 3',   href: '/ideas-prompt-library-2.html' },
  { label: 'Ideas Pack 4',   href: '/ideas-prompt-library-3.html' },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-[#08101f] text-white overflow-x-hidden">
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
            AI Prompts & PDF Guides — Instant Download
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6 animate-slide-up">
            The Professional{' '}
            <span className="relative">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                AI Prompt
              </span>
            </span>
            {' '}Hub
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in delay-200">
            Professionally curated prompt packs and PDF guides for content creators, marketers, and businesses.
            Download instantly. Deploy immediately.
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
        </div>
      </section>

      {/* ── Two Pillars ── */}
      <section className="py-28 bg-[#09121f] border-t border-blue-900/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-bold tracking-widest text-blue-400 uppercase mb-3">What We Do</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Two products.{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Both exceptional.
              </span>
            </h2>
            <p className="text-slate-400 text-lg mt-4 max-w-xl mx-auto">
              We don't spread thin. We obsess over doing prompts and PDFs better than anyone else.
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
                <h3 className="text-2xl font-bold text-white mb-2">AI Prompt Packs</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Battle-tested prompt bundles for TikTok hooks, ad copy, content strategy, image generation, and more.
                  Delivered as ZIP files — load up and start creating.
                </p>
                <ul className="space-y-2 mb-8">
                  {[
                    '120–300 prompts per category',
                    'Video, ads, captions, visuals & strategy',
                    'Ultimate Bundle — 855+ prompts at 60% off',
                    'Pay via Stripe or PayPal',
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
                    Shop Prompt Packs
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
                <h3 className="text-2xl font-bold text-white mb-2">PDF Prompt Libraries</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Browse our structured PDF libraries — organised by category, niche, and use-case.
                  Free volumes to get started, premium packs for power users.
                </p>
                <ul className="space-y-2 mb-8">
                  {[
                    'Multiple volumes & editions',
                    'Sorted by niche, topic & goal',
                    'Free libraries available now',
                    'Premium packs for power users',
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
              Explore Our{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Prompt Libraries
              </span>
            </h2>
            <p className="text-slate-500 mt-3 text-sm max-w-md mx-auto">
              All free to browse. Upgrade to download full packs with hundreds more.
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
