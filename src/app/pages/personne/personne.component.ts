import { Component, OnInit } from '@angular/core';
import { PersonneService } from './personne.service';
import { Personne } from './personne.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import dataMada from './data/madagascar';
import { Region, District } from './data/madagascar.types';

@Component({
  selector: 'app-personne',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './personne.component.html',
  styleUrl: './personne.component.css'
})
export class PersonneComponent implements OnInit {
  personnes: Personne[] = [];
  personneForm: Personne = {
    nom: '',
    prenom: '',
    dateNaissance: '',
    sexe: '',
    etablissementSanitaireId: 0
  };
  
  etablissements: any[] = [];
  isEditMode = false;
  showModal = false;

  etablissement = {
    nom: '',
    region: '',
    district: '',
    commune: '',
    type: ''
  };

  regions: Region[] = [];
  selectedRegion: Region | null = null;
  selectedDistrict: District | null = null;
  selectedCommune: string = '';

  constructor(private personneService: PersonneService, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadPersonnes();
    this.loadRegions();
  }

  loadRegions(): void {
    this.regions = dataMada.regions;
    console.log('Liste regions:', this.regions);
  }

  onRegionChange(): void {
    this.selectedDistrict = null;
    this.selectedCommune = '';
  }

  onDistrictChange(): void {
    this.selectedCommune = '';
  }

  loadPersonnes(): void {
    this.personneService.getAll().subscribe({
      next: (data) => this.personnes = data,
      error: (error) => {
        console.error('Erreur lors du chargement des personnes:', error);
        // Ajouter ici la logique pour afficher un message d'erreur à l'utilisateur
      }
    });
  }

  refresh(): void {
    console.log(" 🔄 Bouton actualiser cliqué !");
    this.loadPersonnes();
  }

  savePersonne(): void {
    if (this.isEditMode && this.personneForm.id) {
      this.personneService.update(this.personneForm.id, this.personneForm).subscribe({
        next: () => {
          this.closeModal();
          this.loadPersonnes();
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour:', error);
          // Ajouter ici la logique pour afficher un message d'erreur à l'utilisateur
        }
      });
    } else {
      this.personneService.create(this.personneForm).subscribe({
        next: () => {
          this.closeModal();
          this.loadPersonnes();
        },
        error: (error) => {
          console.error('Erreur lors de la création:', error);
          // Ajouter ici la logique pour afficher un message d'erreur à l'utilisateur
        }
      });
    }
  }

  closeModal(): void {
    this.showModal = false;
    this.resetForm();
  }

  onSubmit(): void {
    this.savePersonne();
  }

  editPersonne(p: Personne): void {
    this.personneForm = { ...p };
    this.isEditMode = true;
    this.showModal = true;
  }

  deletePersonne(id: number): void {
    this.personneService.delete(id).subscribe({
      next: () => this.loadPersonnes(),
      error: (error) => {
        console.error('Erreur lors de la suppression:', error);
        // Ajouter ici la logique pour afficher un message d'erreur à l'utilisateur
      }
    });
  }

  resetForm(): void {
    this.personneForm = {
      nom: '',
      prenom: '',
      dateNaissance: '',
      sexe: '',
      etablissementSanitaireId: 0
    };
    this.isEditMode = false;
  }
}


