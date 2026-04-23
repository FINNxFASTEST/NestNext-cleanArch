import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CampsitesService } from './campsites.service';
import { CreateCampsiteDto } from './dto/create-campsite.dto';

@ApiTags('campsites')
@Controller('campsites')
export class CampsitesController {
  constructor(private readonly service: CampsitesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a campsite' })
  create(@Body() dto: CreateCampsiteDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List all active campsites' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get campsite by ID' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update campsite' })
  update(@Param('id') id: string, @Body() dto: Partial<CreateCampsiteDto>) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deactivate campsite' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
