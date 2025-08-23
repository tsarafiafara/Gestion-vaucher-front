export interface Personne {
  id?: number;
  nom: string;
  prenom: string;
  dateNaissance: string; // ISO format (yyyy-MM-dd)
  sexe: string;
  etablissementSanitaireId: number;
}

