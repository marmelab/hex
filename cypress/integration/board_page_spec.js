/* @todo: cypress-plugin-snapshots */
describe("The Board Page", function () {
  const size = 7;

  before(function () {
    cy.visit(`/board?size=${size}`);
  });

  it("Display a board game with bottom and grid", function () {
    cy.get("div[name=bottom-board]");
    cy.get("div[name=grid]")
      .find("svg")
      .should("have.length", size * size);
    cy.get("p[name=current-player]").should("contain", "Player 1");
  });

  it("Can put a stone anywhere as player 1 and player 2 can play after", function () {
    cy.get("div[name=grid]").find("svg[name=hexagon_0]").click();
    cy.get("p[name=current-player]").should("contain", "Player 2");

    cy.get("div[name=grid]").find("svg[name=hexagon_1]").click();
    cy.get("p[name=current-player]").should("contain", "Player 1");
  });

  it("should display the relay button when the game is over", function () {
    cy.visit(`/board?size=3`);
    cy.get("div[name=grid]").find("svg[name=hexagon_3]").click();
    cy.get("div[name=grid]").find("svg[name=hexagon_0]").click();
    cy.get("div[name=grid]").find("svg[name=hexagon_4]").click();
    cy.get("div[name=grid]").find("svg[name=hexagon_1]").click();
    cy.get("div[name=grid]").find("svg[name=hexagon_5]").click();

    cy.get("p[name=current-player]").should("contain", "Won by player 1");
    cy.get("button[name=replay-button]").should("contain", "Replay");
  });
});
