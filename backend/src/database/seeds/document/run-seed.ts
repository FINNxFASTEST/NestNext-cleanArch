import { NestFactory } from '@nestjs/core';
import { UserSeedService } from './user/user-seed.service';
import { TenantSeedService } from './tenant/tenant-seed.service';

import { SeedModule } from './seed.module';

const runSeed = async () => {
  const app = await NestFactory.create(SeedModule);

  const users = await app.get(UserSeedService).run();
  await app.get(TenantSeedService).run(String(users.host._id));

  await app.close();
};

void runSeed();
