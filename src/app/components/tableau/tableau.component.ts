import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { Jeux } from '../../model/Jeux';
import { JeuxService } from '../../service/JeuxService';
import { Observable } from 'rxjs';
import { NgForOf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tableau',
  standalone: true,
  imports: [
    NgForOf,
    MatPaginatorModule,
    MatTableModule
  ],
  templateUrl: './tableau.component.html',
  styleUrls: ['./tableau.component.css']
})
export class TableauComponent implements OnInit {
  jeuxList: Jeux[] = [];
  displayedColumns: string[] = ['id', 'nom', 'description', 'quantite', 'pointGeo'];
  paginatedData: Jeux[] = [];
  pageSize = 5; // Nombre d'éléments par page
  currentPage = 0; // Page actuelle

  constructor(private JeuxService: JeuxService, private router: Router) {}

  ngOnInit(): void {
    this.JeuxService.getAllJeux().subscribe((data: Jeux[]) => {
      this.jeuxList = data;
      this.updatePagination();
    });
  }

  updatePagination(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedData = this.jeuxList.slice(startIndex, endIndex);
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagination();
  }

  navigateToFormulaire(id: number): void {
    if (id) {
      this.router.navigate([`/app-formulaire/${id}`]);
    } else {
      console.error('ID non valide pour la redirection');
    }
  }

  navigateToFormulaireReservation(): void {
    this.router.navigate(['/app-formulaire-reservation/']);
  }

  navigateToMap(): void {
    this.router.navigate(['/app-map/']);
  }
}
