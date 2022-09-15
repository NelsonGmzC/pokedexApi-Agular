import { Component, ElementRef, Input, OnChanges, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-poke-details',
  templateUrl: './poke-details.component.html',
  styleUrls: ['./poke-details.component.scss']
})
export class PokeDetailsComponent implements OnChanges {
  
  @Input() pokemonSelectDetails: any;
  @Input() pokemonSelectGen: number | undefined;
  @ViewChild('front_default') front_default!: ElementRef;
  @ViewChild('front_shiny') front_shiny!: ElementRef;
  btnImgDefault:boolean = true;
  btnImgShiny:boolean = false;

  constructor(
    private renderer2: Renderer2
  ) {
    Chart.register(...registerables);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.pokemonSelectDetails !== undefined) {
      //if (changes['pokemonSelectDetails'].currentValue != changes['pokemonSelectDetails'].previousValue){
        setTimeout(()=>{  
          this.ngAfterViewInit();
        }, 100);
      //}
    }
    if (changes['pokemonSelectGen']) {
      this.pokemonSelectDetails = undefined;
    }
  }

  // Grafica 
  canvas: any;
  ctx: any;
  pieChart: any;
  @ViewChild('pieCanvas') pieCanvas!: { nativeElement: any };

  ngAfterViewInit(): void {
    if (this.pieChart !== undefined) {
      this.pieChart.destroy();
    }
    this.pieChartBrowser();
  }

  pieChartBrowser(): void {
    this.canvas = <HTMLInputElement>this.pieCanvas.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    this.pieChart = new Chart(this.ctx, {
      type: 'radar',
      data: {
        labels: [
          ['HP', this.pokemonSelectDetails.stats[0].base_stat],
          ['Attack', this.pokemonSelectDetails.stats[1].base_stat],
          ['Defense', this.pokemonSelectDetails.stats[2].base_stat],
          ['Speed', this.pokemonSelectDetails.stats[3].base_stat],
          ['Sp. Def', this.pokemonSelectDetails.stats[4].base_stat],
          ['Sp. Atk', this.pokemonSelectDetails.stats[5].base_stat],
        ],
        datasets: [
          {
            data: [
              this.pokemonSelectDetails.stats[0].base_stat,
              this.pokemonSelectDetails.stats[1].base_stat,
              this.pokemonSelectDetails.stats[2].base_stat,
              this.pokemonSelectDetails.stats[3].base_stat,
              this.pokemonSelectDetails.stats[4].base_stat,
              this.pokemonSelectDetails.stats[5].base_stat
            ],
            fill: true,
            backgroundColor: 'rgba(136, 96, 183, 0.2)',
            borderColor: 'rgb(136, 96, 183)',
            pointBackgroundColor: 'rgb(136, 96, 183)',
            //pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(136, 96, 183)'
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          r: {
            min: 0,
            max: 180,
            beginAtZero: true,

            pointLabels: {
              display: true,
              font: {
                size: 15,
                weight: 'bold',
              },
            },
            ticks: {
              display: false // Hides the labels in the middel (numbers)
            },
          }
        }
      },
    });
  }

}
