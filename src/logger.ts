import { LogEntry } from './monitor';

type LogHandler = (entry: LogEntry) => void;

let handler: LogHandler = () => { };

export const logger = {
  setHandler(newHandler: LogHandler) {
    handler = newHandler;
  },
  info(entry: Omit<LogEntry, 'level'>) {
    handler({ ...entry, level: 'info' });
  },
  warn(entry: Omit<LogEntry, 'level'>) {
    handler({ ...entry, level: 'warn' });
  },
  error(entry: Omit<LogEntry, 'level'>) {
    handler({ ...entry, level: 'error' });
  }
};