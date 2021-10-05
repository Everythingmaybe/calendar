import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../common/modal/modal.service';
import { ModalRef } from '../../../../common/modal/modal-ref';

@Component({
  selector: 'record-info-modal',
  templateUrl: './record-info-modal.component.html',
  styleUrls: ['./record-info-modal.component.scss'],
})
export class RecordInfoModalComponent implements OnInit {

  constructor(private modalService: ModalService, private modalRef: ModalRef) { }

  ngOnInit(): void {}

  open() {
    this.modalService.open(RecordInfoModalComponent)
  }

  close() {
    this.modalRef.close('11111');
  }

}
