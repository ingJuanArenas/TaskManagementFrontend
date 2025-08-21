import { Routes } from "@angular/router";
import { TaskPage } from "./components/tasks-page/tasks-page";
import { DetailsPage } from "./components/details-page/details-page";
import { TasksForm } from "./components/tasks-form/tasks-form";


export const tasks_routes: Routes = [
    {
        path: "",
        loadComponent: ()=> import('./components/tasks-page/tasks-page').then(c => TaskPage)
    },{
        path: "new",
        loadComponent: ()=> import('./components/tasks-page/tasks-page').then(c => TasksForm)
    },{
        path: "edit/:taskId",
        loadComponent: ()=> import('./components/tasks-page/tasks-page').then(c => TasksForm)
    },{
        path: ":taskId",
        loadComponent: ()=> import('./components/details-page/details-page').then(c => DetailsPage)
    }
]