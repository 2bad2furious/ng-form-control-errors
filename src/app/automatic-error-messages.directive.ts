import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  EmbeddedViewRef,
  Injector,
  OnDestroy,
  OnInit,
  ViewContainerRef
} from '@angular/core';
import {NgModel} from '@angular/forms';
import {ErrorMessagesComponent} from './error-messages/error-messages.component';

@Directive({
  selector: '[ngModel]:not([formControlName]):not([formControl])'
})
export class AutomaticErrorMessagesDirective implements OnInit, OnDestroy {
  private componentRef?: ComponentRef<ErrorMessagesComponent>;

  constructor(
    private readonly el: ElementRef<HTMLElement>,
    private readonly ngModel: NgModel,
    private readonly applicationRef: ApplicationRef,
    private readonly componentFactoryResolver: ComponentFactoryResolver,
    private readonly injector: Injector,
    private readonly viewContainerRef: ViewContainerRef
  ) {
  }

  ngOnInit(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ErrorMessagesComponent);
    const componentRef = this.viewContainerRef.createComponent<ErrorMessagesComponent>(componentFactory);
    componentRef.instance.model = this.ngModel;
    const compEl = (componentRef.hostView as EmbeddedViewRef<HTMLElement>).rootNodes[0];
    const el = this.el.nativeElement;
    const parent = el.parentElement;
    if (parent) {
      if (!el.nextSibling) {
        parent.appendChild(compEl);
      } else {
        parent.insertBefore(compEl, el.nextSibling);
      }
    } else {
      throw new Error('parent element not found');
    }
    this.componentRef = componentRef;
  }

  ngOnDestroy(): void {
    this.componentRef?.destroy();
    this.componentRef = undefined;
  }
}
