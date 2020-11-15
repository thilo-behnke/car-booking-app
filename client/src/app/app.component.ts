import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'booking-client';

  routes = [
    { path: '/home', name: 'Home', icon: 'home' },
    { path: '/cars', name: 'Manage Cars', icon: 'directions_car' },
    { path: '/users', name: 'Manage Users', icon: 'face' },
  ];
}
