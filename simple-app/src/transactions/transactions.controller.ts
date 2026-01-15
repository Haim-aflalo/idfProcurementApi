import { Controller, Post, Body } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { PurchaseDto } from './dto/purchase-transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('purchase')
  purchase(@Body() purchaseDto: PurchaseDto) {
    return this.transactionsService.purchase(purchaseDto);
  }
  // @Post()
  // sell(@Body('sell') createTransactionDto: CreateTransactionDto) {
  //   return this.transactionsService.create(createTransactionDto);
  // }
}
