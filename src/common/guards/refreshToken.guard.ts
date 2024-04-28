import { AuthGuard } from "@nestjs/passport";

export class RefreshTokenGuard extends AuthGuard('jwt-refreshToken'){
    constructor(){
        super()
    }
}