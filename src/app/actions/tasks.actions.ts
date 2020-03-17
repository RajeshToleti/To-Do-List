import { Action } from "@ngrx/store";
import { Task } from "./../models/task.model";

export const LOAD_TASK = "[Task] Load_Task";
//export const REMOVE_TASK = "[Task] Remove_Task";

export class LoadTask implements Action {
  readonly type = LOAD_TASK;
  constructor(public payload: Task[]) {}
}
// export class RemoveTask implements Action {
//   readonly type = REMOVE_TASK;
//   constructor(public payload: number) {}
// }

// Exporting action classes

export type TaskActions = LoadTask;
