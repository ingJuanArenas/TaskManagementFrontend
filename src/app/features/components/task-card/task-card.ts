import { Component, input, output, signal } from "@angular/core";
import { Task } from "../../model/task";
import { DatePipe } from "@angular/common";
import { TaskService } from "../../service/task-service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-task-card',
    templateUrl: './task-card.html',
    imports: [DatePipe],
})

export class TaskCard{

    task = input<Task>();
    showDetails = output<number>();
    error= signal<string | undefined>( undefined)
    taskChanged= output<void>();

    details(){
        this.showDetails.emit(this.task()!.id)
    }

    constructor (private service: TaskService, private router: Router){}

    updateTaskStatusToCompleted(){
        const id = this.task()!.id;
        
        if (this.task()!.status.toString() !== "COMPLETED") {
            this.service.updateTaskStatus(id,"COMPLETED").subscribe({
                next: (data)=>{
                    alert("Actualizado exitosamente")
                    this.taskChanged.emit();
                }
            })
        } else {
            alert("La tarea ya está completada");
        }
        
    }

    deleteTask(){
        const id = this.task()!.id;

        this.service.deleteTask(id).subscribe({
            next: (data)=>{
                this.router.navigateByUrl("/tasks")
                alert("Eliminado exitosamente!!");
                this.taskChanged.emit();

            },error: (err)=>{this.error.set(err)}
        })
    }

}