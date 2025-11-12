describe("Test du formulaire d'inscription", () => {
  beforeEach(() => {
    cy.visit('src/index.html');
  });

  it('devrait afficher le formulaire avec tous les champs', () => {
    cy.get('#form').should('exist');
    cy.get('#nom').should('exist').and('have.attr', 'type', 'text');
    cy.get('#email').should('exist').and('have.attr', 'type', 'email');
    cy.get('#envoyer').should('exist').and('contain', 'Envoyer');
  });

  it('devrait avoir un message vide au chargement', () => {
    cy.get('#message').should('be.empty');
  });

  it('devrait afficher "Inscription réussie !" après soumission', () => {
    cy.get('#nom').type('Jean Dupont');
    cy.get('#email').type('jean.dupont@example.com');
    cy.get('#envoyer').click();

    cy.get('#message').should('be.visible').and('contain', 'Inscription réussie !');
  });
});
