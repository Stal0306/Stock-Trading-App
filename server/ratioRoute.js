const express = require("express");
const ratioRouter = express.Router();
const pool = require("../db");

// Create DependantRatio
ratioRouter.post("/ratios", async (req, res) => {
    try {
        const { PERatio, PEGRatio } = req.body;
        const newRatio = await pool.query("INSERT INTO DependantRatio (PERatio, PEGRatio) VALUES ($1, $2) RETURNING *", [PERatio, PEGRatio]);

        res.json(newRatio.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Get all ratios
ratioRouter.get("/ratios", async (req, res) => {
    try {
        const allRatios = await pool.query("SELECT * FROM DependantRatio");

        res.json(allRatios.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// Get DependantRatio by PERatio
ratioRouter.get("/ratios/:PERatio", async (req, res) => {
    try {
        const { PERatio } = req.params;
        const ratio = await pool.query("SELECT * FROM DependantRatio WHERE PERatio = $1", [PERatio]);

        res.json(ratio.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Update DependantRatio
ratioRouter.put("/ratios/:PERatio", async (req, res) => {
    try {
        const { PERatio } = req.params;
        const { PEGRatio } = req.body;
        const updateRatio = await pool.query("UPDATE DependantRatio SET PEGRatio = $1 WHERE PERatio = $2", [PEGRatio, PERatio]);

        res.json("DependantRatio was updated");
    } catch (err) {
        console.error(err.message);
    }
});

// Delete DependantRatio
ratioRouter.delete("/ratios/:PERatio", async (req, res) => {
    try {
        const { PERatio } = req.params;
        const deleteRatio = await pool.query("DELETE FROM DependantRatio WHERE PERatio = $1", [PERatio]);

        res.json("DependantRatio was deleted");
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = ratioRouter;