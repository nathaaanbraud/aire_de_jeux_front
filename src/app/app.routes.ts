import { Routes } from '@angular/router';
import { FormulaireJeuxComponent } from './components/formulaire-jeux/formulaire-jeux.component';
import { TableauComponent } from './components/tableau/tableau.component';
import {FormulaireReservationComponent} from "./components/formulaire-reservation/formulaire-reservation.component";
import {MapComponent} from "./components/map/map.component";
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'app-tableau', pathMatch: 'full' },
  { path: 'app-formulaire-jeux/:id', component: FormulaireJeuxComponent },
  { path: 'app-tableau', component: TableauComponent },
  { path: 'app-formulaire-reservation', component: FormulaireReservationComponent, canActivate: [AuthGuard.canActivate] },
  { path: 'app-map', component: MapComponent },
  { path: 'login', component: LoginComponent }
];
