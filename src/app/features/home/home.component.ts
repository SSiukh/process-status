import { Component } from '@angular/core';
import { Form } from './components/form/form';
import { Code } from './components/code/code';
import { Delivery_Details } from './datasets/delivery-details.constant';
import { FormSubmitEvent } from './components/form/types';

@Component({
  selector: 'app-home',
  imports: [Form, Code],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
})
export class HomeComponent {
  jsonCode!: object;

  handleSetCode(event: FormSubmitEvent) {
    const { type, requestId, statusId } = event;

    if (type === 'delivery') {
      this.setDeliveryRequest(requestId, statusId as keyof typeof Delivery_Details);
    } else {
      this.setCertificateRequest(requestId, statusId);
    }
  }

  setCertificateRequest(requestId: string, statusId: string) {
    this.jsonCode = {
      requestId,
      statusId,
    };
  }

  setDeliveryRequest(system_id: string, key: keyof typeof Delivery_Details) {
    this.jsonCode = {
      system_id,
      detail: Delivery_Details[key],
    };
  }
}
