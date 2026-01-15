import { IsString, IsInt, IsArray } from 'class-validator';

class ItemDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsInt()
  quantity: number;

  @IsInt()
  pricePerUnit: number;
}

export class PurchaseDto {
  @IsArray()
  purchases: ItemDto[];
}
