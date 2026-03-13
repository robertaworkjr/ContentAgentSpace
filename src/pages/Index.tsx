
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';

const Index = () => {
  return (
    <div className="min-h-screen bg-black">
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
            <div className="rounded-2xl overflow-hidden bg-gray-900 shadow-2xl h-full">
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
    </div>
  );
};

export default Index;
