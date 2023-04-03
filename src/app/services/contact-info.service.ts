import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Contact } from '../models/contact.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class ContactInfoService {
  private readonly CONTACT_STORAGE_KEY = 'contacts';

  public contacts$ = new BehaviorSubject<Contact[]>([]);
  private totalCount$ = new BehaviorSubject<number>(0);

  constructor() {
    this.contacts$.next(
      JSON.parse(localStorage.getItem(this.CONTACT_STORAGE_KEY) ?? '[]')
    );
    this.totalCount$.next(this.contacts$.getValue().length);
  }

  private saveToLocalStorage(contacts: Contact[]): void {
    localStorage.setItem(this.CONTACT_STORAGE_KEY, JSON.stringify(contacts));
  }

  getContacts(pageIndex: number, pageSize: number): Observable<Contact[]> {
    const contactsList = this.contacts$.getValue();
    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + pageSize;
    const contactsPage = contactsList.slice(startIndex, endIndex);
    return of(contactsPage);
  }

  getTotalCount(): Observable<number> {
    return this.totalCount$.asObservable();
  }

  createContact(contact: Contact): void {
    const contactsList = this.contacts$.getValue();
    BehaviorSubject;
    const newContact: Contact = { ...contact, id: uuidv4() };

    contactsList.push(newContact);
    this.contacts$.next(contactsList);
    this.totalCount$.next(contactsList.length);
    this.saveToLocalStorage(contactsList);
  }

  updateContact(contact: Contact): void {
    const contactsList = this.contacts$.getValue();
    const index = contactsList.findIndex((c) => c.id === contact.id);

    if (index !== -1) {
      contactsList[index] = contact;
      this.contacts$.next(contactsList);
      this.saveToLocalStorage(contactsList);
    }
  }

  deleteContact(id: string): void {
    const contactsList = this.contacts$.getValue();
    const index = contactsList.findIndex((c) => c.id === id);

    if (index !== -1) {
      contactsList.splice(index, 1);
      this.contacts$.next(contactsList);
      this.totalCount$.next(contactsList.length);
      this.saveToLocalStorage(contactsList);
    }
  }

  getContactbyId(id: string): Contact | undefined {
    const contactsList = this.contacts$.getValue();
    return contactsList.find((c) => c.id === id);
  }
}
