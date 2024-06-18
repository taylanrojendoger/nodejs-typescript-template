// Express
import { Request, Response, NextFunction } from "express";

// Libraries
import { verify } from 'jsonwebtoken';

// Types
import type { Algorithm, VerifyErrors } from 'jsonwebtoken';

class TokenValidator {

    // Validates Keycloak JWT. 
    public validateKeycloakJwt = async (req: Request, res: Response, next: NextFunction) => {
        if (req.originalUrl === '/api/v1/health') {
            return next();
        }

        try {
            const authorizationHeader: string = req.headers.authorization as string;

            if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
                throw new Error('Invalid authorization header format!');
            }

            const token: string = authorizationHeader?.split(' ')[1] as string;
            const publicKey: string = process.env.PUBLIC_KEY?.replace(/\\n/g, '\n') as string;
            const algorithm: Algorithm = process.env.VERIFY_ALGORITHM as Algorithm;

            if (!publicKey || !algorithm) {
                throw new Error('Missing required environment variable(s)!');
            }

            verify(token, publicKey, { algorithms: [algorithm] }, function (err: VerifyErrors | null, payload: any) {
                if (err) {
                    return res.status(401).json({ message: 'Unauthorized!' });
                }

                if (payload && 'realm_access' in payload) {
                    const neededRole = process.env.NEEDED_ROLE as string;

                    if (!neededRole) {
                        throw new Error('Missing required environment variable(s)!');
                    }

                    if (payload.realm_access.roles.includes(neededRole)) {
                        return next();
                    }
                }

                return res.status(403).json({ message: 'Access denied!' });
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

}

export default new TokenValidator();