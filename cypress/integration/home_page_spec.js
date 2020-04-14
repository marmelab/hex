describe("The Home Page", function () {
  before(function () {
    cy.visit("/");
  });

  it("should display the menu", function () {
    cy.findByText("Start a new game").should("exist");
    cy.findByText("Resume local game").should("exist");
    cy.findByText("Rejoin online game").should("exist");
  });

  it("should display the 'Start a new game' modal", function () {
    cy.findByText("Start a new game").should("exist").click();
    cy.findByText("Your nickname").should("exist").type("Test");
    cy.findByLabelText("Size of the board").should("exist").select("7");
    cy.findByLabelText("Online playing").should("exist").should('not.be.checked') ;
    cy.findByText("Start").should("exist");
    cy.findByLabelText("Close").click();
  });
});
