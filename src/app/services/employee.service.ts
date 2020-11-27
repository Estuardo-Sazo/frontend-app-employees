import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  URL_API = 'http://localhost:4000/api/employees';


  constructor( private http:HttpClient) { }

  getEmployees(){
    return this.http.get<Employee[]>(this.URL_API);
  }

  createdEmployee(employe: Employee)
  {
    return this.http.post(this.URL_API,employe);
  }

  deleteEmployee(_id:string){
    return this.http.delete(`${this.URL_API}/${_id}`);
  }

  putEmployee(employee: Employee){
    return this.http.put(`${this.URL_API}/${employee._id}`, employee);
  }
}
