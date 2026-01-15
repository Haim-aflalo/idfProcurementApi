import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'Collection',
  timestamps: false,
})
export class Collection extends Model<Collection> {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    unique: true,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  type: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  pricePerUnit: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  hasImage: boolean;
}
