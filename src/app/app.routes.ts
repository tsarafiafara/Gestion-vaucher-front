import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './components/login/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { InstitutionComponent } from './components/institution/institution.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PersonneComponent } from './pages/personne/personne.component';
import { VoucherComponent } from './pages/voucher/voucher.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'personne', component: PersonneComponent },
      { path: 'vouchers', component: VoucherComponent },
      { path: 'institution', component: InstitutionComponent },
      { path: '', redirectTo: '/vouchers', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '/vouchers' }
];

