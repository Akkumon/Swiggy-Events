
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Wand2, Copy, RefreshCw, Eye, Edit3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface GeneratedContent {
  title: string;
  description: string;
  socialMedia: string;
}

const AIContentShowcase = ({ eventType, cuisine, location }: { 
  eventType: string; 
  cuisine: string; 
  location: string;
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [content, setContent] = useState<GeneratedContent[]>([]);
  const [selectedContent, setSelectedContent] = useState<GeneratedContent | null>(null);
  const [editMode, setEditMode] = useState<string | null>(null);
  const { toast } = useToast();

  const generateContent = async () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const variations: GeneratedContent[] = [
        {
          title: `${cuisine} Culinary Experience at ${location}`,
          description: `Join us for an exclusive ${cuisine} dining experience that celebrates authentic flavors and culinary artistry. Our expert chefs will take you on a gastronomic journey featuring signature dishes, fresh ingredients, and traditional cooking techniques. Perfect for food enthusiasts looking to explore new tastes in a warm, welcoming atmosphere.`,
          socialMedia: `🍽️ EXCLUSIVE ${cuisine.toUpperCase()} EXPERIENCE at ${location}! ✨

Join us for an unforgettable culinary journey featuring:
🔥 Signature dishes by expert chefs
🌿 Fresh, authentic ingredients
👨‍🍳 Traditional cooking techniques
💝 Perfect for food lovers

Book now and taste the difference! 

#${cuisine.replace(/\s+/g, '')}Food #${location.replace(/\s+/g, '')}Eats #CulinaryExperience #AuthenticFlavors #FoodLovers #LocalEvents`
        },
        {
          title: `Artisan ${cuisine} Night - ${location}`,
          description: `Experience the finest ${cuisine} cuisine in an intimate setting at ${location}. Our passionate chefs craft each dish with premium ingredients and time-honored recipes. Enjoy an evening of exceptional food, great company, and unforgettable flavors. Limited seating ensures a personalized dining experience.`,
          socialMedia: `🌟 ARTISAN ${cuisine.toUpperCase()} NIGHT 🌟

📍 ${location}
👨‍🍳 Passionate chefs, premium ingredients
🍷 Intimate setting, limited seating
✨ Unforgettable flavors await

Reserve your table today!

#Artisan${cuisine.replace(/\s+/g, '')} #${location.replace(/\s+/g, '')}Dining #PremiumFood #IntimateExperience #LimitedSeating #ReserveNow`
        },
        {
          title: `${location} ${cuisine} Festival`,
          description: `Celebrate the rich heritage of ${cuisine} cuisine at our vibrant food festival in ${location}. Discover diverse flavors, meet talented chefs, and enjoy live cooking demonstrations. From traditional favorites to modern interpretations, this festival showcases the best of ${cuisine} culinary culture in a lively, community-focused environment.`,
          socialMedia: `🎉 ${location.toUpperCase()} ${cuisine.toUpperCase()} FESTIVAL! 🎉

🍜 Diverse flavors & dishes
👨‍🍳 Meet talented chefs
🎪 Live cooking demonstrations
🎊 Traditional + modern cuisine
🤝 Community celebration

Don't miss this culinary celebration!

#${location.replace(/\s+/g, '')}Festival #${cuisine.replace(/\s+/g, '')}Heritage #FoodFestival #LiveCooking #CulinaryTradition #CommunityEvent`
        }
      ];
      
      setContent(variations);
      setSelectedContent(variations[0]);
      setIsGenerating(false);
    }, 2000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Content copied to clipboard",
    });
  };

  const handleEdit = (field: string, value: string) => {
    if (selectedContent) {
      setSelectedContent({
        ...selectedContent,
        [field]: value
      });
    }
  };

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Wand2 className="h-5 w-5 text-orange-600" />
          <h3 className="font-semibold text-gray-900">AI Content Generator</h3>
        </div>
        <Button 
          onClick={generateContent}
          disabled={isGenerating}
          size="sm"
        >
          {isGenerating ? "Generating..." : "Generate Content"}
        </Button>
      </div>

      {!content.length && !isGenerating && (
        <div className="text-center py-8 text-gray-500">
          <Wand2 className="h-8 w-8 mx-auto mb-2 text-gray-300" />
          <p className="text-sm">Generate professional event content with AI</p>
          <p className="text-xs text-gray-400 mt-1">Titles, descriptions, and social media posts</p>
        </div>
      )}

      {isGenerating && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-3"></div>
          <p className="text-sm text-gray-600">Creating professional content...</p>
          <p className="text-xs text-gray-400 mt-1">Analyzing {eventType} • {cuisine} • {location}</p>
        </div>
      )}

      {content.length > 0 && (
        <div className="space-y-4">
          {/* Content Variations */}
          <div>
            <h4 className="text-sm font-medium mb-2">Choose Your Style:</h4>
            <div className="grid grid-cols-1 gap-2">
              {content.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedContent(item)}
                  className={`text-left p-3 rounded-lg border transition-colors ${
                    selectedContent?.title === item.title
                      ? 'bg-orange-50 border-orange-200'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="font-medium text-sm">{item.title}</div>
                  <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {item.description.substring(0, 100)}...
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Selected Content Preview */}
          {selectedContent && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-orange-50 to-red-50 p-3 rounded-lg">
                <h4 className="font-medium text-orange-900 mb-1">Generated Content Preview</h4>
                <p className="text-xs text-orange-700">Edit any section by clicking the edit icon</p>
              </div>

              {/* Title */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Event Title</Label>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditMode(editMode === 'title' ? null : 'title')}
                      className="h-6 w-6 p-0"
                    >
                      <Edit3 className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(selectedContent.title)}
                      className="h-6 w-6 p-0"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                {editMode === 'title' ? (
                  <Textarea
                    value={selectedContent.title}
                    onChange={(e) => handleEdit('title', e.target.value)}
                    className="min-h-0 h-12"
                  />
                ) : (
                  <div className="p-2 bg-white border rounded text-sm">
                    {selectedContent.title}
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Event Description</Label>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditMode(editMode === 'description' ? null : 'description')}
                      className="h-6 w-6 p-0"
                    >
                      <Edit3 className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(selectedContent.description)}
                      className="h-6 w-6 p-0"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                {editMode === 'description' ? (
                  <Textarea
                    value={selectedContent.description}
                    onChange={(e) => handleEdit('description', e.target.value)}
                    className="min-h-[100px]"
                  />
                ) : (
                  <div className="p-3 bg-white border rounded text-sm leading-relaxed">
                    {selectedContent.description}
                  </div>
                )}
              </div>

              {/* Social Media */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Social Media Post</Label>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditMode(editMode === 'socialMedia' ? null : 'socialMedia')}
                      className="h-6 w-6 p-0"
                    >
                      <Edit3 className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(selectedContent.socialMedia)}
                      className="h-6 w-6 p-0"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                {editMode === 'socialMedia' ? (
                  <Textarea
                    value={selectedContent.socialMedia}
                    onChange={(e) => handleEdit('socialMedia', e.target.value)}
                    className="min-h-[120px] font-mono text-xs"
                  />
                ) : (
                  <div className="p-3 bg-white border rounded text-xs font-mono leading-relaxed whitespace-pre-line">
                    {selectedContent.socialMedia}
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={generateContent}
                  variant="outline" 
                  size="sm"
                  className="flex-1"
                >
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Regenerate
                </Button>
                <Button size="sm" className="flex-1">
                  Use This Content
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

export default AIContentShowcase;
