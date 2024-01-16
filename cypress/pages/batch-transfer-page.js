class TransferPage{
    getTokenChooseBtn() {
        return cy.get("[data-cy='token-choose-btn']")
    }

    getReceiverNum() {

    }

    getReceiverAddrInput() {
        return cy.get("#0-address")
    }

    getReceiverAmountInput() {
        return cy.get("#0-amount")
    }

    getNewReceiverBtn() {
        return cy.get("button.py-1 > span")
    }

    getTransferSubmitBtn() {
        return cy.contains(".px-4", "Transfer", { timeout: 30000 })
    }

    // Token Select Board
    getTokenSearchInput() {
        return cy.get("[data-cy='token-search-input']")
    }

    getTokenList() {
        return cy.get("li.p-2")
    }

    getTokenRecommend() {
        
    }

    getUnlockBtn() {
        return cy.get("div > span").contains("Unlock")
    }
}

module.exports = new TransferPage()