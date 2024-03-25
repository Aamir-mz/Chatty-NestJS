import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class TokenService {
    generateToken(length: number = 32): string {
        return crypto.randomBytes(length).toString('hex');
    }
}
