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
    this.personneService.getAll().subscribe(data => this.personnes = data);
  }

  refresh(): void {
    console.log(" 🔄 Bouton actualiser cliqué !");
    this.loadPersonnes();
  }

  savePersonne(): void {
    if (this.isEditMode && this.personneForm.id) {
      this.personneService.update(this.personneForm.id, this.personneForm).subscribe(() => {
        this.resetForm();
        this.loadPersonnes();
      });
    } else {
      this.personneService.create(this.personneForm).subscribe(() => {
        this.resetForm();
        this.loadPersonnes();
      });
    }
  }

  onSubmit(): void {
    this.savePersonne();
    this.showModal = false;
  }

  editPersonne(p: Personne): void {
    this.personneForm = { ...p };
    this.isEditMode = true;
    this.showModal = true;
  }

  deletePersonne(id: number): void {
    this.personneService.delete(id).subscribe(() => this.loadPersonnes());
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


