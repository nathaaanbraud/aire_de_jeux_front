import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { errorInterceptor } from './app/service/interceptors/error.service';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), provideHttpClient(withInterceptors([errorInterceptor])), provideAnimationsAsync(),

  ],
});
