import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetUserSubscriptionsGQL, UserSubscription } from 'src/app/core/graphql/graphq';
import { SubscriptionService } from 'src/app/core/services/subscription.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  idTransaction: string;
  transaction: UserSubscription;
  paymentMethod = {
    'CARD': 'Tarjeta de credito/débito',
    'NEQUI': 'Nequi'
  };
  statePay = {
    'PENDING': 'Pendiente',
    'APPROVED': 'Aprobado',
    'DECLINED': 'Declinado',
    'ERROR': 'Error',
    'EXPIRED': 'Expirado',
    'CANCELED': 'Cancelado'

  }
  getUserQueryRef: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private getUserTransactionGQL: GetUserSubscriptionsGQL,
    private router: Router,
    private subscriptionService: SubscriptionService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.idTransaction = params.id;
      this.getUserTransaction();
    });
  }

  getUserTransaction() {
    this.getUserQueryRef = this.getUserTransactionGQL.watch({
      input: {
        transaction: this.idTransaction
      }
    }, {
      pollInterval: 10000
    });
    this.getUserQueryRef.valueChanges.subscribe(({ data, loading }) => {
      console.log(loading);
      this.transaction = data.getUserSubscriptionCondition as UserSubscription;
      if (this.transaction.state === 'APPROVED') {
        this.getUserQueryRef.stopPolling()
      }
    }, (error) => {
      console.log('error', error);
    });
  }

  goToPayment() {
    this.subscriptionService.setUser(this.transaction.user);
    this.subscriptionService.setSubscription(this.transaction.subscription);
    this.router.navigate(['/payment-gateway']);
  }

}
