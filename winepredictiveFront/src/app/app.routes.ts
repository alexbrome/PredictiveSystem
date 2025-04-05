import { Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { WhiteWinePageComponent } from './pages/white-wine-page/white-wine-page.component';

import { SignupComponent } from './auth/components/signup/signup.component';
import { LoginComponent } from './auth/components/login/login.component';
import { SummaryWhiteWineComponent } from './pages/summary-white-wine/summary-white-wine.component';
import { WineListComponent } from './components/wine-list/wine-list.component';
import { HomeAdminComponent } from './pages/home-admin/home-admin.component';
import { ChatAIComponent } from './components/chat-ai/chat-ai.component';

export const routes: Routes = [
 
    { path: 'whiteWine-page', component: WhiteWinePageComponent },
    { path: 'main' ,component:MainPageComponent },
    { path: 'signup', component : SignupComponent },
    { path: 'summaryWhite/:wineId', component : SummaryWhiteWineComponent },
    { path: 'wineList', component : WineListComponent },
    { path: 'homeAdmin', component : HomeAdminComponent },
    { path: '', component: LoginComponent },
    { path:'chat/:predictionId',component:ChatAIComponent},
   
];
