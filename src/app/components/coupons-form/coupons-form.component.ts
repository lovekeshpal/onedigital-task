import {Component} from '@angular/core';
import {AngularEditorConfig} from "@kolkov/angular-editor";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-coupons-form',
  templateUrl: './coupons-form.component.html',
  styleUrls: ['./coupons-form.component.css']
})
export class CouponsFormComponent{




  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '200px',
    minHeight: '100px',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
  };

get rulesGridControls(){
    return (<FormArray>this.couponsForm.get('rulesGrid'))['controls'];
}



couponsForm = new FormGroup({
  couponCode: new FormControl('', [Validators.required]),
  couponType: new FormControl(''),
  validFrom: new FormControl('', Validators.required),
  validTo: new FormControl('', Validators.required),
  couponStatus: new FormControl(''),
  couponCount: new FormControl('', [Validators.required]),
  couponAvailability: new FormControl('limited'),
  tnc: new FormControl(''),
  rulesGrid: new FormArray([
    new FormGroup({
      min_amount:new FormControl('', Validators.required),
      max_amount:new FormControl(''),
      discount_type:new FormControl('', Validators.required),
      discount:new FormControl('', Validators.required),
      max_discount:new FormControl(''),
    })

  ])
})

addRule(){
    const newRule =  new FormGroup({
      min_amount:new FormControl('', Validators.required),
      max_amount:new FormControl(''),
      discount_type:new FormControl('', Validators.required),
      discount:new FormControl('', Validators.required),
      max_discount:new FormControl(''),
    });

  (<FormArray>this.couponsForm.get('rulesGrid')).push(newRule);
}

removeRule(index:number){
  (<FormArray>this.couponsForm.get('rulesGrid')).removeAt(index);
}

  submit(){
  console.log(this.couponsForm.value);
}


//For checking if availability is unlimited
availability(){


    if (this.couponsForm.value.couponAvailability == "unlimited"){

      // @ts-ignore
      this.couponsForm.get('couponCount').disable();
      // @ts-ignore
      this.couponsForm.get('couponCount').setValue(null);

    }else{
      // @ts-ignore
      this.couponsForm.get('couponCount').enable();
    }

    }


    //For allowing user to enter the numbers only
  numberOnly(event: { which: any; keyCode: any; }): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    return !(charCode > 31 && (charCode < 47 || charCode > 57));


  }


  }






