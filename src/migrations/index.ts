import * as migration_20260528_045123 from './20260528_045123';
import * as migration_20260602_045435 from './20260602_045435';
import * as migration_20260602_050904 from './20260602_050904';

export const migrations = [
  {
    up: migration_20260528_045123.up,
    down: migration_20260528_045123.down,
    name: '20260528_045123',
  },
  {
    up: migration_20260602_045435.up,
    down: migration_20260602_045435.down,
    name: '20260602_045435',
  },
  {
    up: migration_20260602_050904.up,
    down: migration_20260602_050904.down,
    name: '20260602_050904'
  },
];
