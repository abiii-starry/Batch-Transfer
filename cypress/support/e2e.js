// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import '@synthetixio/synpress/support';

// Alternatively you can use CommonJS syntax:
// require('./commands')
const NETWORK_GOERLI = Cypress.env("NETWORK_GOERLI")
const SECRET_WORDS = Cypress.env("SECRET_WORDS")
const PASSWORD = Cypress.env("PASSWORD")

before(() => {
    cy.setupMetamask(SECRET_WORDS, NETWORK_GOERLI, PASSWORD)
})