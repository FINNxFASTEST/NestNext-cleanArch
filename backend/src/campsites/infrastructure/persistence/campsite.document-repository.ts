import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CampsiteSchemaClass } from './campsite.schema';
import { CampsiteRepository } from './campsite.repository';
import { Campsite } from '../../domain/campsite';
import { CampsiteMapper } from './campsite.mapper';
import { IPaginationOptions } from '../../../utils/types/pagination-options';

@Injectable()
export class CampsiteDocumentRepository implements CampsiteRepository {
  constructor(
    @InjectModel(CampsiteSchemaClass.name)
    private readonly campsiteModel: Model<CampsiteSchemaClass>,
  ) {}

  async create(data: Campsite): Promise<Campsite> {
    const persistenceModel = CampsiteMapper.toPersistence(data);
    const createdEntity = new this.campsiteModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return CampsiteMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
    filter,
  }: {
    paginationOptions: IPaginationOptions;
    filter?: { organizationId?: string; status?: 'active' | 'inactive' };
  }): Promise<Campsite[]> {
    const where: Record<string, unknown> = {};
    if (filter?.organizationId) where.organizationId = filter.organizationId;
    if (filter?.status) where.status = filter.status;

    const entityObjects = await this.campsiteModel
      .find(where)
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      CampsiteMapper.toDomain(entityObject),
    );
  }

  async findByOrganizationId(organizationId: string): Promise<Campsite[]> {
    const entityObjects = await this.campsiteModel.find({ organizationId });
    return entityObjects.map((entityObject) =>
      CampsiteMapper.toDomain(entityObject),
    );
  }

  async findById(id: Campsite['id']): Promise<NullableType<Campsite>> {
    const entityObject = await this.campsiteModel.findById(id);
    return entityObject ? CampsiteMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: Campsite['id'][]): Promise<Campsite[]> {
    const entityObjects = await this.campsiteModel.find({ _id: { $in: ids } });
    return entityObjects.map((entityObject) =>
      CampsiteMapper.toDomain(entityObject),
    );
  }

  async update(
    id: Campsite['id'],
    payload: Partial<Campsite>,
  ): Promise<NullableType<Campsite>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.campsiteModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.campsiteModel.findOneAndUpdate(
      filter,
      CampsiteMapper.toPersistence({
        ...CampsiteMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? CampsiteMapper.toDomain(entityObject) : null;
  }

  async remove(id: Campsite['id']): Promise<void> {
    await this.campsiteModel.deleteOne({ _id: id });
  }
}
