export class Bike {
  id!: number;
  title!: string;
  description!: string;
  type!: string;
  color!: string;
  manufacturer!: string;
  model!: string;
  price!: number;
  imageUrl!: string;
  quantity!: number;
  rating!: number;
}

export interface BikeList {
  list: Bike[];
  total: number;
}