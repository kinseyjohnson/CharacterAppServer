const router = require('express').Router();
const validateJWT = require('../middleware/validate-session');
const {CharacterModel} = require('../models');


router.post('/create', validateJWT, async (req, res) => {
    const {characterName, playerName, characterClass, level, race, background, alignment, strength, dexterity, constitution, intelligence, wisdom, charisma} = req.body.character;
    const {id} = req.user
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
        user: id
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

router.delete('/delete/:id', validateJWT, async (req, res) => {
    const userId = req.user.id;
    const characterId = req.params.id;
    const userName = req.user.firstName

    try {
        await CharacterModel.destroy({
            where: {
                id: characterId,
                user: userId
            },
        }).then(data => {
            return data > 0 ?
            res.send("Character successfully retired.")
            : res.send(`Character not owned by ${userName}`)
        });
    } catch (err) {
        res.status(500).json({
            message: `Failed to retire character: ${err}`
        })
    }
})


router.put('/edit/:id', validateJWT, async (req, res) => {
    const characterId = req.params.id;
    const userId = req.user.id;
    const userName = req.user.firstName
    const {
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
        charisma
    } = req.body.character;
    try {
        CharacterModel.update({
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
                charisma
            }, {
                where: {
                    id: characterId,
                    user: userId
                }
            }).then(
                data => {
                    return data > 0 ?
                        res.send("Character updated!") :
                        res.send(`Character not owned by ${userName}`)
                }),
            err => res.send(500, err.message)
    } catch (err) {}
});

module.exports = router;