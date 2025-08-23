import { Component, effect, input, signal } from '@angular/core';
import { Task } from '../../model/task';
import { TaskService } from '../../service/task-service';
import { Router, RouterLink } from '@angular/router';
import { DatePipe, NgIf } from '@angular/common';
import { AuthService, AuthUser } from '../../service/auth-service';


@Component({
  selector: 'app-details-page',
  imports: [DatePipe, RouterLink],
  templateUrl: './details-page.html',
})
export class DetailsPage {
    taskId = input<number | undefined>(undefined);
    loading = signal<boolean>(true);
    error = signal<string | null>(null);
    taskDetails = signal<Task | null>(null);
    user: AuthUser| null = null;

    constructor(private service: TaskService, 
      private authService: AuthService,
      private router: Router){
      effect(()=>{
      const currentTaskId = this.taskId();
      if (currentTaskId == null) {
        return;
      }
      if (isNaN(currentTaskId)) {
        this.error.set("ID de la tarea inválido");
        this.loading.set(false);
        return;
      }
      this.error.set(null);
      this.loading.set(true);
      this.getTaskDetails(currentTaskId);
    });

     this.authService.user$.subscribe(u => this.user = u);

    }


    

    getTaskDetails(id:number){
      console.log("buscando a dori");
      
      this.service.getTaskById(id).subscribe({
        next: (task) => {
          this.taskDetails.set(task);
          this.loading.set(false);
        },
        error: (error) => {
          this.error.set(error.message);
          this.loading.set(false);
        }
      })
    }

    goBack(){
      this.router.navigate(['/tasks']);
    }

    updateTaskStatus(id: number, status="COMPLETED"){
      this.service.updateTaskStatus(id,status).subscribe({
        next: (data)=>{
            alert("Tarea actualizada exitosamente!")
            this.goBack()
        }, error: (error)=> { this.error.set(error.message);}
      })
    }

    deleteTask(id:number){
      this.service.deleteTask(id).subscribe({
        next: () => {
          alert('Tarea eliminada correctamente');
          this.goBack();
        },
        error: (error) => {
          alert('Error al eliminar la tarea');
          console.error('Error al eliminar la tarea:', error);
        }
      })
    }

    updateTaskStatusInCourse(id: number, status="IN_COURSE"){
      this.service.updateTaskStatus(id,status).subscribe({
        next: (data)=>{
            alert("Tarea actualizada exitosamente!")
            this.goBack()
        }, error: (error)=> { this.error.set(error.message);}
      })
    }
}
