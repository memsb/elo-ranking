# elo-ranking
A basic module to calculate the ELO rating of players based on a competition

## Usage
Once installed the rating calculation is performed by supplying the players current rating, opponents rating and result.
Examples results:
 - 0.0 is a total loss
 - 0.5 is a draw
 - 1.0 is a complete victory
 
```
let elo = require("elo");

let newRating = elo.getRating(0.8, 1000, 1000);         
```

## Tests
Dependencies are installed via 
```
npm install
```

Tests are run via 
```
npm test
```