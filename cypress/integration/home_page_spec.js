describe("The Home Page", function() {

  before(function() {
    cy.visit("/");
    cy.contains("Play").click();
  });

  it("Display a modal", function() {
    cy.get("#modal-1-body").invoke("show");
  });

  it("Show the 2 players on same device modal", function() {
    cy.contains("2 players on the same device");
  });

  it("Select a size of board", function() {
    cy.get("#size").select("7");
  });

  it("Show a start button", function() {
    cy.contains("Start");
  });
});
