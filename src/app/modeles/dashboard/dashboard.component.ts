import {Component, OnInit, ViewChild} from '@angular/core';
import {NombredeConsultationparMois} from "../../Classes/Analytics/nombredeConsultationparMois";
import {AnalyticsService} from "../../shared/services/analytics.service";
import {MaladieChroniquePlusCaurant} from "../../Classes/Analytics/maladieChroniquePlusCaurant";
export type ChartOptions = {
  // series: ApexNonAxisChartSeries;
  // chart: ApexChart;
  // responsive: ApexResponsive[];
  // labels: string[];
};
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  public options: any;
  // @ViewChild("chart") chart!: ChartComponent;
  // public chartOptions!: ChartOptions;
  loading = true;
  NombreConsultationParMois: NombredeConsultationparMois[] = [];
  maladieChronique:MaladieChroniquePlusCaurant[]=[]
  colors: string[] = ['#FF5733', '#FFBD33', '#FFD133', '#FFFB33', '#D6FF33', '#33FF57', '#33FFB1', '#33C2FF', '#3377FF', '#7933FF', '#D333FF', '#FF33F2'];
  constructor(private service: AnalyticsService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 10000); // Délai de 10 secondes avant de désactiver le chargement
    this.getNombreConsultationParMois();
    // this.getMaladiePlusCaurant()
  }
  getNombreConsultationParMois(): void {
    this.service.getNombreConsultationParMois().subscribe(
      response => {
        this.NombreConsultationParMois = response;
        this.options = {
          title: {
            text: "Nombre des Consultations par Mois",
          },
          data: this.NombreConsultationParMois.map((item, index) => ({
            x: item.moisDeConsultation.valueOf(),
            y: item.nombreDeConsultation.valueOf(),
            fill: this.colors[index % this.colors.length]
          })),
          series: [
            {
              type: "bar",
              xKey: "x",
              yKey: "y",
              yName: "Nombre des Consultations",
              fill:"fill"
            },
          ],
        };
      },
      error => console.log(error)
    );
  }
  // getMaladiePlusCaurant() {
  //   this.service.getNombreMaladieChroniquePlusCaurant().subscribe(response => {
  //     this.maladieChronique = response;
  //     console.log(this.maladieChronique);
  //
  //     // Update chart data based on retrieved data
  //     this.updateChartData();
  //   });
  // }
  // public title: ApexTitleSubtitle= {
  //   text: "Les Maladies Chroniques Plus Courantes",
  //   align: "center"
  // };
  // updateChartData() {
  //   // Extract data for chart series and labels from maladieChronique
  //   const seriesData = this.maladieChronique.map(item => item.nombreMaladies);
  //   const labels = this.maladieChronique.map(item => item.maladiesChronique);
  //
  //   // Update chart options with dynamic data
  //   this.chartOptions = {
  //     series: seriesData,
  //     chart: {
  //       width: 590,
  //       height: 590,
  //       type: "pie",
  //     },
  //     labels: labels,
  //     responsive: [
  //       {
  //         breakpoint: 480,
  //         options: {
  //           chart: {
  //             width: 200
  //           },
  //           legend: {
  //             position: "bottom"
  //           }
  //         }
  //       }
  //     ]
  //   };
  // }
}
