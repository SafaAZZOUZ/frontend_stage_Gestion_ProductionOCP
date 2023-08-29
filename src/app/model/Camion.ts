import {Voyage} from './Voyage';

export interface Camion {
  id: number;
  marque: string;
  modele: string;
  consommationCarburant: number;
  kilometrage: number;
  dateMaintenance: Date;

}
