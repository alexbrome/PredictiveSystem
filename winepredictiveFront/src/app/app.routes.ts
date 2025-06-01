import { Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { WhiteWinePageComponent } from './pages/white-wine-page/white-wine-page.component';

import { SignupComponent } from './auth/components/signup/signup.component';
import { LoginComponent } from './auth/components/login/login.component';
import { SummaryWhiteWineComponent } from './pages/summary-white-wine/summary-white-wine.component';
import { WineListComponent } from './components/wine-list/wine-list.component';
import { HomeAdminComponent } from './pages/home-admin/home-admin.component';
import { ChatAIComponent } from './components/chat-ai/chat-ai.component';
import { NotFoundPageComponent } from './Guards/not-found-page/not-found-page.component';
import { routeAdminGuard } from './Guards/routeAdminGuard';
import { UnauthorizedAccesComponent } from './Guards/unauthorized-acces/unauthorized-acces.component';
import { routeCustomerGuard } from './Guards/routeCustomerGuard';

export const routes: Routes = [
 
    { path: 'whiteWine-page', component: WhiteWinePageComponent ,canActivate: [ routeCustomerGuard ]},
    { path: 'main' ,component:MainPageComponent , canActivate: [ routeCustomerGuard ]},
    { path: 'signup', component : SignupComponent },
    { path: 'summaryWhite/:wineId', component : SummaryWhiteWineComponent , canActivate: [ routeCustomerGuard ]},
    { path: 'wineList', component : WineListComponent , canActivate: [ routeCustomerGuard ]},
    { path: 'homeAdmin', component : HomeAdminComponent, canActivate: [ routeAdminGuard ] },
    { path: '', component: LoginComponent,  },
    { path:'chat/:predictionId',component:ChatAIComponent ,canActivate: [ routeCustomerGuard ]},
    { path: 'unauthorized', component: UnauthorizedAccesComponent },
    { path: '**', component: NotFoundPageComponent },
   
   
];
