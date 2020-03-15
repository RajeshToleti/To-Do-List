import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Task } from "../models/task.model";
import { TaskService } from "../task.service";
import * as TasksActions from "./../actions/tasks.actions";
import { Observable } from "rxjs";

@Component({
  selector: "app-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.scss"]
})
export class AddComponent implements OnInit {
  tasks: Observable<{ tasks: Task[] }>;
  taskList: Task[] = [];
  nextId: number;

  constructor(
    private taskStore: Store<{ tasks: { tasks: Task[] } }>,
    private taskService: TaskService
  ) {
    // this.nextId = this.taskStore.select["tasks"].length + 1;
    // console.log(this.nextId);
  }

  addTask(
    id: number,
    Title: string,
    Description: string,
    Category: string,
    done: boolean
  ) {
    // this.taskStore.dispatch(
    //   new TasksActions.AddTasks({
    //     id: id,
    //     label: Title,
    //     description: Description,
    //     category: Category,
    //     done: done
    //   })
    // );
  }
  addTaskDirect(
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
          this.taskService.getTasks();
          this.tasks = this.taskStore.select("tasks");
          this.tasks.subscribe(data => {
            data.tasks.map(c => {
              this.taskList.push(
                new Task(c.id, c.label, c.description, c.category, c.done)
              );
            });
          });
        },
        err => {
          console.log(err);
        }
      );
  }

  ngOnInit() {}
}
