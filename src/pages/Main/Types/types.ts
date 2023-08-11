export interface IPainting {
  authorId: number;
  created: string;
  id: number;
  imageUrl: string;
  locationId: number;
  name: string;
}
export interface IViewPainting {
  id: number;
  imageUrl: string;
  name: string;
  author: string;
  created: string;
  location: string;
}

export interface IOption {
  id: number;
  name: string;
}

export interface ILocation {
  id: number;
  location: string;
}

export type DateValue = {
  before: string;
  from: string;
};
