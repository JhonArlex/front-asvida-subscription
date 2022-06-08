import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxLoadingService } from 'ngx-loading';
import { lastValueFrom } from 'rxjs';
import { CreateCouponGQL, GetCouponsGQL, UpdateCouponGQL } from 'src/app/core/graphql/graphq';
import { CouponService } from 'src/app/core/services/coupon.service';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})
export class CouponComponent implements OnInit {

  formCoupon!: FormGroup;
  loading = false;

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private couponService: CouponService,
    private createCouponGQL: CreateCouponGQL,
    private updateCouponGQL: UpdateCouponGQL
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.formCoupon = this.fb.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      discount: ['', Validators.required],
      discount_type: ['', Validators.required],
      dueDate: [null, Validators.required],
      state: ['', Validators.required]
    });
    if (this.couponService.coupon) {
      this.formCoupon.patchValue(this.couponService.coupon);
    }
  }

  goBack() {
    this.location.back();
  }

  save() {
    if (this.couponService.coupon) {
      this.updateCoupon();
    } else {
      this.createCoupon();
    }
  }

  async createCoupon() {
    this.loading = true;
    const value = this.formCoupon.value;
    lastValueFrom(this.createCouponGQL.mutate({
      input: {
        name: value.name,
        code: value.code,
        discount: value.discount,
        discount_type: value.discount_type,
        dueDate: value.dueDate,
        state: value.state
      }
    })).then(() => {
      this.goBack();
    })
    .catch(err => {
      alert('Código de descuento ya existe');
    })
    .finally(() => {
      this.loading = false;
    });
  }

  async updateCoupon() {
    this.loading = true;
    const value = this.formCoupon.value;
    await lastValueFrom(this.updateCouponGQL.mutate({
      input: {
        id: this.couponService.coupon.id,
        data: {
          name: value.name,
          code: value.code,
          discount: value.discount,
          discount_type: value.discount_type,
          dueDate: value.dueDate,
          state: value.state
        }
      }
    })).then(() => {
      this.goBack();
    })
    .catch(err => {
      alert('Código de descuento ya existe');
    })
    .finally(() => {
      this.loading = false;
    });
  }

}
