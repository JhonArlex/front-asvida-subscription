import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import {
  CreateSubscriptionGQL,
  UpdateSubscriptionGQL,
} from 'src/app/core/graphql/graphq';
import { SubscriptionService } from 'src/app/core/services/subscription.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription-action.component.html',
  styleUrls: ['./subscription-action.component.css'],
})
export class SubscriptionActionComponent implements OnInit {
  formSubscription!: FormGroup;
  loading = false;

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private subscriptionService: SubscriptionService,
    private createSubscriptionGQL: CreateSubscriptionGQL,
    private updateSubscriptionGQL: UpdateSubscriptionGQL
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  get benefitsFormArray(): FormControl[] {
    return (this.formSubscription.get('benefits') as FormArray).controls as FormControl[];
  }

  buildForm() {
    this.formSubscription = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      time: ['', Validators.required],
      state: ['', Validators.required],
      benefits: this.fb.array([]),
    });
    if (this.subscriptionService.subscription) {
      this.formSubscription.patchValue(this.subscriptionService.subscription);
      this.subscriptionService.subscription.benefits.forEach(benefit => {
        this.addBenefit(benefit);
      });
    }
  }

  goBack() {
    this.location.back();
  }

  save() {
    if (this.subscriptionService.subscription) {
      this.updateSubscription();
    } else {
      this.createSubscription();
    }
  }

  async createSubscription() {
    this.loading = true;
    const value = this.formSubscription.value;
    const data = await lastValueFrom(
      this.createSubscriptionGQL.mutate({
        input: {
          name: value.name,
          price: value.price,
          description: value.description,
          time: value.time,
          state: value.state,
          benefits: value.benefits,
        },
      })
    );
    this.loading = false;
    this.goBack();
  }

  addBenefit(benefit: string | null = null) {
    const benefits = this.formSubscription.get('benefits') as FormArray;
    const benefitForm = this.fb.control(benefit);
    benefits.push(benefitForm);
  }

  removeBenefit(index: number) {
    const benefits = this.formSubscription.get('benefits') as FormArray;
    benefits.removeAt(index);
  }

  async updateSubscription() {
    this.loading = true;
    const value = this.formSubscription.value;
    const data = await lastValueFrom(
      this.updateSubscriptionGQL.mutate({
        input: {
          id: this.subscriptionService.subscription.id,
          data: {
            name: value.name,
            price: value.price,
            description: value.description,
            time: value.time,
            state: value.state,
            benefits: value.benefits,
          },
        },
      })
    );
    this.loading = false;
    this.goBack();
  }
}
