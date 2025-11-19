export interface IMovement {
  id: number;
  product_id: number;
  quantity: number;
  type: 'IN' | 'OUT';
  created_at: Date;
}
