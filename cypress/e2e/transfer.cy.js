import transferPage from "../pages/batch-transfer-page"

const TEST_CHAIN = "avalanche"  // ⭐Please fill in this variable before testing including ../fixtures/chain-list.js

describe("Normal Transfer", () => {
    const NETWORK_GOERLI = Cypress.env("NETWORK_GOERLI")
    const SECRET_WORDS = Cypress.env("SECRET_WORDS")
    const PASSWORD = Cypress.env("PASSWORD")

    before(() => {
        cy.setupMetamask(SECRET_WORDS, NETWORK_GOERLI, PASSWORD)
    })

    beforeEach(() => {
        cy.visit("/")
        cy.switchChainWithoutConnect(TEST_CHAIN)
    })

    it.skip("Form Model: normal coin transfer", () => {
        cy.fixture("coin-batch").then(batchData => {
            let receiversList = batchData.receivers

            cy.typeReceiver(receiversList)
            transferPage.getTransferSubmitBtn().should("not.have.class", "cursor-not-allowed").click()

            cy.confirmMetamaskPermissionToSpend()
        })
    })

    it("Form Model: normal token transfer", () => {
        cy.fixture("token-batch").then(batchData => {
            let tokenInfo = batchData[TEST_CHAIN]

            transferPage.getTokenChooseBtn().click()
            transferPage.getTokenSearchInput().type(tokenInfo.tokenContract)
            transferPage.getTokenList().contains(tokenInfo.tokenSymbol, { timeout: 10000 }).click()
            cy.typeReceiver(tokenInfo.receiversList)

            cy.approveToken()
            // Interim measures: Click the transfer Button when it is active
            cy.get(".transition-all.ring-1 div.flex > svg").click()  // Close transaction status window
            transferPage.getTransferSubmitBtn().should("not.have.class", "cursor-not-allowed").click()

            cy.confirmMetamaskPermissionToSpend()
        })
    })

})