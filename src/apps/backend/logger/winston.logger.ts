import {
  ConsoleLogger,
  ConsoleLoggerOptions,
  LoggerService,
} from '@nestjs/common';
import { createLogger, transports, format, Logger } from 'winston';
import { FileTransportOptions } from 'winston/lib/winston/transports';

const fileTransportOptFactory = (level: string): FileTransportOptions => ({
  level: level,
  filename: `${__dirname}/var/log/${level}.log`,
  maxsize: 10485760,
  maxFiles: 5,
  tailable: true,
  zippedArchive: true,
});

export default class WinstonLogger
  extends ConsoleLogger
  implements LoggerService
{
  private readonly logger: Logger;

  constructor(context: string, options?: ConsoleLoggerOptions) {
    options !== null || options !== undefined
      ? super(context)
      : super(context, options);
    this.logger = this.winstonFactory();
  }

  // TODO: make this config injectable
  private winstonFactory(): Logger {
    const infoFile = new transports.File(fileTransportOptFactory('info'));
    const errorFile = new transports.File(fileTransportOptFactory('error'));

    return createLogger({
      format: format.combine(
        format.label({ label: super.context }),
        format.timestamp(),
        format.json(),
      ),
      transports: [infoFile, errorFile],
    });
  }

  log(message: any, ...optionalParams: any[]): any {
    this.logger.info(message, optionalParams);
    super.log(message, ...optionalParams);
  }

  error(message: any, ...optionalParams: any[]): any {
    this.logger.error(message, optionalParams);
    super.error(message, ...optionalParams);
  }
  warn(message: any, ...optionalParams: any[]): any {
    this.logger.warn(message, optionalParams);
    super.warn(message, ...optionalParams);
  }

  debug(message: any, ...optionalParams: any[]): void {
    this.logger.debug(message, optionalParams);
    super.debug(message, ...optionalParams);
  }

  verbose(message: any, ...optionalParams: any[]): void {
    this.logger.verbose(message, optionalParams);
    super.verbose(message, ...optionalParams);
  }
}
