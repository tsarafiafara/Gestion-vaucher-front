export interface Commune {
  nom: string;
}

export interface District {
  nom: string;
  communes: string[];
}

export interface Region {
  nom: string;
  districts: District[];
}

export interface DataMada {
  pays: string;
  version: string;
  regions: Region[];
}
