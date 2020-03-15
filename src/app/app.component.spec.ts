import { TestBed, async } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from "./app.component";
import { TodoListComponent } from "./todo-list/todo-list.component";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { StoreModule } from "@ngrx/store";
import { tasksReducer } from "./reducers/tasks.reducer";

describe("AppComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        HttpClientModule,
        StoreModule.forRoot({
          tasks: tasksReducer
        })
      ],
      declarations: [AppComponent, TodoListComponent],
      providers: [HttpClient]
    }).compileComponents();
  }));

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  // it(`should have as title 'tech-test'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual("tech-test");

  // });

  it("should render title", () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("div").textContent).toContain(
      "My To Do List"
    );
  });
});
