
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, MapPin, Clock, Send } from 'lucide-react';

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Form submitted');
  };

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to start your next project? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">
                  Let's Start a <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Conversation</span>
                </h2>
                <p className="text-gray-300 text-lg">
                  Whether you need engaging video content or want to enhance your AI and tech knowledge, we're here to help.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center">
                  <Mail className="h-6 w-6 text-purple-400 mr-4" />
                  <div>
                    <h3 className="text-white font-semibold">Email</h3>
                    <p className="text-gray-300">hello@contentagent.space</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <MapPin className="h-6 w-6 text-purple-400 mr-4" />
                  <div>
                    <h3 className="text-white font-semibold">Location</h3>
                    <p className="text-gray-300">Northwest UK</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Clock className="h-6 w-6 text-purple-400 mr-4" />
                  <div>
                    <h3 className="text-white font-semibold">Response Time</h3>
                    <p className="text-gray-300">Within 24 hours</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-white font-semibold mb-3">What We Offer</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Short-form video content for social platforms</li>
                  <li>• Brand storytelling and engagement</li>
                  <li>• Practical skills training</li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Send us a message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-gray-300">First Name</Label>
                      <Input
                        id="firstName"
                        type="text"
                        className="bg-gray-700 border-gray-600 text-white"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-gray-300">Last Name</Label>
                      <Input
                        id="lastName"
                        type="text"
                        className="bg-gray-700 border-gray-600 text-white"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-gray-300">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      className="bg-gray-700 border-gray-600 text-white"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject" className="text-gray-300">Subject</Label>
                    <Input
                      id="subject"
                      type="text"
                      className="bg-gray-700 border-gray-600 text-white"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-gray-300">Message</Label>
                    <Textarea
                      id="message"
                      rows={5}
                      className="bg-gray-700 border-gray-600 text-white"
                      placeholder="Tell us about your project or questions..."
                      required
                    />
                  </div>

                  <Button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
