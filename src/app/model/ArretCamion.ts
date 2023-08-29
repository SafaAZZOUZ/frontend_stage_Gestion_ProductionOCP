import { Camion } from './Camion';

export interface ArretCamion {
  id: number;
  dateHeure: Date;
  cause: string;
  duree: string;
  camion: Camion[];
  camionsDisponibles: Camion[]; // Liste des camions disponibles
}
