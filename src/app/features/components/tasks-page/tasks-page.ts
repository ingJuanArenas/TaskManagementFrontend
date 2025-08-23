import { Component, effect, signal, OnInit } from "@angular/core";
import { Task } from "../../model/task";
import { TaskService } from "../../service/task-service";
import { TaskCard } from "../task-card/task-card";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { AuthService, AuthUser } from '../../service/auth-service';


@Component({
    selector: 'app-tasks-page',
    imports: [TaskCard, FormsModule, CommonModule],
    templateUrl: './tasks-page.html',
})

export class TaskPage implements OnInit {

    loading = signal<boolean>(true);
    error = signal<string | null>(null);
    allTasks = signal<Task[]>([]);
    tasks = signal<Task[]>([]);
    userInput = signal<string>('');
    user: AuthUser | null = null;

    constructor(
        private taskService: TaskService,
        private router: Router,
        private authService: AuthService
    ) {
        effect(() => {
            this.tasks.set(this.allTasks().filter(
                (t) => t.name.toLowerCase().includes(this.userInput().toLowerCase())
            ));
        });
        this.authService.user$.subscribe(u => this.user = u);
    }

    ngOnInit(): void {
        this.loadingTasks();
    }

    loadingTasks() {
        this.taskService.getAllTasks().subscribe({
            next: (tasks) => {
                this.allTasks.set(tasks);
                this.loading.set(false);
            },
            error: (error) => {
                this.error.set(error.message);
                this.loading.set(false);
            }
        });
    }

    goToForm() {
        this.router.navigate(['/tasks', 'new']);
    }

    showDetails(id: number) {
        this.router.navigate(['tasks', id]);
    }
}