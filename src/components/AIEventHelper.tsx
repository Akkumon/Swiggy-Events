
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Key, Zap } from 'lucide-react';
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

  return (
    <div className="space-y-4">
      {/* Smart Generation - Primary Feature */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 rounded-lg text-white">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            <span className="font-medium">Smart Content Generation</span>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowApiInput(!showApiInput)}
            className="text-white hover:text-orange-100 hover:bg-white/10 p-1"
          >
            <Key className="h-4 w-4" />
          </Button>
        </div>
        
        <p className="text-sm text-orange-100 mb-4">
          Get personalized, context-aware content for your event with our smart AI assistant
        </p>
        
        <SmartPromptWizard
          trigger={
            <Button className="w-full bg-white hover:bg-gray-100 text-orange-600 font-medium shadow-sm">
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
        <div className="space-y-3 p-4 bg-white rounded-lg border border-orange-200">
          <Label htmlFor="apiKey" className="text-sm font-medium text-gray-900">
            OpenAI API Key (Optional)
          </Label>
          <Input
            id="apiKey"
            type="password"
            placeholder="sk-... (optional for enhanced responses)"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="border-orange-200 focus:border-orange-400"
          />
          <p className="text-xs text-gray-600">
            Add your API key for enhanced AI responses, or use our smart fallback generation.
          </p>
        </div>
      )}

      {isLoading && (
        <div className="text-sm text-orange-600 text-center animate-pulse py-2">
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <span className="ml-2">Creating amazing content...</span>
          </div>
        </div>
      )}

      <div className="text-xs text-gray-500 text-center bg-white/50 rounded p-2">
        💡 Smart Assistant provides context-aware content generation tailored to your event
      </div>
    </div>
  );
};

export default AIEventHelper;
