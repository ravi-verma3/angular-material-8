import {Component, OnInit, ViewChild} from '@angular/core';
import {ErrorStateMatcher, MatDialog, MatTable} from '@angular/material';
import {SpinnerService} from '../../services/spinner.service';
import {UserService} from '../../services/user.service';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';

export interface TableElements {
  position: any;
  email: any;
}
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-user-grid',
  templateUrl: './user-grid.component.html',
  styleUrls: ['./user-grid.component.scss']
})


export class UserGridComponent implements OnInit {
  dataSource: TableElements[] = [
    {position: 1, email: 'ravi'},
    {position: 2, email: 'girish'}
  ];

  displayedColumns: string[] = [
    'position',
    'email',
    'action'
  ];
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  @ViewChild(MatTable, {static: true}) table: MatTable<any>;

  constructor(
    private userService: UserService,
    private spinnerService: SpinnerService) {
  }

  ngOnInit() {
    this.fetchEmailList();
  }


  fetchEmailList() {
    this.spinnerService.showSpinner.emit(true);
    this.userService
      .getAll()
      .subscribe(
        res => this.getAllEmailListSuccess(res),
        error => {
          console.log(error);
        }
      );
  }

  getAllEmailListSuccess(res) {
    if (res && res.length) {
      console.log(res);
    }
  }

  /**
   * To add new email
   */
  addNewEmails() {
    this.spinnerService.showSpinner.emit(true);
    let data;
    data = {
      tableEmailEmailAddress: 'ravi.verma+1@zyz.com',
      tableEmailValidate: true
    };

    this.userService
      .addNewEmail(data)
      .subscribe(
        res => this.addNewEmailSuccess(res),
        error => {
          console.log(error);
        }
      );
  }

  addNewEmailSuccess(res) {
    this.spinnerService.showSpinner.emit(false);
  }

  openDialog() {
    this.addNewEmails();
  }

  ShowHideModal() {

  }

}
