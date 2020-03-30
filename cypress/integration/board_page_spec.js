
/* @todo: cypress-plugin-snapshots */
describe("The Board Page", function() {

  const size = 7

  before(function() {
    cy.visit(`/board?size=${size}`);
  });

  it("Display a board game with bottom and grid", function() {
    cy.get("svg[name=bottom-board]")
    cy.get('div[name=grid]').find('svg').should('have.length', size * size)
  });
});
