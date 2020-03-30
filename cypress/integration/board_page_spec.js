describe("The Board Page", function() {

  before(function() {
    cy.visit("/board");
  });

  it("Display a board game", function() {
    cy.get("svg[name=bottom-board]")
  });
});
