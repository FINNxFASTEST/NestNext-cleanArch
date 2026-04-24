import {
  Organization,
  OrganizationBankAccount,
} from '../../domain/organization';
import {
  OrganizationBankAccountSchema,
  OrganizationSchemaClass,
} from './organization.schema';

export class OrganizationMapper {
  public static toDomain(raw: OrganizationSchemaClass): Organization {
    const domainEntity = new Organization();
    domainEntity.id = raw._id.toString();
    domainEntity.name = raw.name;
    domainEntity.slug = raw.slug;
    domainEntity.contactEmail = raw.contactEmail;
    domainEntity.phone = raw.phone ?? null;
    domainEntity.taxId = raw.taxId ?? null;
    domainEntity.status = raw.status;
    domainEntity.ownerId = raw.ownerId;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    if (raw.bankAccount) {
      const ba = new OrganizationBankAccount();
      ba.accountName = raw.bankAccount.accountName;
      ba.accountNumber = raw.bankAccount.accountNumber;
      ba.bankName = raw.bankAccount.bankName;
      domainEntity.bankAccount = ba;
    } else {
      domainEntity.bankAccount = null;
    }

    return domainEntity;
  }

  public static toPersistence(
    domainEntity: Organization,
  ): OrganizationSchemaClass {
    const persistenceSchema = new OrganizationSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.name = domainEntity.name;
    persistenceSchema.slug = domainEntity.slug;
    persistenceSchema.contactEmail = domainEntity.contactEmail;
    persistenceSchema.phone = domainEntity.phone ?? null;
    persistenceSchema.taxId = domainEntity.taxId ?? null;
    persistenceSchema.status = domainEntity.status;
    persistenceSchema.ownerId = domainEntity.ownerId;
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    if (domainEntity.bankAccount) {
      const ba = new OrganizationBankAccountSchema();
      ba.accountName = domainEntity.bankAccount.accountName;
      ba.accountNumber = domainEntity.bankAccount.accountNumber;
      ba.bankName = domainEntity.bankAccount.bankName;
      persistenceSchema.bankAccount = ba;
    } else {
      persistenceSchema.bankAccount = null;
    }

    return persistenceSchema;
  }
}
