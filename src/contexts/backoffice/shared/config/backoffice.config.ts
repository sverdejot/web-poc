import { registerAs } from '@nestjs/config';
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';

export default registerAs('backoffice', () => ({
  ...(yaml.load(
    readFileSync(
      `${__dirname}/backoffice.config.${process.env.NODE_ENV ?? 'dev'}.yaml`,
      'utf-8',
    ),
  ) as Record<string, any>),
}));
