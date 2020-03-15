import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Task } from "../models/task.model";
import { TaskService } from "../task.service";
import { Observable } from "rxjs";
import * as TasksActions from "./../actions/tasks.actions";

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.scss"]
})
export class TodoListComponent implements OnInit {
  tasks: Observable<{ tasks: Task[] }>;
  taskList: Task[] = [];
  todoTitle: string;
  idForTodo: number;
  beforeEditCache: string;
  filter: string;
  anyRemainingModel: boolean;

  constructor(
    private taskService: TaskService,
    private taskStore: Store<{ tasks: { tasks: Task[] } }>
  ) {}

  delTask(id: number) {
    this.taskService.deleteTask(id).subscribe(
      res => {
        this.taskService.getTasks();
      },
      err => {
        console.log(err);
      }
    );
    // this.tasks = this.taskStore.select("tasks");
    // this.taskService.deleteTask(id).subscribe(data => {
    //   data.tasks.map(c => {
    //     this.taskList.push(
    //       new Task(c.id, c.label, c.description, c.category, c.done)
    //     );
    //   });
    // }
    // );

    //this.taskStore.dispatch(new TasksActions.RemoveTask(index));
  }
  ngOnInit() {
    this.taskService.getTasks();
    this.tasks = this.taskStore.select("tasks");
    this.tasks.subscribe(data => {
      data.tasks.map(c => {
        this.taskList.push(
          new Task(c.id, c.label, c.description, c.category, c.done)
        );
      });
    });

    //this.getTasks();
    // this.anyRemainingModel = true;
    // this.filter = "all";
    // this.beforeEditCache = "";
    // this.idForTodo = 4;
    // this.todoTitle = "";
  }

  // this.tasks.push({
  //   id: this.idForTodo,
  //   label: this.todoTitle,
  //   description: "this.description",
  //   category: "this.category",
  //   done: false
  // });
}
