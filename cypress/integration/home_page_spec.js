describe("The Home Page", function () {
  before(function () {
    cy.visit("/");
  });

  it("should display the menu", function () {
    cy.findByText("Start a new game").should("exist");
    cy.findByText("Resume a solo game").should("exist");
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

  it("should display the 'Resume local game' modal", function () {
    cy.findByText("Resume a solo game").should("exist").click();
    cy.findByLabelText("Load game").should("exist").select("0") ;
    cy.findByText("Start").should("exist");
    cy.findByLabelText("Close").click();
  });

  it("should display the 'Rejoin online game' modal", function () {
    cy.findByText("Rejoin online game").should("exist").click();
    cy.findByText("Your nickname").should("exist").type("Test");
    cy.findByLabelText("Choose a game").should("exist").select("0") ;
    cy.findByText("Rejoin").should("exist");
    cy.findByLabelText("Close").click();
  });
});
