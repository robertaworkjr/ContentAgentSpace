
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown, FileText, LayoutGrid } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPromptsOpen, setIsPromptsOpen] = useState(false);
  const location = useLocation();

  const promptLibraryItems = [
    { name: '⚡ Prompt Generator',  path: '/prompt-generator',           external: false },
    { name: 'Prompt Store',         path: '/prompt-store',               external: false },
    { name: 'Prompts (Vol. 1)',     path: '/prompt-library.html',        external: true },
    { name: 'Prompts (Vol. 2)',     path: '/prompt-library-2.html',      external: true },
    { name: 'Ideas Pack 1',        path: '/ideas-prompt-library.html',   external: true },
    { name: 'Ideas Pack 2',        path: '/ideas-prompt-library-1.html', external: true },
    { name: 'Ideas Pack 3',        path: '/ideas-prompt-library-2.html', external: true },
    { name: 'Ideas Pack 4',        path: '/ideas-prompt-library-3.html', external: true },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#08101f]/90 backdrop-blur-xl border-b border-blue-900/40 shadow-[0_1px_0_0_rgba(29,136,255,0.08)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-blue-400/50 transition-shadow">
              <LayoutGrid className="h-4 w-4 text-white" />
            </div>
            <span className="text-[17px] font-semibold tracking-tight text-white">
              ContentAgent<span className="text-blue-400">.Space</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">

            <Link
              to="/"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                isActive('/') ? 'bg-blue-600/15 text-blue-300' : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Home
            </Link>

            {/* Prompts dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-150">
                Prompts
                <ChevronDown className="h-3.5 w-3.5 text-slate-500 transition-transform duration-200 group-hover:rotate-180" />
              </button>
              {/* Dropdown */}
              <div className="absolute left-0 top-full mt-1 w-56 rounded-xl shadow-2xl bg-[#0e1a2e] border border-blue-900/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden">
                <div className="p-1.5">
                  {promptLibraryItems.map((item) =>
                    item.external ? (
                      <a
                        key={item.name}
                        href={item.path}
                        className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-blue-600/15 rounded-lg transition-all duration-150"
                      >
                        <FileText className="h-3.5 w-3.5 text-blue-400 flex-shrink-0" />
                        {item.name}
                      </a>
                    ) : (
                      <Link
                        key={item.name}
                        to={item.path}
                        className={`flex items-center gap-2.5 px-3 py-2 text-sm hover:text-white hover:bg-blue-600/15 rounded-lg transition-all duration-150 ${
                          isActive(item.path) ? 'text-blue-300 bg-blue-600/10' : 'text-slate-400'
                        }`}
                      >
                        <FileText className="h-3.5 w-3.5 text-blue-400 flex-shrink-0" />
                        {item.name}
                      </Link>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="w-px h-5 bg-slate-700/60 mx-2" />

            <Link to="/prompt-store">
              <Button className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2 h-9 rounded-lg shadow-lg shadow-blue-900/40 transition-all duration-200 hover:shadow-blue-500/30 hover:-translate-y-px">
                Prompt Store
              </Button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/5 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-blue-900/30 pb-4">
            <div className="pt-3 space-y-0.5">
              <Link
                to="/"
                className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive('/') ? 'bg-blue-600/15 text-blue-300' : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>

              <div>
                <button
                  onClick={() => setIsPromptsOpen(!isPromptsOpen)}
                  className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  Prompts
                  <ChevronDown className={`h-4 w-4 transition-transform ${isPromptsOpen ? 'rotate-180' : ''}`} />
                </button>
                {isPromptsOpen && (
                  <div className="mt-1 ml-3 space-y-0.5 border-l-2 border-blue-800/50 pl-3">
                    {promptLibraryItems.map((item) =>
                      item.external ? (
                        <a
                          key={item.name}
                          href={item.path}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          <FileText className="h-3.5 w-3.5 text-blue-400" />
                          {item.name}
                        </a>
                      ) : (
                        <Link
                          key={item.name}
                          to={item.path}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          <FileText className="h-3.5 w-3.5 text-blue-400" />
                          {item.name}
                        </Link>
                      )
                    )}
                  </div>
                )}
              </div>

              <div className="pt-2 px-1">
                <Link to="/prompt-store" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg">
                    Prompt Store
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
