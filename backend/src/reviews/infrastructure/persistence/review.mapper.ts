import { Review } from '../../domain/review';
import { ReviewSchemaClass } from './review.schema';

export class ReviewMapper {
  static toDomain(raw: ReviewSchemaClass): Review {
    const domain = new Review();
    domain.id = raw._id.toString();
    domain.campsiteId = raw.campsiteId;
    domain.userId = raw.userId;
    domain.rating = raw.rating;
    domain.comment = raw.comment ?? null;
    domain.createdAt = raw.createdAt;
    domain.updatedAt = raw.updatedAt;
    return domain;
  }

  static toPersistence(domain: Review): ReviewSchemaClass {
    const doc = new ReviewSchemaClass();
    if (domain.id) doc._id = domain.id;
    doc.campsiteId = domain.campsiteId;
    doc.userId = domain.userId;
    doc.rating = domain.rating;
    doc.comment = domain.comment ?? null;
    return doc;
  }
}
