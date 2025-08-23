import { Component } from '@angular/core';
import { AuthService, AuthUser } from '../../service/auth-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginpage',
  imports: [CommonModule, FormsModule],
  templateUrl: './loginpage.html',
})
export class Loginpage {
  username = '';
  password = '';
  user: AuthUser | null = null;
  error: string | null = null;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.user$.subscribe(u => this.user = u);
  }

  login() {
    this.error = null;
    this.authService.login(this.username, this.password).subscribe({
      next: user => {
        this.user = user;
        this.router.navigate(['/tasks']);
      },
      error: err => {
        this.error = 'Credenciales inválidas o error de conexión';
        this.user = null;
      }
    });
  }
}
