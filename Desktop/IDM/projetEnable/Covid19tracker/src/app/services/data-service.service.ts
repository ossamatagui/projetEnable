import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/Operators';
import { TotalDataSummary } from '../models/totaldata';
import { DateWiseData } from '../models/date-wise-data';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private totalDataUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/06-08-2020.csv';
  private dateWiseDataUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv';
  constructor(private http: HttpClient) { }

  getDateWiseData() {
    return this.http.get(this.dateWiseDataUrl, { responseType: 'text' }).pipe(map(
      result => {
      const rows = result.split('\n');
      const mainData = {};
      const header = rows[0];
      const dates = header.split(/,(?=\S)/);
      dates.splice(0 , 4);
      rows.splice(0 , 1);
      rows.forEach(row => {
        const cols = row.split(/,(?=\S)/);
        const pay = cols[1];
        cols.splice(0 , 4);
        mainData[pay] = [];
        cols.forEach((value , index) => {
          const dw: DateWiseData = {
            cas : +value ,
            pays : pay ,
            date : new Date(Date.parse(dates[index]))

          };
          mainData[pay].push(dw);
        });
      });
      // console.log(mainData);
      return mainData;
    }));
   }

   getTotalData() {
    return this.http.get(this.totalDataUrl, { responseType: 'text' }).pipe(
      map(result => {
        const data: TotalDataSummary[] = [];
        const raw = {};
        const rows = result.split('\n');
        rows.splice(0, 1);
        // console.log(rows);
        rows.forEach(row => {
          const cols = row.split(/,(?=\S)/);

          const cs = {
            pays: cols[3],
            confirmer: +cols[7],
            morts: +cols[8],
            etablie: +cols[9],
            active: +cols[10],
          };
          const temp: TotalDataSummary = raw[cs.pays];
          if (temp) {
            temp.active = cs.active + temp.active;
            temp.confirmer = cs.confirmer + temp.confirmer;
            temp.morts = cs.morts + temp.morts;
            temp.etablie = cs.etablie + temp.etablie;

            raw[cs.active] = temp;
          } else {
            raw[cs.pays] = cs;
          }
        });
        return Object.values(raw) as TotalDataSummary[];
      })
    );
  }}
