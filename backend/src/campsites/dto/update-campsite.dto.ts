import { PartialType } from '@nestjs/swagger';
import { CreateCampsiteDto } from './create-campsite.dto';

export class UpdateCampsiteDto extends PartialType(CreateCampsiteDto) {}
