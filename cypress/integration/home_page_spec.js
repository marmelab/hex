describe("The Home Page", function() {
  it("Launch a local game", function() {
    cy.contains('Play (local)').click()
    cy.get('#modal-1-body').invoke('show')
    cy.contains('2 players on the same device')
    cy.get('#size')
      .select('7')
    cy.contains('Start')
  });
});
