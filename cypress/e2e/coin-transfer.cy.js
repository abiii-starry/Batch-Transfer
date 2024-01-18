import transferPage from "../pages/batch-transfer-page"

const TEST_CHAIN = ["polygon"]  // ⭐Please fill in this variable before testing including ../fixtures/chain-list.js

describe("Normal Transfer", () => {
    const NETWORK_GOERLI = Cypress.env("NETWORK_GOERLI")
    const SECRET_WORDS = Cypress.env("SECRET_WORDS")
    const PASSWORD = Cypress.env("PASSWORD")

    before(() => {
        cy.setupMetamask(SECRET_WORDS, NETWORK_GOERLI, PASSWORD)
    })

    beforeEach(() => {
        cy.visit("/")
    })

    TEST_CHAIN.forEach((chain) => {
        it(`Form Model: ${chain} - coin transfer`, () => {
            cy.fixture("coin-batch").then(batchData => {
                let receiversList = batchData.receivers

                cy.switchChainWithoutConnect(chain)   
                cy.typeReceiver(receiversList)
                transferPage.getTransferSubmitBtn().should("not.have.class", "cursor-not-allowed").click()

                transferPage.getTransferStatusBoard().contains("Waiting For Confirmation")
                cy.confirmMetamaskPermissionToSpend()

                transferPage.getTransferStatusBoard().contains("Success", { timeout: 60000 }).then(() => {
                    cy.get("[data-cy='view-browser-btn']").invoke("attr", "href").should("include", chain)
                })

            })
        })

    })


})