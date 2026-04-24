import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PitchSlotSchemaClass } from './pitch-slot.schema';
import { PitchSlotRepository } from './pitch-slot.repository';
import { PitchSlot } from '../../domain/pitch-slot';
import { PitchSlotMapper } from './pitch-slot.mapper';
import { IPaginationOptions } from '../../../utils/types/pagination-options';

@Injectable()
export class PitchSlotDocumentRepository implements PitchSlotRepository {
  constructor(
    @InjectModel(PitchSlotSchemaClass.name)
    private readonly pitchSlotModel: Model<PitchSlotSchemaClass>,
  ) {}

  async create(data: PitchSlot): Promise<PitchSlot> {
    const persistenceModel = PitchSlotMapper.toPersistence(data);
    const createdEntity = new this.pitchSlotModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return PitchSlotMapper.toDomain(entityObject);
  }

  async reserve(data: PitchSlot[]): Promise<PitchSlot[]> {
    const docs = data.map((d) => PitchSlotMapper.toPersistence(d));
    const inserted = await this.pitchSlotModel.insertMany(docs, {
      ordered: true,
    });
    return inserted.map((o) => PitchSlotMapper.toDomain(o));
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<PitchSlot[]> {
    const entityObjects = await this.pitchSlotModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      PitchSlotMapper.toDomain(entityObject),
    );
  }

  async findById(id: PitchSlot['id']): Promise<NullableType<PitchSlot>> {
    const entityObject = await this.pitchSlotModel.findById(id);
    return entityObject ? PitchSlotMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: PitchSlot['id'][]): Promise<PitchSlot[]> {
    const entityObjects = await this.pitchSlotModel.find({
      _id: { $in: ids },
    });
    return entityObjects.map((entityObject) =>
      PitchSlotMapper.toDomain(entityObject),
    );
  }

  async findByBookingId(bookingId: string): Promise<PitchSlot[]> {
    const entityObjects = await this.pitchSlotModel.find({ bookingId });
    return entityObjects.map((entityObject) =>
      PitchSlotMapper.toDomain(entityObject),
    );
  }

  async removeByBookingId(bookingId: string): Promise<void> {
    await this.pitchSlotModel.deleteMany({ bookingId });
  }

  async remove(id: PitchSlot['id']): Promise<void> {
    await this.pitchSlotModel.deleteOne({ _id: id });
  }
}
