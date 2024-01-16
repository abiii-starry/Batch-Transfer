describe("To Init Connect Status in Metamask", () => {
    const NETWORK_GOERLI = Cypress.env("NETWORK_GOERLI")
    const NETWORK_MAINNET = Cypress.env("NETWORK_MAINNET")
    const SECRET_WORDS = Cypress.env("SECRET_WORDS")
    const PASSWORD = Cypress.env("PASSWORD")
    const BATCH_ACCOUNT_KEY = Cypress.env("BATCH_ACCOUNT_KEY")
    const NO_DATA_ACCOUNT = "No_data_account"

    it.only("Setup Metamask and import the required wallets", () => {
        cy.setupMetamask(SECRET_WORDS, NETWORK_GOERLI, PASSWORD)
        cy.importMetamaskAccount(PRIVATE_KEY_BETA)
        cy.createMetamaskAccount(NO_DATA_ACCOUNT)
    })
})