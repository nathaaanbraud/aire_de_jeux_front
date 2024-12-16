import { Routes } from '@angular/router';
import { FormulaireJeuxComponent } from './components/formulaire-jeux/formulaire-jeux.component';
import { TableauComponent } from './components/tableau/tableau.component';
import {FormulaireReservationComponent} from "./components/formulaire-reservation/formulaire-reservation.component";
import {MapComponent} from './components/map/map.component';
import { LoginComponent } from './components/login/login.component';
import { CreerCompteComponent } from './components/creer-compte/creer-compte.component';
import { AuthGuard } from './guards/auth.guard';
import {TableauReservationComponent} from "./components/tableau-reservation/tableau-reservation.component";

export const routes: Routes = [
  { path: '', redirectTo: 'app-tableau', pathMatch: 'full' },
  { path: 'app-formulaire-jeux/:id', component: FormulaireJeuxComponent },
  { path: 'app-tableau', component: TableauComponent },
  { path: 'app-map', component: MapComponent },
  { path: 'app-login', component: LoginComponent },
  { path: 'app-creer-compte', component: CreerCompteComponent },
  { path: 'app-formulaire-reservation', component: FormulaireReservationComponent, canActivate: [AuthGuard.canActivate] },
  { path: 'app-tableau-reservation', component: TableauReservationComponent }
];
