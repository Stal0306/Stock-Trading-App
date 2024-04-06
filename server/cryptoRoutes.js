const express = require("express");
const cryptoRouter = express.Router();
const pool = require("../db");

// Create Crypto Investment
cryptoRouter.post("/crypto", async (req, res) => {
    try {
        const { InvestmentID, CurrencyName, RiskLevel, Quantity } = req.body;
        const newCrypto = await pool.query("INSERT INTO Crypto (InvestmentID, CurrencyName, RiskLevel, Quantity) VALUES ($1, $2, $3, $4) RETURNING *", [InvestmentID, CurrencyName, RiskLevel, Quantity]);

        res.json(newCrypto.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Get all crypto investments
cryptoRouter.get("/crypto", async (req, res) => {
    try {
        const allCrypto = await pool.query("SELECT * FROM Crypto");

        res.json(allCrypto.rows);
    } catch (error) {
        console.error(err.message);
    }
});

// Get crypto investment by InvestmentID
cryptoRouter.get("/crypto/:InvestmentID", async (req, res) => {
    try {
        const { InvestmentID } = req.params;
        const crypto = await pool.query("SELECT * FROM Crypto WHERE InvestmentID = $1", [InvestmentID]);

        res.json(crypto.rows[0]);
    } catch (error) {
        console.error(err.message);
    }
});

// Update crypto investment quantity
cryptoRouter.put("/crypto/:InvestmentID", async (req, res) => {
    try {
        const { InvestmentID } = req.params;
        const { Quantity } = req.body;
        const updateCrypto = await pool.query("UPDATE Crypto SET Quantity = $1 WHERE InvestmentID = $2", [Quantity, InvestmentID]);

        res.json("Crypto investment quantity was updated");
    } catch (error) {
        console.error(err.message);
    }
});

// Delete Crypto Investment
cryptoRouter.delete("/crypto/:InvestmentID", async (req, res) => {
    try {
        const { InvestmentID } = req.params;
        const deleteCrypto = await pool.query("DELETE FROM Crypto WHERE InvestmentID = $1", [InvestmentID]);

        res.json("Crypto investment was deleted");
    } catch (error) {
        console.error(err.message);
    }
});

module.exports = cryptoRouter;
