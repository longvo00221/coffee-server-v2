import { prop, pre, plugin } from '@typegoose/typegoose';
import { hash, compare } from 'bcryptjs';
import * as validator from 'validator';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import { SchemaFactory } from '@nestjs/mongoose';

@plugin(require('mongoose-unique-validator'))
@pre<User>('save', async function (this: User, next) {
    const salt = await hash.genSalt(10);
    this.password = await hash.hash(this.password, salt);
})
export class User {
    @prop({ required: true, maxlength: 30, minlength: 4 })
    name: string;

    @prop({ required: true, unique: true, validate: validator.isEmail })
    email: string;

    @prop({ required: true })
    phone: string;

    @prop({ required: true })
    password: string;

    @prop({ default: 'https://res.cloudinary.com/dvtv1j2rn/image/upload/v1672837539/avatars/defaultuser_eg3kpm.png' })
    avatar: string;

    @prop({ default: 'user' })
    role: string;

    @prop({ default: 'user' })
    surole: string;

    @prop()
    resetPasswordToken: string;

    @prop()
    resetPasswordExpire: Date;

    @prop({ required: true, default: 'TP Hồ Chí Minh' })
    address: string;

    @prop({ required: true })
    birthday: string;

    @prop({ required: true, default: null })
    verificationToken: string;

    @prop({ required: true, default: false })
    isAdmin: boolean;
    private _id: any;

    async matchPassword(enterPassword: string) {
        return await compare(enterPassword, this.password);
    }

    getJWTToken() {
        return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE,
        });
    }

    getResetPasswordToken() {
        const resetToken = crypto.randomBytes(20).toString('hex');

        this.resetPasswordToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');

        this.resetPasswordExpire = new Date(Date.now() + 15 * 60 * 1000);
        return resetToken;
    }
}

export const UserSchema = SchemaFactory.createForClass(User)