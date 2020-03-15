import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { TodoListComponent } from "./todo-list.component";
import { FormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { tasksReducer } from "./../reducers/tasks.reducer";

describe("TodoListComponent", () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        StoreModule.forRoot({
          tasks: tasksReducer
        })
      ],
      declarations: [TodoListComponent],
      providers: [HttpClient]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
