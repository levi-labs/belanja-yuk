export type ActionResult = {
  error: string;
};

export type Tparams = {
  id: string;
};

export interface Tedit {
  params: Tparams;
}

export type TProduct = {
  id: number;
  name: string;
  price: number;
  images: string;
  category_name: string;
};

export type TCart = TProduct & { quantity: number };
