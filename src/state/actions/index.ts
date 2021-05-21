import { ActionType } from '../action-types';
import { CellTypes } from '../cell';

export interface MoveCellAction {
  type: ActionType.MOVE_CELL;
  //  not sure what will be needed for the payload adding these with basic assumptions of what will be needed
  payload: {
    id: string;
    direction: 'up' | 'down';
  }
}

export interface DeleteCellAction {
  type: ActionType.DELETE_CELL;
  payload: string;
}

export interface InsertCellBeforeAction {
  type: ActionType.INSERT_CELL_BEFORE;
  payload: {
    id: string;
    // type: 'code' | 'text';
    type: CellTypes;
  }
}

// interface InsertCellAfterAction {
// type: ActionType.INSERT_CELL_AFTER;
// payload: {
//   id: string;
//   type: 'code' | 'text';
// }
// }

export interface UpdateCellAction {
  type: ActionType.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  }
}
export type Action =
  | MoveCellAction
  | DeleteCellAction
  | InsertCellBeforeAction
  | UpdateCellAction;