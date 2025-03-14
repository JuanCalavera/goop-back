import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class PedidosService {

  constructor(private prisma: PrismaService) { }

  async create(createPedidoDto: CreatePedidoDto) {
    await this.prisma.pedido.create({ data: createPedidoDto });
    return 'This action adds a new pedido';
  }

  async findAll() {
    const allPedidos = await this.prisma.pedido.findMany();
    return allPedidos;
  }

  async findOne(id: number) {
    const pedido = await this.prisma.pedido.findUnique({ where: { id } });

    if(!pedido){
      throw new BadRequestException('Unknow this pedido');
    }

    return pedido;
  }

  async update(id: number, updatePedidoDto: UpdatePedidoDto) {
    const pedido = await this.findOne(id);

    await this.prisma.pedido.update({ where: { id }, data: updatePedidoDto });
    return `Update Successfull`;
  }

  async remove(id: number) {
    const removable = await this.prisma.pedido.findUnique({ where: { id } })
    await this.prisma.pedido.delete({ where: { id } });
    return `This action removes a pedido from client ${removable?.client}`;
  }
}
