import { Routes } from '@angular/router';
import { RedWinePageComponent } from './pages/red-wine-page/red-wine-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { WhiteWinePageComponent } from './pages/white-wine-page/white-wine-page.component';
import { RedWineChartsComponent } from './pages/red-wine-charts/red-wine-charts.component';
import { WhiteWineChartsComponent } from './pages/white-wine-charts/white-wine-charts.component';

export const routes: Routes = [
    { path:'redWine-page', component: RedWinePageComponent },
    { path:'whiteWine-page', component: WhiteWinePageComponent },
    {  path:'redWine-page/redWineCharts',component : RedWineChartsComponent},
    {  path:'whiteWine-page/whiteWineCharts',component : WhiteWineChartsComponent},
    { path:'',             component: MainPageComponent }
];
