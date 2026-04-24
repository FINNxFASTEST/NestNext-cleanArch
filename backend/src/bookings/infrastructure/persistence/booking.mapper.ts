import { Booking, BookingAddOn } from '../../domain/booking';
import { BookingAddOnSchema, BookingSchemaClass } from './booking.schema';

export class BookingMapper {
  public static toDomain(raw: BookingSchemaClass): Booking {
    const domainEntity = new Booking();
    domainEntity.id = raw._id.toString();
    domainEntity.campsiteId = raw.campsiteId;
    domainEntity.pitchId = raw.pitchId;
    domainEntity.organizationId = raw.organizationId;
    domainEntity.userId = raw.userId ?? null;
    domainEntity.guestName = raw.guestName;
    domainEntity.guestEmail = raw.guestEmail;
    domainEntity.guestPhone = raw.guestPhone ?? null;
    domainEntity.checkIn = raw.checkIn;
    domainEntity.checkOut = raw.checkOut;
    domainEntity.guests = raw.guests;
    domainEntity.addOns = (raw.addOns ?? []).map((a) => {
      const ad = new BookingAddOn();
      ad.name = a.name;
      ad.price = a.price;
      return ad;
    });
    domainEntity.totalPrice = raw.totalPrice;
    domainEntity.status = raw.status;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    return domainEntity;
  }

  public static toPersistence(domainEntity: Booking): BookingSchemaClass {
    const persistenceSchema = new BookingSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.campsiteId = domainEntity.campsiteId;
    persistenceSchema.pitchId = domainEntity.pitchId;
    persistenceSchema.organizationId = domainEntity.organizationId;
    persistenceSchema.userId = domainEntity.userId ?? null;
    persistenceSchema.guestName = domainEntity.guestName;
    persistenceSchema.guestEmail = domainEntity.guestEmail;
    persistenceSchema.guestPhone = domainEntity.guestPhone ?? null;
    persistenceSchema.checkIn = domainEntity.checkIn;
    persistenceSchema.checkOut = domainEntity.checkOut;
    persistenceSchema.guests = domainEntity.guests;
    persistenceSchema.addOns = (domainEntity.addOns ?? []).map((a) => {
      const ad = new BookingAddOnSchema();
      ad.name = a.name;
      ad.price = a.price;
      return ad;
    });
    persistenceSchema.totalPrice = domainEntity.totalPrice;
    persistenceSchema.status = domainEntity.status;
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;
    return persistenceSchema;
  }
}
