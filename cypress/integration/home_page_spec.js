describe("The Home Page", function () {
  before(function () {
    cy.visit("/");
    cy.contains("Play").click();
  });

  it("should display the menu", function () {
    cy.get('button[name="local-game"]').contains("Play local game");
    cy.get('button[name="resume-local-game"]').contains("Resume local game");
  });

  it("Display the '2 players on the same device' modal", function () {
    cy.get("#modal-1-body").invoke("show");
    cy.contains("2 players on the same device");
    cy.get('select[name="size"]').select("7");
    cy.contains("Start");
  });
});
