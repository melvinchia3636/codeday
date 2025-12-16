import PocketBase from 'pocketbase';

/**
 * PocketBase Client Service
 * Singleton pattern to manage PocketBase connection
 */
class PocketBaseService {
  private static instance: PocketBase;

  private constructor() {}

  /**
   * Get PocketBase instance
   */
  static getInstance(): PocketBase {
    if (!PocketBaseService.instance) {
      const url = process.env.POCKETBASE_URL || 'http://127.0.0.1:8090';
      PocketBaseService.instance = new PocketBase(url);
    }
    return PocketBaseService.instance;
  }

  /**
   * Authenticate as admin (optional, for admin operations)
   */
  static async authenticateAsAdmin(): Promise<void> {
    const pb = this.getInstance();
    const email = process.env.POCKETBASE_ADMIN_EMAIL;
    const password = process.env.POCKETBASE_ADMIN_PASSWORD;

    if (email && password) {
      try {
        await pb.admins.authWithPassword(email, password);
        console.log('✅ PocketBase admin authenticated');
      } catch (error) {
        console.error('❌ PocketBase admin authentication failed:', error);
      }
    }
  }

  /**
   * Check connection
   */
  static async checkHealth(): Promise<boolean> {
    try {
      const pb = this.getInstance();
      await pb.health.check();
      return true;
    } catch (error) {
      console.error('❌ PocketBase health check failed:', error);
      return false;
    }
  }
}

export default PocketBaseService;
