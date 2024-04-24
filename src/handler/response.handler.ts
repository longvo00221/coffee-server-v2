import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
@Injectable()
export class ResponseHandler {
    responseWithData(res, statusCode: HttpStatus, data: any) {
        return res.status(statusCode).json(data);
    }

    error(res) {
        throw new HttpException({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: "Oops! Something wrong!",
        }, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    badRequest(res, message: string) {
        throw new HttpException({
            status: HttpStatus.BAD_REQUEST,
            message,
        }, HttpStatus.BAD_REQUEST);
    }

    ok(res, data: any) {
        return this.responseWithData(res, HttpStatus.OK, data);
    }

    created(res, data: any) {
        return this.responseWithData(res, HttpStatus.CREATED, data);
    }

    unauthorize(res) {
        throw new HttpException({
            status: HttpStatus.UNAUTHORIZED,
            message: "Unauthorized",
        }, HttpStatus.UNAUTHORIZED);
    }

    notFound(res) {
        throw new HttpException({
            status: HttpStatus.NOT_FOUND,
            message: "Resource not found",
        }, HttpStatus.NOT_FOUND);
    }
}