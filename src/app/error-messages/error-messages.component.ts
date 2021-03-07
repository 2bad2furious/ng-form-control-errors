import {Component, HostBinding, Input, OnDestroy} from '@angular/core';
import {NgModel, ValidationErrors} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-error-messages',
  template: '<p *ngFor="let error of modelErrors" translate [translateParams]="error.params" class="mb-0">common.input.{{error.key}}</p>'
})
export class ErrorMessagesComponent implements OnDestroy {

  @Input() errors?: ValidationErrors;
  modelErrors?: { key: string, params: any }[];
  @HostBinding() readonly class = 'invalid-tooltip';
  private modelWithSubscription?: { subscription?: Subscription, model: NgModel };

  @Input()
  set model(model: NgModel | undefined) {
    this.modelWithSubscription?.subscription?.unsubscribe();
    if (model) {
      this.modelWithSubscription = {
        model,
        subscription: model.valueChanges?.subscribe(() => this.setUpModelErrors(model))
      };
    } else {
      this.modelWithSubscription = undefined;
    }
  }

  @HostBinding('class.d-block') get isVisible(): boolean {
    const model = this.modelWithSubscription?.model;
    return (model && model.touched && model.invalid) || false;
  }

  ngOnDestroy(): void {
    this.modelWithSubscription?.subscription?.unsubscribe();
    this.modelWithSubscription = undefined;
  }

  private setUpModelErrors(model: NgModel): void {
    this.modelErrors = [];
    for (const [key, params] of Object.entries(model.errors || {})) {
      this.modelErrors.push({key, params});
    }
  }
}
