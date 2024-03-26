const TEST_CHAIN = ["metis", "cronos"]  // ⭐Please fill in this variable before testing including ../fixtures/chain-list.js

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

                cy.submitTransfer(chain)
            })
        })
    })

})