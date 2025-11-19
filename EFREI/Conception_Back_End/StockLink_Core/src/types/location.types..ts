export interface ILocation {
  warehouse_id: string;
  code: string;
  layout: Array<{
    aisle: string;
    racks: Array<{
      rack: string;
      levels: Array<{
        level: number;
        bins: Array<string>;
      }>;
    }>;
  }>;
}
