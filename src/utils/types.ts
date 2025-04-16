export type ProductEntity = {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: CategoryEntity;
  images: string[];
  creationAt: string;
  updatedAt: string;
};

export type CategoryEntity = {
  id: number;
  name: string;
  slug: string;
  image: string;
  creationAt: string;
  updatedAt: string;
};

export type ProductEntityWithQuantity = ProductEntity & { quantity: number };


export type OptionEntity<K = string, V = string> = {
  value: K;
  key: V;
};

export const enum RequestStatus {
	Idle = 'Idle',
	Loading = 'Loading',
	Success = 'Success',
	Failed = 'Failed',
}
