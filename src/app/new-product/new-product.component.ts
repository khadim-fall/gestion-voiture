import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {ProductService} from "../services/product.service";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  productFormGroup!: FormGroup;

  constructor(private fb: FormBuilder, private prodService:ProductService) {
  }

  ngOnInit(): void {
    this.productFormGroup = this.fb.group({
      name: this.fb.control(null, [Validators.required, Validators.minLength(4)]),
      price: this.fb.control(null, [Validators.required, Validators.min(200)]),
      promotion: this.fb.control(false, [Validators.required]),
    });
  }

  handleAddProduct() {
let product= this.productFormGroup.value;
this.prodService.addNewProduct(product).subscribe({
  next:(data)=>{
alert("Product added successfully");
this.productFormGroup.reset();
  },error :err =>{
    console.log(err);
  }
})
  }

  getErrorMessage(fieldName: string, error: ValidationErrors) {
    if (error['required']) {
      return fieldName + " is required";
    } else if (error['minlength']) {
      return fieldName + " should have at least " + error['minlength']['requiredLength'] + " characters";

    } else if (error['min']) {
      return fieldName + " should have min value " + error['min']['min'];
    } else return "";
  }
}
