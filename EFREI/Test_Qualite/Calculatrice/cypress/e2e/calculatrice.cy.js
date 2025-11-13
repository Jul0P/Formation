describe('Calculatrice', () => {
  beforeEach(() => {
    cy.visit('src/index.html');
  });

  // TC01
  it("Vérifier que l'addition fonctionne", () => {
    cy.get('#number1').type('2');
    cy.get('#number2').type('3');
    cy.get('#button-add').click();
    cy.get('#result').should('contain', '5');
  });

  // TC02
  it('Vérifier que la soustraction fonctionne', () => {
    cy.get('#number1').type('10');
    cy.get('#number2').type('4');
    cy.get('#button-subtract').click();
    cy.get('#result').should('contain', '6');
  });

  // TC03
  it('Vérifier que la multiplication fonctionne', () => {
    cy.get('#number1').type('5');
    cy.get('#number2').type('7');
    cy.get('#button-multiply').click();
    cy.get('#result').should('contain', '35');
  });

  // TC04
  it('Vérifier que la division fonctionne', () => {
    cy.get('#number1').type('20');
    cy.get('#number2').type('4');
    cy.get('#button-divide').click();
    cy.get('#result').should('contain', '5');
  });

  // TC05
  it("Vérifier l'addition avec nombres négatifs", () => {
    cy.get('#number1').type('-5');
    cy.get('#number2').type('-3');
    cy.get('#button-add').click();
    cy.get('#result').should('contain', '-8');
  });

  // TC06 - Test négatif
  it('Vérifier la division par zéro', () => {
    cy.get('#number1').type('10');
    cy.get('#number2').type('0');
    cy.get('#button-divide').click();
    cy.get('#result').should('contain', 'Erreur');
  });
});
