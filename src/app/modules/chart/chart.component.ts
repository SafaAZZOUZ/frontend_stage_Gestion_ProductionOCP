import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import {ChartService} from '../../services/chart.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  @Input() chartData: any[];

  constructor(private chartDataService: ChartService) {
  }

  ngOnInit(): void {
    this.fetchChartData();
  }

  fetchChartData() {
    this.chartDataService.fetchChartData().subscribe(
      (data: any) => {
        if (Array.isArray(data)) {
          this.chartData = data;
          this.createChart();
        } else {
          console.error('Invalid chart data format:', data);
        }
      },
      (error) => {
        console.error('Failed to fetch chart data:', error);
      }
    );
  }

  createChart() {
    if (Array.isArray(this.chartData)) {
      const labels = this.chartData.map(entry => entry.dateEvaluation);
      const tauxSatisfactionData = this.chartData.map(entry => entry.tauxSatisfaction);
      const tauxDefautsData = this.chartData.map(entry => entry.tauxDefauts);

      new Chart('myChart', {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Taux de Satisfaction',
              borderColor: 'blue',
              data: tauxSatisfactionData,
              fill: false
            },
            {
              label: 'Taux de Défauts',
              borderColor: 'red',
              data: tauxDefautsData,
              fill: false
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: 'Date d\'évaluation'
              }
            },
            y: {
              display: true,
              title: {
                display: true,
                text: 'Taux'
              }
            }
          },
          plugins: {
            title: {
              display: true,
              text: 'Évolution des taux de satisfaction et de défauts'
            },
            legend: {
              display: true,
              position: 'bottom'
            }
          }
        }
      });
    } else {
      console.error('chartData is not an array');
    }
  }
  printChart() {
    const chartCanvas = document.getElementById('myChart') as HTMLCanvasElement;
    const printWindow = window.open('', '_blank');
    printWindow.document.write('<html><head><title>Print Chart</title></head><body>');
    printWindow.document.write('<img src="' + chartCanvas.toDataURL() + '">');
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  }
}
