const express = require("express");
const cryptoRouter = express.Router();
const pool = require("../db");

// Create Crypto Details
cryptoRouter.post("/crypto", async (req, res) => {
    try {
        const { CurrencyName, Market } = req.body;
        const newCrypto = await pool.query("INSERT INTO CryptoDetails (CurrencyName, Market) VALUES ($1, $2) RETURNING *", [CurrencyName, Market]);

        res.json(newCrypto.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Get all crypto currencies
cryptoRouter.get("/crypto", async (req, res) => {
    try {
        const allCrypto = await pool.query("SELECT * FROM CryptoDetails");

        res.json(allCrypto.rows);
    } catch (error) {
        console.error(err.message);
    }
});

// Get crypto currency by name
cryptoRouter.get("/crypto/:CurrencyName", async (req, res) => {
    try {
        const { CurrencyName } = req.params;
        const crypto = await pool.query("SELECT * FROM CryptoDetails WHERE CurrencyName = $1", [CurrencyName]);

        res.json(crypto.rows[0]);
    } catch (error) {
        console.error(err.message);
    }
});

// Update crypto details
cryptoRouter.put("/crypto/:CurrencyName", async (req, res) => {
    try {
        const { CurrencyName } = req.params;
        const { Market } = req.body;
        const updateCrypto = await pool.query("UPDATE CryptoDetails SET Market = $1 WHERE CurrencyName = $2", [Market, CurrencyName]);

        res.json("Crypto details were updated");
    } catch (error) {
        console.error(err.message);
    }
});

// Delete Crypto Currency
cryptoRouter.delete("/crypto/:CurrencyName", async (req, res) => {
    try {
        const { CurrencyName } = req.params;
        const deleteCrypto = await pool.query("DELETE FROM CryptoDetails WHERE CurrencyName = $1", [CurrencyName]);

        res.json("Crypto currency was deleted");
    } catch (error) {
        console.error(err.message);
    }
});

module.exports = cryptoRouter;
