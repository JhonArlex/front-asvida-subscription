/// <reference types="cypress" />
describe('Pago con tarjeta de credito', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/');
    cy.get('.btn-subscription').first().click();
    cy.get('#name').type('Jhon Tarjeta de Cretido');
    cy.get('#email').type('jhon@test.com');
    cy.get('#phone').type('3148253309');
    cy.get('#tel').type('4486604');
    cy.get('#typeIdentifier').select('CC');
    cy.get('#identifier').type('1112482910');
    cy.get('#expeditionPlace').type('Lima');
    cy.get('#propia').check();
    cy.get('#stratum').type('3');
    cy.get('#address').type('Av. Lima 123');
    cy.get('#neighborhood').type('San Isidro');
    cy.get('#city').type('Lima');
    cy.get('[type="checkbox"]').check();
    cy.get('#pay').click();
  });

  it('Pago con tarjeta de credito error en el autorizar', () => {
    cy.wait(3000);
    cy.get('#paymentMethodCreditCard').should('be.visible');
    cy.get('#paymentMethodCreditCard').click();
    cy.get('#cc-number').type('4111111111111111');
    cy.get('#cc-name').type('Jhon Test Cypress');
    cy.get('#cc-exp-date').type('12/2022');
    cy.get('#cc-cvv').type('123');
    cy.get('#makePay').click();
    cy.get('.hot-toast-message > div > dynamic-view > div').contains('Debes aceptar los términos y condiciones.');
  });

  it('Pago con tarjeta de credito exitoso pero declinado', () => {
    cy.wait(2000);
    cy.get('#paymentMethodCreditCard').should('be.visible');
    cy.get('#paymentMethodCreditCard').click();
    cy.get('#cc-number').type('4111111111111111');
    cy.get('#cc-name').type('Jhon Test Cypress');
    cy.get('#cc-exp-date').type('12/2025');
    cy.get('#cc-cvv').type('123');
    cy.get('#authorization').click();
    cy.get('#makePay').click();

    cy.wait(2000);
    cy.url().should('include', '/transaction');
  });
});
