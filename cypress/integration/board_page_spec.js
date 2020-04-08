/* @todo: cypress-plugin-snapshots */
describe("The Board Page", function () {
  const size = 7;

  before(function () {
    cy.visit(`/board?size=${size}`);
    cy.clearLocalStorage();
  });

  it("should display a board game with bottom and grid", function () {
    cy.findByTestId("grid").then((container) =>
      cy
        .findAllByRole("button", { container })
        .should("have.length", size * size)
    );

    cy.findByText("Player 1, it's your turn.").should("exist");
  });

  it("Can put a stone anywhere as player 1 and player 2 can play after", function () {
    cy.findByLabelText("Hexagon at row 0 and column 0").should("exist").click();
    cy.findByText("Player 2, it's your turn.").should("exist");

    cy.findByLabelText("Hexagon at row 1 and column 0").should("exist").click();
    cy.findByText("Player 1, it's your turn.").should("exist");
  });

  it("should display the relay button when the game is over", function () {
    cy.visit(`/board?size=3`);
    cy.findByLabelText("Hexagon at row 0 and column 0").should("exist").click();
    cy.findByLabelText("Hexagon at row 0 and column 1").should("exist").click();
    cy.findByLabelText("Hexagon at row 1 and column 0").should("exist").click();
    cy.findByLabelText("Hexagon at row 1 and column 1").should("exist").click();
    cy.findByLabelText("Hexagon at row 2 and column 0").should("exist").click();

    cy.findByText("Won by player 1").should("exist");
    cy.findByText("Replay").should("exist");
  });

  it("should save the game state in Local Storage", function () {
    cy.visit(`/board?size=3`);
    cy.findByLabelText("Hexagon at row 1 and column 0")
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
    cy.findByLabelText("Hexagon at row 0 and column 0").should("exist").click();
    cy.findByLabelText("Hexagon at row 0 and column 1").should("exist").click();
    cy.findByLabelText("Hexagon at row 1 and column 0").should("exist").click();
    cy.findByLabelText("Hexagon at row 1 and column 1").should("exist").click();
    cy.findByLabelText("Hexagon at row 2 and column 0").should("exist").click();

    cy.findByText("Replay")
      .should("exist")
      .should(() => {
        const games = JSON.parse(localStorage.getItem("games"));
        assert.deepEqual(games, []);
      });
  });
});
