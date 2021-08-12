describe("Appointments", () => {

  beforeEach(() => {

    cy.request("GET", "http://localhost:8001/api/debug/reset");

    cy.visit("/");

    cy.contains("Monday");
  });

  it("should book an interview", () => {
    cy.get("[alt='Add']")
      .first()
      .click();

    cy.get("[data-testid=student-name-input]")
      .type("Lydia Miller-Jones");

    cy.get("[alt='Sylvia Palmer']")
      .click();

    cy.contains("button", "Save")
      .click();

    cy.get(".appointment__card--show")
      .should("contain", "Lydia Miller-Jones")
      .should("contain", "Sylvia Palmer");
  });

  it("should edit an interview", () => {
    cy.get("[alt='Edit']")
      .first()
      .click({ force:true });

    cy.get("[data-testid=student-name-input]")
      .clear()
      .type("Angela Chan")
      .get("[alt='Tori Malcolm']")
      .click();

    cy.contains("button", "Save")
      .click();

    cy.get(".appointment")
      .eq(0)
      .should("contain", "Angela Chan")
      .should("contain", "Tori Malcolm");
  });

  it("should cancel an interview", () => {
    cy.get("[alt='Delete']")
      .click({ force:true });

    cy.contains("button", "Confirm")
      .click();

    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");

    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist")

    cy.get(".appointment")
      .first()
      .should("have.descendants", ".appointment__add");
  });
}); 