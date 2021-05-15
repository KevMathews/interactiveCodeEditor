export type CellTypes = 'code' | 'text'
export interface Cell {
  id: string;
  // type: 'code' | 'text';
  type: CellTypes;
  content: string;
}