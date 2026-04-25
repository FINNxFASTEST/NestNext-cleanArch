import { Amenity } from '../../domain/amenity';
import { AmenitySchemaClass } from './amenity.schema';

export class AmenityMapper {
  public static toDomain(raw: AmenitySchemaClass): Amenity {
    const domain = new Amenity();
    domain.id = raw._id.toString();
    domain.label = raw.label;
    domain.iconKey = raw.iconKey;
    domain.createdAt = raw.createdAt;
    return domain;
  }

  public static toPersistence(domain: Amenity): AmenitySchemaClass {
    const schema = new AmenitySchemaClass();
    if (domain.id) {
      schema._id = domain.id;
    }
    schema.label = domain.label;
    schema.iconKey = domain.iconKey;
    return schema;
  }
}
