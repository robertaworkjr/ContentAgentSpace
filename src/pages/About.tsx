
import Navigation from '@/components/Navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Video, Users, BookOpen, Lightbulb, Target, Heart } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            About ContentAgent.Space
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We help brands connect with their audiences through engaging short-form video content and empower individuals with practical tech and AI knowledge
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Our <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Mission</span>
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                We specialize in creating short-form video content designed for social platforms that truly engages audiences and promotes brands in authentic, compelling ways.
              </p>
              <p className="text-lg text-gray-300">
                Our goal is to bridge the gap between complex technology and practical application, making it accessible for everyone.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6 text-center">
                  <Video className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">Short-Form Content</h3>
                  <p className="text-gray-300 text-sm">Engaging videos for social platforms</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6 text-center">
                  <Target className="h-12 w-12 text-pink-400 mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">Brand Promotion</h3>
                  <p className="text-gray-300 text-sm">Authentic audience engagement</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6 text-center">
                  <Lightbulb className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">Practical Application</h3>
                  <p className="text-gray-300 text-sm">Turn ideas into reality</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              What We <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Offer</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Video Content Creation */}
            <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Video className="h-8 w-8 text-purple-400 mr-3" />
                  <h3 className="text-2xl font-bold text-white">Video Content Creation</h3>
                </div>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Short-form videos optimized for social media platforms</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Brand storytelling that resonates with your target audience</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Content designed to drive engagement and brand awareness</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Platform-specific optimization for maximum reach</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white">
            Our <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Values</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Heart className="h-12 w-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-4">Authentic Engagement</h3>
              <p className="text-gray-300">
                We believe in creating genuine connections between brands and their audiences through honest, compelling storytelling.
              </p>
            </div>
            
            <div className="text-center">
              <Lightbulb className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-4">Practical Learning</h3>
              <p className="text-gray-300">
                Technology should be accessible. We focus on teaching what you actually need to know to bring your ideas to life.
              </p>
            </div>
            
            <div className="text-center">
              <Target className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-4">Results-Driven</h3>
              <p className="text-gray-300">
                Every piece of content and every lesson is designed with clear outcomes in mind - your success is our measure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Get Started?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Whether you need engaging video content or want to learn practical tech skills, we're here to help you succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg">
                Start Your Project
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
