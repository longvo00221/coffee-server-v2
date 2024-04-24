import { prop, pre, plugin } from '@typegoose/typegoose';

@plugin(require('mongoose-unique-validator'))
export class Topping {
    @prop({ required: true })
    name: string;

    @prop({ required: true })
    value: string;

    @prop({ required: true })
    label: string;

    @prop({ required: true, unique: true })
    title: string;

    @prop({ required: true })
    nameId: string;

    @prop({ required: true })
    image: string;

    @prop({ required: true, default: 0 })
    price: number;

    @prop({ required: true, default: 0 })
    countInStock: number;
}