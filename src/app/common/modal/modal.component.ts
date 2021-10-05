import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  OnDestroy,
  OnInit,
  Type,
  ViewChild
} from '@angular/core';
import { ModalInnerDirective } from './modal-inner.directive';

@Component({
  selector: 'modal-overlay',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnDestroy, OnInit {
  private innerComponentRef?: ComponentRef<unknown>;

  public innerComponent?: Type<unknown>;

  @ViewChild(ModalInnerDirective, {  static: true }) private modalInnerPlace?: ModalInnerDirective;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
  ) { }

  ngOnInit(): void {
    if (this.innerComponent) {
      this.loadInnerComponent(this.innerComponent);
    }
  }

  private loadInnerComponent(component: Type<unknown>): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    const viewContainerRef = this.modalInnerPlace?.viewContainerRef;

    viewContainerRef?.clear();
    this.innerComponentRef = viewContainerRef?.createComponent(componentFactory);
  }

  ngOnDestroy(): void {
    this.innerComponentRef?.destroy();
  }
}
