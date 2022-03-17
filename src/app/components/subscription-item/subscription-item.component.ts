import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'src/app/core/graphql/graphq';

@Component({
  selector: 'app-subscription-item',
  templateUrl: './subscription-item.component.html',
  styleUrls: ['./subscription-item.component.css']
})
export class SubscriptionItemComponent implements OnInit {

  @Input('selected') selected: boolean = false;
  @Input('subscription') subscription: Subscription;
  @Output() checked = new EventEmitter<Subscription>();

  constructor() { }

  ngOnInit(): void {
  }

  selectSubscription() {
    this.checked.emit(this.subscription);
  }

}
