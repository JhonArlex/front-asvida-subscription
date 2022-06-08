import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Coupon, DeleteCouponGQL, GetCouponsGQL } from 'src/app/core/graphql/graphq';
import { CouponService } from 'src/app/core/services/coupon.service';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.css']
})
export class CouponsComponent implements OnInit {
  coupons: Coupon[] = [];
  limit = 10;
  page = 1;

  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";

  constructor(
    private getCouponsGQL: GetCouponsGQL,
    private couponService: CouponService,
    private deleteCouponGQL: DeleteCouponGQL,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCoupons();
  }

  async getCoupons() {
    const data = await lastValueFrom(this.getCouponsGQL.fetch({input: {}}, {fetchPolicy: 'network-only'}));
    this.coupons = data.data.getCoupons as Coupon[];
  }

  goToCoupons(coupon: Coupon) {
    this.couponService.coupon = coupon;
    this.goAdd();
  }

  goAdd() {
    this.router.navigate(['/admin/coupons/action']);
  }

  deleteCoupon(coupon: Coupon) {
    const confirm = window.confirm('¿Está seguro de eliminar este cupón?');
    if (confirm) {
      lastValueFrom(this.deleteCouponGQL.mutate({id: coupon.id})).then(() => {
        this.getCoupons();
      });

    }
  }

  onPageChange(page: number) {
    this.page = page;
    this.getCoupons();
  }

}
