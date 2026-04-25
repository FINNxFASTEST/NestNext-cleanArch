import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Amenity } from '../../domain/amenity';
import { AmenityRepository } from './amenity.repository';
import { AmenityMapper } from './amenity.mapper';
import { AmenitySchemaClass } from './amenity.schema';

@Injectable()
export class AmenityDocumentRepository implements AmenityRepository {
  constructor(
    @InjectModel(AmenitySchemaClass.name)
    private readonly amenityModel: Model<AmenitySchemaClass>,
  ) {}

  async create(data: Omit<Amenity, 'id' | 'createdAt'>): Promise<Amenity> {
    const doc = new this.amenityModel({
      label: data.label,
      englishName: data.englishName,
      iconKey: data.iconKey,
    });
    const saved = await doc.save();
    return AmenityMapper.toDomain(saved);
  }

  async findAllWithPagination({
    paginationOptions,
    search,
  }: {
    paginationOptions: IPaginationOptions;
    search?: string;
  }): Promise<Amenity[]> {
    const where: Record<string, unknown> = {};
    if (search?.trim()) {
      where.$text = { $search: search.trim() };
    }

    const docs = await this.amenityModel
      .find(where)
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit)
      .sort({ createdAt: -1 });

    return docs.map(AmenityMapper.toDomain);
  }

  async findById(id: string): Promise<NullableType<Amenity>> {
    const doc = await this.amenityModel.findById(id);
    return doc ? AmenityMapper.toDomain(doc) : null;
  }
}
