import { Order, OrderSide, OrderType } from './Order';
import { OrderBook } from './OrderBook';

export class Exchange {
  private orderbooks: Map<string, OrderBook>;
  private balances: Map<string, Map<string, number>>;

  constructor() {
    this.orderbooks = new Map();
    this.balances = new Map();
  }

  public createPair(pair: string): void {
    if (!this.orderbooks.has(pair)) {
      this.orderbooks.set(pair, new OrderBook());
    }
  }

  public deposit(userId: string, asset: string, amount: number): void {
    if (!this.balances.has(userId)) {
      this.balances.set(userId, new Map());
    }
    const userBalances = this.balances.get(userId)!;
    const currentBalance = userBalances.get(asset) || 0;
    userBalances.set(asset, currentBalance + amount);
  }

  public getBalance(userId: string, asset: string): number {
    return this.balances.get(userId)?.get(asset) || 0;
  }

  public placeOrder(
    userId: string,
    pair: string,
    side: OrderSide,
    quantity: number,
    price: number | null = null,
    orderType: OrderType = OrderType.LIMIT
  ): Order {
    const [base, quote] = pair.split('/');
    const cost = quantity * (price || 0);

    // Check and update balances
    if (side === OrderSide.BUY) {
      if (this.getBalance(userId, quote) < cost) {
        throw new Error('Insufficient quote balance');
      }
      const userBalances = this.balances.get(userId)!;
      userBalances.set(quote, userBalances.get(quote)! - cost);
    } else {
      if (this.getBalance(userId, base) < quantity) {
        throw new Error('Insufficient base balance');
      }
      const userBalances = this.balances.get(userId)!;
      userBalances.set(base, userBalances.get(base)! - quantity);
    }

    const order = new Order(userId, side, pair, quantity, price, orderType);
    this.orderbooks.get(pair)!.addOrder(order);
    return order;
  }

  public getOrderBook(pair: string): OrderBook | undefined {
    return this.orderbooks.get(pair);
  }
}
