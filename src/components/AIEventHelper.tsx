import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Wand2 } from 'lucide-react';

interface AIEventHelperProps {
  onGenerateTitle: () => void;
  onGenerateDescription: () => void;
  onSuggestVendors: () => void;
  onGenerateMarketing: () => void;
  isLoading: boolean;
}

const AIEventHelper = ({
  onGenerateTitle,
  onGenerateDescription,
  onSuggestVendors,
  onGenerateMarketing,
  isLoading
}: AIEventHelperProps) => {
  return (
    <Card className="p-4 bg-orange-50/50">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Wand2 className="h-5 w-5 text-orange-500" />
          <h3 className="font-semibold text-orange-900">AI Event Assistant</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            className="w-full border-orange-200 hover:bg-orange-100"
            onClick={onGenerateTitle}
            disabled={isLoading}
          >
            <Wand2 className="mr-2 h-4 w-4" />
            Generate Title
          </Button>
          
          <Button
            variant="outline"
            className="w-full border-orange-200 hover:bg-orange-100"
            onClick={onGenerateDescription}
            disabled={isLoading}
          >
            <Wand2 className="mr-2 h-4 w-4" />
            Generate Description
          </Button>
          
          <Button
            variant="outline"
            className="w-full border-orange-200 hover:bg-orange-100"
            onClick={onSuggestVendors}
            disabled={isLoading}
          >
            <Wand2 className="mr-2 h-4 w-4" />
            Suggest Vendors
          </Button>
          
          <Button
            variant="outline"
            className="w-full border-orange-200 hover:bg-orange-100"
            onClick={onGenerateMarketing}
            disabled={isLoading}
          >
            <Wand2 className="mr-2 h-4 w-4" />
            Generate Marketing
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