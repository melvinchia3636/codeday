import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'express-async-errors';
import { config } from 'dotenv';
import PocketBaseService from './config/pocketbase';
import { createRoutes } from './routes';
import { errorHandler, notFoundHandler } from './middleware/error.middleware';
import { devLogger, requestLogger } from './middleware/logger.middleware';

// Load environment variables
config();

/**
 * Express Application Setup
 */
class App {
  public app: Application;
  private port: number;

  constructor() {
    this.app = express();
    this.port = parseInt(process.env.PORT || '3000', 10);
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  /**
   * Initialize middlewares
   */
  private initializeMiddlewares(): void {
    // Security middleware
    this.app.use(helmet());

    // CORS middleware
    this.app.use(
      cors({
        origin: '*',
      })
    );

    // Body parser middleware
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // Logging middleware
    if (process.env.NODE_ENV === 'development') {
      this.app.use(devLogger);
    } else {
      this.app.use(requestLogger);
    }
  }

  /**
   * Initialize routes
   */
  private initializeRoutes(): void {
    const pb = PocketBaseService.getInstance();
    const apiPrefix = process.env.API_PREFIX || '/api/v1';

    // Mount API routes
    this.app.use(apiPrefix, createRoutes(pb));

    // Root endpoint
    this.app.get('/', (req, res) => {
      res.json({
        success: true,
        message: 'Express + PocketBase REST API',
        version: '1.0.0',
        endpoints: {
          health: `${apiPrefix}/health`,
          users: `${apiPrefix}/users`,
          docs: 'See README.md for API documentation',
        },
      });
    });
  }

  /**
   * Initialize error handling
   */
  private initializeErrorHandling(): void {
    // 404 handler
    this.app.use(notFoundHandler);

    // Global error handler
    this.app.use(errorHandler);
  }

  /**
   * Start the server
   */
  public async listen(): Promise<void> {
    try {
      // Check PocketBase connection
      const isHealthy = await PocketBaseService.checkHealth();
      if (!isHealthy) {
        console.warn('⚠️  Warning: PocketBase connection failed. Please check your configuration.');
      }

      // Optionally authenticate as admin
      if (process.env.POCKETBASE_ADMIN_EMAIL && process.env.POCKETBASE_ADMIN_PASSWORD) {
        await PocketBaseService.authenticateAsAdmin();
      }

      // Start server
      this.app.listen(this.port, () => {
        console.log('=================================');
        console.log(`🚀 Server running on port ${this.port}`);
        console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
        console.log(`🔗 API Prefix: ${process.env.API_PREFIX || '/api/v1'}`);
        console.log(`🗄️  PocketBase URL: ${process.env.POCKETBASE_URL || 'http://127.0.0.1:8090'}`);
        console.log('=================================');
      });
    } catch (error) {
      console.error('❌ Failed to start server:', error);
      process.exit(1);
    }
  }
}

// Create and start the application
const app = new App();
app.listen();

export default app;
