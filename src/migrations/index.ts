import * as migration_20260528_045123 from './20260528_045123';

export const migrations = [
  {
    up: migration_20260528_045123.up,
    down: migration_20260528_045123.down,
    name: '20260528_045123'
  },
];
