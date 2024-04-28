import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt-accessToken'){
    constructor(private reflector:Reflector) {
        super()
    }
    canActivate(context: ExecutionContext) {
        const isPrivate = this.reflector.getAllAndOverride<boolean>('isPrivate',[
            context.getHandler(),
            context.getClass()
        ])
        if(!isPrivate) return true
        return super.canActivate(context)
    }
}