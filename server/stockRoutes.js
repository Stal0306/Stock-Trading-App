const express = require("express");
const stocksRouter = express.Router();
const pool = require("../db");

// Create Stock
stocksRouter.post("/stocks", async (req, res) => {
    try {
        const { InvestmentID, Company, RiskLevel, Quantity } = req.body;
        const newStock = await pool.query("INSERT INTO Stocks (InvestmentID, Company, RiskLevel, Quantity) VALUES ($1, $2, $3, $4) RETURNING *", [InvestmentID, Company, RiskLevel, Quantity]);

        res.json(newStock.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Get all stocks
stocksRouter.get("/stocks", async (req, res) => {
    try {
        const allStocks = await pool.query("SELECT * FROM Stocks");

        res.json(allStocks.rows);
    } catch (error) {
        console.error(err.message);
    }
});

// Get stock by InvestmentID
stocksRouter.get("/stocks/:InvestmentID", async (req, res) => {
    try {
        const { InvestmentID } = req.params;
        const stock = await pool.query("SELECT * FROM Stocks WHERE InvestmentID = $1", [InvestmentID]);

        res.json(stock.rows[0]);
    } catch (error) {
        console.error(err.message);
    }
});

// Update stock quantity
stocksRouter.put("/stocks/:InvestmentID", async (req, res) => {
    try {
        const { InvestmentID } = req.params;
        const { Quantity } = req.body;
        const updateStock = await pool.query("UPDATE Stocks SET Quantity = $1 WHERE InvestmentID = $2", [Quantity, InvestmentID]);

        res.json("Stock quantity was updated");
    } catch (error) {
        console.error(err.message);
    }
});

// Delete Stock
stocksRouter.delete("/stocks/:InvestmentID", async (req, res) => {
    try {
        const { InvestmentID } = req.params;
        const deleteStock = await pool.query("DELETE FROM Stocks WHERE InvestmentID = $1", [InvestmentID]);

        res.json("Stock was deleted");
    } catch (error) {
        console.error(err.message);
    }
});

module.exports = stocksRouter;