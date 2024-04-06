const express = require("express");
const accountRouter = express.Router();
const pool = require("../db");

// Create Account
accountRouter.post("/accounts", async (req, res) => {
    try {
        const { AccID, Balance } = req.body;
        const newAccount = await pool.query("INSERT INTO Accounts (AccID, Balance) VALUES ($1, $2) RETURNING *", [AccID, Balance]);

        res.json(newAccount.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Get all accounts
accountRouter.get("/accounts", async (req, res) => {
    try {
        const allAccounts = await pool.query("SELECT * FROM Accounts");

        res.json(allAccounts.rows);
    } catch (error) {
        console.error(err.message);
    }
});

// Get account by ID
accountRouter.get("/accounts/:AccID", async (req, res) => {
    try {
        const { AccID } = req.params;
        const account = await pool.query("SELECT * FROM Accounts WHERE AccID = $1", [AccID]);

        res.json(account.rows[0]);
    } catch (error) {
        console.error(err.message);
    }
});

// Update account balance
accountRouter.put("/accounts/:AccID", async (req, res) => {
    try {
        const { AccID } = req.params;
        const { Balance } = req.body;
        const updateAccount = await pool.query("UPDATE Accounts SET Balance = $1 WHERE AccID = $2", [Balance, AccID]);

        res.json("Account balance was updated");
    } catch (error) {
        console.error(err.message);
    }
});

// Delete Account
accountRouter.delete("/accounts/:AccID", async (req, res) => {
    try {
        const { AccID } = req.params;
        const deleteAccount = await pool.query("DELETE FROM Accounts WHERE AccID = $1", [AccID]);

        res.json("Account was deleted");
    } catch (error) {
        console.error(err.message);
    }
});

module.exports = accountRouter;
