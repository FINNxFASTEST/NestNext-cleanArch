import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NullableType } from '../../../utils/types/nullable.type';
import { ReviewRepository } from './review.repository';
import { ReviewSchemaClass } from './review.schema';
import { ReviewMapper } from './review.mapper';
import { Review } from '../../domain/review';

@Injectable()
export class ReviewDocumentRepository implements ReviewRepository {
  constructor(
    @InjectModel(ReviewSchemaClass.name)
    private readonly reviewModel: Model<ReviewSchemaClass>,
  ) {}

  async create(
    data: Omit<Review, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Review> {
    const doc = new this.reviewModel(
      ReviewMapper.toPersistence(data as Review),
    );
    const saved = await doc.save();
    return ReviewMapper.toDomain(saved);
  }

  async findById(id: string): Promise<NullableType<Review>> {
    const doc = await this.reviewModel.findById(id);
    return doc ? ReviewMapper.toDomain(doc) : null;
  }

  async findByCampsiteId(campsiteId: string): Promise<Review[]> {
    const docs = await this.reviewModel
      .find({ campsiteId })
      .sort({ createdAt: -1 });
    return docs.map(ReviewMapper.toDomain);
  }

  async remove(id: string): Promise<void> {
    await this.reviewModel.deleteOne({ _id: id });
  }
}
