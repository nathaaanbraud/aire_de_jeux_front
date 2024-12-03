import { Routes } from '@angular/router';
import { FormulaireComponent } from './components/formulaire/formulaire.component';
import { TableauComponent } from './components/tableau/tableau.component';

export const routes: Routes = [
  { path: '', redirectTo: 'app-tableau', pathMatch: 'full' }, // redirige vers le tableau par defaut
  { path: 'app-formulaire/:id', component: FormulaireComponent },
  { path: 'app-tableau', component: TableauComponent },
];
