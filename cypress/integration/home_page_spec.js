describe("The Home Page", function () {
  before(function () {
    cy.visit("/");
  });

  it("should display the menu", function () {
    cy.findByText("Play local game").should("exist");
    cy.findByText("Resume local game").should("exist");
  });

  it("should display the resume local game modal", function () {
    cy.findByText("Resume local game").click();
    cy.findByText("Load local game").should("exist");
    cy.findByText("Load game").should("exist");
    cy.findByText("Start").should("exist");
    cy.findByLabelText("Close").click();
  });

  it("should display local game configuration modal", function () {
    cy.findByText("Play local game").should("exist").click();
    cy.findByText("2 players on the same device").should("exist");
    cy.findByLabelText("Size of the board").should("exist").select("7");
    cy.findByText("Start").should("exist");
    cy.findByLabelText("Close").click();
  });
});
