import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { redisStore } from 'cache-manager-redis-yet';
import { PostgresConfigService } from './config/postgres.config.service';
import { OrderModule } from './modules/order/order.module';
import { ProductModule } from './modules/product/product.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    UserModule,
    ProductModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
    OrderModule,
    CacheModule.registerAsync({
      useFactory: async () => ({
        store: await redisStore({
          ttl: 10 * 60 * 1000,
          password: 'default',
          username: 'default',
        }),
      }),
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
