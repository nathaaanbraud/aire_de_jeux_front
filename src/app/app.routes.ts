import { Routes } from '@angular/router';
import { FormulaireJeuxComponent } from './components/formulaire-jeux/formulaire-jeux.component';
import { TableauComponent } from './components/tableau/tableau.component';
import {FormulaireReservationComponent} from "./components/formulaire-reservation/formulaire-reservation.component";
import {MapComponent} from "./components/map/map.component";

export const routes: Routes = [
  { path: '', redirectTo: 'app-tableau', pathMatch: 'full' }, // redirige vers le tableau par defaut
  { path: 'app-formulaire/:id', component: FormulaireJeuxComponent },
  { path: 'app-tableau', component: TableauComponent },
  { path: 'app-formulaire-reservation', component: FormulaireReservationComponent },
  { path: 'app-map', component: MapComponent },
];
