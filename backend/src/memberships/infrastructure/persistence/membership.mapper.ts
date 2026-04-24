import { Membership } from '../../domain/membership';
import { MembershipSchemaClass } from './membership.schema';

export class MembershipMapper {
  public static toDomain(raw: MembershipSchemaClass): Membership {
    const domainEntity = new Membership();
    domainEntity.id = raw._id.toString();
    domainEntity.userId = raw.userId;
    domainEntity.organizationId = raw.organizationId;
    domainEntity.memberRole = raw.memberRole;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    return domainEntity;
  }

  public static toPersistence(domainEntity: Membership): MembershipSchemaClass {
    const persistenceSchema = new MembershipSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.userId = domainEntity.userId;
    persistenceSchema.organizationId = domainEntity.organizationId;
    persistenceSchema.memberRole = domainEntity.memberRole;
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;
    return persistenceSchema;
  }
}
