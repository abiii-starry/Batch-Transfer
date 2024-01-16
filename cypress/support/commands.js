// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import transferPage from "../pages/batch-transfer-page"
import publicPage from "../pages/public-page"
import { chainList } from "../fixtures/chain-list"

Cypress.Commands.add("typeReceiver", (receiversList) => {
    receiversList.forEach((receiver, index) => {
        if (index == 0) {
            cy.get("#0-address").type(receiver.address)
            cy.get("#0-amount").type(receiver.amount)
        }
        else {
            transferPage.getNewReceiverBtn().click()
            cy.get(`#${index}-address`).type(receiver.address)
            cy.get(`#${index}-amount`).type(receiver.amount)
        }
    })
})


// Support only in connect status
Cypress.Commands.add("switchChainWithConnect", chain => {
    publicPage.getNetworkSelectBtn().click()
    publicPage.getNetworkBoard().contains(chain, { includeShadowDom: true }).click()
})


// Support only in connect status
Cypress.Commands.add("switchChainWithoutConnect", (chain) => {
    cy.changeMetamaskNetwork(chain)

    publicPage.getNetworkSelectBtn().click()
    publicPage.getNetworkBoard().contains(chainList.get(chain), { includeShadowDom: true }).click()
    publicPage.getConnectBoard().contains("Browser Wallet", { includeShadowDom: true }).click()
})


// Connections are only supported for wallets that have already been connected
Cypress.Commands.add("toConnect", () => {
    publicPage.getConnectBtn().click()
    publicPage.getConnectBoard().contains("Browser Wallet", { includeShadowDom: true }).click()
})


Cypress.Commands.add("approveToken", (allowance=false) => {
    transferPage.getUnlockBtn().click()
    cy.confirmMetamaskPermissionToSpend()
})
