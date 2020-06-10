import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { TotalDataSummary } from 'src/app/models/totaldata';
import { DateWiseData } from 'src/app/models/date-wise-data';
import { GoogleChartInterface } from 'ng2-google-charts';
import { map } from 'rxjs/Operators';
import { merge } from 'rxjs';

@Component({
  selector: 'app-pays',
  templateUrl: './pays.component.html',
  styleUrls: ['./pays.component.css']
})
export class PaysComponent implements OnInit {

  data: TotalDataSummary[];
  Pays: string[] = [];
  totalConfirmer = 0;
  totalEtablie = 0;
  totalMorts = 0;
  totalActive = 0;
  dateWiseData ;
  datatable;
  selectedPaysData: DateWiseData[];
  lineChart: GoogleChartInterface = {
    chartType: 'PieChart', };
  constructor(private service: DataServiceService) { }

  ngOnInit(): void {


    merge(
      this.service.getDateWiseData().pipe(
        map(result => {
          this.dateWiseData = result;
        })
      ),
      this.service.getTotalData().pipe(map(result => {
        this.data = result;
        this.data.forEach(cs => {
          this.Pays.push(cs.pays);
        });
      }))
    ).subscribe(
      {
        complete : () => {
         this.updateValues('Morocco');
         this.updateChart();

        }
      }
    );
  }


  updateValues(pays: string){
    console.log(pays);
    this.data.forEach(cs => {
      if (cs.pays === pays){
          this.totalActive = cs.active;
          this.totalConfirmer = cs.confirmer;
          this.totalEtablie = cs.etablie;
          this.totalMorts = cs.morts;
      }

    });
    this.selectedPaysData  = this.dateWiseData[pays];
    // console.log(this.selectedCountryData);
    this.updateChart();

  }

  updateChart(){
    let datatable = [];
    datatable.push([ 'Date' , 'cas']);
    this.selectedPaysData.forEach(cs => {
      datatable.push([cs.date , cs.cas]); });
    this.lineChart = {
        chartType: 'LineChart',
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
}
