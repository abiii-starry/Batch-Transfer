class TransferPage{
    getTokenChooseBtn() {
        return cy.get("[data-cy='token-choose-btn']", { timeout: 15000 })
    }

    getReceiverNum() {
        // todo
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
        // todo
    }

    getUnlockBtnContainer() {
        return cy.get(".gap-4").prev()
    }

    getUnlockBtn() {
        return cy.get("div > span").contains("Unlock")
    }

    getTransferStatusBoard() {
        return cy.get("[id^='headlessui-dialog-panel-']")
    }

    getTransferStatusTitle() {
        // Support title: Waiting For Approvement\Transfer Submit
        return cy.get("[data-cy='transfer-status-title']")
    }

    getTransferStatusBoardCloseBtn() {
        return cy.get(".transition-all.ring-1 div.flex > svg")
    }
}

module.exports = new TransferPage() 