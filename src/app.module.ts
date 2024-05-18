import { Module } from '@nestjs/common';
import { ProdutoModule } from './produto/produto.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, ProdutoModule],
})
export class AppModule {}
