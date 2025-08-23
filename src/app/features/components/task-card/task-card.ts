
import { Component, input, output, signal } from "@angular/core";
import { Task } from "../../model/task";
import { DatePipe } from "@angular/common";
import { TaskService } from "../../service/task-service";
import { Router } from "@angular/router";
import { AuthService, AuthUser } from '../../service/auth-service';


@Component({
    selector: 'app-task-card',
    templateUrl: './task-card.html',
    imports: [DatePipe],
})
export class TaskCard {
    task = input<Task>();
    showDetails = output<number>();
    error = signal<string | undefined>(undefined);
    taskChanged = output<void>();
    user: AuthUser | null = null;

    constructor(
        private service: TaskService,
        private router: Router,
        private authService: AuthService
    ) {
        this.authService.user$.subscribe(u => this.user = u);
    }

    details() {
        this.showDetails.emit(this.task()!.id);
    }

    updateTaskStatusToCompleted() {
        const id = this.task()!.id;
        if (this.task()!.status.toString() !== "COMPLETED") {
            this.service.updateTaskStatus(id, "COMPLETED").subscribe({
                next: () => {
                    alert("Actualizado exitosamente");
                    this.taskChanged.emit();
                }
            });
        } else {
            alert("La tarea ya está completada");
        }
    }

    deleteTask() {
        const id = this.task()!.id;
        this.service.deleteTask(id).subscribe({
            next: () => {
                this.router.navigateByUrl("/tasks");
                alert("Eliminado exitosamente!!");
                this.taskChanged.emit();
            },
            error: (err) => { this.error.set(err); }
        });
    }
}