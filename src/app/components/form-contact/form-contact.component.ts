import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contact } from '../../models/contact.model';
import { ContactInfoService } from '../../services/contact-info.service';

@Component({
  selector: 'app-form-contact',
  templateUrl: './form-contact.component.html',
  styleUrls: ['./form-contact.component.scss']
})
export class FormContactComponent implements OnInit {

  formContact!: FormGroup;
  isEdit: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<FormContactComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Contact,
    private formBuilder: FormBuilder,
    private contactService: ContactInfoService
  ) {}

  ngOnInit(): void {
    this.isEdit = (this.data && this.data.id)? true: false;
    this.buildContactForm(this.data);
  }

  private buildContactForm(data: Contact): void {
    this.formContact = this.formBuilder.group({
      name: [data ? data.name : 'asd', Validators.required],
      version: [data ? data.version : '1.1.1', [Validators.required, this.versionValidator]],
      contactType: [data ? data.contactType : 'phone'],
      contact: [data ? data.contact : '+542615561117', data && data.contactType === 'mail' ? Validators.email : [Validators.required, this.phoneValidator]]
    });

    // Set the validator when the contactType change
    this.formContact.get('contactType')?.valueChanges.subscribe(value => {
      if (value === 'mail') {
        this.formContact.get('contact')?.setValidators([Validators.required, Validators.email]);
      } else {
        this.formContact.get('contact')?.setValidators([Validators.required, this.phoneValidator]);
      }
      this.formContact.get('contact')?.updateValueAndValidity();
    });
  }

  // Validators
  private versionValidator(control: AbstractControl<string>): {invalidVersion: boolean} | null {
    const versionRegex = /^\d+\.\d+\.\d+$/;
    if( !versionRegex.test(control.value)) {
      return { invalidVersion: true }
    }

    return null;

  }

  private phoneValidator(control: AbstractControl<string>): {invalidPhone: boolean} | null {

    const phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;

    if( !phoneRegex.test(control.value)) {
      return { invalidPhone: true }
    }

    return null;
  }

  createContact(): void {

    const newContact: Contact = this.formContact.value;

    this.contactService.createContact(newContact);
    this.onClose(newContact.name);

  }

  updateContact(): void {

    const updatedContact: Contact = {
      ...this.formContact.value,
      id: this.data.id
    }

    this.contactService.updateContact(updatedContact)
    this.onClose(updatedContact.name)

  }


  onSaveContact(): void {

    if( this.formContact.valid ) {
      this.isEdit ? this.updateContact(): this.createContact();
    }

  }

  onClose(nameContact: string | null = null): void {
    this.dialogRef.close({ nameContact, isEdit: this.isEdit });
  }


}
