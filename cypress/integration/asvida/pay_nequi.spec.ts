/// <reference types="cypress" />
describe('Pago de nequi', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/');
    cy.get('.btn-subscription').first().click();
    cy.get('#name').type('Jhon Test Cypress');
    cy.get('#email').type('jhon@test.com');
    cy.get('#phone').type('3148253309');
    cy.get('#tel').type('4486604');
    cy.get('#typeIdentifier').select('CC');
    cy.get('#identifier').type('1112482910');
    cy.get('#expeditionPlace').type('Lima');
    cy.get('#propia').check();
    cy.get('#casa').check();
    cy.get('#stratum').type('3');
    cy.get('#address').type('Av. Lima 123');
    cy.get('#neighborhood').type('San Isidro');
    cy.get('#city').type('Lima');
    cy.get('#refer').type('Jhon Referido');
    cy.get('[type="checkbox"]').check();
  });

  it('Valida que el boton de pagar se habilite', () => {
    cy.get('#pay').should('not.be.disabled');
  });

  it('Crea el usuario y paga con nequi y muestra error de notificacion', () => {
    cy.get('#pay').click();
    cy.get('#paymentMethodNequi').should('be.visible');
    cy.get('#paymentMethodNequi').click();
    cy.get('#phoneNequi').type('3174138541');
    cy.get('#authorization').check();
    cy.wait(2000);
    cy.get('#makePay').click();
    cy.get('ngx-loading').children().should('have.length', 1);
    cy.wait(60000);
    cy.on('window:alert', (text) => {
      expect(text).to.contains(
        'El tiempo de aceptación de la notificación ha expirado. Intente el pago de nuevo.'
      );
    });
  });

  it('Crea el usuario, paga con nequi y hace una transacción exitosa', () => {
    cy.get('#pay').click();
    cy.get('#paymentMethodNequi').click();
    cy.get('#phoneNequi').type('3174138541');
    cy.get('#authorization').check();
    cy.wait(2000);
    cy.get('#makePay').click();
    cy.wait(60000);
    cy.url().should('include', '/transaction');
  });
});
