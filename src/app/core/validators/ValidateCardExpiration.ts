import { AbstractControl } from '@angular/forms';

export function ValidateCardExpiration(control: AbstractControl) {
  const currentDate = new Date();
  const dateCardSplit = control.value.split('/');
  const dateCard = new Date(`${dateCardSplit[0]}/1/${dateCardSplit[1]}`);

  if (currentDate.getTime() > dateCard.getTime()) {
    return {
      cardExpiration: true
    };
  }
  return null;
}