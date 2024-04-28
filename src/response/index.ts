import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
@Injectable()
export class ResponseHandler {
    responseWithData(res, statusCode: HttpStatus, data: any, message?: string) {
        return res.status(statusCode).json({
            statusCode: HttpStatus.OK,
            message: message ? message : "Xử lý thành công",
            data: data,
        });
    }
    ok(res, data: any) {
        return this.responseWithData(res, HttpStatus.OK, data);
    }

    created(res, data: any) {
        return this.responseWithData(res, HttpStatus.CREATED, data);
    }

    error(res, statusCode: HttpStatus,message?:string) {
        return res.status(statusCode).json({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: "Oops! Something wrong!",
        });
    }

    badRequest(res, statusCode: HttpStatus, message?: string) {
        return res.status(statusCode).json({
            statusCode: HttpStatus.BAD_REQUEST,
            message,
        });
    }

    unauthorized(res, statusCode: HttpStatus) {
        return res.status(statusCode).json({
            statusCode: HttpStatus.UNAUTHORIZED,
            message: "Unauthorized",
        });
    }

    notFound(res, statusCode: HttpStatus) {
        return res.status(statusCode).json({
            statusCode: HttpStatus.NOT_FOUND,
            message: "Resource not found",
        });
    }
}