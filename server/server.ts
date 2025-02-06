import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';

const app: Express = express();
const port = 3000;

const games = new Map<string, any>();

app.use(bodyParser.json());

app.get('/api/game/:id', (req: Request, res: Response) => {
    const gameId = req.params.id;

    const game = games.get(gameId) ?? {
        "players": [],
        "blocks": []
    }
    console.log('GET', gameId, game);

    res.status(200).json(game);
});

app.post('/api/game/:id', (req: Request, res: Response) => {
    const gameId = req.params.id;
    const gameData = req.body;

    console.log('POST', gameId, gameData);

    games.set(gameId, gameData);

    res.status(200).send();
});


// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
