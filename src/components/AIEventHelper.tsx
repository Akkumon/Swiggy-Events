
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Wand2, Key, Sparkles, Zap } from 'lucide-react';
import { OpenAIService } from '@/services/openaiService';
import { useToast } from '@/hooks/use-toast';
import SmartPromptWizard from './SmartPromptWizard';

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

  const handleSmartGenerate = (type: 'title' | 'description' | 'marketing', content: string) => {
    switch (type) {
      case 'title':
        onGenerateTitle(content);
        break;
      case 'description':
        onGenerateDescription(content);
        break;
      case 'marketing':
        onGenerateMarketing(content);
        break;
    }
  };

  const handleAIAction = async (action: 'title' | 'description' | 'marketing') => {
    setIsGenerating(true);
    
    try {
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
        description: "Smart content has been generated based on your event details!",
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

        {/* Smart Generation - Primary Option */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border-2 border-purple-200">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-4 w-4 text-purple-600" />
            <span className="font-medium text-purple-900">Smart Generation</span>
          </div>
          <p className="text-sm text-purple-700 mb-3">
            Get better results with context-aware AI generation
          </p>
          
          <SmartPromptWizard
            trigger={
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                Start Smart Assistant
              </Button>
            }
            onGenerate={handleSmartGenerate}
            existingData={{
              eventName: eventData.eventName,
              location: eventData.location,
              eventType: eventData.eventType
            }}
          />
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
        
        {/* Quick Actions */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Quick Actions:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full border-orange-200 hover:bg-orange-100 text-xs py-2 h-auto min-h-[40px] flex items-center justify-start"
              onClick={() => handleAIAction('title')}
              disabled={isLoading || isGenerating}
            >
              <Wand2 className="mr-2 h-3 w-3 flex-shrink-0" />
              <span className="leading-tight">
                {isGenerating ? 'Generating...' : 'Quick Title'}
              </span>
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="w-full border-orange-200 hover:bg-orange-100 text-xs py-2 h-auto min-h-[40px] flex items-center justify-start"
              onClick={() => handleAIAction('description')}
              disabled={isLoading || isGenerating}
            >
              <Wand2 className="mr-2 h-3 w-3 flex-shrink-0" />
              <span className="leading-tight">
                {isGenerating ? 'Generating...' : 'Quick Description'}
              </span>
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="w-full border-orange-200 hover:bg-orange-100 text-xs py-2 h-auto min-h-[40px] flex items-center justify-start"
              onClick={onSuggestVendors}
              disabled={isLoading || isGenerating}
            >
              <Wand2 className="mr-2 h-3 w-3 flex-shrink-0" />
              <span className="leading-tight">Suggest Vendors</span>
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="w-full border-orange-200 hover:bg-orange-100 text-xs py-2 h-auto min-h-[40px] flex items-center justify-start"
              onClick={() => handleAIAction('marketing')}
              disabled={isLoading || isGenerating}
            >
              <Wand2 className="mr-2 h-3 w-3 flex-shrink-0" />
              <span className="leading-tight">
                {isGenerating ? 'Generating...' : 'Quick Marketing'}
              </span>
            </Button>
          </div>
        </div>

        {(isLoading || isGenerating) && (
          <div className="text-sm text-orange-600 text-center animate-pulse">
            {isGenerating ? 'Creating amazing content...' : 'Generating suggestions...'}
          </div>
        )}

        <div className="text-xs text-gray-500 text-center">
          💡 Smart Assistant provides context-aware content generation
        </div>
      </div>
    </Card>
  );
};

export default AIEventHelper;
