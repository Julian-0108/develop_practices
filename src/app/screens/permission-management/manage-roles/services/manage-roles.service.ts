import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Response } from '@shared/interfaces/response.interface';

@Injectable({
  providedIn: 'root',
})
export class ManageRolesService {
  constructor(private http: HttpClient) {}

  getOptions(): Promise<Response> {
    return this.http.get<Response>(`${environment.API_SECURITY}/options`).toPromise();
  }

  getRoles(): Promise<Response> {
    return this.http.get<Response>(`${environment.API_SECURITY}/roles`).toPromise();
  }

  updateRoles(id: string, roles: string[]): Promise<Response> {
    return this.http.put<Response>(`${environment.API_SECURITY}/roles/${id}`, { access: roles }).toPromise();
  }

  getUsersByRol(id: string) {
    return this.http.get<Response>(`${environment.API_SECURITY}/roles/${id}`).toPromise();
  }


  updateUserRoles(email: string, roles: string[]) {
    return this.http.put<Response>(`${environment.API_SECURITY}/users/${email}`, { roles }).toPromise();
  }

  getUsers() {
    return this.http.get<Response>(`${environment.API_SECURITY}/users/all`).toPromise();
  }
}
