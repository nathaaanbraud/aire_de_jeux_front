import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TableauComponent} from "./components/tableau/tableau.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TableauComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'

})
export class AppComponent {
  title = 'projet-crud';
}
