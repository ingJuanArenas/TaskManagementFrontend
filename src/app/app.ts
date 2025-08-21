import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Loginpage } from "./features/components/loginpage/loginpage";
import { TaskPage } from "./features/components/tasks-page/tasks-page";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TaskPage],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('tasksManagementFrontend');
}
