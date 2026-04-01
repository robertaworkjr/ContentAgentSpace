
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Users, ArrowRight, Brain, Video, Zap } from 'lucide-react';

const WebinarPreview = () => {
  const upcomingWebinars = [
    {
      id: 1,
      title: "AI Video Creation Mastery",
      description: "Learn how to leverage AI tools for creating viral short-form content",
      date: "March 15, 2024",
      time: "2:00 PM EST",
      duration: "90 minutes",
      spots: 247,
      level: "Beginner to Advanced",
      icon: Brain
    },
    {
      id: 2,
      title: "Advanced AI Editing Techniques",
      description: "Master professional AI-powered editing workflows for social media",
      date: "March 22, 2024",
      time: "3:00 PM EST",
      duration: "120 minutes",
      spots: 189,
      level: "Intermediate",
      icon: Video
    },
    {
      id: 3,
      title: "AI Content Strategy & Analytics",
      description: "Optimize your content strategy using AI insights and data",
      date: "March 29, 2024",
      time: "1:00 PM EST",
      duration: "75 minutes",
      spots: 312,
      level: "All Levels",
      icon: Zap
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Master <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">AI Video Creation</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join our exclusive webinar series and learn cutting-edge AI techniques for creating viral short-form content
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {upcomingWebinars.map((webinar) => {
            const IconComponent = webinar.icon;
            return (
              <Card key={webinar.id} className="bg-gray-900/50 border-gray-800 hover:border-purple-600/50 transition-all duration-300 group">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <IconComponent className="h-8 w-8 text-purple-400 group-hover:scale-110 transition-transform" />
                    <span className="text-sm text-gray-400 bg-gray-800 px-2 py-1 rounded">{webinar.level}</span>
                  </div>
                  <CardTitle className="text-white group-hover:text-purple-400 transition-colors">
                    {webinar.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    {webinar.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center text-gray-300">
                    <Calendar className="h-4 w-4 mr-2 text-purple-400" />
                    <span className="text-sm">{webinar.date}</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Clock className="h-4 w-4 mr-2 text-purple-400" />
                    <span className="text-sm">{webinar.time} • {webinar.duration}</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Users className="h-4 w-4 mr-2 text-purple-400" />
                    <span className="text-sm">{webinar.spots} spots available</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Link to="/webinars">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg group">
              View All Webinars & Register
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WebinarPreview;
