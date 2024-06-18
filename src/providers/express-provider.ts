// Express
import express from 'express';

// Routers
import HealthRouter from '@routes/health';

// Middlewares
import TokenValidator from '../middlewares/token-validator';

// Types
import type { Application } from 'express';

// Config
import cors from 'cors';
import cookieParser from 'cookie-parser';

class ExpressProvider {

    private express: Application;

    constructor() {
        this.express = express();

        this.useCors();
        this.useOptions();
        this.useJson();
        this.useCookieParser();
        this.useRoutes();
        // this.useMiddlewares();
    }

    private getPort(): number {
        return parseInt(process.env.PORT || '3000');
    }

    private listen(port: number): void {
        this.express.listen(port, () => {
            console.log(
                '\x1b[33m%s\x1b[0m',
                `Server :: Running @ 'http://localhost:${port}'`
            );
        });
    }

    public init(): void {
        const port: number = this.getPort();
        this.listen(port);
    }

    private useCors(): void {
        this.express.use(cors());
    }

    private useOptions(): void {
        this.express.options('*', cors());
    }

    private useJson(): void {
        this.express.use(express.json());
    }

    private useCookieParser(): void {
        this.express.use(cookieParser());
    }

    private useRoutes(): void {
        this.express.use(HealthRouter);
    }

    private useMiddlewares(): void {
        this.express.use('*', TokenValidator.validateKeycloakJwt);
    }

}

export default new ExpressProvider();