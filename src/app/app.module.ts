import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { TodoListComponent } from "./todo-list/todo-list.component";
import { FormsModule } from "@angular/forms";
import { tasksReducer } from "./reducers/tasks.reducer";

@NgModule({
  declarations: [AppComponent, TodoListComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot({
      tasks: tasksReducer
    })
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule {}
