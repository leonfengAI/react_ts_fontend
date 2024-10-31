import RiveScript from 'rivescript';

class RiveScriptHandler {
  private bot: RiveScript;
  private isInitialized: boolean = false;

  constructor() {
    this.bot = new RiveScript({
      utf8: true,
      debug: false,
      onDebug: null,
      concat: 'newline',
      errors: {
        replyNotFound: 'I don\'t know how to respond to that.',
        replyNotMatched: 'I don\'t understand. Could you rephrase that?',
        objectNotFound: 'I couldn\'t process that properly.',
        deepRecursion: 'I\'m having trouble processing that right now.'
      }
    });
  }

  async initialize() {
    if (this.isInitialized) return;

    const script = `
      ! version = 2.0

      + hello
      - Hello! How are you today?

      + how are you
      - I'm doing great, thanks for asking!
      - I'm functioning within normal parameters.
      - All systems operational!

      + what is your name
      - My name is ChatBot, nice to meet you!

      + (bye|goodbye)
      - Goodbye! Have a great day!
      - See you later!
      - Bye bye!

      + *
      - I'm not sure how to respond to that.
      - Could you rephrase that?
      - I don't understand. Try asking something else.
    `;

    try {
      await this.bot.stream(script);
      await this.bot.sortReplies();
      this.isInitialized = true;
    } catch (error) {
      console.error('Error initializing RiveScript:', error);
      throw error;
    }
  }

  async getResponse(message: string): Promise<string> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      const username = 'local-user';
      return await this.bot.reply(username, message);
    } catch (error) {
      console.error('Error getting RiveScript response:', error);
      return "I'm having trouble processing that right now.";
    }
  }
}

export const riveScriptHandler = new RiveScriptHandler();