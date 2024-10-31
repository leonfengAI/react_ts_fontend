import { Message } from '../types';
import { AVATARS } from '../constants';
import { RiveScriptService } from './RiveScriptService';

export class ChatService {
  private riveScriptService: RiveScriptService;
  private isRiveScriptMode: boolean = false;
  private messageCounter: number = 0;

  constructor() {
    this.riveScriptService = new RiveScriptService();
  }

  private generateUniqueId(): string {
    this.messageCounter += 1;
    return `msg-${Date.now()}-${this.messageCounter}`;
  }

  private getRandomImage(): string {
    const width = 800;
    const height = 600;
    const randomId = Math.floor(Math.random() * 1000);
    return `https://picsum.photos/seed/${randomId}/${width}/${height}`;
  }

  async processMessage(input: string): Promise<Message> {
    const normalizedInput = input.toLowerCase().trim();
    
    let response: string;
    
    try {
      if (normalizedInput === 'rivescript test') {
        this.isRiveScriptMode = true;
        response = 'RiveScript mode activated! Try saying "hello", "how are you", or "what is your name"';
      } else if (this.isRiveScriptMode) {
        response = await this.riveScriptService.getResponse(input);
      } else {
        response = await this.getStandardResponse(normalizedInput);
      }
    } catch (error) {
      console.error('Error processing message:', error);
      response = "I apologize, but I'm having trouble processing your message right now.";
    }

    return {
      id: this.generateUniqueId(),
      text: response,
      sender: 'bot',
      timestamp: new Date(),
      avatar: AVATARS.bot
    };
  }

  private async getStandardResponse(input: string): Promise<string> {
    switch (input) {
      case 'kd test':
        return `
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Row 1-1  | Row 1-2  | Row 1-3  |
| Row 2-1  | Row 2-2  | Row 2-3  |
| Row 3-1  | Row 3-2  | Row 3-3  |
| Row 4-1  | Row 4-2  | Row 4-3  |`;
      case 'image test':
        const randomImage = this.getRandomImage();
        return `Here's a random image for you:\n\n![Random Image](${randomImage})`;
      default:
        return 'Try `kd test`, `image test`, or `rivescript test` to see special formatting.';
    }
  }
}