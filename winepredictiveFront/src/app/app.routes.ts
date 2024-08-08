import { Routes } from '@angular/router';
import { RedWinePageComponent } from './pages/red-wine-page/red-wine-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';

export const routes: Routes = [
    { path:'redWine-page', component: RedWinePageComponent },
    { path:'',             component: MainPageComponent }
];
