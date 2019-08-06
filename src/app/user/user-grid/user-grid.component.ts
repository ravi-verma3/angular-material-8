import {Component, OnInit, ViewChild} from '@angular/core';
import {ErrorStateMatcher, MatDialog, MatSnackBar, MatTable} from '@angular/material';
import {SpinnerService} from '../../services/spinner.service';
import {UserService} from '../../services/user.service';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {Modal} from 'ngx-modal';
import {NgxSmartModalService} from 'ngx-smart-modal';

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
  dataSource: TableElements[] = [];

  displayedColumns: string[] = [
    'idtableEmail',
    'tableEmailEmailAddress',
    'action'
  ];
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  @ViewChild(MatTable, {static: true}) table: MatTable<any>;
  @ViewChild('addRemoveEmailModal', {static: true}) addRemoveEmailModal: Modal;
  @ViewChild('deleteEmailModal', {static: true}) deleteEmailModal: Modal;
  addNew: Boolean = false;
  selectedEmail: any = {};

  constructor(
    private userService: UserService,
    private spinnerService: SpinnerService,
    private _snackBar: MatSnackBar,
    public ngxSmartModalService: NgxSmartModalService) {
  }

  ngOnInit() {
    this.fetchEmailList();
  }


  fetchEmailList() {
    this.spinnerService.showSpinner.emit(true);
    this.userService
      .getAllEmail()
      .subscribe(
        res => this.getAllEmailListSuccess(res),
        error => {
          console.log(error);
        }
      );
  }

  getAllEmailListSuccess(res) {
    this.spinnerService.showSpinner.emit(false);
    if (res && res.length) {
      this.dataSource = [];
      this.dataSource = res;
    }
  }

  addNewEmailSuccess(res) {
    this.spinnerService.showSpinner.emit(false);
    if (res) {
      this._snackBar.open('Email Added Successfully', 'Close', {duration: 3000});
      this.addRemoveEmailModal.close();
      this.fetchEmailList();
    }
  }

  openDialog() {
    this.addNew = true;
    if (this.emailFormControl.errors && this.emailFormControl.errors.email) {
      this.emailFormControl.errors.email = false;
    }
    this.emailFormControl.reset();
    this.addRemoveEmailModal.open();
  }

  showHideModal(data) {
    console.log(data);
    if (data && data.tableEmailEmailAddress) {
      this.selectedEmail = {};
      this.selectedEmail = data;
      this.addNew = false;
      this.addRemoveEmailModal.open();
      this.emailFormControl.setValue(data.tableEmailEmailAddress);
    }
  }

  /**
   * On save
   * @param value
   */
  saveEmail(value) {
    let data;
    this.spinnerService.showSpinner.emit(false);
    if (this.addNew) {
      data = {
        tableEmailEmailAddress: value ? value : '',
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
    } else {
      if (this.selectedEmail && this.selectedEmail.idtableEmail) {
        data = {
          tableEmailEmailAddress: value ? value : '',
          tableEmailValidate: true
        };
        this.userService.updateEmail(this.selectedEmail.idtableEmail, data).subscribe(
          res => this.updateEmailSuccess(res),
          error => {
            console.log(error);
          }
        );
      }
    }
  }

  updateEmailSuccess(res) {
    if (res) {
      this._snackBar.open('Email Updated Successfully', 'Close', {duration: 3000});
      this.addRemoveEmailModal.close();
      this.fetchEmailList();
    }
  }

  showDeleteModal(element) {

    if (element) {
      this.selectedEmail = {};
      this.selectedEmail = element;
    }
    console.log(this.selectedEmail);
    this.deleteEmailModal.open();
  }

  confirmDelete() {
    this.spinnerService.showSpinner.emit(true);
    this.userService.deleteEmail(this.selectedEmail.idtableEmail).subscribe(
      res => this.deleteEmailSuccess(res),
      error => {
        console.log(error);
      }
    );
  }

  deleteEmailSuccess(res) {
    this.spinnerService.showSpinner.emit(false);
    if (res) {
      this._snackBar.open('Email Deleted Successfully', 'Close', {duration: 3000});
      this.deleteEmailModal.close();
      this.fetchEmailList();
    }
  }

}
