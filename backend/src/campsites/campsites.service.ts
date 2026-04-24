import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import type { UserRole } from '../users/domain/user';
import { CreateCampsiteDto } from './dto/create-campsite.dto';
import { UpdateCampsiteDto } from './dto/update-campsite.dto';
import { Campsite, CampsiteDocument } from './schemas/campsite.schema';

type CampsiteFilter = {
  status?: 'active' | 'inactive';
  ownerId?: string;
};

@Injectable()
export class CampsitesService {
  constructor(
    @InjectModel(Campsite.name)
    private readonly campsiteModel: Model<CampsiteDocument>,
  ) {}

  create(ownerId: string, dto: CreateCampsiteDto) {
    return this.campsiteModel.create({ ...dto, ownerId });
  }

  findAll(ownerId?: string) {
    const filter: CampsiteFilter = { status: 'active' };
    if (ownerId) filter.ownerId = ownerId;
    return this.campsiteModel.find(filter).lean();
  }

  async findOne(id: string) {
    const doc = await this.campsiteModel.findById(id).lean();
    if (!doc) throw new NotFoundException('Campsite not found');
    return doc;
  }

  async update(
    id: string,
    callerId: string,
    callerRole: UserRole,
    dto: UpdateCampsiteDto,
  ) {
    const doc = await this.campsiteModel.findById(id);
    if (!doc) throw new NotFoundException('Campsite not found');
    if (callerRole !== 'admin' && String(doc.ownerId) !== callerId) {
      throw new ForbiddenException('You do not own this campsite');
    }
    Object.assign(doc, dto);
    return doc.save();
  }

  async remove(id: string, callerId: string, callerRole: UserRole) {
    const doc = await this.campsiteModel.findById(id);
    if (!doc) throw new NotFoundException('Campsite not found');
    if (callerRole !== 'admin' && String(doc.ownerId) !== callerId) {
      throw new ForbiddenException('You do not own this campsite');
    }
    doc.status = 'inactive';
    await doc.save();
    return { success: true as const };
  }
}
