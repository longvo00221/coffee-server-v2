import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../user/schemas/user.schema';
import { Topping } from '../../topping/schemas/topping.schema';
import mongoose from 'mongoose';


export class Review {
    @Prop({ required: true })
    name: string

    @Prop({ required: true })
    comment: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    user: User
}


export class Product {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    normalizedName: string;

    @Prop({ required: true })
    englishName: string;

    @Prop({ required: true, unique: true })
    title: string;

    @Prop({ required: true })
    nameId: string;

    @Prop({ required: true })
    image: string;

    @Prop({ required: true, default: 0 })
    price: number;

    @Prop({ required: true, default: 0 })
    countInStock: number;

    @Prop({ ref: 'Topping' })
    toppings?:Topping[];

    @Prop()
    reviews?: Review[];
}
export const ProductSchema = SchemaFactory.createForClass(Product)