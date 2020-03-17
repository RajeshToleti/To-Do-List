import { TestBed } from "@angular/core/testing";
import { TaskService } from "./task.service";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { StoreModule } from "@ngrx/store";
import { tasksReducer } from "./reducers/tasks.reducer";
import { Task } from "./models/task.model";

describe("TaskService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        StoreModule.forRoot({
          tasks: tasksReducer
        })
      ],

      providers: [HttpClient]
    })
  );

  it("should be created", () => {
    const service: TaskService = TestBed.get(TaskService);
    expect(service).toBeTruthy();
  });
});
