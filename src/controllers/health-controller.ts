// Express
import { Request, Response } from 'express';

// Services
import HealthService from '@services/health-service';

class HealthController {

    private readonly healthService: HealthService;

    constructor() {
        this.healthService = new HealthService();
    }

    public async checkHealth(req: Request, res: Response): Promise<Response> {
        try {
            const data = this.healthService.checkHealth();
            return res.status(200).json(data);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Service unavailable.' });
        }
    }

}

export default new HealthController();