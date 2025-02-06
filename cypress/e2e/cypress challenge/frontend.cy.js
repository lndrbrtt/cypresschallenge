/// <reference types="cypress" />

context("Frontend Validations", () => {
  beforeEach(() => {
    cy.visit("https://front.serverest.dev/login");
  });

  it("Validate that elements are loaded", () => {
    cy.get ('img[class="imagem"]').should('be.visible')
    cy.get ('h1').should('be.visible')
    cy.get ('h1').contains("Login")
    cy.get ('small[class="message form-text"]').should('be.visible')
    cy.get ('small[class="message form-text"]').contains('Não é cadastrado?')
    cy.get ('a[data-testid="cadastrar"]').should('be.visible')
    cy.get ('a[data-testid="cadastrar"]').contains("Cadastre-se");
  });

  it("Validate invalid email and/or password", () => {
    cy.get('input[data-testid="email"]').type("testinvalid@email.com");
    cy.get('input[data-testid="email"]').should("have.value", "testinvalid@email.com");
    cy.get('input[data-testid="senha"]').type("test$123");
    cy.get('input[data-testid="senha"]').should("have.value", "test$123");
    cy.get('button[data-testid="entrar"]').click();
    cy.get('span').contains("Email e/ou senha inválidos");
  });

  it("Validate sign in", () => {
    cy.get('input[data-testid="email"]').type("test@email.com");
    cy.get('input[data-testid="email"]').should("have.value", "test@email.com");
    cy.get('input[data-testid="senha"]').type("test$123");
    cy.get('input[data-testid="senha"]').should("have.value", "test$123");
    cy.get('button[data-testid="entrar"]').click();
    cy.get('button[data-testid="logout"]').should('be.visible')
  });

});
