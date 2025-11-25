export interface FormSubmitEvent {
  type: 'delivery' | 'certificate';
  requestId: string;
  statusId: string;
}
