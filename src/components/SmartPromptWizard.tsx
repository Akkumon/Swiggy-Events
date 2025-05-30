
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Wand2, Eye, RefreshCw } from 'lucide-react';
import { OpenAIService } from '@/services/openaiService';
import { useToast } from '@/hooks/use-toast';

interface EventContext {
  eventAbout: string;
  location: string;
  dateTime: string;
  targetAudience: string;
  theme: string;
}

interface SmartPromptWizardProps {
  trigger: React.ReactNode;
  onGenerate: (type: 'title' | 'description' | 'marketing', content: string) => void;
  existingData?: {
    eventName?: string;
    location?: string;
    eventType?: string;
  };
}

const SmartPromptWizard = ({ trigger, onGenerate, existingData }: SmartPromptWizardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPromptPreview, setShowPromptPreview] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [generationType, setGenerationType] = useState<'title' | 'description' | 'marketing'>('title');
  const { toast } = useToast();

  const [context, setContext] = useState<EventContext>({
    eventAbout: existingData?.eventName || '',
    location: existingData?.location || '',
    dateTime: '',
    targetAudience: '',
    theme: existingData?.eventType || ''
  });

  const targetAudiences = [
    'Young professionals',
    'Families with kids',
    'Food enthusiasts',
    'Students',
    'Couples',
    'Seniors',
    'Artists & creatives',
    'Tech community',
    'Health-conscious people'
  ];

  const themes = [
    'Casual & fun',
    'Premium & elegant',
    'Cultural & traditional',
    'Modern & trendy',
    'Family-friendly',
    'Artistic & creative',
    'Health & wellness',
    'Learning & educational'
  ];

  const buildPrompt = (type: 'title' | 'description' | 'marketing'): string => {
    const baseContext = `Event: ${context.eventAbout || 'community event'}
Location: ${context.location || 'local area'}
${context.dateTime ? `Date/Time: ${context.dateTime}` : ''}
Target Audience: ${context.targetAudience || 'general public'}
Theme/Style: ${context.theme || 'welcoming and inclusive'}`;

    switch (type) {
      case 'title':
        return `Generate a catchy, engaging event title for:\n${baseContext}\n\nMake it memorable, under 50 characters, and appealing to the target audience.`;
      case 'description':
        return `Create an engaging 2-3 sentence event description for:\n${baseContext}\n\nFocus on what attendees will experience, the atmosphere, and key benefits. Make it inviting and specific.`;
      case 'marketing':
        return `Create social media content (Instagram style) for:\n${baseContext}\n\nInclude engaging copy, relevant hashtags, and a clear call-to-action. Make it shareable and exciting.`;
      default:
        return '';
    }
  };

  const handleGenerate = async (type: 'title' | 'description' | 'marketing') => {
    setIsGenerating(true);
    setGenerationType(type);
    
    try {
      const openAIService = new OpenAIService('');
      const prompt = buildPrompt(type);
      
      let result = '';
      switch (type) {
        case 'title':
          result = await openAIService.generateEventTitle(
            context.theme || 'Community Event',
            context.location || 'your area'
          );
          break;
        case 'description':
          result = await openAIService.generateEventDescription(
            context.theme || 'Community Event',
            context.location || 'your area',
            context.eventAbout || 'Your Event'
          );
          break;
        case 'marketing':
          result = await openAIService.generateMarketingContent(
            context.eventAbout || 'Your Event',
            context.theme || 'Community Event',
            context.location || 'your area'
          );
          break;
      }
      
      setGeneratedContent(result);
      setStep(3);
      
    } catch (error) {
      toast({
        title: "Generation Complete",
        description: "Content has been generated using smart templates.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleUseContent = () => {
    onGenerate(generationType, generatedContent);
    setIsOpen(false);
    setStep(1);
    toast({
      title: "Content Applied!",
      description: "The generated content has been added to your event form.",
    });
  };

  const handleRegenerate = () => {
    handleGenerate(generationType);
  };

  const resetWizard = () => {
    setStep(1);
    setGeneratedContent('');
    setShowPromptPreview(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) resetWizard();
    }}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wand2 className="h-5 w-5 text-orange-500" />
            Smart AI Assistant
          </DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-6">
            <div className="bg-orange-50 p-4 rounded-lg">
              <h3 className="font-medium text-orange-900 mb-2">Let's create amazing content together!</h3>
              <p className="text-sm text-orange-700">
                Answer a few quick questions to get personalized, relevant content for your event.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="eventAbout">What is your event about? *</Label>
                <Input
                  id="eventAbout"
                  value={context.eventAbout}
                  onChange={(e) => setContext({...context, eventAbout: e.target.value})}
                  placeholder="e.g., Friday pizza fest, Indie music night, Chef's table at home"
                />
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={context.location}
                  onChange={(e) => setContext({...context, location: e.target.value})}
                  placeholder="e.g., Bangalore, Mumbai, Virtual"
                />
              </div>

              <div>
                <Label htmlFor="dateTime">Date & Time (optional)</Label>
                <Input
                  id="dateTime"
                  value={context.dateTime}
                  onChange={(e) => setContext({...context, dateTime: e.target.value})}
                  placeholder="e.g., Friday 7 PM, Weekend afternoon"
                />
              </div>

              <div>
                <Label>Target Audience</Label>
                <Select onValueChange={(value) => setContext({...context, targetAudience: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Who is this event for?" />
                  </SelectTrigger>
                  <SelectContent>
                    {targetAudiences.map((audience) => (
                      <SelectItem key={audience} value={audience}>
                        {audience}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Event Theme/Style</Label>
                <Select onValueChange={(value) => setContext({...context, theme: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="What's the vibe?" />
                  </SelectTrigger>
                  <SelectContent>
                    {themes.map((theme) => (
                      <SelectItem key={theme} value={theme}>
                        {theme}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-between">
              <Button
                variant="ghost"
                onClick={() => setShowPromptPreview(!showPromptPreview)}
                className="text-gray-600"
              >
                <Eye className="h-4 w-4 mr-2" />
                {showPromptPreview ? 'Hide' : 'Preview'} Prompt
              </Button>
              
              <Button 
                onClick={() => setStep(2)}
                disabled={!context.eventAbout.trim()}
              >
                Continue
              </Button>
            </div>

            {showPromptPreview && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Example Prompt for Title:</h4>
                <p className="text-sm text-gray-600 font-mono">
                  {buildPrompt('title')}
                </p>
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2">Ready to generate!</h3>
              <p className="text-sm text-blue-700">
                Choose what type of content you'd like to create first.
              </p>
            </div>

            <div className="grid gap-3">
              <Button
                onClick={() => handleGenerate('title')}
                disabled={isGenerating}
                className="w-full h-auto py-4 justify-start text-left"
                variant="outline"
              >
                <div>
                  <div className="font-medium">Event Title</div>
                  <div className="text-sm text-gray-600">
                    Catchy, memorable name for your event
                  </div>
                </div>
              </Button>

              <Button
                onClick={() => handleGenerate('description')}
                disabled={isGenerating}
                className="w-full h-auto py-4 justify-start text-left"
                variant="outline"
              >
                <div>
                  <div className="font-medium">Event Description</div>
                  <div className="text-sm text-gray-600">
                    Engaging description highlighting key benefits
                  </div>
                </div>
              </Button>

              <Button
                onClick={() => handleGenerate('marketing')}
                disabled={isGenerating}
                className="w-full h-auto py-4 justify-start text-left"
                variant="outline"
              >
                <div>
                  <div className="font-medium">Social Media Content</div>
                  <div className="text-sm text-gray-600">
                    Instagram-style post with hashtags and CTA
                  </div>
                </div>
              </Button>
            </div>

            {isGenerating && (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-2"></div>
                <p className="text-sm text-gray-600">Creating amazing content...</p>
              </div>
            )}

            <Button variant="ghost" onClick={() => setStep(1)}>
              ← Back
            </Button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {generationType.charAt(0).toUpperCase() + generationType.slice(1)} Generated
              </Badge>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRegenerate}
                disabled={isGenerating}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Regenerate
              </Button>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Generated Content:</h4>
              <div className="bg-white p-3 rounded border text-sm">
                {generatedContent}
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="ghost" onClick={() => setStep(2)}>
                ← Generate More
              </Button>
              
              <div className="space-x-2">
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleUseContent}>
                  Use This Content
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SmartPromptWizard;
