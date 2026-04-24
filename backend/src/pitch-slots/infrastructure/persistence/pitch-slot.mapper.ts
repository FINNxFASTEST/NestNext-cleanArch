import { PitchSlot } from '../../domain/pitch-slot';
import { PitchSlotSchemaClass } from './pitch-slot.schema';

export class PitchSlotMapper {
  public static toDomain(raw: PitchSlotSchemaClass): PitchSlot {
    const domainEntity = new PitchSlot();
    domainEntity.id = raw._id.toString();
    domainEntity.pitchId = raw.pitchId;
    domainEntity.campsiteId = raw.campsiteId;
    domainEntity.bookingId = raw.bookingId;
    domainEntity.date = raw.date;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    return domainEntity;
  }

  public static toPersistence(domainEntity: PitchSlot): PitchSlotSchemaClass {
    const persistenceSchema = new PitchSlotSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.pitchId = domainEntity.pitchId;
    persistenceSchema.campsiteId = domainEntity.campsiteId;
    persistenceSchema.bookingId = domainEntity.bookingId;
    persistenceSchema.date = domainEntity.date;
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;
    return persistenceSchema;
  }
}
