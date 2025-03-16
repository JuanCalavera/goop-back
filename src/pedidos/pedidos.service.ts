import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class PedidosService {

  constructor(private prisma: PrismaService) { }

  async create(createPedidoDto: CreatePedidoDto) {

    const allItems = createPedidoDto.items;
    const allItemsInNumber = allItems.map(Number);
    const { items, ...pedidoWithoutItens } = createPedidoDto;
    const newPedido = await this.prisma.pedido.create({ data: pedidoWithoutItens });

    for (const value of allItemsInNumber) {
      const findPivot = await this.prisma.itemPedido.findUnique(
        {
          where: {
            pedidoId_itemId: {
              pedidoId: newPedido.id,
              itemId: value
            }
          }
        });

      if (!findPivot) {
        await this.prisma.itemPedido.create({ data: { "itemId": value, "pedidoId": newPedido.id } });
      }
    }

    return newPedido;
  }

  async findAll() {
    const allPedidos = await this.prisma.pedido.findMany({
      include: {
        itens: {
          include: {
            item: true,
          },
        },
      },
    });

    return allPedidos.map((pedido) => ({
      ...pedido,
      itens: pedido.itens.map((itemPedido) => itemPedido.item),
    }));
  }

  async findOne(id: number) {
    const pedido = await this.prisma.pedido.findUnique({
      where: { id },
      include: {
        itens: {
          include: {
            item: true,
          },
        },
      },
    });

    if (!pedido) {
      throw new BadRequestException('Unknow this pedido');
    }

    return {
      ...pedido,
      itens: pedido.itens.map((itemPedido) => itemPedido.item),
    };
  }

  async update(id: number, updatePedidoDto: UpdatePedidoDto) {
    const pedido = await this.findOne(id);

    await this.prisma.pedido.update({ where: { id }, data: updatePedidoDto });
    return { message: "Update Successfull" };
  }

  async remove(id: number) {
    const removable = await this.prisma.pedido.findUnique({ where: { id } })

    if (!removable) {
      throw new BadRequestException('Unknow this pedido');
    }

    await this.prisma.pedido.delete({ where: { id } });
    return `This action removes a pedido from client ${removable?.client}`;
  }
}
