import * as log4js from 'log4js';
import { log4jsConfig } from '../log4js.config';

log4js.configure(log4jsConfig);

export const logger = log4js.getLogger();
