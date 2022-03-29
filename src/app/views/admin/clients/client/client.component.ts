import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { GetUserSubscriptionGQL, UserSubscription } from 'src/app/core/graphql/graphq';

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
    private location: Location
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

}
