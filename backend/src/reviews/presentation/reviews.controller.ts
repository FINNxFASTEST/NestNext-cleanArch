import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Review } from '../domain/review';
import { CreateReviewDto } from './dto/create-review.dto';
import { CreateReviewUseCase } from '../application/use-cases/create-review.use-case';
import { FindReviewsByCampsiteUseCase } from '../application/use-cases/find-reviews-by-campsite.use-case';
import { RemoveReviewUseCase } from '../application/use-cases/remove-review.use-case';

type AuthedRequest = {
  user: { id: string; role?: { id: string | number } };
};

@ApiTags('Reviews')
@Controller({ path: 'reviews', version: '1' })
export class ReviewsController {
  constructor(
    private readonly createReview: CreateReviewUseCase,
    private readonly findReviewsByCampsite: FindReviewsByCampsiteUseCase,
    private readonly removeReview: RemoveReviewUseCase,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: Review })
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() dto: CreateReviewDto,
    @Req() req: AuthedRequest,
  ): Promise<Review> {
    return this.createReview.execute(dto, req.user.id);
  }

  @Get()
  @ApiQuery({ name: 'campsiteId', required: true, type: String })
  @ApiOkResponse({ type: [Review] })
  findByCampsite(@Query('campsiteId') campsiteId: string): Promise<Review[]> {
    return this.findReviewsByCampsite.execute(campsiteId);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: String })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string, @Req() req: AuthedRequest): Promise<void> {
    return this.removeReview.execute(id, req.user);
  }
}
