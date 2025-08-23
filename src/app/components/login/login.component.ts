import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    const credentials = { email: this.email, password: this.password };
    this.authService.login(credentials).subscribe({
      next: (res) => {
        console.log('✅ Connexion réussie :', res);
        localStorage.setItem('user', JSON.stringify(res)); // stocke l'utilisateur
; // 🧠 stocke le token
        this.router.navigate(['/dashboard']); // ➡️ redirection
      },
      error: (err) => {
        console.error('❌ Erreur de connexion :', err);
        this.errorMessage = "Email ou mot de passe incorrect.";
      }
    });
  }
}



