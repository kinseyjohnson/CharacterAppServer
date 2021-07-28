const router = require('express').Router();

const {CharacterModel} = require('../models');


router.post('/create', /*validation,*/ async (req, res) => {
    const {characterName, playerName, characterClass, level, race, background, alignment, strength, dexterity, constitution, intelligence, wisdom, charisma} = req.body.character;
    // const {id} = req.user
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
        // owner: id
    }
    try {
        const newCharacter = await CharacterModel.create(characterEntry)
        res.status(200).json(newCharacter);
    } catch (err) {
        res.status(500).json({error: err});
    }
    // CharacterModel.create(characterEntry)
})

router.get('/findAll', async (req, res) => {
    try {
        const allCharacters = await CharacterModel.findAll();
        res.status(200).json(allCharacters);
    } catch (err) {
        res.status(500).json({
            error: err,
        })
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        await CharacterModel.destroy({
            where: {
                id: req.params.id
            },
        }).then((result) => {
            res.status(200).json({
                message: 'Character sucessfully retired',
                deletedCharacter: result,
            });
        });
    } catch (err) {
        res.status(500).json({
            message: `Failed to retire character: ${err}`
        })
    }
})

module.exports = router;