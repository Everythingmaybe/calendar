import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef, Inject,
  Injectable,
  Injector, Type
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ModalConfig } from './modal-config';
import { ModalRef } from './modal-ref';
import { ModalComponent } from './modal.component';
import { ModalInjector } from './modal-injector';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
    @Inject(DOCUMENT) private document: Document,
  ) { }

  open(component: Type<unknown>, config?: ModalConfig): ModalRef {
    const [modalRef, componentRef] = this.appendModalComponentToBody(config);
    componentRef.instance.innerComponent = component;

    return modalRef;
  }

  private appendModalComponentToBody(config?: ModalConfig): [ ModalRef, ComponentRef<ModalComponent> ] {
    const injectionMap = new WeakMap();
    const modalRef = new ModalRef();

    injectionMap.set(ModalConfig, config);
    injectionMap.set(ModalRef, modalRef);

    const componentRef = this.componentFactoryResolver
    .resolveComponentFactory(ModalComponent)
    .create(new ModalInjector(this.injector, injectionMap));

    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    this.document.body.appendChild(domElem);

    const subscription = modalRef.afterClosed.subscribe(() => {
      this.removeModalComponent(componentRef);
      subscription.unsubscribe();
    })

    return [ modalRef, componentRef ];
  }

  private removeModalComponent(componentRef: ComponentRef<ModalComponent>) {
    this.appRef.detachView(componentRef.hostView);
    componentRef.destroy();
  }
}
