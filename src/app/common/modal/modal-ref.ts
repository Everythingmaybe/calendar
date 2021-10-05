import { Observable, Subject } from 'rxjs';

export class ModalRef {
  private readonly _afterClosed:  Subject<any> = new Subject<any>();
  public readonly afterClosed: Observable<any> = this._afterClosed.asObservable();

  close(result?: any): void {
    this._afterClosed.next();
    this._afterClosed.complete();
  }
}
