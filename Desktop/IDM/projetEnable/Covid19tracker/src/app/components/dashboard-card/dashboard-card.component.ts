import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.css']
})
export class DashboardCardComponent implements OnInit {

  @Input()
  totalConfirmer: number;
  @Input()
  totalMorts: number;
  @Input()
  totalActive: number;
  @Input()
  totalEtablie: number;

  constructor() { }

  ngOnInit(): void {
  }
}
