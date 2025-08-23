import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { VoucherService } from './voucher.service';
import { PersonneService } from '../personne/personne.service';


interface Medicament {
  nom: string;
  quantite: number;
  prix: number;
}

interface Voucher {
  id?: number;
  personneId: number;
  dateVoucher: string;
  medicaments: Medicament[];
}

@Component({
  selector: 'app-voucher',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.css']
})
export class VoucherComponent implements OnInit {
  personnes: any[] = [];
  vouchers: Voucher[] = [];

  voucherForm: Voucher = {
    personneId: 0,
    dateVoucher: '',
    medicaments: []
  };

  isEditMode = false;

  constructor(
    private voucherService: VoucherService,
    private personneService: PersonneService
  ) {}

  ngOnInit(): void {
    this.loadPersonnes();
    this.loadVouchers();
  }

  // Charger toutes les personnes pour le select
  loadPersonnes(): void {
    this.personneService.getAll().subscribe({
      next: (data: any[]) => (this.personnes = data),
      error: (err: any) => console.error(err)
    });
  }

  // Charger les vouchers existants
  loadVouchers(): void {
    this.voucherService.getAll().subscribe({
      next: (data: Voucher[]) => (this.vouchers = data),
      error: (err: any) => console.error(err)
    });
  }

  // Ajouter un médicament
  addMedicament(): void {
    this.voucherForm.medicaments.push({ nom: '', quantite: 0, prix: 0 });
  }

  // Supprimer un médicament
  removeMedicament(index: number): void {
    this.voucherForm.medicaments.splice(index, 1);
  }

  // Calcul du total
  calculerTotal(): number {
    return this.voucherForm.medicaments.reduce(
      (acc, med) => acc + med.quantite * med.prix,
      0
    );
  }

  // Enregistrer ou modifier
  saveVoucher(): void {
    if (this.isEditMode && this.voucherForm.id) {
      this.voucherService.update(this.voucherForm.id, this.voucherForm).subscribe({
        next: () => {
          this.resetForm();
          this.loadVouchers();
        },
        error: (err: any) => console.error('❌ Erreur update:', err)
      });
    } else {
      this.voucherService.create(this.voucherForm).subscribe({
        next: () => {
          this.resetForm();
          this.loadVouchers();
        },
        error: (err: any) => console.error('❌ Erreur create:', err)
      });
    }
  }

  // Mettre en mode édition
  editVoucher(v: Voucher): void {
    this.voucherForm = { ...v, medicaments: [...v.medicaments] };
    this.isEditMode = true;
  }

  // Supprimer un voucher
  deleteVoucher(id: number): void {
    this.voucherService.delete(id).subscribe({
      next: () => this.loadVouchers(),
      error: (err: any) => console.error('❌ Erreur delete:', err)
    });
  }

  // Reset form
  resetForm(): void {
    this.voucherForm = {
      personneId: 0,
      dateVoucher: '',
      medicaments: []
    };
    this.isEditMode = false;
  }
}

