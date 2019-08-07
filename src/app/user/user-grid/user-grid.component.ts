import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSnackBar, MatTable} from '@angular/material';
import {SpinnerService} from '../../services/spinner.service';
import {UserService} from '../../services/user.service';
import {FormBuilder, Validators} from '@angular/forms';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {UserConstants} from '../../constant/app.constant';
import {EmailValidator} from '../../shared/validator/email.validator';

@Component({
  selector: 'app-user-grid',
  templateUrl: './user-grid.component.html',
  styleUrls: ['./user-grid.component.scss']
})

export class UserGridComponent implements OnInit {
  dataSource;
  displayedColumns: string[] = [
    'idtableEmail',
    'tableEmailEmailAddress',
    'action'
  ];

  form = this.fb.group({
    emailFormControl: ['', [Validators.required, EmailValidator.validate]],
  });
  @ViewChild(MatTable, {static: true}) table: MatTable<any>;
  @ViewChild('addRemoveEmailModal', {static: true}) addRemoveEmailModal: NgxSmartModalService;
  @ViewChild('deleteEmailModal', {static: true}) deleteEmailModal: NgxSmartModalService;

  addNew: Boolean = false;
  selectedEmail: any = {};

  constructor(
    private userService: UserService,
    private spinnerService: SpinnerService,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder) {}

  /**
   * Called automatically on init of component
   */
  ngOnInit() {
    this.fetchEmailList();
  }

  /**
   * To get ALL email
   */
  fetchEmailList() {
    this.spinnerService.showSpinner.emit(true);
    this.userService
      .getAllEmail()
      .subscribe(
        res => this.getAllEmailListSuccess(res),
        error => {}
      );
  }

  /**
   * To get all email list success
   * @param res
   */
  getAllEmailListSuccess(res) {
    this.spinnerService.showSpinner.emit(false);
    if (res && res.length) {
      this.dataSource = [];
      this.dataSource = res;
    }
  }

  /**
   * To open modal
   */
  openDialog() {
    this.addNew = true;
    this.form.reset();
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key).setErrors(null) ;
    });
    this.addRemoveEmailModal.open('myModal', true);
  }

  /**
   * To show hide Modal
   * @param data
   */
  showHideModal(data) {
    if (data && data.tableEmailEmailAddress) {
      this.form.reset();
      this.selectedEmail = {};
      this.selectedEmail = data;
      this.addNew = false;
      this.addRemoveEmailModal.open('myModal', true);
      this.form.controls['emailFormControl'].setValue(data.tableEmailEmailAddress);
    }
  }

  /**
   * To add/update email
   * @param value
   */
  saveEmail(value) {
    let data;
    this.spinnerService.showSpinner.emit(false);
    if (this.addNew) {
      data = {
        tableEmailEmailAddress: value.emailFormControl ? value.emailFormControl : '',
        tableEmailValidate: true
      };
      this.userService
        .addNewEmail(data)
        .subscribe(
          res => this.addNewEmailSuccess(res),
          error => {
            this._snackBar.open(UserConstants.ADD_EMAIL_ERROR, 'Close', {duration: 3000});
          }
        );
    } else {
      if (this.selectedEmail && this.selectedEmail.idtableEmail) {
        data = {
          tableEmailEmailAddress: value.emailFormControl ? value.emailFormControl : '',
          tableEmailValidate: true
        };
        this.userService.updateEmail(this.selectedEmail.idtableEmail, data).subscribe(
          res => this.updateEmailSuccess(res),
          error => {
            this._snackBar.open(UserConstants.UPDATE_EMAIL_ERROR, 'Close', {duration: 3000});
          }
        );
      }
    }
  }

  /**
   * To Add new Email
   * @param res
   */
  addNewEmailSuccess(res) {
    this.spinnerService.showSpinner.emit(false);
    if (res) {
      this._snackBar.open(UserConstants.ADD_EMAIL_SUCCESS, 'Close', {duration: 3000});
      this.addRemoveEmailModal.close('myModal');
      this.fetchEmailList();
    }
  }

  /**
   * To update existing Email
   * @param res
   */
  updateEmailSuccess(res) {
    if (res) {
      this._snackBar.open(UserConstants.UPDATE_EMAIL_SUCCESS, 'Close', {duration: 3000});
      this.addRemoveEmailModal.close('myModal');
      this.fetchEmailList();
    }
  }

  /**
   * To show delete Modal
   * @param element
   */
  showDeleteModal(element) {
    if (element) {
      this.selectedEmail = {};
      this.selectedEmail = element;
    }
    this.deleteEmailModal.open('myModal', true);
  }

  /**
   * To confirm email delete
   */
  confirmDelete() {
    this.spinnerService.showSpinner.emit(true);
    this.userService.deleteEmail(this.selectedEmail.idtableEmail).subscribe(
      res => this.deleteEmailSuccess(res),
      error => {
        this._snackBar.open(UserConstants.DELETE_EMAIL_ERROR, 'Close', {duration: 3000});
      }
    );
  }

  /**
   * To get delete email success
   * @param res
   */
  deleteEmailSuccess(res) {
    this.spinnerService.showSpinner.emit(false);
    if (res) {
      this._snackBar.open(UserConstants.DELETE_EMAIL_SUCCESS, 'Close', {duration: 3000});
      this.deleteEmailModal.close('myModal');
      this.fetchEmailList();
    }
  }

}
