import {Camion} from './Camion';
import {Conducteur} from './Conducteur';


export interface Voyage {
  id: number;
  itineraire: string;
  dateDepart: Date;
  dateArrivee: Date;
  camions: Camion[];
  conducteurs: Conducteur[];
  averageDuration: number;
}

