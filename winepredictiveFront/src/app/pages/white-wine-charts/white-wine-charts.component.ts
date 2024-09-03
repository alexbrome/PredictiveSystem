import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../../services/data-sharing.service';
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { ChartModule } from 'primeng/chart';



@Component({
    selector: 'app-white-wine-charts',
    standalone: true,
    imports: [
        ButtonModule, RouterLink, ChartModule
    ],
    templateUrl: './white-wine-charts.component.html',
    styleUrl: './white-wine-charts.component.css'
})
export class WhiteWineChartsComponent implements OnInit {

    //Charts
    fixed_acidityChart: any;
    volatile_acidityChart: any
    citric_acidChart: any;
    residual_sugarChart: any
    chloridesChart: any;
    free_sulfur_dioxideChart: any;
    total_sulfure_dioxideChart: any;
    densityChart: any;
    pHChart: any;
    sulphatesChart: any;
    alcoholChart: any;

    //BasicOptions-charts
    basicOptions_fixed_acidity: any;
    basicOptions_volatile_acidity: any;
    basicOptions_citric_acidChart: any;
    basicOptions_residual_sugar: any;
    basicOptions_chlorides: any;
    basicOptions_free_sulfur_dioxide: any;
    basicOptions_total_sulfure_dioxide: any;
    basicOptions_density: any;
    basicOptions_pH: any;
    basicOptions_sulphates: any;
    basicOptions_alcohol: any;

    /*charts*/
    qualityPredicted: Number = 0
    dataSharing: Number[] = []

    //Mean of 30 best wines
    fixed_acidityMean30: Number = 7.23;
    volatile_acidity: Number = 0.267;
    citric_acid: Number = 0.345;
    residual_sugar: Number = 6.763;
    chlorides: Number = 0.043;
    free_sulfur_dioxide: Number = 33.83;
    total_sulfure_dioxide: Number = 131.916;
    density: Number = 0.993;
    pH: Number = 3.159;
    sulphates: Number = 0.435;
    alcohol: Number = 11.09;
    quality: Number = 8.166;
    wineName: any;

    constructor(private dataSharingService: DataSharingService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.wineName = this.dataSharingService.getNameWine().selectedWine;
        this.qualityPredicted = this.dataSharingService.getWhiteWineQualityPredicted();
        this.dataSharing = this.dataSharingService.getwhiteWineData();


        //fixed Acidity
        this.fixed_acidityChart = {
            labels: [this.wineName.name, '30 Best Mean'],
            datasets: [
                {
                    label: 'Fixed Acidity',
                    data: [this.dataSharing[0], this.fixed_acidityMean30],
                    backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                    borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
                    borderWidth: 1
                }
            ]
        };

        this.basicOptions_fixed_acidity = {
            plugins: {
                legend: {
                    labels: {
                        color: 'black'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: 'blue'
                    },
                    grid: {
                        color: 'pink',
                        drawBorder: false
                    }
                },
                x: {
                    ticks: {
                        color: 'black'
                    },
                    grid: {
                        color: 'white',
                        drawBorder: false
                    }
                }
            }
        };

        //Volatile acidity
        this.volatile_acidityChart = {
            labels: [this.wineName.name, '30 Best Mean'],
            datasets: [
                {
                    label: 'Volatile Acidity',
                    data: [this.dataSharing[1], this.volatile_acidity],
                    backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                    borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
                    borderWidth: 1
                }
            ]
        };

        this.basicOptions_volatile_acidity = {
            plugins: {
                legend: {
                    labels: {
                        color: 'black'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: 'blue'
                    },
                    grid: {
                        color: 'pink',
                        drawBorder: false
                    }
                },
                x: {
                    ticks: {
                        color: 'black'
                    },
                    grid: {
                        color: 'white',
                        drawBorder: false
                    }
                }
            }
        };


        //Citric acid
        this.citric_acidChart = {
            labels: [this.wineName.name, '30 Best Mean'],
            datasets: [
                {
                    label: 'Citric Acidity',
                    data: [this.dataSharing[2], this.citric_acid],
                    backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                    borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
                    borderWidth: 1
                }
            ]
        };

        this.basicOptions_citric_acidChart = {
            plugins: {
                legend: {
                    labels: {
                        color: 'black'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: 'blue'
                    },
                    grid: {
                        color: 'pink',
                        drawBorder: false
                    }
                },
                x: {
                    ticks: {
                        color: 'black'
                    },
                    grid: {
                        color: 'white',
                        drawBorder: false
                    }
                }
            }
        };

        //Residual Sugar
        this.residual_sugarChart = {
            labels: [this.wineName.name, '30 Best Mean'],
            datasets: [
                {
                    label: 'Residual Sugar',
                    data: [this.dataSharing[3], this.residual_sugar],
                    backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                    borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
                    borderWidth: 1
                }
            ]
        };

        this.basicOptions_residual_sugar = {
            plugins: {
                legend: {
                    labels: {
                        color: 'black'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: 'blue'
                    },
                    grid: {
                        color: 'pink',
                        drawBorder: false
                    }
                },
                x: {
                    ticks: {
                        color: 'black'
                    },
                    grid: {
                        color: 'white',
                        drawBorder: false
                    }
                }
            }
        };

        //Chlorides
        this.chloridesChart = {
            labels: [this.wineName.name, '30 Best Mean'],
            datasets: [
                {
                    label: 'Chlorides',
                    data: [this.dataSharing[4], this.citric_acid],
                    backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                    borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
                    borderWidth: 1
                }
            ]
        };

        this.basicOptions_chlorides = {
            plugins: {
                legend: {
                    labels: {
                        color: 'black'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: 'blue'
                    },
                    grid: {
                        color: 'pink',
                        drawBorder: false
                    }
                },
                x: {
                    ticks: {
                        color: 'black'
                    },
                    grid: {
                        color: 'white',
                        drawBorder: false
                    }
                }
            }
        };


        //Free sulfur dioxide

        this.free_sulfur_dioxideChart = {
            labels: [this.wineName.name, '30 Best Mean'],
            datasets: [
                {
                    label: 'Free sulfure dioxide',
                    data: [this.dataSharing[5], this.free_sulfur_dioxide],
                    backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                    borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
                    borderWidth: 1
                }
            ]
        };

        this.basicOptions_free_sulfur_dioxide = {
            plugins: {
                legend: {
                    labels: {
                        color: 'black'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: 'blue'
                    },
                    grid: {
                        color: 'pink',
                        drawBorder: false
                    }
                },
                x: {
                    ticks: {
                        color: 'black'
                    },
                    grid: {
                        color: 'white',
                        drawBorder: false
                    }
                }
            }
        };


        //total sulfure dioxide

        this.total_sulfure_dioxideChart = {
            labels: [this.wineName.name, '30 Best Mean'],
            datasets: [
                {
                    label: 'Total sulfure dioxide',
                    data: [this.dataSharing[6], this.total_sulfure_dioxide],
                    backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                    borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
                    borderWidth: 1
                }
            ]
        };

        this.basicOptions_total_sulfure_dioxide = {
            plugins: {
                legend: {
                    labels: {
                        color: 'black'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: 'blue'
                    },
                    grid: {
                        color: 'pink',
                        drawBorder: false
                    }
                },
                x: {
                    ticks: {
                        color: 'black'
                    },
                    grid: {
                        color: 'white',
                        drawBorder: false
                    }
                }
            }
        };

        //Density
        this.densityChart = {
            labels: [this.wineName.name, '30 Best Mean'],
            datasets: [
                {
                    label: 'Density',
                    data: [this.dataSharing[7], this.density],
                    backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                    borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
                    borderWidth: 1
                }
            ]
        };
        this.basicOptions_density = {
            plugins: {
                legend: {
                    labels: {
                        color: 'black'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: 'blue'
                    },
                    grid: {
                        color: 'pink',
                        drawBorder: false
                    }
                },
                x: {
                    ticks: {
                        color: 'black'
                    },
                    grid: {
                        color: 'white',
                        drawBorder: false
                    }
                }
            }
        };



        //PH

        this.pHChart = {
            labels: [this.wineName.name, '30 Best Mean'],
            datasets: [
                {
                    label: 'PH',
                    data: [this.dataSharing[8], this.pH],
                    backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                    borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
                    borderWidth: 1
                }
            ]
        };


        this.basicOptions_pH = {
            plugins: {
                legend: {
                    labels: {
                        color: 'black'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: 'blue'
                    },
                    grid: {
                        color: 'pink',
                        drawBorder: false
                    }
                },
                x: {
                    ticks: {
                        color: 'black'
                    },
                    grid: {
                        color: 'white',
                        drawBorder: false
                    }
                }
            }
        };


        //Sulphates
        this.sulphatesChart = {
            labels: [this.wineName.name, '30 Best Mean'],
            datasets: [
                {
                    label: 'Sulphates',
                    data: [this.dataSharing[9], this.sulphates],
                    backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                    borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
                    borderWidth: 1
                }
            ]
        };


        this.basicOptions_sulphates = {
            plugins: {
                legend: {
                    labels: {
                        color: 'black'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: 'blue'
                    },
                    grid: {
                        color: 'pink',
                        drawBorder: false
                    }
                },
                x: {
                    ticks: {
                        color: 'black'
                    },
                    grid: {
                        color: 'white',
                        drawBorder: false
                    }
                }
            }
        };



        //Alcohol

        this.alcoholChart = {
            labels: [this.wineName.name, '30 Best Mean'],
            datasets: [
                {
                    label: 'Alcohol',
                    data: [this.dataSharing[10], this.alcohol],
                    backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                    borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
                    borderWidth: 1
                }
            ]
        };


        this.basicOptions_alcohol = {
            plugins: {
                legend: {
                    labels: {
                        color: 'black'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: 'blue'
                    },
                    grid: {
                        color: 'pink',
                        drawBorder: false
                    }
                },
                x: {
                    ticks: {
                        color: 'black'
                    },
                    grid: {
                        color: 'white',
                        drawBorder: false
                    }
                }
            }
        };


    }


    // Method to go back button
    goBack() {
        this.router.navigate(['whiteWine-page']);
    }


    goSummary() {
        this.router.navigate(['summaryWhite'])
     }

}
