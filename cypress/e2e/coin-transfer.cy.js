import transferPage from "../pages/batch-transfer-page"
const TEST_CHAIN = ["avalanche"]  // ⭐Please fill in this variable before testing including ../fixtures/chain-list.js

describe("Normal Transfer", () => {
    beforeEach(() => {
        cy.visit("/")
    })

    TEST_CHAIN.forEach((chain) => {
        it(`Form Model: ${chain} - coin transfer`, () => {
            cy.fixture("coin-batch").then(batchData => {
                let receiversList = batchData.receivers

                cy.connectWithMetamask(chain)   
                cy.typeReceiver(receiversList)
                
                transferPage.getTransferSubmitBtn().should("not.have.class", "cursor-not-allowed").then($submitBtn => {
                    const balanceInit = Cypress.$("div[data-cy='balance-coin-bottom']>span").first().text()

                    cy.wrap($submitBtn).click()
                    cy.transConfirming(chain)
                    transferPage.getTransferStatusBoardCloseBtn().click()

                    cy.wait(1000).then(() => {
                        const balanceFinal = Cypress.$("div[data-cy='balance-coin-bottom']>span").first().text()
                        expect(balanceFinal).to.not.equal(balanceInit)
                    }) 
                })

            })
        })
    })

})