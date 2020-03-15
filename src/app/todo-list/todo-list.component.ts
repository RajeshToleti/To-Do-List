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
  maxid: number;

  constructor(
    private taskService: TaskService,
    private taskStore: Store<{ tasks: { tasks: Task[] } }>
  ) {}

  delTask(id: number) {
    this.taskService.deleteTask(id).subscribe(
      res => {
        this.taskList = [];
        this.taskService.getTasks();
      },
      err => {
        console.log(err);
      }
    );
  }
  addTask(
    id: number,
    label: string,
    description: string,
    category: string,
    done: boolean
  ) {
    this.taskService
      .addTask({ id, label, description, category, done })
      .subscribe(
        result => {
          this.taskList = [];
          this.taskService.getTasks();
        },
        err => {
          console.log(err);
        }
      );
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

    this.maxid =
      Math.max.apply(
        Math,
        this.taskList.map(function(o) {
          return o.id;
        })
      ) + 1;
  }
}
