class PublicPage{
    // Connect
    getConnectBtn() {
        return cy.get('.justify-end > [data-cy="connect-btn"]')
    }

    getNetworkSelectBtn() {
        return cy.get("[data-cy='chain-select-btn']")
    }

    // Switch to chain
    getNetworkBoard() {
        return cy.get("w3m-modal")
    }

    getConnectBoard() {
        return cy.get("w3m-modal").shadow("w3m-router")
    }
}

module.exports = new PublicPage()