const router = require('express').Router();
const validateJWT = require('../middleware/validate-session');
const {CharacterModel} = require('../models');



router.get('/create', async (req, res) => {
    let heroesnames = require('./heroesnames.json');
    res.status(200).json({
        json: heroesnames
    })
})


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
        owner: id
    }
    try {
        const newCharacter = await CharacterModel.create(characterEntry)
        res.status(200).json(newCharacter);
    } catch (err) {
        res.status(500).json({error: err});
    }
    // CharacterModel.create(characterEntry)
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
router.get('/:id', validateJWT, async(req, res) => {
    let userId = req.params.id;
    console.log(userId, "++++++++++++++++++++++++++++++++++++++++++++++++++")
    try{
        const userCharacter = await CharacterModel.findAll({
            where: {
                id: userId
            }
        });
        res.status(200).json(userCharacter);
    } catch (err) {
        res.status(500).json({error: err}); //NEED HELP, NOT RETURNING MESSAGE, GET EMPTY ARRAY IN POSTMAN
    }
});

router.delete('/delete/:id', validateJWT, async (req, res) => {
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

    const query = {
        where: {
            id: characterId,
            owner: userId
        }
    };

    const updatedCharacter = {
        characterName: characterName,
        playerName: playerName,
        characterClass: characterClass,
        level: level,
        race: race,
        background: background,
        alignment: alignment,
        strength: strength,
        dexterity: dexterity,
        constitution: constitution,
        intelligence: intelligence,
        wisdom: wisdom,
        charisma: charisma,
    };

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