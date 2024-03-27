// ***********************************************************
// Before testing, make sure you have added the chain to the Metamask
// Make sure the wallet to be tested is connected to the dapp
// No support for BASE\Linea\Scroll\zkSync Era
// ⭐Please fill in TEST_CHAIN list before testing including ../fixtures/chain-list.js
// ***********************************************************
import transferPage from "../pages/batch-transfer-page"

const TEST_CHAIN = ["polygon"] 

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
                    
                    // cy.submitTransfer(chain)
                    cy.wait(1000)
                    transferPage.getTransferSubmitBtn().should("not.have.class", "cursor-not-allowed").then($submitBtn => {
                        const balanceInit = Cypress.$("div[data-cy='balance-coin-bottom']>span").first().text()
    
                        cy.wrap($submitBtn).click()
                        cy.transConfirming(chain)
                        transferPage.getTransferStatusBoardCloseBtn().click()
    
                        cy.wait(1000).then(() => {
                            const balanceFinal = Cypress.$("div[data-cy='balance-coin-bottom']>span").first().text()
                            expect(balanceFinal).to.not.equal(balanceInit)
                            cy.log(balanceInit, balanceFinal)
                        }) 
                    })
                })
            })
        })

    })
    
})