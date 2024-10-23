import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './modules/products/product.module';
import { ConfigModule } from '@nestjs/config';
import credentials from './configuration/credentials';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [credentials],
      isGlobal: true,
    }),
    MongooseModule.forRoot(credentials().MONGODB_CONNECTION),
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
