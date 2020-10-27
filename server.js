const express = require('express');
const PORT = process.env.PORT || 3001;
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
};

function findById(id, animalsArray) {
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result
};

app.get('/api/animals', (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

app.get('/api/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
        if (result) {
            res.json(result);
        } else {
            res.send(404);
        }
});

app.listen(PORT, () => {
    console.log(`API server now on port ${{PORT}}`)
});