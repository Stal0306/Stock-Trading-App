const express = require("express");
const companyRouter = express.Router();
const pool = require("../db");

// Create Company Details
companyRouter.post("/companies", async (req, res) => {
    try {
        const { Company, Industry } = req.body;
        const newCompany = await pool.query("INSERT INTO CompanyDetails (Company, Industry) VALUES ($1, $2) RETURNING *", [Company, Industry]);

        res.json(newCompany.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Get all companies
companyRouter.get("/companies", async (req, res) => {
    try {
        const allCompanies = await pool.query("SELECT * FROM CompanyDetails");

        res.json(allCompanies.rows);
    } catch (error) {
        console.error(err.message);
    }
});

// Get company by name
companyRouter.get("/companies/:Company", async (req, res) => {
    try {
        const { Company } = req.params;
        const company = await pool.query("SELECT * FROM CompanyDetails WHERE Company = $1", [Company]);

        res.json(company.rows[0]);
    } catch (error) {
        console.error(err.message);
    }
});

// Update company details
companyRouter.put("/companies/:Company", async (req, res) => {
    try {
        const { Company } = req.params;
        const { Industry } = req.body;
        const updateCompany = await pool.query("UPDATE CompanyDetails SET Industry = $1 WHERE Company = $2", [Industry, Company]);

        res.json("Company details were updated");
    } catch (error) {
        console.error(err.message);
    }
});

// Delete Company
companyRouter.delete("/companies/:Company", async (req, res) => {
    try {
        const { Company } = req.params;
        const deleteCompany = await pool.query("DELETE FROM CompanyDetails WHERE Company = $1", [Company]);

        res.json("Company was deleted");
    } catch (error) {
        console.error(err.message);
    }
});

module.exports = companyRouter;
