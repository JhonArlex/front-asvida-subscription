import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { CreditCardValidators } from 'angular-cc-library';
import { lastValueFrom } from 'rxjs';
import { GetTokenAcceptanceQueryGQL, PayCardGQL, PayNequiGQL } from 'src/app/core/graphql/graphq';
import { SubscriptionService } from 'src/app/core/services/subscription.service';

@Component({
  selector: 'app-payment-gateway',
  templateUrl: './payment-gateway.component.html',
  styleUrls: ['./payment-gateway.component.css']
})
export class PaymentGatewayComponent implements OnInit {

  formNequi!: FormGroup;
  formPaymentMethod!: FormGroup;
  formCard!: FormGroup;
  formAutorization!: FormGroup;
  paymentMethod = null;

  loading = false;
  acceptanceToken!: string;

  constructor(
    private fb: FormBuilder,
    private toast: HotToastService,
    private getTokenAutorizationGql: GetTokenAcceptanceQueryGQL,
    private payNequiGql: PayNequiGQL,
    private subscriptionService: SubscriptionService,
    private payCardGql: PayCardGQL,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.buildPaymentMethodForm();
    this.buildNequiForm();
    this.buildCardForm();
    this.buildAutorizationForm();
    if (!this.subscriptionService.user || !this.subscriptionService.subscription) {
      this.toast.error('No se pudo obtener la información de la suscripción');
      this.router.navigate(['/']);
    }
  }

  buildPaymentMethodForm() {
    this.formPaymentMethod = this.fb.group({
      paymentMethod: ['']
    });

    this.formPaymentMethod.valueChanges.subscribe((data: { paymentMethod: null; }) => {
      this.paymentMethod = data.paymentMethod;
    });
  }

  buildNequiForm() {
    this.formNequi = this.fb.group({
      phone: ['', Validators.required]
    });
  }

  buildAutorizationForm() {
    this.formAutorization = this.fb.group({
      authorization: [false, Validators.required]
    });
  }

  buildCardForm() {
    this.formCard = this.fb.group({
      cardNumber: ['', [CreditCardValidators.validateCCNumber]],
      cardExpiration: ['', [CreditCardValidators.validateExpDate]],
      cardCvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(4)]],
      cardName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]]
    });
  }

  onSubmit() {
    if (this.paymentMethod == 'Nequi') {
      this.paymentNequi();
    }
    if (this.paymentMethod == 'Card') {
      this.paymentCard();
    }
  }

  getTokenAutorization() {
    this.loading = true;
    const value = this.formAutorization.value;
    if (value) {
      lastValueFrom(this.getTokenAutorizationGql.fetch({},{fetchPolicy: 'network-only'})).then(data => {
        this.acceptanceToken = data!.data.getTokenAcceptace.acceptance_token;
        this.toast.success('Token de aceptación generado');
      }).catch(err => {
        console.error(err);
      }).finally(() => {
        this.loading = false;
      });
    }
    
  }

  paymentCard() {
    if (!this.formAutorization.valid) {
      this.toast.error('Debes aceptar los términos y condiciones');
    }

    if (this.formCard.valid) {
      this.loading = true;
      const value = this.formCard.value;
      const dateExpiration = value.cardExpiration.split('/');
      lastValueFrom(this.payCardGql.mutate({
        input: {
          acceptance_token: this.acceptanceToken,
          amount: parseInt(this.subscriptionService.subscription.price + '00'),
          email: this.subscriptionService.user.email,
          user: this.subscriptionService.user.id,
          number: value.cardNumber.toString().replace(/\s/g, ''),
          card_holder: value.cardName,
          cvc: value.cardCvv.toString(),
          exp_month: dateExpiration[0].replace(' ', ''),
          exp_year: dateExpiration[1].replace(' ', '').substr(2, 2),
          fee: '1',
          period: this.subscriptionService.subscription.time,
          subscription: this.subscriptionService.subscription.id
        }
      })).then(data => {
        console.log(data);
        this.router.navigate(['/transaction', data!.data!.payCard.idTransaction]);
      }).catch(err => {
        console.error(err);
        this.toast.error('No se pudo realizar el pago');

      }).finally(() => {
        this.loading = false;
      });
    } else {
      this.toast.error('Debes completar todos los campos');
    }
    
  }

  paymentNequi() {
    if (!this.formAutorization.valid) {
      this.toast.error('Debes aceptar los términos y condiciones');
    }
    if (this.formNequi.valid) {
      const phone = this.formNequi.value.phone;
      this.payNequiGql.mutate({
        input: {
          acceptance_token: this.acceptanceToken,
          phone_number: phone,
          email: this.subscriptionService.user.email,
          user: this.subscriptionService.user.id,
          amount: parseInt(this.subscriptionService.subscription.price + '00'),
          period: this.subscriptionService.subscription.time,
          subscription: this.subscriptionService.subscription.id
        }
      }).toPromise().then(data => {
        console.log(data);
        // Toca ensayar con una subscripcion real
      }).catch(err => {
        console.error(err);
        this.toast.error('Error al realizar el pago. Por favor realizalo de nuevo.');
      }).finally(() => {
        this.loading = false;
      });
    } else {
      this.toast.error('Complete los datos');
    }
  }





}
