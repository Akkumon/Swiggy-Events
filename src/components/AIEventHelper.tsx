
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Wand2, Key } from 'lucide-react';
import { OpenAIService } from '@/services/openaiService';
import { useToast } from '@/hooks/use-toast';

interface AIEventHelperProps {
  onGenerateTitle: (title: string) => void;
  onGenerateDescription: (description: string) => void;
  onSuggestVendors: () => void;
  onGenerateMarketing: (content: string) => void;
  isLoading: boolean;
  eventData: {
    eventType: string;
    location: string;
    eventName: string;
  };
}

const AIEventHelper = ({
  onGenerateTitle,
  onGenerateDescription,
  onSuggestVendors,
  onGenerateMarketing,
  isLoading,
  eventData
}: AIEventHelperProps) => {
  const [apiKey, setApiKey] = useState('');
  const [showApiInput, setShowApiInput] = useState(false);
  const { toast } = useToast();

  const handleAIAction = async (action: 'title' | 'description' | 'marketing') => {
    if (!apiKey) {
      setShowApiInput(true);
      toast({
        title: "API Key Required",
        description: "Please enter your OpenAI API key to use AI features.",
        variant: "destructive",
      });
      return;
    }

    try {
      const openAIService = new OpenAIService(apiKey);
      
      switch (action) {
        case 'title':
          const title = await openAIService.generateEventTitle(
            eventData.eventType || 'Community Event',
            eventData.location || 'your area'
          );
          onGenerateTitle(title);
          break;
        case 'description':
          const description = await openAIService.generateEventDescription(
            eventData.eventType || 'Community Event',
            eventData.location || 'your area',
            eventData.eventName || 'Your Event'
          );
          onGenerateDescription(description);
          break;
        case 'marketing':
          const marketing = await openAIService.generateMarketingContent(
            eventData.eventName || 'Your Event',
            eventData.eventType || 'Community Event',
            eventData.location || 'your area'
          );
          onGenerateMarketing(marketing);
          break;
      }
      
      toast({
        title: "Content Generated",
        description: "AI has generated new content for your event!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate content. Please check your API key and try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-4 bg-orange-50/50">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Wand2 className="h-5 w-5 text-orange-500" />
          <h3 className="font-semibold text-orange-900">AI Event Assistant</h3>
        </div>

        {showApiInput && (
          <div className="space-y-2 p-3 bg-white rounded-lg border">
            <Label htmlFor="apiKey" className="text-sm font-medium">
              OpenAI API Key
            </Label>
            <div className="flex gap-2">
              <Input
                id="apiKey"
                type="password"
                placeholder="sk-..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="flex-1"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowApiInput(false)}
              >
                <Key className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-600">
              Your API key is stored locally and never shared.
            </p>
          </div>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <Button
            variant="outline"
            className="w-full border-orange-200 hover:bg-orange-100 text-xs sm:text-sm p-2 sm:p-3"
            onClick={() => handleAIAction('title')}
            disabled={isLoading}
          >
            <Wand2 className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
            <span className="truncate">Generate Title</span>
          </Button>
          
          <Button
            variant="outline"
            className="w-full border-orange-200 hover:bg-orange-100 text-xs sm:text-sm p-2 sm:p-3"
            onClick={() => handleAIAction('description')}
            disabled={isLoading}
          >
            <Wand2 className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
            <span className="truncate">Generate Description</span>
          </Button>
          
          <Button
            variant="outline"
            className="w-full border-orange-200 hover:bg-orange-100 text-xs sm:text-sm p-2 sm:p-3"
            onClick={onSuggestVendors}
            disabled={isLoading}
          >
            <Wand2 className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
            <span className="truncate">Suggest Vendors</span>
          </Button>
          
          <Button
            variant="outline"
            className="w-full border-orange-200 hover:bg-orange-100 text-xs sm:text-sm p-2 sm:p-3"
            onClick={() => handleAIAction('marketing')}
            disabled={isLoading}
          >
            <Wand2 className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
            <span className="truncate">Generate Marketing</span>
          </Button>
        </div>

        {isLoading && (
          <div className="text-sm text-orange-600 text-center animate-pulse">
            Generating suggestions...
          </div>
        )}
      </div>
    </Card>
  );
};

export default AIEventHelper;
