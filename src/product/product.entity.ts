class InfoProduct {
  name: string;
  description: string;
}

class ImageProduct {
  url: string;
  description: string;
}

export class ProductEntity {
  id: string;
  userId: string;
  name: string;
  value: number;
  quantity: number;
  description: string;
  categoric: string;
  info: InfoProduct[];
  images: ImageProduct[];
}
