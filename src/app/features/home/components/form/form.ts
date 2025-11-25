import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { Certificate_Options, Delivery_Options, Type_Options } from './datasets';
import { FormSubmitEvent, Option } from './types';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, NgSelectModule],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class Form implements OnInit, OnDestroy {
  @Output() setCode = new EventEmitter<FormSubmitEvent>();

  private destroy$ = new Subject<void>();
  form!: FormGroup;
  submitted = false;
  isLoading = false;
  statusOptions!: Option[];

  typeOptions = Type_Options;

  ngOnInit(): void {
    this.form = new FormGroup({
      type: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'change',
      }),
      requestId: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'change',
      }),
      status: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'change',
      }),
    });

    this.form
      .get('type')!
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((selectedType) => {
        this.statusOptions = this.getStatusOptionsForType(selectedType);

        this.form.get('status')!.setValue('');
      });
  }

  getStatusOptionsForType(type: string) {
    switch (type) {
      case 'delivery':
        return Delivery_Options;
      case 'certificate':
        return Certificate_Options;
      default:
        return Certificate_Options;
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const event: FormSubmitEvent = {
        type: this.form.get('type')!.value,
        requestId: this.form.get('requestId')!.value,
        statusId: this.form.get('status')!.value,
      };

      this.setCode.emit(event);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
