import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Collection } from './entities/transaction.entity';

@Module({
  imports: [SequelizeModule.forFeature([Collection])],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
