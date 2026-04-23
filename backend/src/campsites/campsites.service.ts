import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCampsiteDto } from './dto/create-campsite.dto';
import { Campsite, CampsiteDocument } from './schemas/campsite.schema';

@Injectable()
export class CampsitesService {
  constructor(
    @InjectModel(Campsite.name) private readonly campsiteModel: Model<CampsiteDocument>,
  ) {}

  create(dto: CreateCampsiteDto) {
    return this.campsiteModel.create(dto);
  }

  findAll() {
    return this.campsiteModel.find({ status: 'active' }).lean();
  }

  async findOne(id: string) {
    const doc = await this.campsiteModel.findById(id).lean();
    if (!doc) throw new NotFoundException('Campsite not found');
    return doc;
  }

  async update(id: string, dto: Partial<CreateCampsiteDto>) {
    const doc = await this.campsiteModel.findByIdAndUpdate(id, dto, { new: true });
    if (!doc) throw new NotFoundException('Campsite not found');
    return doc;
  }

  async remove(id: string) {
    const doc = await this.campsiteModel.findByIdAndUpdate(id, { status: 'inactive' }, { new: true });
    if (!doc) throw new NotFoundException('Campsite not found');
    return { success: true };
  }
}
