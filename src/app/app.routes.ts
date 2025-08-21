import { Routes } from '@angular/router';
import { TaskPage } from './features/components/tasks-page/tasks-page';

export const routes: Routes = [
  { path: '', redirectTo: "tasks", pathMatch:'full' },
  { path: 'tasks', loadChildren: ()=> import('./features/tasks-route').then(c=> c.tasks_routes) }
];
