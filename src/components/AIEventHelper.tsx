import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Wand2, Key, Sparkles } from 'lucide-react';
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
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleAIAction = async (action: 'title' | 'description' | 'marketing') => {
    setIsGenerating(true);
    
    try {
      // Always try to generate content, with or without API key
      const openAIService = new OpenAIService(apiKey || '');
      
      let result = '';
      switch (action) {
        case 'title':
          result = await openAIService.generateEventTitle(
            eventData.eventType || 'Community Event',
            eventData.location || 'your area'
          );
          onGenerateTitle(result);
          break;
        case 'description':
          result = await openAIService.generateEventDescription(
            eventData.eventType || 'Community Event',
            eventData.location || 'your area',
            eventData.eventName || 'Your Event'
          );
          onGenerateDescription(result);
          break;
        case 'marketing':
          result = await openAIService.generateMarketingContent(
            eventData.eventName || 'Your Event',
            eventData.eventType || 'Community Event',
            eventData.location || 'your area'
          );
          onGenerateMarketing(result);
          break;
      }
      
      toast({
        title: "Content Generated Successfully!",
        description: apiKey && apiKey.startsWith('sk-') 
          ? "AI-powered content has been generated for your event!" 
          : "Smart content has been generated based on your event details!",
      });
    } catch (error) {
      toast({
        title: "Content Generated",
        description: "Fallback content has been created for your event.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="p-4 bg-orange-50/50">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-orange-500" />
            <h3 className="font-semibold text-orange-900">AI Event Assistant</h3>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowApiInput(!showApiInput)}
            className="text-orange-600 hover:text-orange-700 hover:bg-orange-100 p-1"
          >
            <Key className="h-4 w-4" />
          </Button>
        </div>

        {showApiInput && (
          <div className="space-y-2 p-3 bg-white rounded-lg border">
            <Label htmlFor="apiKey" className="text-sm font-medium">
              OpenAI API Key (Optional - for enhanced AI generation)
            </Label>
            <div className="flex gap-2">
              <Input
                id="apiKey"
                type="password"
                placeholder="sk-... (optional)"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="flex-1"
              />
            </div>
            <p className="text-xs text-gray-600">
              Add your API key for enhanced AI responses, or use our smart fallback generation.
            </p>
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="w-full border-orange-200 hover:bg-orange-100 text-sm py-3 h-auto min-h-[48px] flex items-center justify-start"
            onClick={() => handleAIAction('title')}
            disabled={isLoading || isGenerating}
          >
            <Wand2 className="mr-2 h-4 w-4 flex-shrink-0" />
            <span className="leading-tight">
              {isGenerating ? 'Generating...' : 'Generate Title'}
            </span>
          </Button>
          
          <Button
            variant="outline"
            className="w-full border-orange-200 hover:bg-orange-100 text-sm py-3 h-auto min-h-[48px] flex items-center justify-start"
            onClick={() => handleAIAction('description')}
            disabled={isLoading || isGenerating}
          >
            <Wand2 className="mr-2 h-4 w-4 flex-shrink-0" />
            <span className="leading-tight">
              {isGenerating ? 'Generating...' : 'Generate Description'}
            </span>
          </Button>
          
          <Button
            variant="outline"
            className="w-full border-orange-200 hover:bg-orange-100 text-sm py-3 h-auto min-h-[48px] flex items-center justify-start"
            onClick={onSuggestVendors}
            disabled={isLoading || isGenerating}
          >
            <Wand2 className="mr-2 h-4 w-4 flex-shrink-0" />
            <span className="leading-tight">Suggest Vendors</span>
          </Button>
          
          <Button
            variant="outline"
            className="w-full border-orange-200 hover:bg-orange-100 text-sm py-3 h-auto min-h-[48px] flex items-center justify-start"
            onClick={() => handleAIAction('marketing')}
            disabled={isLoading || isGenerating}
          >
            <Wand2 className="mr-2 h-4 w-4 flex-shrink-0" />
            <span className="leading-tight">
              {isGenerating ? 'Generating...' : 'Generate Marketing'}
            </span>
          </Button>
        </div>

        {(isLoading || isGenerating) && (
          <div className="text-sm text-orange-600 text-center animate-pulse">
            {isGenerating ? 'Creating amazing content...' : 'Generating suggestions...'}
          </div>
        )}

        <div className="text-xs text-gray-500 text-center">
          💡 AI-powered event assistant to help you create engaging content
        </div>
      </div>
    </Card>
  );
};

export default AIEventHelper;
