describe("Connect Status", () => {
    function getCoinBalance(chain, address) {
        const requestUrl = `https://api.fxwallet.com/wallet/${chain}/balance`
        return cy.request({
            method: "GET",
            url: requestUrl,
            headers: {
                "x-pubkey": address
            }
        }).its("body.balance")
    }

    it("asd", () => {
        cy.getCoinBalance("polygon", "0x34833f0A35fa55C0d13cEf4b727F51f679ED6523").then((balance) => cy.log(balance))
    })

})