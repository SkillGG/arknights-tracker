export type ArkData = {
  tags: string[];
  name: string;
  stars: number;
  image: string;
};

export type Filter = {
  filter(d: ArkData): boolean;
  id: string;
};
