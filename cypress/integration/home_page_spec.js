describe("The Home Page", function () {
  before(function () {
    cy.visit("/");
    cy.contains("Play").click();
  });

  it("should display the menu", function () {
    cy.findByTitle("Play local game").should("exist");
    cy.findByTitle("Resume a local game").should("exist");
  });

  it("should display local game configuration modal", function () {
    cy.findByTitle("Play local game").click({ force: true });
    cy.findByTitle("2 players on the same device").should("exist");
    cy.findByTitle("Select a size").should("exist").select("7");
    cy.findByTitle("Start").should("exist");
  });

  it("should display the resume local game modal", function () {
    cy.findByTitle("Resume local game").click({ force: true });
    cy.findByTitle("Load local game").should("exist");
    cy.findByTitle("Choose a game").should("exist");
    cy.findByTitle("Start").should("exist");
  });
});
