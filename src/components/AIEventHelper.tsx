
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Key } from 'lucide-react';
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

  return (
    <div className="space-y-4">
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
        💡 AI Assistant provides context-aware content generation tailored to your event
      </div>
    </div>
  );
};

export default AIEventHelper;
