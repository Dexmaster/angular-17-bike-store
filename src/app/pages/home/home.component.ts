import { Component } from '@angular/core';
import { WeatherWidgetComponent } from '@components/weather-widget/weather-widget.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [WeatherWidgetComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export default class HomeComponent {

}
