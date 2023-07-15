import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { PersonService } from '../services/person.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  publishForm: FormGroup;
  errorMessage: string = '';
  successMessage = '';
  showError: boolean = false;

  constructor(private personService: PersonService) { }

  ngOnInit(): void {
    this.publishForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      pictures: new FormControl([]),
    });
  }

  public validateControl = (controlName: string) => {
    return this.publishForm.get(controlName).invalid && this.publishForm.get(controlName).touched
  }

  public getControlValue(controlName: string): any {
    return this.publishForm.get(controlName).value;
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.publishForm.get(controlName).hasError(errorName)
  }

  public uploadFile(datas) {
    let files = this.publishForm.get("pictures").value || [];
    console.log("files", files);
    files.push(datas[0]);
    this.publishForm.get("pictures").patchValue(files);
  }

  public deleteFile(file) {
    let files = this.publishForm.get("pictures").value as File[];
    const index = files.indexOf(file);
    files.splice(index, 1);
    this.publishForm.get("pictures").patchValue(files);
  }

  public getImage(file: File): string {
    return URL.createObjectURL(file);
  }


  public publish = (publishFormValue: any) => {
    this.successMessage = '';
    this.publishForm.markAllAsTouched();
    if (this.publishForm.valid) {
      const formValues = { ...publishFormValue };
      console.log("publish", formValues);
      this.personService.publish(formValues).subscribe({
        next: (result: any) => {
          console.log("result", result);
          this.successMessage = result.text;
        },
        error: (err: HttpErrorResponse) => {
          console.log("error", err);
          this.errorMessage = err.message;
          this.showError = true;
        }
      });
    } else {
      this.getFormValidationErrors();
    }
  }

  getFormValidationErrors() {
    Object.keys(this.publishForm.controls).forEach(key => {
      const controlErrors: ValidationErrors | null = this.publishForm.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
  }
}
