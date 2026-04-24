import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BookingSchemaClass } from './booking.schema';
import { BookingFilter, BookingRepository } from './booking.repository';
import { Booking } from '../../domain/booking';
import { BookingMapper } from './booking.mapper';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { DeepPartial } from '../../../utils/types/deep-partial.type';

@Injectable()
export class BookingDocumentRepository implements BookingRepository {
  constructor(
    @InjectModel(BookingSchemaClass.name)
    private readonly bookingModel: Model<BookingSchemaClass>,
  ) {}

  async create(data: Booking): Promise<Booking> {
    const persistenceModel = BookingMapper.toPersistence(data);
    const createdEntity = new this.bookingModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return BookingMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
    filter,
  }: {
    paginationOptions: IPaginationOptions;
    filter?: BookingFilter;
  }): Promise<Booking[]> {
    const where: Record<string, unknown> = {};
    if (filter?.organizationId) where.organizationId = filter.organizationId;
    if (filter?.userId) where.userId = filter.userId;
    if (filter?.status) where.status = filter.status;

    const entityObjects = await this.bookingModel
      .find(where)
      .sort({ createdAt: -1 })
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      BookingMapper.toDomain(entityObject),
    );
  }

  async findById(id: Booking['id']): Promise<NullableType<Booking>> {
    const entityObject = await this.bookingModel.findById(id);
    return entityObject ? BookingMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: Booking['id'][]): Promise<Booking[]> {
    const entityObjects = await this.bookingModel.find({ _id: { $in: ids } });
    return entityObjects.map((entityObject) =>
      BookingMapper.toDomain(entityObject),
    );
  }

  async update(
    id: Booking['id'],
    payload: DeepPartial<Booking>,
  ): Promise<NullableType<Booking>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.bookingModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.bookingModel.findOneAndUpdate(
      filter,
      BookingMapper.toPersistence({
        ...BookingMapper.toDomain(entity),
        ...(clonedPayload as Partial<Booking>),
      }),
      { new: true },
    );

    return entityObject ? BookingMapper.toDomain(entityObject) : null;
  }

  async remove(id: Booking['id']): Promise<void> {
    await this.bookingModel.deleteOne({ _id: id });
  }
}
