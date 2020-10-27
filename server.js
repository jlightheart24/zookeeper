const express = require('express');
const app = express();
const { animals } = require('./data/animals');

function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];
    let fileteredResults = animalsArray;
    if (query.personalityTraits) {
        if (typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits];
        } else {
            personalityTraitsArray = query.personalityTraits;
        }
        personalityTraitsArray.forEach(trait => {
            fileteredResults = fileteredResults.filter(
                animal => animal.personalityTraits.indexOf(trait) !== -1
            );
        });
    }
    if (query.diet) {
        fileteredResults = fileteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
        fileteredResults = fileteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
        fileteredResults = fileteredResults.filter(animal => animal.name === query.name);
    }
    //return the filtered results
    return fileteredResults;
}

app.get('/api/animals', (req,res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

app.listen(3001, () => {
    console.log(`API server now on port 3001`)
});