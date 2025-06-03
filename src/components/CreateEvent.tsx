
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Wand2, Eye, Upload, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import SmartPromptWizard from './SmartPromptWizard';

interface FormData {
  eventType: string;
  date: string;
  time: string;
  ticketPrice: string;
  capacity: string;
  location: string;
  title: string;
  description: string;
  pricingSuggestion: string;
  targetAudience: string[];
  bannerImage: string;
}

const CreateEvent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    eventType: '',
    date: '',
    time: '',
    ticketPrice: '',
    capacity: '',
    location: '',
    title: '',
    description: '',
    pricingSuggestion: '',
    targetAudience: [],
    bannerImage: ''
  });

  const eventTypes = [
    'Food Festival',
    'Wine Tasting',
    'Cooking Workshop',
    'Live Music & Dining',
    'Cultural Night',
    'Pop-up Market',
    'Community Gathering'
  ];

  const audienceSegments = [
    'Italian food lovers',
    'Wine enthusiasts',
    'Families with kids',
    'Young professionals',
    'Date night couples',
    'Food bloggers',
    'Vegetarian diners',
    'Premium diners'
  ];

  const handleGenerateTitle = async () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      const titles = [
        `${formData.eventType} Spectacular`,
        `Exclusive ${formData.eventType} Experience`,
        `Weekend ${formData.eventType} Fiesta`,
        `Premium ${formData.eventType} Night`
      ];
      const randomTitle = titles[Math.floor(Math.random() * titles.length)];
      setFormData({ ...formData, title: randomTitle });
      setIsGenerating(false);
      toast({
        title: "Title Generated!",
        description: "AI has created a catchy title for your event.",
      });
    }, 1500);
  };

  const handleGenerateDescription = async () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      const description = `Join us for an unforgettable ${formData.eventType.toLowerCase()} experience! Discover amazing flavors, meet fellow food enthusiasts, and enjoy a vibrant atmosphere. Perfect for ${formData.capacity ? `groups of up to ${formData.capacity} people` : 'everyone'}. Book your spot now for an evening you won't forget!`;
      setFormData({ ...formData, description });
      setIsGenerating(false);
      toast({
        title: "Description Generated!",
        description: "AI has crafted an engaging description for your event.",
      });
    }, 2000);
  };

  const handleGeneratePricing = async () => {
    setIsGenerating(true);
    // Simulate AI pricing analysis
    setTimeout(() => {
      const basePrice = parseInt(formData.ticketPrice) || 500;
      const suggestion = `Recommended: ₹${basePrice + 100} (15% premium for ${formData.eventType}) - Similar events in your area charge ₹${basePrice - 50} to ₹${basePrice + 200}`;
      setFormData({ ...formData, pricingSuggestion: suggestion });
      setIsGenerating(false);
      toast({
        title: "Pricing Analyzed!",
        description: "AI has analyzed market rates for optimal pricing.",
      });
    }, 1800);
  };

  const handleGenerateAudience = async () => {
    setIsGenerating(true);
    // Simulate AI audience targeting
    setTimeout(() => {
      const eventTypeMapping: { [key: string]: string[] } = {
        'Food Festival': ['Italian food lovers', 'Families with kids', 'Food bloggers'],
        'Wine Tasting': ['Wine enthusiasts', 'Date night couples', 'Premium diners'],
        'Cooking Workshop': ['Food bloggers', 'Young professionals', 'Families with kids'],
        'Live Music & Dining': ['Date night couples', 'Young professionals', 'Premium diners']
      };
      
      const suggestedAudience = eventTypeMapping[formData.eventType] || ['Young professionals', 'Food bloggers'];
      setFormData({ ...formData, targetAudience: suggestedAudience });
      setIsGenerating(false);
      toast({
        title: "Audience Recommended!",
        description: "AI has identified your ideal customer segments.",
      });
    }, 1200);
  };

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePublish = () => {
    toast({
      title: "Event Published!",
      description: "Your event is now live and available for bookings.",
    });
    navigate('/');
  };

  const stepTitles = [
    'Basic Details',
    'GenAI Content',
    'Smart Pricing',
    'Customer Targeting',
    'Visuals',
    'Review & Publish'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate(-1)}
                className="mr-3"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Organize Event</h1>
                <p className="text-sm text-gray-600">Step {currentStep} of 6: {stepTitles[currentStep - 1]}</p>
              </div>
            </div>
            <Badge variant="secondary">{Math.round((currentStep / 6) * 100)}% Complete</Badge>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
            <div 
              className="bg-orange-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 6) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6">
        {/* Step 1: Basic Details */}
        {currentStep === 1 && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Basic Event Details</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="eventType">Event Type *</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, eventType: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    {eventTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="time">Time *</Label>
                  <Input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ticketPrice">Ticket Price (₹) *</Label>
                  <Input
                    type="number"
                    placeholder="500"
                    value={formData.ticketPrice}
                    onChange={(e) => setFormData({ ...formData, ticketPrice: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="capacity">Capacity *</Label>
                  <Input
                    type="number"
                    placeholder="50"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="location">Location *</Label>
                <Input
                  placeholder="e.g., Your Restaurant Name, Koramangala"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>
            </div>
          </Card>
        )}

        {/* Step 2: GenAI Content */}
        {currentStep === 2 && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">GenAI Content Creation</h2>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="title">Event Title</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleGenerateTitle}
                    disabled={isGenerating || !formData.eventType}
                  >
                    <Wand2 className="h-4 w-4 mr-2" />
                    Generate Title
                  </Button>
                </div>
                <Input
                  placeholder="Event title will appear here..."
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="description">Event Description</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleGenerateDescription}
                    disabled={isGenerating || !formData.eventType}
                  >
                    <Wand2 className="h-4 w-4 mr-2" />
                    Generate Description
                  </Button>
                </div>
                <Textarea
                  placeholder="Event description will appear here..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              
              {(formData.title || formData.description) && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-900 mb-2">Preview & Edit</h3>
                  <p className="text-sm text-blue-700">
                    Your AI-generated content appears above. Feel free to edit and customize it to match your voice!
                  </p>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Step 3: Smart Pricing */}
        {currentStep === 3 && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Smart Pricing Intelligence</h2>
            <div className="space-y-4">
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="font-medium text-orange-900 mb-2">Current Price: ₹{formData.ticketPrice || '0'}</h3>
                <Button
                  variant="outline"
                  onClick={handleGeneratePricing}
                  disabled={isGenerating || !formData.ticketPrice}
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Analyze Market Pricing
                </Button>
              </div>
              
              {formData.pricingSuggestion && (
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h4 className="font-medium text-green-900 mb-2">AI Pricing Analysis</h4>
                  <p className="text-sm text-green-700">{formData.pricingSuggestion}</p>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Step 4: Customer Targeting */}
        {currentStep === 4 && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Customer Targeting</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">Select your target audience segments</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleGenerateAudience}
                  disabled={isGenerating || !formData.eventType}
                >
                  <Wand2 className="h-4 w-4 mr-2" />
                  Recommend Audience
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                {audienceSegments.map((segment) => (
                  <Button
                    key={segment}
                    variant={formData.targetAudience.includes(segment) ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      const newAudience = formData.targetAudience.includes(segment)
                        ? formData.targetAudience.filter(a => a !== segment)
                        : [...formData.targetAudience, segment];
                      setFormData({ ...formData, targetAudience: newAudience });
                    }}
                    className="justify-start text-left"
                  >
                    {segment}
                  </Button>
                ))}
              </div>
              
              {formData.targetAudience.length > 0 && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Selected Segments ({formData.targetAudience.length})</h4>
                  <p className="text-sm text-blue-700">
                    Your event will be promoted to: {formData.targetAudience.join(', ')}
                  </p>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Step 5: Visuals */}
        {currentStep === 5 && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Event Visuals</h2>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">Upload your event banner image</p>
                <Button variant="outline">
                  Choose File
                </Button>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-medium text-purple-900 mb-2">AI Banner Generation (Coming Soon)</h4>
                <p className="text-sm text-purple-700">
                  Generate professional event banners with AI based on your event details and brand colors.
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Step 6: Review & Publish */}
        {currentStep === 6 && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Review & Publish</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">{formData.title || 'Event Title'}</h3>
                <p className="text-gray-600 mb-3">{formData.description || 'Event description will appear here'}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><strong>Type:</strong> {formData.eventType}</div>
                  <div><strong>Date:</strong> {formData.date}</div>
                  <div><strong>Time:</strong> {formData.time}</div>
                  <div><strong>Price:</strong> ₹{formData.ticketPrice}</div>
                  <div><strong>Capacity:</strong> {formData.capacity} people</div>
                  <div><strong>Location:</strong> {formData.location}</div>
                </div>
                {formData.targetAudience.length > 0 && (
                  <div className="mt-3">
                    <strong>Target Audience:</strong> {formData.targetAudience.join(', ')}
                  </div>
                )}
              </div>
              
              <Button onClick={handlePublish} className="w-full bg-orange-500 hover:bg-orange-600">
                <Check className="h-4 w-4 mr-2" />
                Publish Event
              </Button>
            </div>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          
          {currentStep < 6 && (
            <Button 
              onClick={handleNext}
              disabled={
                (currentStep === 1 && (!formData.eventType || !formData.date || !formData.time || !formData.ticketPrice || !formData.capacity || !formData.location))
              }
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
