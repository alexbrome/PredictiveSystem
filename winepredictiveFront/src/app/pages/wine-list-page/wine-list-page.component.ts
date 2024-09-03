import { Component } from '@angular/core';
import { WineListComponent } from '../../components/wine-list/wine-list.component';

@Component({
  selector: 'app-wine-list-page',
  standalone: true,
  imports: [
    WineListComponent
  ],
  templateUrl: './wine-list-page.component.html',
  styleUrl: './wine-list-page.component.css'
})
export class WineListPageComponent {

}
