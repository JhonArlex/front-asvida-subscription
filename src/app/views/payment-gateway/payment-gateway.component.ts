import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { CreditCardValidators } from 'angular-cc-library';
import { lastValueFrom } from 'rxjs';
import {
  GetFinancialInstutionGQL,
  GetSubscriptionGQL,
  GetTokenAcceptanceQueryGQL,
  GetUserGQL,
  Get_SubscriptionsGQL,
  PayBancolombiaGQL,
  PayCardGQL,
  PaymentPseGQL,
  PayNequiGQL,
  PseFinancialInstitution,
  Subscription,
  User,
} from 'src/app/core/graphql/graphq';
import { SubscriptionService } from 'src/app/core/services/subscription.service';

@Component({
  selector: 'app-payment-gateway',
  templateUrl: './payment-gateway.component.html',
  styleUrls: ['./payment-gateway.component.css'],
})
export class PaymentGatewayComponent implements OnInit {
  formNequi!: FormGroup;
  formPaymentMethod!: FormGroup;
  formCard!: FormGroup;
  formAutorization!: FormGroup;
  formBancolombia!: FormGroup;
  formPSE!: FormGroup;
  paymentMethod = null;

  loading = false;
  acceptanceToken!: string;

  ERRORS = {
    coupon_not_found: 'Cupón no encontrado',
  };
  financialInstitutions: PseFinancialInstitution[] = [];
  idUser: any;
  idSubscription: any;

  constructor(
    private fb: FormBuilder,
    private toast: HotToastService,
    private getTokenAutorizationGql: GetTokenAcceptanceQueryGQL,
    private payNequiGql: PayNequiGQL,
    private subscriptionService: SubscriptionService,
    private payCardGql: PayCardGQL,
    private router: Router,
    private payBancolombiaGql: PayBancolombiaGQL,
    private getFinancialInstutionGQL: GetFinancialInstutionGQL,
    private payPSEGql: PaymentPseGQL,
    private activatedRoute: ActivatedRoute,
    private getUserGql: GetUserGQL,
    private getSubscriptionGql: GetSubscriptionGQL
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (params) => {
        this.idUser = params['idUser'];
        this.idSubscription = params['idSubscription'];
        if (this.idUser && this.idSubscription) {
          this.getUserSubscription(this.idUser, this.idSubscription);
        } else {
          if (
            !this.subscriptionService.user ||
            !this.subscriptionService.subscription
          ) {
            this.toast.error(
              'No se pudo obtener la información de la suscripción'
            );
            //this.router.navigate(['/']);
          }
        }
      },
    });
    this.buildPaymentMethodForm();
    this.buildNequiForm();
    this.buildCardForm();
    this.buildAutorizationForm();
    this.buildBancolombiaForm();
    this.buildFormPSE();
  }

  async getUserSubscription(idUser: string, idSubscription: string) {
    try {
      const user = await this.getUserInfo(idUser);
      this.subscriptionService.user = user.data.getUsers[0] as User;
      const subscription = await this.getSubscription(idSubscription);
      this.subscriptionService.subscription = subscription.data
        .getSubscription as Subscription;
    } catch (error) {
      console.error(error);
      this.toast.error('No se pudo obtener la información de la suscripción');
    }
  }

  getSubscription(id: string) {
    return lastValueFrom(
      this.getSubscriptionGql.fetch({
        id,
      })
    );
  }

  getUserInfo(id: string) {
    return lastValueFrom(
      this.getUserGql.fetch({
        input: {
          _id: id,
        },
      })
    );
  }

  buildPaymentMethodForm() {
    this.formPaymentMethod = this.fb.group({
      paymentMethod: [''],
    });

    this.formPaymentMethod.valueChanges.subscribe(
      (data: { paymentMethod: null }) => {
        this.paymentMethod = data.paymentMethod;
        if (this.paymentMethod == 'PSE') {
          this.getPSEFinancialInstitutions();
        }
      }
    );
  }

  buildNequiForm() {
    this.formNequi = this.fb.group({
      phone: ['', Validators.required],
    });
  }

  buildBancolombiaForm() {
    this.formBancolombia = this.fb.group({
      coupon: [''],
    });
  }

  buildAutorizationForm() {
    this.formAutorization = this.fb.group({
      authorization: [false, Validators.required],
    });
  }

  buildFormPSE() {
    this.formPSE = this.fb.group({
      coupon: [''],
      financial: [null, Validators.required],
    });
  }

  buildCardForm() {
    this.formCard = this.fb.group({
      cardNumber: ['', [CreditCardValidators.validateCCNumber]],
      cardExpiration: ['', [CreditCardValidators.validateExpDate]],
      cardCvv: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(4)],
      ],
      cardName: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
        ],
      ],
      coupon: [''],
    });
  }

  onSubmit() {
    if (!this.formAutorization.get('authorization')!.value) {
      this.toast.error('Debes aceptar los términos y condiciones.');
    } else {
      if (this.paymentMethod == 'Nequi') {
        this.paymentNequi();
      }
      if (this.paymentMethod == 'Card') {
        this.paymentCard();
      }
      if (this.paymentMethod == 'Bancolombia') {
        this.paymentBancolombia();
      }
      if (this.paymentMethod == 'PSE') {
        this.paymentPSE();
      }
    }
  }

  paymentBancolombia() {
    if (!this.formAutorization.valid) {
      this.toast.error('Debes aceptar los términos y condiciones');
    }

    if (this.formBancolombia.valid) {
      this.loading = true;
      const coupon = this.formBancolombia.value.coupon;
      lastValueFrom(
        this.payBancolombiaGql.mutate({
          input: {
            coupon: coupon,
            email: this.subscriptionService.user.email,
            user: this.subscriptionService.user.id,
            amount: parseInt(
              this.subscriptionService.subscription.price + '00'
            ),
            period: this.subscriptionService.subscription.time,
            subscription: this.subscriptionService.subscription.id,
            payment_description: this.subscriptionService.subscription.name,
            user_type: 'PERSON',
            acceptance_token: this.acceptanceToken,
          },
        })
      )
        .then((data) => {
          console.log(data);
          const paymentMethod = JSON.parse(
            data.data?.payBtnBancolombia.payment_method!
          );
          const url = paymentMethod.extra.async_payment_url;
          window.open(url, '_blank');
          console.log(url);
          this.router.navigate([
            '/transaction',
            data!.data!.payBtnBancolombia.idTransaction,
          ]);
        })
        .catch((err) => {
          console.error(err);
          this.toast.error(
            'Error al realizar el pago. Por favor realizalo de nuevo.'
          );
        })
        .finally(() => {
          this.loading = false;
        });
    } else {
      this.toast.error('Complete los datos');
    }
  }

  getTokenAutorization() {
    this.loading = true;
    const value = this.formAutorization.value;
    if (value) {
      lastValueFrom(
        this.getTokenAutorizationGql.fetch({}, { fetchPolicy: 'network-only' })
      )
        .then((data) => {
          this.acceptanceToken = data!.data.getTokenAcceptace.acceptance_token;
          this.toast.success('Token de aceptación generado');
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }

  paymentCard() {
    if (this.formCard.valid) {
      this.loading = true;
      const value = this.formCard.value;
      const dateExpiration = value.cardExpiration.split('/');
      lastValueFrom(
        this.payCardGql.mutate({
          input: {
            acceptance_token: this.acceptanceToken,
            amount: parseInt(
              this.subscriptionService.subscription.price + '00'
            ),
            email: this.subscriptionService.user.email,
            user: this.subscriptionService.user.id,
            number: value.cardNumber.toString().replace(/\s/g, ''),
            card_holder: value.cardName,
            cvc: value.cardCvv.toString(),
            exp_month: dateExpiration[0].replace(' ', ''),
            exp_year: dateExpiration[1].replace(' ', '').substr(2, 2),
            fee: '1',
            period: this.subscriptionService.subscription.time,
            subscription: this.subscriptionService.subscription.id,
            coupon: value.coupon,
          },
        })
      )
        .then((data) => {
          this.router.navigate([
            '/transaction',
            data!.data!.payCard.idTransaction,
          ]);
        })
        .catch(({ graphQLErrors, networkError }) => {
          console.error(graphQLErrors);
          if (graphQLErrors) {
            this.toast.error(
              this.ERRORS[graphQLErrors[0].message as keyof typeof this.ERRORS]
            );
          } else {
            this.toast.error('No se pudo realizar el pago');
          }
        })
        .finally(() => {
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
      this.loading = true;
      const phone = this.formNequi.value.phone;
      this.payNequiGql
        .mutate({
          input: {
            acceptance_token: this.acceptanceToken,
            phone_number: phone,
            email: this.subscriptionService.user.email,
            user: this.subscriptionService.user.id,
            amount: parseInt(
              this.subscriptionService.subscription.price + '00'
            ),
            period: this.subscriptionService.subscription.time,
            subscription: this.subscriptionService.subscription.id,
          },
        })
        .toPromise()
        .then((data) => {
          console.log(data);
          this.router.navigate([
            '/transaction',
            data!.data!.payNequi.idTransaction,
          ]);
        })
        .catch((err) => {
          const errorJson = JSON.parse(err.message);
          if (errorJson.code == 'NequiTimeOut') {
            window.alert(
              'El tiempo de aceptación de la notificación ha expirado. Intente el pago de nuevo.'
            );
          } else {
            window.alert(
              'Error al realizar el pago. Por favor realizalo de nuevo.'
            );
          }
        })
        .finally(() => {
          this.loading = false;
        });
    } else {
      this.toast.error('Complete los datos');
    }
  }

  getPSEFinancialInstitutions() {
    this.loading = true;
    lastValueFrom(
      this.getFinancialInstutionGQL.fetch({}, { fetchPolicy: 'network-only' })
    )
      .then((data) => {
        this.financialInstitutions = data!.data.getPSEFinancialInstitution;
        console.log(this.financialInstitutions);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        this.loading = false;
      });
  }

  paymentPSE() {
    if (!this.formAutorization.valid) {
      this.toast.error('Debes aceptar los términos y condiciones');
    }

    if (this.formPSE.valid) {
      this.loading = true;
      const value = this.formPSE.value;
      lastValueFrom(
        this.payPSEGql.mutate({
          input: {
            coupon: value.coupon,
            email: this.subscriptionService.user.email,
            user: this.subscriptionService.user.id,
            amount: parseInt(
              this.subscriptionService.subscription.price + '00'
            ),
            period: this.subscriptionService.subscription.time,
            subscription: this.subscriptionService.subscription.id,
            payment_description: this.subscriptionService.subscription.name,
            user_type:
              this.subscriptionService.user.typeDni === 'CC' ? '0' : '1',
            acceptance_token: this.acceptanceToken,
            document: this.subscriptionService.user.dni as string,
            financial_institution: value.financial,
            typeDocument: this.subscriptionService.user.typeDni as string,
          },
        })
      )
        .then((data) => {
          console.log(data);
          const paymentMethod = JSON.parse(data.data?.payPSE.payment_method!);
          const url = paymentMethod.extra.async_payment_url;
          window.open(url, '_blank');
          console.log(url);
          this.router.navigate([
            '/transaction',
            data!.data!.payPSE.idTransaction,
          ]);
        })
        .catch((err) => {
          console.error(err);
          this.toast.error(
            'Error al realizar el pago. Por favor realizalo de nuevo.'
          );
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
}
