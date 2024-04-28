import { ForbiddenException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { Strategy } from "passport-jwt";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy,'refreshToken'){
    constructor(config:ConfigService) {
        super({
            jwtFromRequest: (req:Request) => {
                const rftoken = req?.get('refreshToken')
                if(rftoken){
                    return rftoken
                }
                return null
            },
            serectOrKey:config.get<string>('refreshtoken-secret-key'),
            passReqToCallback:true
        })
    }
    async validate(req:Request,payload:JwtPayload){
        const rftoken = req?.get('refreshToken')
        if(!rftoken){
            throw new ForbiddenException('rf missing')
        }
        return {
            ...payload,
            rftoken
        }
    }
}