
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Video, ChevronDown } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPromptsOpen, setIsPromptsOpen] = useState(false);
  const location = useLocation();

  type NavItem = {
    name: string;
    path?: string;
    external?: boolean;
    type?: 'dropdown';
    items?: { name: string; path: string; external?: boolean; }[];
  };

  const navItems: NavItem[] = [
    { name: 'Home', path: '/' },
    { 
      name: 'Prompts', 
      type: 'dropdown',
      items: [
        { name: '🛒 Prompt Store', path: '/prompt-store' },
        { name: 'Prompts', path: '/prompt-library.html', external: true },
        { name: 'Prompts 1', path: '/prompt-library-2.html', external: true },
        { name: 'Prompts 2', path: '/ideas-prompt-library.html', external: true },
        { name: 'Prompts 3', path: '/ideas-prompt-library-1.html', external: true },
        { name: 'Prompts 4', path: '/ideas-prompt-library-2.html', external: true },
        { name: 'Prompts 5', path: '/ideas-prompt-library-3.html', external: true },
      ]
    },
    { name: 'Portfolio', path: '/portfolio' },
    { name: '✨ Particle World', path: '/particle-world' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Video className="h-8 w-8 text-purple-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              ContentAgent.Space
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              item.type === 'dropdown' ? (
                <div key={item.name} className="relative group">
                  <button className="flex items-center text-sm font-medium transition-colors duration-200 text-gray-300 hover:text-purple-400 py-2">
                    {item.name}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                  <div className="absolute left-0 mt-0 w-48 rounded-md shadow-lg bg-gray-900 ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      {item.items?.map((subItem) => (
                        subItem.external ? (
                          <a
                            key={subItem.name}
                            href={subItem.path}
                            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-purple-400"
                          >
                            {subItem.name}
                          </a>
                        ) : (
                          <Link
                            key={subItem.name}
                            to={subItem.path}
                            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-purple-400"
                          >
                            {subItem.name}
                          </Link>
                        )
                      ))}
                    </div>
                  </div>
                </div>
              ) : item.external ? (
                <a
                  key={item.name}
                  href={item.path}
                  className="text-sm font-medium transition-colors duration-200 text-gray-300 hover:text-purple-400"
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  to={item.path!}
                  className={`text-sm font-medium transition-colors duration-200 hover:text-purple-400 ${
                    isActive(item.path!) ? 'text-purple-400' : 'text-gray-300'
                  }`}
                >
                  {item.name}
                </Link>
              )
            ))}
            <Link to="/get-started">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black/90 rounded-lg mt-2">
              {navItems.map((item) => (
                item.type === 'dropdown' ? (
                  <div key={item.name} className="space-y-1">
                    <button
                      onClick={() => setIsPromptsOpen(!isPromptsOpen)}
                      className="w-full flex items-center justify-between px-3 py-2 text-base font-medium transition-colors duration-200 text-gray-300 hover:text-purple-400"
                    >
                      {item.name}
                      <ChevronDown className={`h-5 w-5 transition-transform ${isPromptsOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isPromptsOpen && (
                      <div className="pl-4 space-y-1 bg-gray-900/50 rounded-md py-1 mx-2">
                        {item.items?.map((subItem) => (
                          subItem.external ? (
                            <a
                              key={subItem.name}
                              href={subItem.path}
                              className="block px-3 py-2 text-base font-medium text-gray-400 hover:text-white hover:bg-gray-800 rounded-md"
                              onClick={() => setIsOpen(false)}
                            >
                              {subItem.name}
                            </a>
                          ) : (
                            <Link
                              key={subItem.name}
                              to={subItem.path}
                              className="block px-3 py-2 text-base font-medium text-gray-400 hover:text-white hover:bg-gray-800 rounded-md"
                              onClick={() => setIsOpen(false)}
                            >
                              {subItem.name}
                            </Link>
                          )
                        ))}
                      </div>
                    )}
                  </div>
                ) : item.external ? (
                  <a
                    key={item.name}
                    href={item.path}
                    className="block px-3 py-2 text-base font-medium transition-colors duration-200 text-gray-300 hover:text-purple-400"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    to={item.path!}
                    className={`block px-3 py-2 text-base font-medium transition-colors duration-200 hover:text-purple-400 ${
                      isActive(item.path!) ? 'text-purple-400' : 'text-gray-300'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              ))}
              <div className="px-3 py-2">
                <Link to="/get-started">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                    Get Started
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
