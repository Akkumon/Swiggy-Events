
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

    try {
      const response = await this.makeRequest(messages);
      return response || `${eventType} in ${location}`;
    } catch (error) {
      console.error('Error generating title:', error);
      return `Amazing ${eventType} Experience`;
    }
  }

  async generateEventDescription(eventType: string, location: string, title: string): Promise<string> {
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

    try {
      const response = await this.makeRequest(messages);
      return response || `Join us for an amazing ${eventType} experience in ${location}. Don't miss out on this incredible event!`;
    } catch (error) {
      console.error('Error generating description:', error);
      return `Experience the best ${eventType} in ${location}. Connect with your community and enjoy unforgettable moments.`;
    }
  }

  async generateMarketingContent(eventName: string, eventType: string, location: string): Promise<string> {
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

    try {
      const response = await this.makeRequest(messages);
      return response || `🎉 Don't miss ${eventName}! Join us for an amazing ${eventType} experience in ${location}. #Events #Community #${eventType.replace(/\s+/g, '')}`;
    } catch (error) {
      console.error('Error generating marketing content:', error);
      return `🎉 Join us for ${eventName} in ${location}! An unforgettable ${eventType} experience awaits. #LocalEvents #Community`;
    }
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
