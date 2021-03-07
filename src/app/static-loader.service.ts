import {Injectable} from '@angular/core';
import {TranslateLoader} from '@ngx-translate/core';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaticLoaderService implements TranslateLoader {

  readonly en = {
    'common.input': {
      required: 'Field is required',
      minlength: 'Minimal length is {{ requiredLength }}',
      maxlength: 'Maximum length is {{ requiredLength }}'
    },
    success: 'Success, your username is <b>{{username}}</b>.',
    heading: 'Awesome form',
    username: {placeholder: '2bad2furious', label: 'Username*'}
  };

  getTranslation(lang: string): Observable<any> {
    if (lang === 'en') {
      return of(this.en);
    }
    return of({});
  }
}
