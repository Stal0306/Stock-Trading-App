USE DATABASE Portfolio;

-- Table statements
CREATE TABLE User (
    SIN VARCHAR(20) PRIMARY KEY,
    Name VARCHAR(100)
);


CREATE TABLE Account (
    AccID VARCHAR(20) PRIMARY KEY,
    Balance FLOAT
);


CREATE TABLE Investments (
    InvestmentID INT PRIMARY KEY,
    Industry VARCHAR(100),
    RiskLevel VARCHAR(50),
    Quantity FLOAT
);


CREATE TABLE CompanyDetails (
    Company VARCHAR(50) PRIMARY KEY,
    Industry VARCHAR(100),
);


CREATE TABLE CryptoDetails (
    Company VARCHAR(50) PRIMARY KEY,
    Industry VARCHAR(100),
);


CREATE TABLE Stocks (
    InvestmentID INT PRIMARY KEY,
    Company VARCHAR(100),
    RiskLevel VARCHAR(50),
    Quantity FLOAT,
    FOREIGN KEY (Company) references CompanyDetails(Company)
);


CREATE TABLE Crypto (
    InvestmentID INT PRIMARY KEY,
    CurrencyName VARCHAR(100),
    RiskLevel VARCHAR(50),
    Quantity FLOAT,
    FOREIGN KEY (CurrencyName) REFERENCES CompanyDetails(Company)
);


CREATE TABLE DependantRatio (
    PERatio FLOAT PRIMARY KEY,
    PEGRatio FLOAT,
);


CREATE TABLE MarketPriceRatio (
    MarketPrice VARCHAR(50),
    PERatio FLOAT,
    PBRatio FLOAT,
    PRIMARY KEY (MarketPrice),
    FOREIGN KEY (PERatio) REFERENCES DependantRatio(PERatio)
);


CREATE TABLE StockData (
    TickerSymbol VARCHAR(50),
    Date DATE,
    MarketPrice VARCHAR(50),
    PRIMARY KEY (TickerSymbol, Date),
    FOREIGN KEY (MarketPrice) REFERENCES MarketPriceRatio(MarketPrice)
);

CREATE TABLE Owns (
    SIN VARCHAR(20), 
    AcctID VARCHAR(20), 
    Password VARCHAR(50),
    PRIMARY KEY (SIN, AcctID),
    FOREIGN KEY (SIN) REFERENCES User(SIN),
    FOREIGN KEY (AcctID) REFERENCES Account(AccID)
);


CREATE TABLE Contains (
    AcctID VARCHAR(20),
    InvestmentID INT NOT NULL,
    PRIMARY KEY (InvestmentID),
    FOREIGN KEY (AcctID) REFERENCES Account(AccID), 
    FOREIGN KEY (InvestmentID) REFERENCES Investments(InvestmentID) ON DELETE CASCADE
);

CREATE TABLE Updates (
    InvestmentID INT,
    SIN VARCHAR(20),
    PRIMARY KEY (InvestmentID),
    FOREIGN KEY (InvestmentID) REFERENCES Investments(InvestmentID) ON DELETE CASCADE,
    FOREIGN KEY (SIN) REFERENCES User(SIN)
);


CREATE TABLE Fetches (
    AcctID VARCHAR(20),
    TickerSymbol VARCHAR(20),
    Date DATE,
    PRIMARY KEY (AcctID),
    UNIQUE (TickerSymbol, Date),
    FOREIGN KEY (AcctID) REFERENCES Account(AccID),
    FOREIGN KEY (TickerSymbol, Date) REFERENCES StockData(TickerSymbol, Date) ON DELETE CASCADE
);


CREATE TABLE Displays (
    TickerSymbol VARCHAR(20),
    Date DATE,
    InvestmentID INT NOT NULL,
    PRIMARY KEY (TickerSymbol, Date, InvestmentID),
    FOREIGN KEY (TickerSymbol, Date) REFERENCES StockData(TickerSymbol, Date),
    FOREIGN KEY (InvestmentID) REFERENCES Investments(InvestmentID)
);

-- Insert statements
INSERT INTO User (SIN, Name) 
VALUES ('123456789', 'John Smith'), 
               ('987654321', 'Alice Johnson'), 
               ('456789123', 'Michael Brown'), 
               ('789123456', 'Emily Davis'), 
               ('321654987', 'David Wilson');

INSERT INTO Account (AccID, Balance) 
VALUES ('123', 1000.50), 
               ('456', 2500.75), 
               ('789', 500.00), 
               ('012', 3500.25), 
               ('345', 200.00);

INSERT INTO Investments (InvestmentID, Industry, RiskLevel, Quantity) 
VALUES (1, 'Technology', 'High', 500), 
               (2, 'Healthcare', 'Medium', 300), 
               (3, 'Finance', 'Low', 700), 
               (4, 'Energy', 'High', 250), 
               (5, 'Consumer Goods', 'Medium', 400)

INSERT INTO CompanyDetails (Company, Industry)
VALUES 
    ('Apple Inc.', 'Technology'),
    ('Amazon.com Inc.', 'E-commerce'),
    ('Tesla Inc.', 'Automotive'),
    ('Johnson & Johnson', 'Healthcare'),
    ('Procter & Gamble Co.', 'Consumer Goods');

INSERT INTO CryptoDetails (Company, Industry) 
VALUES ('Bitcoin', 'Cryptocurrency'), 
               ('Ethereum', 'Cryptocurrency'), 
               ('Ripple', 'Cryptocurrency'), 
               ('Litecoin', 'Cryptocurrency'), 
               ('Cardano', 'Cryptocurrency');

INSERT INTO Stocks (InvestmentID, RiskLevel, Quantity, Company)
VALUES 
    ('34', 'Low', 50, 'Apple Inc.'),
    ('48', 'Medium', 20, 'Amazon.com Inc.'),
    ('54', 'High', 10, 'Tesla Inc.'),
    ('62', 'Low', 30, 'Johnson & Johnson'),
    ('71', 'Low', 25, 'Procter & Gamble Co.');

INSERT INTO Crypto (InvestmentID, CurrencyName, RiskLevel, Quantity) 
VALUES (1, 'Bitcoin', 'High', 2.5), 
               (2, 'Ethereum', 'Medium', 5.0), 
               (3, 'Cardano', 'Low', 10.0), 
               (4, 'Ripple', 'High', 3.8), 
               (5, 'Litecoin', 'Medium', 7.2);

INSERT INTO DependantRatio (PERatio, PEGRatio) 
VALUES (10.5, 1.2), 
               (15.2, 1.5), 
               (8.7, 0.9), 
               (20.3, 1.8), 
               (12.6, 1.3);

INSERT INTO MarketPriceRatio (MarketPrice, PERatio, PBRatio) 
VALUES ('High', 20.5, 2.1), 
               ('Medium', 15.3, 1.8), 
               ('Low', 10.7, 1.5), 
               ('Very High', 25.8, 2.5), 
               ('Very Low', 8.9, 1.2);

INSERT INTO StockData (TickerSymbol, Date, MarketPrice) 
VALUES ('AAPL', '2024-02-28', 'High'), 
               ('GOOGL', '2024-02-28', 'Medium'),
               ('MSFT', '2024-02-28', 'High'),
               ('AMZN', '2024-02-28', 'Very High'), 
               ('FB', '2024-02-28', 'Medium');

INSERT INTO Owns (SIN, AcctID, Password) 
VALUES ('123456789', '123', 'password123'), 
               ('987654321', '456', 'pass456'),    
               ('456789123', '789', 'secure789'), 
               ('789123456', '012', 'myacct012'),  
               ('321654987', '345', 'password345');

INSERT INTO Contains (AcctID, InvestmentID) 
VALUES ('123', 1), 
               ('123', 2), 
               ('456', 3),
               ('456', 4),                
               ('789', 5); 

INSERT INTO Updates (InvestmentID, SIN) 
VALUES (1, '123456789'), 
               (2, '987654321'),        
               (3, '456789123'), 
               (4, '789123456'),      
               (5, '321654987'); 

INSERT INTO Fetches (AcctID, TickerSymbol, Date) 
VALUES ('123', 'AAPL', '2024-02-28'),
               ('456', 'GOOGL', '2024-02-28'),
               ('789', 'MSFT', '2024-02-28'), 
               ('012', 'AMZN', '2024-02-28'), 
               ('345', 'FB', '2024-02-28');

INSERT INTO Displays (TickerSymbol, Date, InvestmentID) 
VALUES ('AAPL', '2024-02-28', 1), 
               ('GOOGL', '2024-02-28', 2), 
               ('MSFT', '2024-02-28', 3),  
               ('AMZN', '2024-02-28', 4), 
      	   ('FB', '2024-02-28', 5);  
