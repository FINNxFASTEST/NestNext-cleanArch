import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrganizationSchemaClass } from './organization.schema';
import { OrganizationRepository } from './organization.repository';
import { Organization } from '../../domain/organization';
import { OrganizationMapper } from './organization.mapper';
import { IPaginationOptions } from '../../../utils/types/pagination-options';

@Injectable()
export class OrganizationDocumentRepository implements OrganizationRepository {
  constructor(
    @InjectModel(OrganizationSchemaClass.name)
    private readonly organizationModel: Model<OrganizationSchemaClass>,
  ) {}

  async create(data: Organization): Promise<Organization> {
    const persistenceModel = OrganizationMapper.toPersistence(data);
    const createdEntity = new this.organizationModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return OrganizationMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Organization[]> {
    const entityObjects = await this.organizationModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);
    return entityObjects.map((e) => OrganizationMapper.toDomain(e));
  }

  async findById(id: Organization['id']): Promise<NullableType<Organization>> {
    const entityObject = await this.organizationModel.findById(id);
    return entityObject ? OrganizationMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: Organization['id'][]): Promise<Organization[]> {
    const entityObjects = await this.organizationModel.find({
      _id: { $in: ids },
    });
    return entityObjects.map((e) => OrganizationMapper.toDomain(e));
  }

  async findBySlug(slug: string): Promise<NullableType<Organization>> {
    const entityObject = await this.organizationModel.findOne({ slug });
    return entityObject ? OrganizationMapper.toDomain(entityObject) : null;
  }

  async findByOwnerId(ownerId: string): Promise<Organization[]> {
    const entityObjects = await this.organizationModel.find({ ownerId });
    return entityObjects.map((e) => OrganizationMapper.toDomain(e));
  }

  async update(
    id: Organization['id'],
    payload: Partial<Organization>,
  ): Promise<NullableType<Organization>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.organizationModel.findOne(filter);
    if (!entity) throw new Error('Record not found');

    const entityObject = await this.organizationModel.findOneAndUpdate(
      filter,
      OrganizationMapper.toPersistence({
        ...OrganizationMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );
    return entityObject ? OrganizationMapper.toDomain(entityObject) : null;
  }

  async remove(id: Organization['id']): Promise<void> {
    await this.organizationModel.deleteOne({ _id: id });
  }
}
