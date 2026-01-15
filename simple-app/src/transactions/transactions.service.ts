import { ForbiddenException, Injectable } from '@nestjs/common';
import { PurchaseDto } from './dto/purchase-transaction.dto';
import { Collection } from './entities/transaction.entity';
import { InjectModel } from '@nestjs/sequelize';
import fs from 'fs';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Collection)
    private readonly collectionModel: typeof Collection,
  ) {}

  async checkOrCreateItem(id: string, item: any) {
    const itemToFound = await this.collectionModel.findByPk(item.id);
    if (!itemToFound) {
      const newItem = await this.collectionModel.create(item);
      return newItem;
    }
    return itemToFound;
  }

  async updateItem(item: any) {
    const itemToUpdate = await this.collectionModel.findByPk(item.id);
    return await itemToUpdate?.update(item);
  }

  async purchase(purchaseDto: PurchaseDto) {
    const results: Object[] = [];
    const budget = await JSON.parse(
      fs.readFileSync('src/data/budget.json', 'utf8'),
    );
    console.log(budget);

    for (let i in purchaseDto.purchases) {
      const item = await this.checkOrCreateItem(
        purchaseDto.purchases[i].id,
        purchaseDto.purchases[i],
      );

      if (
        purchaseDto.purchases[i].pricePerUnit *
          purchaseDto.purchases[i].quantity >
        budget.currentBudget
      ) {
        throw new ForbiddenException(`not enough money to buy this product`);
      }
      if (purchaseDto.purchases[i].quantity > item.dataValues.quantity) {
        throw new ForbiddenException(
          `not enough quantity available to this product`,
        );
      } else {
        item.dataValues.quantity -= purchaseDto.purchases[i].quantity;
        fs.writeFileSync(
          'src/data/budget.json',
          JSON.stringify({
            currentBudget:
              budget.currentBudget -
              purchaseDto.purchases[i].pricePerUnit *
                purchaseDto.purchases[i].quantity,
          }),
        );
        await this.updateItem(item.dataValues);
        results.push({
          id: purchaseDto.purchases[i].id,
          newQuantity: purchaseDto.purchases[i].quantity,
          spent:
            purchaseDto.purchases[i].pricePerUnit *
            purchaseDto.purchases[i].quantity,
        });
      }
    }
    return { results: results };
  }
}
