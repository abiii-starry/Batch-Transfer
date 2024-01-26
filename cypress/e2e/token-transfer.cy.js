import transferPage from "../pages/batch-transfer-page"

const TEST_CHAIN = ["fantom", "polygon", "avalanche"]  // ⭐Please fill in this variable before testing including ../fixtures/chain-list.js

describe("Normal Transfer", () => {
    beforeEach(() => {
        cy.visit("/")
    })

    describe("Transfer Token with Multi Chains ", () => {
        function chooseToken(tokenInfo) {
            transferPage.getTokenChooseBtn().click()
            transferPage.getTokenSearchInput().type(tokenInfo.tokenContract)
            transferPage.getTokenList().contains(tokenInfo.tokenSymbol, { timeout: 10000 }).click()
        }

        TEST_CHAIN.forEach((chain) => {
            it(`Form Model: ${chain} token transfer`, () => {
                cy.fixture("token-batch").then(batchData => {
                    let tokenInfo = batchData[chain]
    
                    cy.connectWithMetamask(chain)

                    chooseToken(tokenInfo)
                    cy.typeReceiver(tokenInfo.receiversList)

                    cy.wait(1000)
                    transferPage.getUnlockBtnContainer().then($container => {
                        // When the token does not need to be unlocked, the children of this element are empty
                        let containerChildren = $container.children()

                        containerChildren.length != 0 ? cy.approveToken() : cy.log("The token does not need to be unlocked")
                    })
                    
                    cy.submitTransfer(chain)
                })
            })
        })

    })
    
})