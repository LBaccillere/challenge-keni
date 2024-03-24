import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import useConfigurator from './config';
import { OrdersModule } from './orders/orders.module';
import { StatisticsModule } from './statistics/statistics.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';

const { MONGO_URI } = useConfigurator();

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ProductsModule,
    OrdersModule,
    StatisticsModule,
    FilesModule,
    MongooseModule.forRoot(MONGO_URI),
    ServeStaticModule.forRoot({
      rootPath: './uploads',
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
