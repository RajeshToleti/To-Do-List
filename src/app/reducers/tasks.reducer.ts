import { Action } from "@ngrx/store";
import { Task } from "./../models/task.model";
import * as TasksActions from "./../actions/tasks.actions";

const initialState = {
  tasks: []
};

export function tasksReducer(
  state = initialState,
  action: TasksActions.TaskActions
) {
  switch (action.type) {
    case TasksActions.LOAD_TASK:
      return {
        tasks: action.payload
      };

    default:
      return state;
  }
}
