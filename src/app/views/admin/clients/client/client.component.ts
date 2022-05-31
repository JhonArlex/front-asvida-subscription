import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { lastValueFrom } from 'rxjs';
import { GetUserSubscriptionGQL, UpdateUserSubscriptionGQL, UserSubscription } from 'src/app/core/graphql/graphq';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  idClient!: string;
  client!: UserSubscription;
  payment_method: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userSubscriptionGql: GetUserSubscriptionGQL,
    private location: Location,
    private updateUserSubscriptionGql: UpdateUserSubscriptionGQL,
    private toast: HotToastService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.idClient = params['id'];
      this.gerClientSubscription();
    });
  }

  gerClientSubscription() {
    lastValueFrom(this.userSubscriptionGql.fetch({
      id: this.idClient
    })).then(res => {
      this.client = res.data.getUserSubscription as UserSubscription;
      this.payment_method = JSON.parse(this.client.transaction[0].payment_method);
    });
  }

  goBack() {
    this.location.back();
  }

  cancelSubscription() {
    lastValueFrom(this.updateUserSubscriptionGql.mutate({
      input: {
        id: this.idClient,
        data: {
          state: 'canceled'
        }
      }
    })).then(res => {
      this.gerClientSubscription();
    }).catch(err => {
      this.toast.error('Error al cancelar la suscription')
      console.log(err);
    });
  }

}
