export class Review {
  id!: string;
  campsiteId!: string;
  userId!: string;
  rating!: number;
  comment!: string | null;
  createdAt!: Date;
  updatedAt!: Date;
}
