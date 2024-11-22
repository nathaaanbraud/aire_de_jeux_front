import {Component, OnInit} from '@angular/core';
import {Reservation} from "../../model/Reservation";
import {ReservationService} from "../../service/ReservationService";

@Component({
  selector: 'app-tableau',
  standalone: true,
  imports: [],
  templateUrl: './tableau.component.html',
  styleUrl: './tableau.component.css'
})
export class TableauComponent implements OnInit {
  jeux!: Reservation[];

  constructor(private ReservationService: ReservationService) { }

  ngOnInit() : void {
    this.jeux = this.ReservationService.getAll();
  }
}
