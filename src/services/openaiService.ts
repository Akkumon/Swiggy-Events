
export interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export class OpenAIService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateEventTitle(eventType: string, location: string): Promise<string> {
    // Try OpenAI first if API key is available
    if (this.apiKey && this.apiKey.startsWith('sk-')) {
      try {
        const messages: OpenAIMessage[] = [
          {
            role: 'system',
            content: 'You are a creative event naming assistant. Generate catchy, engaging event titles that would attract attendees. Keep titles under 50 characters.'
          },
          {
            role: 'user',
            content: `Generate a creative title for a ${eventType} event in ${location}. Make it sound exciting and appealing.`
          }
        ];
        const response = await this.makeRequest(messages);
        if (response) return response;
      } catch (error) {
        console.log('OpenAI failed, using fallback generation');
      }
    }

    // Fallback to template-based generation
    return this.generateFallbackTitle(eventType, location);
  }

  async generateEventDescription(eventType: string, location: string, title: string): Promise<string> {
    // Try OpenAI first if API key is available
    if (this.apiKey && this.apiKey.startsWith('sk-')) {
      try {
        const messages: OpenAIMessage[] = [
          {
            role: 'system',
            content: 'You are an event marketing expert. Create engaging, detailed event descriptions that highlight what attendees can expect. Include activities, atmosphere, and benefits. Keep descriptions between 100-200 words.'
          },
          {
            role: 'user',
            content: `Create an engaging description for "${title}" - a ${eventType} event in ${location}. Focus on the experience, activities, and what makes it special.`
          }
        ];
        const response = await this.makeRequest(messages);
        if (response) return response;
      } catch (error) {
        console.log('OpenAI failed, using fallback generation');
      }
    }

    // Fallback to template-based generation
    return this.generateFallbackDescription(eventType, location, title);
  }

  async generateMarketingContent(eventName: string, eventType: string, location: string): Promise<string> {
    // Try OpenAI first if API key is available
    if (this.apiKey && this.apiKey.startsWith('sk-')) {
      try {
        const messages: OpenAIMessage[] = [
          {
            role: 'system',
            content: 'You are a social media marketing expert. Create engaging marketing content for different platforms (Instagram, Facebook, Twitter). Include relevant hashtags and calls-to-action.'
          },
          {
            role: 'user',
            content: `Create marketing content for "${eventName}" - a ${eventType} in ${location}. Include posts for Instagram, Facebook, and Twitter with appropriate hashtags.`
          }
        ];
        const response = await this.makeRequest(messages);
        if (response) return response;
      } catch (error) {
        console.log('OpenAI failed, using fallback generation');
      }
    }

    // Fallback to template-based generation
    return this.generateFallbackMarketing(eventName, eventType, location);
  }

  private generateFallbackTitle(eventType: string, location: string): string {
    const titleTemplates = {
      'Food Festival': [
        `Flavors of ${location} Festival`,
        `${location} Food Extravaganza`,
        `Taste of ${location}`,
        `Culinary Delights in ${location}`
      ],
      'Music & Dining': [
        `${location} Music & Bites`,
        `Harmony & Flavors in ${location}`,
        `Dine & Groove ${location}`,
        `Musical Feast at ${location}`
      ],
      'Workshop': [
        `${location} Learning Hub`,
        `Skill Building in ${location}`,
        `Creative Workshop ${location}`,
        `Hands-on ${location} Experience`
      ],
      'Community Gathering': [
        `${location} Community Connect`,
        `Neighbors Unite in ${location}`,
        `${location} Social Circle`,
        `Community Spirit ${location}`
      ],
      'Pop-up Market': [
        `${location} Pop-up Bazaar`,
        `Weekend Market ${location}`,
        `Local Finds in ${location}`,
        `Artisan Market ${location}`
      ],
      'Cultural Event': [
        `Cultural Celebration ${location}`,
        `Heritage Festival ${location}`,
        `${location} Cultural Showcase`,
        `Traditional Arts in ${location}`
      ]
    };

    const templates = titleTemplates[eventType] || [
      `Amazing ${eventType} in ${location}`,
      `${location} ${eventType} Experience`,
      `Unforgettable ${eventType} at ${location}`
    ];

    return templates[Math.floor(Math.random() * templates.length)];
  }

  private generateFallbackDescription(eventType: string, location: string, title: string): string {
    const descriptionTemplates = {
      'Food Festival': `Join us for ${title}, where culinary excellence meets community spirit! Experience a diverse array of flavors from local restaurants and food vendors in ${location}. From street food favorites to gourmet delicacies, there's something to satisfy every palate. Enjoy live cooking demonstrations, taste testing sessions, and the chance to meet the talented chefs behind your favorite dishes. This family-friendly event promises delicious memories and new food discoveries. Don't miss this celebration of ${location}'s vibrant food scene!`,
      
      'Music & Dining': `Get ready for ${title}, an unforgettable evening combining great music with exceptional dining in ${location}! Experience live performances by talented local artists while enjoying carefully curated food from our partner restaurants. The perfect blend of acoustic ambiance and culinary artistry awaits you. Whether you're a music lover, foodie, or both, this event offers a unique atmosphere where melodies and flavors come together to create magical moments.`,
      
      'Workshop': `Discover new skills and connect with like-minded individuals at ${title} in ${location}! This hands-on workshop offers practical learning experiences led by industry experts. Whether you're a beginner or looking to advance your knowledge, our interactive sessions provide valuable insights and techniques. Enjoy networking opportunities, take-home materials, and the satisfaction of learning something new. Join our community of learners and makers in this enriching educational experience.`,
      
      'Community Gathering': `Come together for ${title}, a heartwarming community event in ${location}! This gathering celebrates the spirit of neighborhood connection and local pride. Enjoy activities for all ages, meet your neighbors, and participate in fun community initiatives. From games and entertainment to local showcases, this event strengthens the bonds that make our community special. Bring your family and friends for an afternoon of joy, connection, and community spirit.`,
      
      'Pop-up Market': `Explore unique finds and support local businesses at ${title} in ${location}! This curated pop-up market features handcrafted goods, artisanal products, and one-of-a-kind treasures from talented local vendors. Discover everything from handmade jewelry and artwork to specialty foods and vintage finds. It's the perfect opportunity to shop local, meet the makers, and find that special something you won't find anywhere else.`,
      
      'Cultural Event': `Immerse yourself in the rich cultural heritage at ${title} in ${location}! This vibrant celebration showcases traditional arts, performances, and customs that define our community's identity. Experience authentic music, dance, art exhibitions, and cultural demonstrations. Learn about diverse traditions, enjoy traditional cuisine, and participate in cultural activities that bring our community's heritage to life.`
    };

    return descriptionTemplates[eventType] || `Join us for ${title}, an exciting ${eventType} in ${location}! This carefully planned event brings together community members for an unforgettable experience. Enjoy engaging activities, connect with fellow attendees, and create lasting memories. Whether you're looking to learn, socialize, or simply have fun, this event offers something special for everyone. Don't miss this opportunity to be part of our vibrant ${location} community!`;
  }

  private generateFallbackMarketing(eventName: string, eventType: string, location: string): string {
    return `🎉 **Instagram Post:**
Don't miss ${eventName} in ${location}! ✨ An amazing ${eventType} experience awaits you. Join us for unforgettable moments and community connection! 
#${eventName.replace(/\s+/g, '')} #${location.replace(/\s+/g, '')}Events #Community #${eventType.replace(/\s+/g, '')} #LocalEvents

📘 **Facebook Post:**
We're excited to invite you to ${eventName}! This ${eventType} in ${location} promises to be an incredible experience for the whole community. Mark your calendars and bring your friends - you won't want to miss this special event!

🐦 **Twitter Post:**
🎊 ${eventName} is coming to ${location}! Join us for this amazing ${eventType} and be part of something special. See you there! #LocalEvents #Community #${eventType.replace(/\s+/g, '')}

📱 **Story Caption:**
Get ready for ${eventName}! Swipe up to learn more about this exciting ${eventType} in ${location}. Can't wait to see you there! 🙌`;
  }

  private async makeRequest(messages: OpenAIMessage[]): Promise<string> {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages,
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content?.trim() || '';
  }
}
