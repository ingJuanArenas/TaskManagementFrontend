import { Component, input, signal, effect, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../../service/task-service';
import { Task } from '../../model/task';

@Component({
  selector: 'app-tasks-form',
  imports: [ReactiveFormsModule],
  templateUrl: './tasks-form.html',
})
export class TasksForm implements OnInit {
    
  isEditMode = signal<boolean>(false);
  taskId = input<number | undefined>(undefined);
  error = signal<string | undefined>(undefined);
  loading = signal<boolean>(true);

  // Status options solo para edición
  statusOptions = ['pending', 'in_course', 'completed'];

  taskForm = new FormGroup({
    id: new FormControl<number | null>(null, [Validators.min(0)]),
    name: new FormControl<string>('', [
      Validators.required, 
      Validators.minLength(3), 
      Validators.maxLength(100)
    ]),
    description: new FormControl<string>('', [
      Validators.required, 
      Validators.minLength(10), 
      Validators.maxLength(500)
    ]),
    // status solo se usa en edición, en creación se asigna por defecto
    status: new FormControl<'pending' | 'in_course' | 'completed'>('pending', [
      this.statusValidator
    ]),
    deadline: new FormControl<Date | null>(null, [
      this.futureDateValidator
    ]),
  });

  constructor(private router: Router, private service: TaskService) {
    effect(() => {
      if (this.taskId()) {
        this.isEditMode.set(true);
        this.loading.set(true);
        this.error.set(undefined);

        const id = this.taskId() ?? 0;

        this.service.getTaskById(id).subscribe({
          next: (data) => {
            this.taskForm.patchValue(data);
            this.loading.set(false);
          },
          error: (err) => { this.error.set(err); this.loading.set(false); }
        });
      } else {
        this.isEditMode.set(false);
        this.loading.set(false);
      }
    });
  }

  ngOnInit() {
    // Set edit mode if taskId is provided
    if (this.taskId()) {
      this.isEditMode.set(true);
    }
  }


  private statusValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;
    
    const validStatuses = ['PENDING', 'IN_COURSE', 'COMPLETED'];
    if (!validStatuses.includes(value)) {
      return { invalidStatus: true };
    }
    return null;
  }

  private futureDateValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null; // Deadline is optional
    
    const selectedDate = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      return { pastDate: true };
    }
    return null;
  }



  goBack() {
    if (this.isEditMode()) {
      this.router.navigate(['tasks', this.taskId()]);
    } else {
      this.router.navigateByUrl('/tasks');
    }
  }



   createTask() {
    // Al crear, status siempre será 'pending'
    const { name, description, deadline } = this.taskForm.value;
    const task: Task = {
      name: name!,
      description: description!,
      status: 'pending',
      deadline: deadline ?? null
    } as Task;
    this.loading.set(true);
    this.service.createTask(task).subscribe({
      next: (task) => {
        alert('Tarea creada exitosamente!');
        this.goBack();
      },
      error: (error) => {
        this.error.set(error.message);
        this.loading.set(false);
      }
    });
  }

   updateTask() {
    const status = this.taskForm.get('status')?.value;
    const id = this.taskId()!;
    this.loading.set(true);
    this.service.updateTaskStatus(id, status!).subscribe({
      next: (task) => {
        alert('Tarea actualizada exitosamente!');
        this.goBack();
      },
      error: (error) => {
        this.error.set(error.message);
        this.loading.set(false);
      }
    });
  }

 

}
