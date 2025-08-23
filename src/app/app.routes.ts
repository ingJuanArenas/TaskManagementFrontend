import { Routes } from '@angular/router';
import { Loginpage } from './features/components/loginpage/loginpage';
import { TaskPage } from './features/components/tasks-page/tasks-page';
import { AuthGuard } from './features/service/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Loginpage },
  { path: 'tasks', loadChildren: ()=> import('./features/tasks-route').then(c=> c.tasks_routes), canActivate: [AuthGuard] }
];
