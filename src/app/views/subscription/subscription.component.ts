import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { lastValueFrom } from 'rxjs';
import { CreateUserGQL, Get_SubscriptionsGQL, Subscription, User } from 'src/app/core/graphql/graphq';
import { SubscriptionService } from 'src/app/core/services/subscription.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {
  subscriptions: Subscription[] = [];
  subscriptionSelected!: Subscription;
  formSubscription!: FormGroup;

  constructor(
    private getSubscriptionsGql: Get_SubscriptionsGQL,
    private fb: FormBuilder,
    private router: Router,
    private toast: HotToastService,
    private createUserGql: CreateUserGQL,
    private subscriptionService: SubscriptionService
  ) { }

  ngOnInit(): void {
    this.buildFormSubscription();
    this.getSubscriptions();
  }

  async getSubscriptions() {
    try {
      const { data } = await lastValueFrom(this.getSubscriptionsGql.fetch({ input: { state: "active" } }));
      if (data.getSubscriptions.length > 0) {
        this.subscriptions = data.getSubscriptions;
      } else {
        this.toast.error('No subscriptions found');
      }
    } catch (error) {
      console.error(error);
    }

  }

  selectSubscription(event: Subscription) {
    this.subscriptionSelected = event;
    this.subscriptionService.subscription = event;
  }

  buildFormSubscription() {
    this.formSubscription = this.fb.group({
      name: ['', Validators.required],
      typeIdentifier: ['', Validators.required],
      identifier: ['', Validators.required],
      expeditionPlace: ['', Validators.required],
      typeLivingPlace: ['', Validators.required],
      stratum: ['', Validators.required],
      address: ['', Validators.required],
      neighborhood: ['', Validators.required],
      city: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      authorizationFacture: [null, Validators.required],
      authorizationHabeasData: [null, Validators.required],
      authorizationAssistService: [null, Validators.required],
      authorizationContractService: [null, Validators.required],
    });
  }

  saveUser() {
    if (this.subscriptionSelected === null) {
      this.toast.error('Seleccione una suscripción');
      return;
    }
    const formValue = this.formSubscription.value;
    this.createUser(formValue);
  }

  createUser(user: { name: any; typeIdentifier: any; identifier: any; expeditionPlace: any; typeLivingPlace: any; stratum: any; address: any; neighborhood: any; city: any; email: any; phone: any; authorizationFacture: any; authorizationHabeasData: any; authorizationAssistService: any; authorizationContractService: any; }) {
    this.createUserGql.mutate({
      input: {
        name: user.name,
        typeDni: user.typeIdentifier,
        dni: user.identifier,
        expeditionPlace: user.expeditionPlace,
        typeLivingPlace: user.typeLivingPlace,
        stratum: user.stratum,
        address: user.address,
        neighborhood: user.neighborhood,
        city: user.city,
        email: user.email,
        phone: user.phone,
        authorizationFacture: user.authorizationFacture,
        authorizationHabeasData: user.authorizationHabeasData,
        authorizationAssistService: user.authorizationAssistService,
        authorizationContractService: user.authorizationContractService,
        dateSignature: new Date(),
        role: ['621bbf90fbd65b0aac28b6c7'],
      }
    }).subscribe({
      next: (res) => {
        this.toast.success('Usuario creado con éxito');
        this.subscriptionService.user = res!.data!.createUser as User;
        this.router.navigate(['/payment-gateway']);
      },
      error: (e) => {
        console.error(e);
        this.toast.error('Error al crear usuario');
      },
      complete: () => console.info('complete')
    });
  }

  goToPaymentGateway() {
    this.router.navigate(['/payment-gateway']);
  }

}
