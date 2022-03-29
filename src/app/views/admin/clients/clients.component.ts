import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { filter, lastValueFrom } from 'rxjs';
import { GetUsersSubscriptionGQL, GetUserSubscriptionsGQL, UserSubscription } from 'src/app/core/graphql/graphq';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  userSubscriptions: UserSubscription[] = [];
  formFilter!: FormGroup;
  page: number = 1;
  limit: number = 10;

  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";
  loading = false;

  constructor(
    private getUserSubscriptionGql: GetUsersSubscriptionGQL,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getUserSubscriptions();
    this.buildFilterForm();
  }

  buildFilterForm() {
    this.formFilter = this.fb.group({
      dni: [],
      email: [],
      startDate: [],
      endDate: [],
    })
  }

  onSubmitFilter() {
    const filters = this.formFilter.value;
    filters.startDate = filters.startDate !== '' ? filters.startDate : null;
    filters.endDate = filters.endDate !== '' ? filters.endDate : null;
    this.getUserSubscriptions(filters);
  }

  async getUserSubscriptions(filters = {}) {
    this.loading = true;
    lastValueFrom(this.getUserSubscriptionGql.fetch({
      input: {
        ...filters,
        page: this.page,
        limit: this.limit
      }
    })).then(res => {
      this.userSubscriptions = res.data.getUserSubscriptions as UserSubscription[];
    }).catch(err => {
      console.error(err);
    }).finally(() => {
      this.loading = false;
    });
  }

  onPageChange(page: number) {
    this.page = page;
    this.getUserSubscriptions();
  }

  goToClient(id: string) {
    this.router.navigate(['/admin/clients/', id]);
  }

}
