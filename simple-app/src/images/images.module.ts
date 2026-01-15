import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Collection } from 'src/transactions/entities/transaction.entity';

@Module({
  imports: [SequelizeModule.forFeature([Collection])],
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class ImagesModule {}
