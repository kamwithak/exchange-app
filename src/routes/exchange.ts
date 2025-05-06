import { Router, Request, Response } from 'express';
import { Exchange } from '../models/Exchange';
import { OrderSide, OrderType } from '../models/Order';

const router = Router();
const exchange = new Exchange();

// Create a new trading pair
router.post('/pairs', (req: Request, res: Response) => {
  try {
    const { pair } = req.body;
    exchange.createPair(pair);
    res.json({ message: `Trading pair ${pair} created successfully` });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

// Deposit funds
router.post('/deposit', (req: Request, res: Response) => {
  try {
    const { userId, asset, amount } = req.body;
    exchange.deposit(userId, asset, amount);
    res.json({ message: 'Deposit successful' });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

// Get balance
router.get('/balance/:userId/:asset', (req: Request, res: Response) => {
  try {
    const { userId, asset } = req.params;
    const balance = exchange.getBalance(userId, asset);
    res.json({ balance });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

// Place an order
router.post('/orders', (req: Request, res: Response) => {
  try {
    const { userId, pair, side, quantity, price, orderType } = req.body;
    const order = exchange.placeOrder(
      userId,
      pair,
      side as OrderSide,
      quantity,
      price,
      orderType || OrderType.LIMIT
    );
    res.json(order);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

// Get order book
router.get('/orderbook/:pair', (req: Request, res: Response) => {
  try {
    const { pair } = req.params;
    const orderBook = exchange.getOrderBook(pair);
    if (!orderBook) {
      return res.status(404).json({ error: 'Trading pair not found' });
    }
    const { topBid, topAsk } = orderBook.getTopOfBook();
    res.json({ topBid, topAsk });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

export default router;
