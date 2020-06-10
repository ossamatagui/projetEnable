import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { TotalDataSummary } from 'src/app/models/totaldata';
import {GoogleChartInterface} from 'ng2-google-charts';


@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})
export class AcceuilComponent implements OnInit {

  totalConfirmer = 0;
  totalActive = 0;
  totalMorts = 0;
  totalEtablie = 0;
  totalData: TotalDataSummary[];
  datatable = [];
  pieChart: GoogleChartInterface = {
    chartType: 'PieChart',
  };
  columnChart: GoogleChartInterface = {
    chartType: 'ColumnChart',
    dataTable: this.datatable,
};


  constructor(private dataService: DataServiceService) { }

  initChart(cas: string) {
    const datatable = [];
    this.totalData.forEach(cs => {
      let value: number;
      if (cas === 'c'){
        if (cs.confirmer > 2000)
        {value = cs.confirmer; }}
      if (cas === 'e'){
        if (cs.etablie > 2000)
        {value = cs.etablie; }}
      if (cas === 'm'){
        if (cs.morts > 1000)
        {value = cs.morts; }}
      if (cas === 'a'){
        if (cs.active > 2000)
        {value = cs.active; }}
      this.datatable.push([cs.pays , value]);
    });
    this.pieChart = {
      chartType: 'PieChart',
      dataTable: datatable,

      options: {
        pays: 'pays',
        cas : 'cas',
        height: 500,
        animation: {
          duration: 1000,
          easing: 'out',
        },
      }};

    this.columnChart = {
      chartType: 'ColumnChart',
      dataTable: datatable,
      options : {
        height: 500,
        animation: {
          duration: 1000,
          easing: 'out',
        },
      }
    };
  }
  updateChart(input: HTMLInputElement) {
    console.log(input.value);
    this.initChart(input.value);

  }
  ngOnInit(): void {

    this.dataService.getTotalData().subscribe({
      next : (result) => {
        console.log(result);
        this.totalData = result;
        result.forEach(cs => {
              if (!Number.isNaN(cs.confirmer)) {
                this.totalActive += cs.active;
                this.totalConfirmer += cs.confirmer;
                this.totalMorts += cs.morts;
                this.totalEtablie += cs.etablie;
      }
    });
        this.initChart('c');
  }

}); } }
