import RiveScript from 'rivescript';

export class RiveScriptService {
  private bot: RiveScript | null = null;
  private isInitialized: boolean = false;

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Create bot instance only when needed
      this.bot = new RiveScript({
        utf8: true,
        debug: false,
        onDebug: null,
        concat: 'newline'
      });

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

      await this.bot.stream(script);
      await this.bot.sortReplies();
      this.isInitialized = true;
    } catch (error) {
      console.error('Error initializing RiveScript:', error);
      this.bot = null;
      throw error;
    }
  }

  async getResponse(message: string): Promise<string> {
    try {
      if (!this.bot || !this.isInitialized) {
        await this.initialize();
      }

      if (!this.bot) {
        throw new Error('RiveScript initialization failed');
      }

      const username = 'local-user';
      return await this.bot.reply(username, message);
    } catch (error) {
      console.error('Error getting RiveScript response:', error);
      return "I'm having trouble processing that right now. Please try again later.";
    }
  }
}