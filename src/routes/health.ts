// Express
import { Request, Response, NextFunction, Router } from 'express';

// Controllers
import HealthController from '@controllers/health-controller';

const router: Router = Router();

router.get('/api/v1/health', HealthController.checkHealth);

export default router;