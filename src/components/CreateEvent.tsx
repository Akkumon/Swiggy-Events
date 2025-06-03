
import React, { useState } from 'react';
import { MapPin, ArrowLeft, ArrowRight, Check, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { OpenAIService } from '@/services/openaiService';

interface FormData {
  eventName: string;
  eventType: string;
  date: string;
  time: string;
  location: string;
  description: string;
  maxAttendees: string;
  ticketPrice: string;
  foodAvailable: boolean;
  partnerRestaurants: number[];
}

const CreateEvent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    eventName: '',
    eventType: '',
    date: '',
    time: '',
    location: '',
    description: '',
    maxAttendees: '',
    ticketPrice: '',
    foodAvailable: false,
    partnerRestaurants: []
  });

  const totalSteps = 6;
  const openAIService = new OpenAIService('demo-key'); // In real app, this would be from env

  const eventTypes = [
    'Food Festival',
    'Music & Dining',
    'Workshop',
    'Community Gathering',
    'Pop-up Market',
    'Cultural Event'
  ];

  const steps = [
    { number: 1, title: 'Basic Details', description: 'Event type, date, time, pricing' },
    { number: 2, title: 'GenAI Content', description: 'AI-powered title & description' },
    { number: 3, title: 'Smart Pricing', description: 'AI pricing recommendations' },
    { number: 4, title: 'Customer Targeting', description: 'AI audience suggestions' },
    { number: 5, title: 'Visuals', description: 'Images and banner options' },
    { number: 6, title: 'Review & Publish', description: 'Final preview and publish' }
  ];

  const handleGenerateTitle = async () => {
    if (!formData.eventType || !formData.location) {
      toast({
        title: "Missing Information",
        description: "Please fill in event type and location first",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const title = await openAIService.generateEventTitle(formData.eventType, formData.location);
      setFormData({ ...formData, eventName: title });
      toast({
        title: "Title Generated!",
        description: "AI has created a catchy title for your event",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Using fallback title generation",
        variant: "destructive"
      });
      // Fallback title generation
      const fallbackTitle = `Amazing ${formData.eventType} in ${formData.location}`;
      setFormData({ ...formData, eventName: fallbackTitle });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateDescription = async () => {
    if (!formData.eventType || !formData.location || !formData.eventName) {
      toast({
        title: "Missing Information",
        description: "Please fill in basic details first",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const description = await openAIService.generateEventDescription(
        formData.eventType, 
        formData.location, 
        formData.eventName
      );
      setFormData({ ...formData, description });
      toast({
        title: "Description Generated!",
        description: "AI has created an engaging description for your event",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Using fallback description generation",
        variant: "destructive"
      });
      // Fallback description
      const fallbackDesc = `Join us for ${formData.eventName}, an exciting ${formData.eventType} experience in ${formData.location}. Don't miss this amazing opportunity to connect with your community!`;
      setFormData({ ...formData, description: fallbackDesc });
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Event Published Successfully!",
        description: "Your AI-powered event is now live and attracting customers.",
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to publish event. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Basic Event Details</h3>
            
            <div>
              <Label htmlFor="eventType">Event Type *</Label>
              <Select onValueChange={(value) => setFormData({ ...formData, eventType: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  {eventTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="time">Time *</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g., Central Park, Koramangala"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="ticketPrice">Ticket Price (₹)</Label>
                <Input
                  id="ticketPrice"
                  type="number"
                  value={formData.ticketPrice}
                  onChange={(e) => setFormData({ ...formData, ticketPrice: e.target.value })}
                  placeholder="0 for free events"
                />
              </div>
              <div>
                <Label htmlFor="maxAttendees">Maximum Attendees</Label>
                <Input
                  id="maxAttendees"
                  type="number"
                  value={formData.maxAttendees}
                  onChange={(e) => setFormData({ ...formData, maxAttendees: e.target.value })}
                  placeholder="Enter capacity"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">GenAI Content Creation</h3>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="eventName">Event Title</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleGenerateTitle}
                  disabled={isLoading}
                  className="text-orange-600 border-orange-200"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  {isLoading ? 'Generating...' : 'Generate Title'}
                </Button>
              </div>
              <Input
                id="eventName"
                value={formData.eventName}
                onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
                placeholder="AI will generate a catchy title..."
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="description">Event Description</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleGenerateDescription}
                  disabled={isLoading}
                  className="text-orange-600 border-orange-200"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  {isLoading ? 'Generating...' : 'Generate Description'}
                </Button>
              </div>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="AI will create an engaging description..."
                rows={6}
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-2">💡 AI Writing Tips</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• AI descriptions increase bookings by 40%</li>
                <li>• Include specific activities and benefits</li>
                <li>• Mention what makes your event unique</li>
              </ul>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Smart Pricing Intelligence</h3>
            
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-900 mb-2">🎯 AI Pricing Recommendations</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-green-700">Recommended Price:</span>
                  <span className="font-semibold text-green-900">₹299</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-green-700">Similar Events Average:</span>
                  <span className="font-medium text-green-800">₹250-350</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-green-700">Demand Prediction:</span>
                  <span className="font-medium text-green-800">High</span>
                </div>
              </div>
              <Button 
                className="mt-3 w-full bg-green-600 hover:bg-green-700"
                onClick={() => setFormData({ ...formData, ticketPrice: '299' })}
              >
                Use Recommended Price
              </Button>
            </div>

            <div>
              <Label htmlFor="finalPrice">Your Ticket Price (₹)</Label>
              <Input
                id="finalPrice"
                type="number"
                value={formData.ticketPrice}
                onChange={(e) => setFormData({ ...formData, ticketPrice: e.target.value })}
                placeholder="Enter your price"
              />
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h4 className="font-medium text-yellow-900 mb-2">💰 Pricing Strategy</h4>
              <p className="text-sm text-yellow-700">
                Based on your location and event type, this pricing optimizes for both attendance and revenue.
              </p>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Customer Targeting</h3>
            
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h4 className="font-medium text-purple-900 mb-3">🎯 AI Audience Recommendations</h4>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white rounded border">
                  <div>
                    <p className="font-medium text-gray-900">Italian Food Lovers</p>
                    <p className="text-sm text-gray-600">320 customers in your area</p>
                  </div>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    Notify
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-white rounded border">
                  <div>
                    <p className="font-medium text-gray-900">Previous Event Attendees</p>
                    <p className="text-sm text-gray-600">156 past participants</p>
                  </div>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    Notify
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-white rounded border">
                  <div>
                    <p className="font-medium text-gray-900">Local Food Enthusiasts</p>
                    <p className="text-sm text-gray-600">580 nearby users</p>
                  </div>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    Notify
                  </Button>
                </div>
              </div>

              <div className="mt-4 p-3 bg-purple-100 rounded">
                <p className="text-sm text-purple-800">
                  💡 Targeting these segments can increase your event attendance by 65%
                </p>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Event Visuals</h3>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h4 className="font-medium text-gray-700 mb-2">Upload Event Banner</h4>
              <p className="text-sm text-gray-500 mb-4">
                Upload an image or let AI generate banner suggestions
              </p>
              <div className="space-y-2">
                <Button variant="outline" className="w-full">
                  Upload Image
                </Button>
                <Button variant="outline" className="w-full text-orange-600 border-orange-200">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate AI Banner
                </Button>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">🎨 Visual Tips</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Use high-quality images (1200x630px recommended)</li>
                <li>• Include your restaurant branding</li>
                <li>• Show the food or atmosphere</li>
              </ul>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Review & Publish</h3>
            
            <Card className="p-4 border-2 border-orange-200">
              <h4 className="font-semibold text-gray-900 mb-2">{formData.eventName || 'Event Title'}</h4>
              <div className="text-sm text-gray-600 space-y-1 mb-3">
                <p><strong>Type:</strong> {formData.eventType}</p>
                <p><strong>Date:</strong> {formData.date} at {formData.time}</p>
                <p><strong>Location:</strong> {formData.location}</p>
                <p><strong>Price:</strong> ₹{formData.ticketPrice || '0'}</p>
                <p><strong>Capacity:</strong> {formData.maxAttendees || 'Unlimited'} attendees</p>
              </div>
              <div className="pt-3 border-t">
                <p className="text-sm text-gray-700">
                  {formData.description || 'Event description will appear here...'}
                </p>
              </div>
            </Card>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-900 mb-2">✨ AI Enhancement Summary</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Generated engaging title and description</li>
                <li>• Optimized pricing for maximum revenue</li>
                <li>• Targeted relevant customer segments</li>
                <li>• Ready to attract 40% more bookings</li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
        <div className="px-4 py-3 flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate(-1)}
            className="mr-3"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-semibold text-gray-900">Create AI-Powered Event</h1>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="bg-white border-b px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm text-gray-500">
            {steps[currentStep - 1]?.title}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-orange-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        <Card className="p-6 max-w-2xl mx-auto">
          {renderStep()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            {currentStep === totalSteps ? (
              <Button 
                onClick={handleSubmit}
                disabled={isLoading}
                className="bg-orange-500 hover:bg-orange-600"
              >
                {isLoading ? 'Publishing...' : 'Publish Event'}
                <Check className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={nextStep}
                className="bg-orange-500 hover:bg-orange-600"
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CreateEvent;
