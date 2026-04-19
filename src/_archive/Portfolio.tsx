import Navigation from '@/components/Navigation';
import { Card, CardContent } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface VideoItem {
  id: string;
  url: string;
  embedUrl: string;
  title: string;
}

const Portfolio = () => {
  const videos: VideoItem[] = [
    {
      id: 'ssc193kIynA',
      url: 'https://youtube.com/shorts/ssc193kIynA',
      embedUrl: 'https://www.youtube.com/embed/ssc193kIynA?enablejsapi=1&origin=window.location.origin',
      title: 'Content Creation Short #1'
    },
    {
      id: 'mhN9rtl9P_A',
      url: 'https://youtube.com/shorts/mhN9rtl9P_A',
      embedUrl: 'https://www.youtube.com/embed/mhN9rtl9P_A?enablejsapi=1&origin=window.location.origin',
      title: 'Content Creation Short #2'
    },
    {
      id: 'E214rnHTYJg',
      url: 'https://youtube.com/shorts/E214rnHTYJg',
      embedUrl: 'https://www.youtube.com/embed/E214rnHTYJg?enablejsapi=1&origin=window.location.origin',
      title: 'Content Creation Short #3'
    },
    {
      id: '6La8NK1KQyU',
      url: 'https://youtube.com/shorts/6La8NK1KQyU',
      embedUrl: 'https://www.youtube.com/embed/6La8NK1KQyU?enablejsapi=1&origin=window.location.origin',
      title: 'Content Creation Short #4'
    },
    {
      id: 'VAIVcDwwreg',
      url: 'https://youtube.com/shorts/VAIVcDwwreg',
      embedUrl: 'https://www.youtube.com/embed/VAIVcDwwreg?enablejsapi=1&origin=window.location.origin',
      title: 'Content Creation Short #5'
    },
    {
      id: 'kh-3KabUi5s',
      url: 'https://youtube.com/shorts/kh-3KabUi5s',
      embedUrl: 'https://www.youtube.com/embed/kh-3KabUi5s?enablejsapi=1&origin=window.location.origin',
      title: 'Content Creation Short #6'
    },
    {
      id: 'IdfVqWPawyU',
      url: 'https://youtube.com/shorts/IdfVqWPawyU',
      embedUrl: 'https://www.youtube.com/embed/IdfVqWPawyU?enablejsapi=1&origin=window.location.origin',
      title: 'Content Creation Short #7'
    },
    {
      id: 'mqXxPOWbO18',
      url: 'https://youtube.com/shorts/mqXxPOWbO18',
      embedUrl: 'https://www.youtube.com/embed/mqXxPOWbO18?enablejsapi=1&origin=window.location.origin',
      title: 'Content Creation Short #8'
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Our Portfolio
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover the power of AI-generated content through our collection of viral short-form videos
          </p>
        </div>
      </section>

      {/* Video Grid Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videos.map((video) => (
              <Card key={video.id} className="bg-gray-800 border-gray-700 hover:border-purple-500 transition-all duration-300 group">
                <CardContent className="p-0">
                  <AspectRatio ratio={9/16} className="bg-gray-900 rounded-lg overflow-hidden">
                    <iframe
                      src={video.embedUrl}
                      title={video.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      loading="lazy"
                    />
                  </AspectRatio>
                  <div className="p-4">
                    <h3 className="text-white font-medium text-sm">{video.title}</h3>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to Create Your Own <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Viral Content?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of creators who are already using AI to generate engaging short-form videos
          </p>
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-all duration-300">
            Get Started Today
          </button>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
