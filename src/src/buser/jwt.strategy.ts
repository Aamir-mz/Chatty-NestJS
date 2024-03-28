import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { BuserService } from './buser.service'; 

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly buserService: BuserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secretKey', 
    });
  }

  async validate(payload: any) {
    const user = await this.buserService.findOneByEmail(payload.email);
    if (!user) {
      throw new Error('User not found');
    }
    return user; 
  }
}
