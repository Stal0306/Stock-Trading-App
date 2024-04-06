const express = require("express");
const userRouter = express.Router();
const pool = require("../db");

// Create User
userRouter.post("/users", async(req, res)=> {
    try{
        const {SIN, Name} = req.body;
        const newUser = await pool.query("INSERT INTO Users (SIN, Name) VALUES ($1, $2) RETURNING *", [SIN, Name])

        res.json(newUser.rows[0]);
    }
    catch (err) {
        console.error(err.message);
    }
});

// Get all users
userRouter.get("/users", async(req, res) => {
    try {
        const allUsers = await pool.query("SELECT * FROM Users")

        res.json(allUsers.rows);
    } catch (error) {
        error.message(err.message);
    }
})

// Get user by SIN
userRouter.get("/users/:SIN", async(req,res) => {
    try {
        const {SIN} = req.params;
        const user = await pool.query("SELECT * FROM Users WHERE SIN = $1", [SIN])

        res.json(user.rows[0])
    } catch (error) {
        error.message(err.message)
    } 
})

// Update user
userRouter.put("/users/:SIN", async(req, res) => {
    try {
        const {SIN} = req.params;
        const {Name} = req.body;
        const updateUser = await pool.query("UPDATE Users SET Name = $1 WHERE SIN = $2", [Name, SIN]);

        res.json("User was updated");
    } catch (error) {
        error.message(err.message)
    }
})

// Delete User
userRouter.delete("/users/:SIN", async(req,res) => {
    try {
        const {SIN} = req.params;
        const deleteUser = await pool.query("DELETE FROM Users WHERE SIN = $1", [SIN]);

        res.json("User was deleted")
    } catch (error) {
        error.message(err.message)
    } 
})

module.exports = userRouter