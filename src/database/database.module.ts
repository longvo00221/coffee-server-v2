import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
console.log(process.env.MONGO_URL_PASSWORD)
@Module({
  imports:[MongooseModule.forRoot('mongodb+srv://admin:admin170103@tickcoffeetea.xoobcjz.mongodb.net/?retryWrites=true&w=majority&appName=TickCoffeeTea')],
})
export class DatabaseModule {}