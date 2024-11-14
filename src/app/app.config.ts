import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import {provideHttpClient} from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAnimations(),provideCharts(withDefaultRegisterables()),provideHttpClient(),provideToastr({
    timeOut: 10000,
    positionClass: 'toast-bottom-right',
    preventDuplicates: true,
  })]
};
