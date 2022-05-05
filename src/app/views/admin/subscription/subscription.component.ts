import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Subscription, DeleteSubscriptionGQL, GetSubscriptionsGQL } from 'src/app/core/graphql/graphq';
import { SubscriptionService } from 'src/app/core/services/subscription.service';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionsComponent implements OnInit {
  subscriptions: Subscription[] = [];
  limit = 10;
  page = 1;
  private _color = "light";

  constructor(
    private getSubscriptionsGQL: GetSubscriptionsGQL,
    private subscriptionService: SubscriptionService,
    private deleteSubscriptionGQL: DeleteSubscriptionGQL,
    private router: Router
  ) { }

  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }

  ngOnInit(): void {
    this.getSubscriptions();
  }

  async getSubscriptions() {
    const data = await lastValueFrom(this.getSubscriptionsGQL.fetch({input: {}}));
    this.subscriptions = data.data.getSubscriptions as Subscription[];
  }

  goToSubscriptions(subscription: Subscription) {
    this.subscriptionService.subscription = subscription;
    this.goAdd();
  }

  goAdd() {
    this.router.navigate(['/admin/subscription/action']);
  }

  deleteSubscription(subscription: Subscription) {
    const confirm = window.confirm('¿Está seguro de eliminar este cupón?');
    if (confirm) {
      lastValueFrom(this.deleteSubscriptionGQL.mutate({id: subscription.id})).then(() => {
        this.getSubscriptions();
      });

    }
  }

  onPageChange(page: number) {
    this.page = page;
    this.getSubscriptions();
  }

}
