
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Clock } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';

interface BookingFormData {
  name: string;
  email: string;
  interests: string;
  skillSet: string;
  selectedDate: Date | undefined;
  selectedTime: string;
}

const BookingForm = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showPayPal, setShowPayPal] = useState(false);
  const [paypalReady, setPaypalReady] = useState(false);
  const [paypalError, setPaypalError] = useState<string>('');
  
  const form = useForm<BookingFormData>({
    defaultValues: {
      name: '',
      email: '',
      interests: '',
      skillSet: '',
      selectedDate: undefined,
      selectedTime: '',
    }
  });

  const timeSlots = [
    '09:00 - 11:00',
    '11:30 - 13:30', 
    '14:00 - 16:00',
    '16:30 - 18:30',
    '19:00 - 21:00'
  ];

  useEffect(() => {
    if (showPayPal && !paypalReady) {
      console.log('Loading PayPal SDK for booking...');
      
      // Remove existing script if present
      const existingScript = document.querySelector('script[src*="paypal.com/sdk"]');
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript);
      }

      const script = document.createElement('script');
      script.src = 'https://www.paypal.com/sdk/js?client-id=BAA1RE_QfaxzfH-EYCArQlQq_dsAtD3o-kMFUZH6jt7_HAUHG2hFpiNiXs0C-eJyGip5lvSrFyS1A_9Inw&components=hosted-buttons&disable-funding=venmo&currency=GBP';
      script.async = true;
      
      script.onload = () => {
        console.log('PayPal SDK loaded successfully for booking');
        setPaypalReady(true);
        setPaypalError('');
      };
      
      script.onerror = () => {
        console.error('Failed to load PayPal SDK for booking');
        setPaypalError('Failed to load PayPal SDK');
      };
      
      document.head.appendChild(script);

      return () => {
        // Improved cleanup - check if script exists and has a parent before removing
        const scriptToRemove = document.querySelector('script[src*="paypal.com/sdk"]');
        if (scriptToRemove && scriptToRemove.parentNode) {
          try {
            scriptToRemove.parentNode.removeChild(scriptToRemove);
          } catch (error) {
            console.log('Script already removed or not found:', error);
          }
        }
      };
    }
  }, [showPayPal, paypalReady]);

  useEffect(() => {
    if (showPayPal && paypalReady && window.paypal) {
      console.log('Initializing PayPal hosted button for booking...');
      
      const container = document.getElementById('paypal-booking-container');
      if (!container) {
        console.error('PayPal booking container not found');
        return;
      }

      // Clear container
      container.innerHTML = '';
      
      try {
        window.paypal.HostedButtons({
          hostedButtonId: "UUNEWSZCZ4P4G",
        }).render("#paypal-booking-container");
        
        console.log('PayPal hosted booking button rendered successfully');
        setPaypalError('');
      } catch (error: any) {
        console.error('Error initializing PayPal hosted booking button:', error);
        setPaypalError(`Error: ${error.message}`);
      }
    }
  }, [showPayPal, paypalReady]);

  const onSubmit = (data: BookingFormData) => {
    console.log('Booking data:', { ...data, selectedDate, selectedTime });
    
    // Store booking data in localStorage
    localStorage.setItem('bookingData', JSON.stringify({
      ...data,
      selectedDate: selectedDate?.toISOString(),
      selectedTime
    }));
    
    setShowPayPal(true);
  };

  const renderPayPalButton = () => {
    if (!showPayPal) return null;

    return (
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-lg font-semibold mb-4">Complete Payment</h4>
        <p className="text-sm text-gray-600 mb-4">
          Complete your £20.00 payment to confirm your 2-hour consultation session.
        </p>
        
        {!paypalReady && !paypalError && (
          <div className="text-center py-8">
            <p className="text-gray-500">Loading PayPal...</p>
          </div>
        )}
        
        {paypalError && (
          <div className="text-center py-4 bg-red-50 rounded border border-red-200">
            <p className="text-red-600 mb-2">Error: {paypalError}</p>
            <button 
              onClick={() => {
                setPaypalError('');
                setPaypalReady(false);
                setShowPayPal(false);
                setTimeout(() => setShowPayPal(true), 100);
              }}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Retry Payment
            </button>
          </div>
        )}
        
        <div id="paypal-booking-container" className="min-h-[200px]">
          {paypalReady && !paypalError && (
            <div className="text-center py-4">
              <p className="text-xs text-gray-500">PayPal button loading...</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700">
      <CardHeader>
        <CardTitle className="text-2xl text-white flex items-center">
          <Calendar className="h-6 w-6 text-purple-400 mr-3" />
          Book Your 2-Hour Session
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Calendar Selection */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Select a Date</h3>
            <div className="bg-white rounded-lg p-4">
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                className="rounded-md"
              />
            </div>
          </div>

          {/* Time Slot Selection */}
          {selectedDate && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                <Clock className="h-5 w-5 text-purple-400 mr-2" />
                Available Time Slots
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {timeSlots.map((slot) => (
                  <Button
                    key={slot}
                    variant={selectedTime === slot ? "default" : "outline"}
                    className={`p-3 ${
                      selectedTime === slot 
                        ? "bg-purple-600 hover:bg-purple-700" 
                        : "border-gray-600 text-gray-300 hover:bg-gray-800"
                    }`}
                    onClick={() => setSelectedTime(slot)}
                  >
                    {slot}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Book Now Button */}
          {selectedDate && selectedTime && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 text-lg">
                  Book Session - £20.00
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Complete Your Booking</DialogTitle>
                </DialogHeader>
                
                {!showPayPal ? (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="Enter your email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="interests"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Interests</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Tell us about your interests in AI and technology..."
                                className="min-h-[80px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="skillSet"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current Skill Level</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Describe your current skill level and experience..."
                                className="min-h-[80px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="bg-gray-100 p-3 rounded-lg">
                        <p className="text-sm text-gray-600">
                          <strong>Selected Date:</strong> {selectedDate?.toDateString()}<br/>
                          <strong>Time Slot:</strong> {selectedTime}
                        </p>
                      </div>
                      
                      <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                        Proceed to Payment
                      </Button>
                    </form>
                  </Form>
                ) : (
                  renderPayPalButton()
                )}
              </DialogContent>
            </Dialog>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingForm;
