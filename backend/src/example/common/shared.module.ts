import { Global, Module } from '@nestjs/common';
import { PricingService } from './services/pricing.service';

// @Global() means NestJS registers this module's exports app-wide.
// Any module can inject PricingService WITHOUT importing SharedModule.
// Rule: only put truly cross-cutting services here (pricing, formatting, etc.)
@Global()
@Module({
  providers: [PricingService],
  exports: [PricingService],
})
export class SharedModule {}
