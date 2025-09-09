# Farcaster Indexer

A high-performance indexer for Farcaster that processes hub events and maintains user connection data in real-time.

## Overview

This indexer connects to a Farcaster Hub, subscribes to message events, and processes user connections (follows/unfollows) asynchronously. It uses Redis for data storage and implements a queue-based architecture for reliable message processing.

## Features

- **Real-time Event Processing**: Subscribes to Farcaster Hub events via WebSocket
- **Message Filtering**: Processes cast and reaction messages (types 5 & 6)
- **User Connection Tracking**: Maintains follower/following relationships
- **Queue-based Architecture**: Asynchronous processing with Redis-backed queues
- **Type-safe**: Full TypeScript support with Zod validation
- **Structured Logging**: Pino-based logging with configurable levels

## Architecture

```
Farcaster Hub → processHubMessages → Queue → processQueue → Redis
```

- **processHubMessages**: Connects to hub, filters messages, adds to queue
- **processQueue**: Processes queued messages, updates user connections
- **Redis Storage**: Stores user connections as sets (`fc-user-connections:{fid}`)

## Prerequisites

- Bun runtime
- Redis server
- Access to a Farcaster Hub

## Installation

```bash
# Install dependencies
bun install
```

## Configuration

Create a `.env` file with the following variables:

```env
HUB_API_URL=https://your-farcaster-hub.com
REDIS_URL=redis://localhost:6379
PINO_LOG_LEVEL=info
```

### Environment Variables

- `HUB_API_URL`: Farcaster Hub RPC endpoint URL
- `REDIS_URL`: Redis connection URL
- `PINO_LOG_LEVEL`: Log level (optional, defaults to info)

## Usage

### Development

```bash
# Start development server with hot reload
bun run dev
```

### Production

```bash
# Build for production
bun run build:prod

# Start production server
bun run start
```

### Available Scripts

- `bun run dev` - Start development with nodemon
- `bun run build` - Build TypeScript to JavaScript
- `bun run build:prod` - Build with minification
- `bun run start` - Run production build
- `bun run clean` - Clean build directory
- `bun run type-check` - Run TypeScript type checking

## Data Structure

### Redis Keys

- `fc-messages`: Queue for incoming messages
- `fc-user-connections:{fid}`: Set of user IDs that fid follows

### Message Types Processed

- `LINK_ADD` (MessageType 5): User follows another user
- `LINK_REMOVE` (MessageType 6): User unfollows another user

## Dependencies

- `@farcaster/hub-nodejs`: Farcaster Hub client
- `redis`: Redis client for data storage and queuing
- `pino`: Structured logging
- `zod`: Runtime type validation
- `dotenv`: Environment variable management

## Error Handling

- Automatic reconnection to Farcaster Hub on connection failures
- Queue processing continues with retry logic on Redis errors
- Comprehensive error logging for debugging

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
