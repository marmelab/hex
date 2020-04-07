/* @todo: cypress-plugin-snapshots */
describe("The Board Page", function () {
  const size = 7;

  before(function () {
    cy.visit(`/board?size=${size}`);
    cy.clearLocalStorage();
  });

  it("should display a board game with bottom and grid", function () {
    cy.findByLabelText("Game Board").should("exist");

    cy.findByLabelText("Grid")
      .should("exist")
      .find("svg")
      .should("have.length", size * size);

    cy.findByTitle("Current player")
      .should("exist")
      .should("contain", "Player 1");
  });

  it("Can put a stone anywhere as player 1 and player 2 can play after", function () {
    cy.findByLabelText("hexagon_0_x_0_y_0").should("exist").click();
    cy.findByTitle("Current player")
      .should("exist")
      .should("contain", "Player 2");

    cy.findByLabelText("hexagon_1_x_1_y_0").should("exist").click();
    cy.findByTitle("Current player")
      .should("exist")
      .should("contain", "Player 1");
  });

  it("should display the relay button when the game is over", function () {
    cy.visit(`/board?size=3`);
    cy.findByLabelText("hexagon_0_x_0_y_0").should("exist").click();
    cy.findByLabelText("hexagon_3_x_0_y_1").should("exist").click();
    cy.findByLabelText("hexagon_1_x_1_y_0").should("exist").click();
    cy.findByLabelText("hexagon_4_x_1_y_1").should("exist").click();
    cy.findByLabelText("hexagon_2_x_2_y_0").should("exist").click();

    cy.findByTitle("Current player")
      .should("exist")
      .should("contain", "Won by player 1");
    cy.findByTitle("Replay").should("exist").should("contain", "Replay");
  });

  it("should save the game state in Local Storage", function () {
    cy.visit(`/board?size=3`);
    cy.findByLabelText("hexagon_1_x_1_y_0")
      .should("exist")
      .click()
      .should(() => {
        const games = JSON.parse(localStorage.getItem("games"));
        const save = games[0];

        assert.deepEqual(save.grid, [0, 1, 0, 0, 0, 0, 0, 0, 0]);
        assert.equal(save.player, 1);
      });
  });

  it("should clean the save in Local Storage when the game is over", function () {
    cy.visit(`/board?size=3`);
    cy.findByLabelText("hexagon_0_x_0_y_0").should("exist").click();
    cy.findByLabelText("hexagon_3_x_0_y_1").should("exist").click();
    cy.findByLabelText("hexagon_1_x_1_y_0").should("exist").click();
    cy.findByLabelText("hexagon_4_x_1_y_1").should("exist").click();
    cy.findByLabelText("hexagon_2_x_2_y_0").should("exist").click();

    cy.findByTitle("Replay")
      .should("exist")
      .should(() => {
        const games = JSON.parse(localStorage.getItem("games"));
        assert.deepEqual(games, []);
      });
  });
});
