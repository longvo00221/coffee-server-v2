import { Module } from '@nestjs/common';
import { ToppingService } from './topping.service';
import { ToppingController } from './topping.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ToppingSchema } from './schemas/topping.schema';
@Module({
  imports:[MongooseModule.forFeature([{name:'Topping',schema:ToppingSchema}])],
  controllers: [ToppingController],
  providers: [ToppingService],
})
export class ToppingModule {}
