import {
  ForbiddenException,
  Injectable,
  ArgumentMetadata,
} from '@nestjs/common';
import { Express } from 'express';
import { Collection } from 'src/transactions/entities/transaction.entity';
import { InjectModel } from '@nestjs/sequelize';
import path from 'path';

@Injectable()
export class ImagesService {
  constructor(
    @InjectModel(Collection)
    private readonly collectionModel: typeof Collection,
  ) {}
  async uploadFile(id: string, file: Express.Multer.File) {
    let isValid: boolean = true;
    let reason;
    const item = await this.collectionModel.findByPk(id);
    if (!item) {
      throw new ForbiddenException('item not found');
    }
    if (item.dataValues.hasImage) {
      throw new ForbiddenException('User had already an image');
    }
    const extension = path.parse(file.originalname).ext;
    if (file.size < 262144000) {
      isValid = false;
      reason = 'File is too large';
    }
    if (extension !== 'PNG') {
      isValid = false;
      reason = 'File is too heavy';
    } else {
      this.updateItem(item.dataValues);
    }
    return {
      itemId: id,
      isValid: isValid,
      reason: reason,
    };
  }
  async updateItem(item: any) {
    const itemToUpdate = await this.collectionModel.findByPk(item.id);
    return await itemToUpdate?.update({ hasImage: true });
  }
}
