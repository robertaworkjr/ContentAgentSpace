
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import { NewsletterForm } from '@/components/marketing/NewsletterForm';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <Hero />
      
      {/* Video Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              See <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Content Agent Video</span> in Action
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Watch how AI transforms content creation for viral short-form videos
            </p>
          </div>
          
          <div className="relative w-full max-w-md mx-auto" style={{ aspectRatio: '9/16' }}>
            <div className="rounded-2xl overflow-hidden bg-gray-900 shadow-2xl h-full border border-purple-900/50">
              <iframe
                src="https://www.youtube.com/embed/91GCbJqMxUA"
                title="Content Agent Video Demo"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust & CTA Section */}
      <section className="py-24 bg-black border-t border-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to scale your <span className="text-purple-400">content output?</span>
              </h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Join hundreds of creators and brands who have accelerated their growth on TikTok, Reels, and Shorts using our proven AI-driven strategies. Get started with our services or grab our viral prompt bundles.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]" asChild>
                  <Link to="/get-started">View Services</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-pink-500/50 text-pink-400 hover:bg-pink-500/10" asChild>
                  <Link to="/prompts">Shop Prompt Packs</Link>
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl blur-3xl"></div>
              <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-3xl p-8 shadow-2xl">
                <NewsletterForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
