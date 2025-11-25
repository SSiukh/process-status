import { Component, Input } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-code',
  imports: [JsonPipe],
  templateUrl: './code.html',
  styleUrl: './code.scss',
})
export class Code {
  @Input() jsonCode: any;

  constructor(private clipboard: Clipboard) {}

  copyToClipboard() {
    if (this.jsonCode) {
      const jsonString = JSON.stringify(this.jsonCode, null, 2);
      this.clipboard.copy(jsonString);
    }
  }
}
