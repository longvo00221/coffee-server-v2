import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import {ExtractJwt, Strategy} from 'passport-jwt'
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt-accessToken'){
    constructor(private config:ConfigService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            serectOrKey:config.get('accesstoken-serect-key')
        })
    }
    async validate(payload:any){
        return payload
    }
}