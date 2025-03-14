import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ItemsService {

  constructor(private prisma: PrismaService) { }

  async create(createItemDto: CreateItemDto) {
    await this.prisma.item.create({ data: createItemDto });
    return createItemDto;
  }

  async findAll() {
    const allItems = await this.prisma.item.findMany();
    return allItems;
  }

  async findOne(id: number) {
    const item = await this.prisma.item.findUnique({where: {id}});

    if(!item){
      throw new BadRequestException('Unknow this item');
    }

    return item;
  }

  async update(id: number, updateItemDto: UpdateItemDto) {

    const item = await this.findOne(id);

    await this.prisma.item.update({where: {id}, data: updateItemDto});
    return `This action updates a #${id} item`;
  }

  async remove(id: number) {
    const removable = await this.prisma.item.findUnique({where: {id}});
    await this.prisma.item.delete({where: {id}});
    return `This action removes a ${removable?.product} item`;
  }
}
