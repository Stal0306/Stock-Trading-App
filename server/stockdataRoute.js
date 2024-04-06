const stockDataRouter = express.Router();

// Create StockData
stockDataRouter.post("/stock-data", async (req, res) => {
    try {
        const { TickerSymbol, Date, MarketPrice } = req.body;
        const newStockData = await pool.query("INSERT INTO StockData (TickerSymbol, Date, MarketPrice) VALUES ($1, $2, $3) RETURNING *", [TickerSymbol, Date, MarketPrice]);

        res.json(newStockData.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Get all StockData
stockDataRouter.get("/stock-data", async (req, res) => {
    try {
        const allStockData = await pool.query("SELECT * FROM StockData");

        res.json(allStockData.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// Get StockData by TickerSymbol and Date
stockDataRouter.get("/stock-data/:TickerSymbol/:Date", async (req, res) => {
    try {
        const { TickerSymbol, Date } = req.params;
        const stockData = await pool.query("SELECT * FROM StockData WHERE TickerSymbol = $1 AND Date = $2", [TickerSymbol, Date]);

        res.json(stockData.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Update StockData
stockDataRouter.put("/stock-data/:TickerSymbol", async (req, res) => {
    try {
        const { TickerSymbol } = req.params;
        const { Date, MarketPrice } = req.body;
        const updateStockData = await pool.query("UPDATE StockData SET Date = $1, MarketPrice = $2 WHERE TickerSymbol = $3", [Date, MarketPrice, TickerSymbol]);

        res.json("StockData was updated");
    } catch (err) {
        console.error(err.message);
    }
});

// Delete StockData
stockDataRouter.delete("/stock-data/:TickerSymbol", async (req, res) => {
    try {
        const { TickerSymbol } = req.params;
        const deleteStockData = await pool.query("DELETE FROM StockData WHERE TickerSymbol = $1", [TickerSymbol]);

        res.json("StockData was deleted");
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = stockDataRouter;