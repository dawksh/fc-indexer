import pino from 'pino';

const transport = pino.transport({
    target: 'pino-pretty',
    options: { destination: 1 } // use 2 for stderr
  })

const logger = pino(transport);

export default logger;
