import { Campsite, CampsiteAmenity, CampsiteLocation, Pitch } from '../../domain/campsite';
import {
  CampsiteAmenitySchema,
  CampsiteLocationSchema,
  CampsiteSchemaClass,
  PitchSchema,
} from './campsite.schema';

export class CampsiteMapper {
  public static toDomain(raw: CampsiteSchemaClass): Campsite {
    const domainEntity = new Campsite();
    domainEntity.id = raw._id.toString();
    domainEntity.organizationId = raw.organizationId;
    domainEntity.name = raw.name;
    domainEntity.description = raw.description ?? null;
    domainEntity.images = raw.images ?? [];
    domainEntity.amenities = (raw.amenities ?? []).map((a) => {
      const amenity = new CampsiteAmenity();
      amenity.label = a.label;
      amenity.iconKey = a.iconKey;
      return amenity;
    });
    domainEntity.status = raw.status;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    const loc = new CampsiteLocation();
    loc.province = raw.location.province;
    loc.district = raw.location.district;
    loc.lat = raw.location.lat;
    loc.lng = raw.location.lng;
    domainEntity.location = loc;

    domainEntity.pitches = (raw.pitches ?? []).map((p) => {
      const pitch = new Pitch();
      pitch.id = p._id.toString();
      pitch.type = p.type;
      pitch.name = p.name;
      pitch.maxGuests = p.maxGuests;
      pitch.pricePerNight = p.pricePerNight;
      pitch.size = p.size;
      return pitch;
    });

    return domainEntity;
  }

  public static toPersistence(domainEntity: Campsite): CampsiteSchemaClass {
    const persistenceSchema = new CampsiteSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.organizationId = domainEntity.organizationId;
    persistenceSchema.name = domainEntity.name;
    persistenceSchema.description = domainEntity.description ?? null;
    persistenceSchema.images = domainEntity.images ?? [];
    persistenceSchema.amenities = (domainEntity.amenities ?? []).map((a) => {
      const s = new CampsiteAmenitySchema();
      s.label = a.label;
      s.iconKey = a.iconKey;
      return s;
    });
    persistenceSchema.status = domainEntity.status ?? 'active';
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    const loc = new CampsiteLocationSchema();
    loc.province = domainEntity.location.province;
    loc.district = domainEntity.location.district;
    loc.lat = domainEntity.location.lat;
    loc.lng = domainEntity.location.lng;
    persistenceSchema.location = loc;

    persistenceSchema.pitches = (domainEntity.pitches ?? []).map((p) => {
      const ps = new PitchSchema();
      ps._id = p.id;
      ps.type = p.type;
      ps.name = p.name;
      ps.maxGuests = p.maxGuests;
      ps.pricePerNight = p.pricePerNight;
      ps.size = p.size;
      return ps;
    });

    return persistenceSchema;
  }
}
