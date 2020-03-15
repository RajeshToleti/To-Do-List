import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map, catchError, tap } from "rxjs/operators";
import { Task } from "./models/task.model";
import { Store } from "@ngrx/store";
import * as TasksActions from "./actions/tasks.actions";

const endpoint = "http://localhost:3000/tasks/";
const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};
@Injectable({
  providedIn: "root"
})
export class TaskService {
  constructor(
    private http: HttpClient,
    private store: Store<{ tasks: Task[] }>
  ) {}

  getTasks() {
    this.http
      .get(endpoint)
      .pipe(
        map(responseData => {
          const tasks: Task[] = Object.keys(responseData).map(
            key => responseData[key]
          );
          //console.log(tasks);
          return tasks;
        })
      )
      .subscribe(data => {
        this.store.dispatch(new TasksActions.AddTask(data));
      });
  }

  deleteTask(id: number): Observable<any> {
    return this.http
      .delete<any>(endpoint + id, httpOptions)
      .pipe(tap(_ => console.log("deleted task id=${id}")));
  }

  addTask(task: Task): Observable<any> {
    return this.http
      .post<any>(endpoint, JSON.stringify(task), httpOptions)
      .pipe(tap(task => console.log("added task")));
  }
}
