## How to run the project
1. Add an **.env** file that contains the following (*if DO NOT exist).

    ```
    CYPRESS_REMOTE_DEBUGGING_PORT=9222
    ```
2. Add a **cypress.env.json** file that contains the following. Replace variables with your own private key, etc.

    :exclamation: *`PRIVATE KET` and `SECRET WORDS` must use wallet with data, otherwise the test may fail*

    ```
    {
        SKIP_METAMASK_INSTALL: true
        SKIP_METAMASK_SETUP: true
        "NETWORK_GOERLI": "goerli",
        "NETWORK_MAINNET": "mainnet",
        "SECRET_WORDS": your_secret_words,
        "PRIVATE_KEY": your_private_key,
        "ACCOUNT_ADDRESS": your_account_address,
        "PASSWORD": your_own_password,
        "REMOTE_DEBUGGING_PORT": 9222
    }   
    ```
3. Update the baseUrl in **cypress.config.js**

4. yarn

5. yarn cypress-run