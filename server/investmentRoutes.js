const express = require("express");
const investmentRouter = express.Router();
const pool = require("../db");

// Create Investment
investmentRouter.post("/investments", async (req, res) => {
    try {
        const { InvestmentID, Industry, RiskLevel, Quantity } = req.body;
        const newInvestment = await pool.query("INSERT INTO Investments (InvestmentID, Industry, RiskLevel, Quantity) VALUES ($1, $2, $3, $4) RETURNING *", [InvestmentID, Industry, RiskLevel, Quantity]);

        res.json(newInvestment.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Get all investments
investmentRouter.get("/investments", async (req, res) => {
    try {
        const allInvestments = await pool.query("SELECT * FROM Investments");

        res.json(allInvestments.rows);
    } catch (error) {
        console.error(err.message);
    }
});

// Get investment by ID
investmentRouter.get("/investments/:InvestmentID", async (req, res) => {
    try {
        const { InvestmentID } = req.params;
        const investment = await pool.query("SELECT * FROM Investments WHERE InvestmentID = $1", [InvestmentID]);

        res.json(investment.rows[0]);
    } catch (error) {
        console.error(err.message);
    }
});

// Update investment quantity
investmentRouter.put("/investments/:InvestmentID", async (req, res) => {
    try {
        const { InvestmentID } = req.params;
        const { Quantity } = req.body;
        const updateInvestment = await pool.query("UPDATE Investments SET Quantity = $1 WHERE InvestmentID = $2", [Quantity, InvestmentID]);

        res.json("Investment quantity was updated");
    } catch (error) {
        console.error(err.message);
    }
});

// Delete Investment
investmentRouter.delete("/investments/:InvestmentID", async (req, res) => {
    try {
        const { InvestmentID } = req.params;
        const deleteInvestment = await pool.query("DELETE FROM Investments WHERE InvestmentID = $1", [InvestmentID]);

        res.json("Investment was deleted");
    } catch (error) {
        console.error(err.message);
    }
});

module.exports = investmentRouter;
