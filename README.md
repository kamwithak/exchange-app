# Cryptocurrency Exchange API

A TypeScript-based cryptocurrency exchange API that implements a basic order matching engine with support for limit orders. This project demonstrates the core functionality of a cryptocurrency exchange, including order book management, order matching, and balance tracking.

## Features

- RESTful API built with Express.js and TypeScript
- Order book management with price-time priority
- Support for limit orders
- Balance tracking for multiple assets
- Type-safe implementation
- Comprehensive error handling
- Built-in testing setup with Jest
- Code quality tools (ESLint, Prettier)

## Prerequisites

- Node.js (v14 or higher)
- Yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd exchange-app
```

2. Install dependencies:
```bash
yarn install
```

3. Build the project:
```bash
yarn build
```

## Development

Start the development server with hot reload:
```bash
yarn dev
```

The server will start on port 3000 by default. You can change this by setting the `PORT` environment variable.

## API Endpoints

### Create Trading Pair
```http
POST /api/pairs
Content-Type: application/json

{
    "pair": "BTC/USDT"
}
```

### Deposit Funds
```http
POST /api/deposit
Content-Type: application/json

{
    "userId": "alice",
    "asset": "USDT",
    "amount": 10000
}
```

### Get Balance
```http
GET /api/balance/:userId/:asset
```

### Place Order
```http
POST /api/orders
Content-Type: application/json

{
    "userId": "alice",
    "pair": "BTC/USDT",
    "side": "BUY",
    "quantity": 0.5,
    "price": 30000,
    "orderType": "LIMIT"
}
```

### Get Order Book
```http
GET /api/orderbook/:pair
```

## Available Scripts

- `yarn dev` - Start development server with hot reload
- `yarn build` - Build the project
- `yarn start` - Start the production server
- `yarn test` - Run tests
- `yarn lint` - Check code style
- `yarn format` - Format code
- `yarn clean` - Clean build directory

## Project Structure

```
src/
├── models/           # Core business logic
│   ├── Exchange.ts   # Exchange implementation
│   ├── Order.ts      # Order model and types
│   └── OrderBook.ts  # Order book implementation
├── routes/           # API routes
│   └── exchange.ts   # Exchange API endpoints
└── server.ts         # Application entry point
```

## Testing

Run the test suite:
```bash
yarn test
```

Run tests with coverage:
```bash
yarn test --coverage
```

## Code Quality

The project uses ESLint and Prettier for code quality and formatting:

- Run linter:
```bash
yarn lint
```

- Fix linting issues:
```bash
yarn lint:fix
```

- Format code:
```bash
yarn format
```

## TypeScript

The project is written in TypeScript and includes:

- Strict type checking
- Interface definitions
- Enum types for order sides and types
- Proper error handling with type assertions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with Express.js
- TypeScript for type safety
- Jest for testing
- ESLint and Prettier for code quality 