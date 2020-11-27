import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(public employeeService: EmployeeService) { }

  selectedEmployee: Employee = {
    name: '',
    position: '',
    office: '',
    salary: 0

  };
  employees: Employee[];
  ngOnInit(): void {
    this.getEmployees();

  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe(
      res => { this.employees = res; },
      err => console.error(err)
    );
  }

  addEmployee(form: NgForm) {
     if(form.value._id){
       console.log('Actualizado');
       this.employeeService.putEmployee(form.value).subscribe(
         res => {
          this.getEmployees();
          form.reset();
        }
         ,
         err => console.log(err)        
         
       )
       
     }else{
        this.employeeService.createdEmployee(form.value).subscribe(
          res => {
            this.getEmployees();
            form.reset();
          },
          err => console.error(err)
        );
     }    

  }

  deleteEmployee(_id: string) {
    if (confirm('Are uoy sure you want to delete it?')) {
      this.employeeService.deleteEmployee(_id).subscribe(
        res => {
          this.getEmployees();
        },
        err => console.log(err)
      )
    }
  }

  resetForm(form: NgForm){
    form.reset();
  }


  editEmployee(employee: Employee){

    this.selectedEmployee = employee;
  }
}
