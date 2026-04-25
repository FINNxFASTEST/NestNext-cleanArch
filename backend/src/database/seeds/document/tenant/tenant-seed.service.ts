import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';
import { Model } from 'mongoose';
import { OrganizationSchemaClass } from '../../../../organizations/infrastructure/persistence/document/entities/organization.schema';
import { MembershipSchemaClass } from '../../../../memberships/infrastructure/persistence/document/entities/membership.schema';
import { CampsiteSchemaClass } from '../../../../campsites/infrastructure/persistence/document/entities/campsite.schema';

const DEMO_ORG_SLUG = 'kangtent-demo';

@Injectable()
export class TenantSeedService {
  constructor(
    @InjectModel(OrganizationSchemaClass.name)
    private readonly orgModel: Model<OrganizationSchemaClass>,
    @InjectModel(MembershipSchemaClass.name)
    private readonly membershipModel: Model<MembershipSchemaClass>,
    @InjectModel(CampsiteSchemaClass.name)
    private readonly campsiteModel: Model<CampsiteSchemaClass>,
  ) {}

  async run(hostUserId: string): Promise<void> {
    let org = await this.orgModel.findOne({ slug: DEMO_ORG_SLUG });
    if (!org) {
      org = await this.orgModel.create({
        name: 'Kangtent Demo Host Co.',
        slug: DEMO_ORG_SLUG,
        contactEmail: 'host@example.com',
        phone: '+66 89 123 4567',
        status: 'approved',
        ownerId: hostUserId,
      });
    }

    const existingMembership = await this.membershipModel.findOne({
      userId: hostUserId,
      organizationId: String(org._id),
    });
    if (!existingMembership) {
      await this.membershipModel.create({
        userId: hostUserId,
        organizationId: String(org._id),
        memberRole: 'owner',
      });
    }

    const existingCampsite = await this.campsiteModel.findOne({
      organizationId: String(org._id),
      name: 'เขาใหญ่ แคมป์วิว',
    });
    if (!existingCampsite) {
      await this.campsiteModel.create({
        organizationId: String(org._id),
        name: 'เขาใหญ่ แคมป์วิว',
        description:
          'ลานกางเต็นท์ในหุบเขาเขาใหญ่ เช้าตื่นมาเจอหมอกลอยขาวโพลน ตกค่ำมีดาวเต็มฟ้า',
        location: {
          province: 'นครราชสีมา',
          district: 'ปากช่อง',
          lat: 14.4407,
          lng: 101.3722,
        },
        images: [],
        amenities: [
          { label: 'ไฟฟ้า', iconKey: 'FiZap' },
          { label: 'น้ำประปา', iconKey: 'FiDroplet' },
          { label: 'ก่อไฟได้', iconKey: 'LuFlame' },
          { label: 'Wi-Fi', iconKey: 'FiWifi' },
        ],
        pitches: [
          {
            _id: randomUUID(),
            type: 'tent',
            name: 'Forest A',
            maxGuests: 4,
            pricePerNight: 400,
            size: '5×5 m',
          },
          {
            _id: randomUUID(),
            type: 'glamping',
            name: 'Sky Dome',
            maxGuests: 2,
            pricePerNight: 1200,
            size: '4×4 m',
          },
        ],
        status: 'active',
      });
    }
  }
}
