import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MembershipSchemaClass } from './membership.schema';
import { MembershipRepository } from './membership.repository';
import { Membership } from '../../domain/membership';
import { MembershipMapper } from './membership.mapper';
import { IPaginationOptions } from '../../../utils/types/pagination-options';

@Injectable()
export class MembershipDocumentRepository implements MembershipRepository {
  constructor(
    @InjectModel(MembershipSchemaClass.name)
    private readonly membershipModel: Model<MembershipSchemaClass>,
  ) {}

  async create(data: Membership): Promise<Membership> {
    const persistenceModel = MembershipMapper.toPersistence(data);
    const createdEntity = new this.membershipModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return MembershipMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Membership[]> {
    const entityObjects = await this.membershipModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);
    return entityObjects.map((e) => MembershipMapper.toDomain(e));
  }

  async findById(id: Membership['id']): Promise<NullableType<Membership>> {
    const entityObject = await this.membershipModel.findById(id);
    return entityObject ? MembershipMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: Membership['id'][]): Promise<Membership[]> {
    const entityObjects = await this.membershipModel.find({ _id: { $in: ids } });
    return entityObjects.map((e) => MembershipMapper.toDomain(e));
  }

  async findByUserAndOrganization(
    userId: string,
    organizationId: string,
  ): Promise<NullableType<Membership>> {
    const entityObject = await this.membershipModel.findOne({ userId, organizationId });
    return entityObject ? MembershipMapper.toDomain(entityObject) : null;
  }

  async findByUserId(userId: string): Promise<Membership[]> {
    const entityObjects = await this.membershipModel.find({ userId });
    return entityObjects.map((e) => MembershipMapper.toDomain(e));
  }

  async findByOrganizationId(organizationId: string): Promise<Membership[]> {
    const entityObjects = await this.membershipModel.find({ organizationId });
    return entityObjects.map((e) => MembershipMapper.toDomain(e));
  }

  async update(id: Membership['id'], payload: Partial<Membership>): Promise<NullableType<Membership>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.membershipModel.findOne(filter);
    if (!entity) throw new Error('Record not found');

    const entityObject = await this.membershipModel.findOneAndUpdate(
      filter,
      MembershipMapper.toPersistence({ ...MembershipMapper.toDomain(entity), ...clonedPayload }),
      { new: true },
    );
    return entityObject ? MembershipMapper.toDomain(entityObject) : null;
  }

  async remove(id: Membership['id']): Promise<void> {
    await this.membershipModel.deleteOne({ _id: id });
  }
}
