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
  maxid: number;
  showEdit: boolean = false;
  enableEdit: boolean = false;
  enableEditIndex = null;
  doneFilter: boolean = false;

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
    if (this.doneFilter) location.reload();
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
          this.taskList.length = 0;
          this.taskService.getTasks();
        },
        err => {
          console.log(err);
        }
      );
    if (this.doneFilter) location.reload();
  }
  enableEditMethod(e, i) {
    this.enableEdit = true;
    this.enableEditIndex = i;
  }
  editTask(
    id: number,
    label: string,
    description: string,
    category: string,
    done: boolean
  ) {
    this.taskService
      .editTask({ id, label, description, category, done })
      .subscribe(
        result => {
          this.enableEdit = false;
          this.enableEditIndex = null;
          this.taskList = [];
          this.taskService.getTasks();
        },
        err => {
          console.log(err);
        }
      );
    if (this.doneFilter) location.reload();
  }
  filter(st: string) {
    this.doneFilter = true;
    this.taskList.length = 0;
    this.tasks.subscribe(data => {
      data.tasks.map(c => {
        this.taskList.push(
          new Task(c.id, c.label, c.description, c.category, c.done)
        );
      });
    });
    if (st == "active") {
      this.taskList = this.taskList.filter(t => t.done != true);
    } else if (st == "done") {
      this.taskList = this.taskList.filter(t => t.done != false);
    }
  }
  ngOnInit() {
    this.taskList = [];
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
