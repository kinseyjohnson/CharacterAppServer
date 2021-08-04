const router = require('express').Router();

const {CharacterModel} = require('../models');

let validateJWT = require("../middleware/validate-session");


router.get('/create', async (req, res) => {
    let heroesnames = require('./heroesnames.json');
    res.status(200).json({
        json: heroesnames
    })
})


router.post('/create', validateJWT, async (req, res) => {
    const {characterName, playerName, characterClass, level, race, background, alignment, strength, dexterity, constitution, intelligence, wisdom, charisma} = req.body.character;
    const {username} = req.user
    const characterEntry = {
        characterName,
        playerName,
        characterClass,
        level,
        race,
        background,
        alignment,
        strength,
        dexterity,
        constitution,
        intelligence,
        wisdom,
        charisma,
        owner: username
    }
    try {
        const newCharacter = await CharacterModel.create(characterEntry)
        res.status(200).json(newCharacter);
    } catch (err) {
        res.status(500).json({error: err});
    }
})

router.get('/findAll', validateJWT, async (req, res) => {
    try {
        const allCharacters = await CharacterModel.findAll();
        res.status(200).json(allCharacters);
    } catch (err) {
        res.status(500).json({
            error: err,
        })
    }
})


router.get('/:username', validateJWT, async (req, res) => {
    const username = req.user.username
    try {
        const query = {
            where: {
                owner: username
            }
        };
        
        const userCharacters = await CharacterModel.findAll(query);
        res.status(200).json(userCharacters);
    } catch (err) {
        res.status(500).json({
            error: err
        })
    }
})


router.delete('/delete/:id', validateJWT, async (req, res) => {
    const username = req.user.username;
    const characterId = req.params.id;

    try {
        const query = {
            where: {
                id: characterId,
                owner: username
            }
        };

        await CharacterModel.destroy(query);
        res.status(200).json({
            message: "Character successfully retired"
        });
    } catch (err) {
        res.status(500).json({error: err})
    }
})

router.put('/edit/:id', validateJWT, async (req, res) => {
    const {characterName, playerName, characterClass, level, race, background, alignment, strength, dexterity, constitution, intelligence, wisdom, charisma} = req.body.character;
    const characterId = req.params.id;
    const username = req.user.username;
    
    try {
        await CharacterModel.update({
            characterName, playerName, characterClass, level, race, background, alignment, strength, dexterity, constitution, intelligence, wisdom, charisma},
            {where: {id: characterId, owner: username}, returning: true}
        ).then((result) => {
            res.status(200).json({
                message: "Character successfully updated",
                updatedCharacter: result,
            });
        });
    } catch (err) {
        res.status(500).json({
            message: `Failed to update character ${err}`
        })
    }
})

// router.put('/edit/:id', validateJWT, async (req, res) => {
//     const {characterName, playerName, characterClass, level, race, background, alignment, strength, dexterity, constitution, intelligence, wisdom, charisma} = req.body.character;
//     const characterId = req.params.id;
//     const username = req.user.username;

//     const query = {
//         where: {
//             id: characterId,
//             owner: username
//         }
//     };

//     const updatedCharacter = {
//         characterName: characterName,
//         playerName: playerName,
//         characterClass: characterClass,
//         level: level,
//         race: race,
//         background: background,
//         alignment: alignment,
//         strength: strength,
//         dexterity: dexterity,
//         constitution: constitution,
//         intelligence: intelligence,
//         wisdom: wisdom,
//         charisma: charisma,
//     };

//     try {
//         const update = await CharacterModel.update(updatedCharacter, query);
//         res.status(200).json({
//             message: 'Character updated successfully',
//             updatedCharacter
//         });
//     } catch (err) {
//         res.status(500).json({error: err});
//     }
// });

module.exports = router;