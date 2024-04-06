const marketPriceRouter = express.Router();

// Create MarketPriceRatio
marketPriceRouter.post("/market-prices", async (req, res) => {
    try {
        const { MarketPrice, PERatio, PBRatio } = req.body;
        const newMarketPrice = await pool.query("INSERT INTO MarketPriceRatio (MarketPrice, PERatio, PBRatio) VALUES ($1, $2, $3) RETURNING *", [MarketPrice, PERatio, PBRatio]);

        res.json(newMarketPrice.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Get all MarketPriceRatios
marketPriceRouter.get("/market-prices", async (req, res) => {
    try {
        const allMarketPrices = await pool.query("SELECT * FROM MarketPriceRatio");

        res.json(allMarketPrices.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// Get MarketPriceRatio by MarketPrice
marketPriceRouter.get("/market-prices/:MarketPrice", async (req, res) => {
    try {
        const { MarketPrice } = req.params;
        const marketPrice = await pool.query("SELECT * FROM MarketPriceRatio WHERE MarketPrice = $1", [MarketPrice]);

        res.json(marketPrice.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Update MarketPriceRatio
marketPriceRouter.put("/market-prices/:MarketPrice", async (req, res) => {
    try {
        const { MarketPrice } = req.params;
        const { PERatio, PBRatio } = req.body;
        const updateMarketPrice = await pool.query("UPDATE MarketPriceRatio SET PERatio = $1, PBRatio = $2 WHERE MarketPrice = $3", [PERatio, PBRatio, MarketPrice]);

        res.json("MarketPriceRatio was updated");
    } catch (err) {
        console.error(err.message);
    }
});

// Delete MarketPriceRatio
marketPriceRouter.delete("/market-prices/:MarketPrice", async (req, res) => {
    try {
        const { MarketPrice } = req.params;
        const deleteMarketPrice = await pool.query("DELETE FROM MarketPriceRatio WHERE MarketPrice = $1", [MarketPrice]);

        res.json("MarketPriceRatio was deleted");
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = marketPriceRouter;