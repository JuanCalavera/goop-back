import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PedidosModule } from './pedidos/pedidos.module';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [PedidosModule, ItemsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
