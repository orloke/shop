class ListInfoProductDTO {
  name: string;
  description: string;
}

class ListImageProductDTO {
  url: string;
  description: string;
}

export class ListProductDTO {
  id: string;
  userId: string;
  name: string;
  value: number;
  quantity: number;
  description: string;
  categoric: string;
  info: ListInfoProductDTO[];
  images: ListImageProductDTO[];
}
