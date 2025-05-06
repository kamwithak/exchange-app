import { v4 as uuidv4 } from 'uuid';

export enum OrderSide {
  BUY = 'BUY',
  SELL = 'SELL',
}

export enum OrderType {
  LIMIT = 'LIMIT',
  MARKET = 'MARKET',
}

export interface IOrder {
  id: string;
  userId: string;
  side: OrderSide;
  pair: string;
  quantity: number;
  remaining: number;
  price: number | null;
  type: OrderType;
  createdAt: Date;
}

export class Order implements IOrder {
  public readonly id: string;
  public readonly userId: string;
  public readonly side: OrderSide;
  public readonly pair: string;
  public readonly quantity: number;
  public remaining: number;
  public readonly price: number | null;
  public readonly type: OrderType;
  public readonly createdAt: Date;

  constructor(
    userId: string,
    side: OrderSide,
    pair: string,
    quantity: number,
    price: number | null = null,
    orderType: OrderType = OrderType.LIMIT
  ) {
    this.id = uuidv4();
    this.userId = userId;
    this.side = side;
    this.pair = pair;
    this.quantity = quantity;
    this.remaining = quantity;
    this.price = price;
    this.type = orderType;
    this.createdAt = new Date();
  }

  public toString(): string {
    return `Order(id=${this.id}, side=${this.side}, pair=${this.pair}, qty=${this.quantity}, remain=${this.remaining}, price=${this.price}, type=${this.type})`;
  }
}
