import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {StaticLoaderService} from './static-loader.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    TranslateModule.forRoot({
      useDefaultLang: false,
      loader: {provide: TranslateLoader, useClass: StaticLoaderService},
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
