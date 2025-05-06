import { Order, OrderSide } from './Order';

export interface ITrade {
  pair: string;
  quantity: number;
  price: number;
}

export class OrderBook {
  private bids: Order[] = [];
  private asks: Order[] = [];

  public addOrder(order: Order): void {
    const book = order.side === OrderSide.BUY ? this.bids : this.asks;
    book.push(order);

    // Sort orders
    book.sort((a, b) => {
      const priceA = a.price || 0;
      const priceB = b.price || 0;
      return order.side === OrderSide.BUY ? priceB - priceA : priceA - priceB;
    });

    this.match();
  }

  private match(): void {
    while (this.bids.length > 0 && this.asks.length > 0) {
      const bestBid = this.bids[0];
      const bestAsk = this.asks[0];

      if (bestBid.price === null || bestAsk.price === null) {
        break; // Market orders not supported
      }

      if (bestBid.price < bestAsk.price) {
        break;
      }

      // Execute trade
      const tradePrice = (bestBid.price + bestAsk.price) / 2;
      const qty = Math.min(bestBid.remaining, bestAsk.remaining);

      bestBid.remaining -= qty;
      bestAsk.remaining -= qty;

      console.log(`Trade executed on ${bestBid.pair}: qty=${qty} price=${tradePrice}`);

      if (bestBid.remaining === 0) {
        this.bids.shift();
      }
      if (bestAsk.remaining === 0) {
        this.asks.shift();
      }
    }
  }

  public getTopOfBook(): { topBid: Order | null; topAsk: Order | null } {
    const topBid = this.bids.length > 0 ? this.bids[0] : null;
    const topAsk = this.asks.length > 0 ? this.asks[0] : null;
    return { topBid, topAsk };
  }
}
