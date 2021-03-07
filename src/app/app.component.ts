import {Component, HostBinding} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-form-control-errors';
  @HostBinding() class = 'd-flex w-100 min-vh-100 justify-content-center align-items-center';
  success = false;
  username = '';

  constructor(
    translateService: TranslateService
  ) {
    translateService.use('en');
  }

  submit(): void {
    this.success = true;
  }
}
