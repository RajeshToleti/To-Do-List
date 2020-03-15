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
    case TasksActions.ADD_TASK:
      return {
        tasks: action.payload
      };
    case TasksActions.REMOVE_TASK:
      const index = action.payload;

      return [...state.tasks.slice(0, index), ...state.tasks.slice(index + 1)];

    default:
      return state;
  }
}
