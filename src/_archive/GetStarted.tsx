
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Video, Users, Target, MapPin, Heart, Lightbulb, Play, Calendar } from 'lucide-react';
import { NewsletterForm } from '@/components/marketing/NewsletterForm';

const GetStarted = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Get Started
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover how we can help you create engaging content and enhance your AI & tech knowledge
          </p>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              What We <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Offer</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-12">
            
            {/* Video Services */}
            <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <Video className="h-10 w-10 text-purple-400 mr-4" />
                  <CardTitle className="text-2xl text-white">Short-Form Video Content</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-6">
                  We create compelling short-form videos specifically designed for social media platforms to engage your audience and promote your brand authentically.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <Play className="h-5 w-5 text-purple-400 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-semibold">Platform Optimized</h4>
                      <p className="text-gray-400 text-sm">TikTok, Instagram Reels, YouTube Shorts ready</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Target className="h-5 w-5 text-purple-400 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-semibold">Brand Focused</h4>
                      <p className="text-gray-400 text-sm">Authentic storytelling that resonates</p>
                    </div>
                  </div>
                </div>

              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Try Us */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Why <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Try Us?</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Authentic Approach</h3>
              <p className="text-gray-300">
                We focus on genuine storytelling and practical knowledge that actually helps you succeed
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Results Focused</h3>
              <p className="text-gray-300">
                Every video and lesson is designed with clear outcomes in mind - to engage audiences and empower learners
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lightbulb className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Practical Learning</h3>
              <p className="text-gray-300">
                No overwhelming theory - just actionable knowledge you can apply to your own projects immediately
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Where We Are & Who We Serve */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Where We Are */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-6">
                <MapPin className="h-10 w-10 text-purple-400 mr-4" />
                <h2 className="text-3xl font-bold text-white">Where We're Based</h2>
              </div>
              <p className="text-xl text-gray-300 mb-6">
                Located in the Northwest UK, we're perfectly positioned to understand both local and global digital trends.
              </p>
              <p className="text-gray-400">
                Our Northwest roots give us a practical, no-nonsense approach to content creation and education, while our digital focus keeps us connected to worldwide opportunities.
              </p>
            </div>

            {/* Who We Serve */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-6">
                <Users className="h-10 w-10 text-blue-400 mr-4" />
                <h2 className="text-3xl font-bold text-white">Who We Reach</h2>
              </div>
              <p className="text-xl text-gray-300 mb-6">
                We serve people hoping to enhance their learning in AI and technology generally.
              </p>
              <ul className="text-gray-400 space-y-3 text-left">
                <li>• Entrepreneurs wanting to leverage social media</li>
                <li>• Small business owners looking to create engaging content</li>
                <li>• Individuals curious about AI and tech applications</li>
                <li>• Anyone wanting practical digital skills without the overwhelm</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <NewsletterForm />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Get Started?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Reach out to start creating engaging content or enhance your tech skills.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GetStarted;
