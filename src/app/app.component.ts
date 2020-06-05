import { AuthService } from './services/auth.service';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routeAnimations } from './animations/routeAnimations.animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ routeAnimations ],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.autoLogin();
  }
  
  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData["animation"]
    );
  }
}
