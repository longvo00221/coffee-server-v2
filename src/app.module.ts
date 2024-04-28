import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ProductModule } from './product/product.module';
import { ConfigModule } from '@nestjs/config';
import { ToppingModule } from './topping/topping.module';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './common/guards/accessToken.guard';
@Module({
  imports: [DatabaseModule, ProductModule,ConfigModule.forRoot({ isGlobal: true}), ToppingModule, OrderModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService,{
    provide:APP_GUARD,
    useClass:AccessTokenGuard
  }],
})
export class AppModule {}
