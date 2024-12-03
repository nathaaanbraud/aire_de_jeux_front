import {Component, OnInit} from '@angular/core';
import {Jeux} from "../../model/Jeux";
import {JeuxService} from "../../service/JeuxService";
import {Observable} from "rxjs";
import {NgForOf} from "@angular/common";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-tableau',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './tableau.component.html',
  //template: `<h1>Tableau</h1>`,
  styleUrl: './tableau.component.css'
})
export class TableauComponent implements OnInit {
  jeux!: Observable<Jeux[]>;
  jeuxList: Jeux[]=[];
  constructor(private JeuxService: JeuxService, private router: Router) {}

  ngOnInit() : void {
    this.JeuxService.getAllJeux().subscribe((data: Jeux[]) => {
      this.jeuxList = data;
    });
  };
  navigateToFormulaire(id: number): void {
    if (id) {
      this.router.navigate([`/app-formulaire/${id}`]); // Redirige vers la route du formulaire avec l'ID
    } else {
      console.error('ID non valide pour la redirection');
    }}
  navigateToFormulaireReservation(): void {
    this.router.navigate(['/app-formulaire-reservation/']); // Redirige vers la route du formulaire de réservation
  }
  navigateToMap(): void {
    this.router.navigate(['/app-map/']); // Redirige vers la route de la carte
  }

}

