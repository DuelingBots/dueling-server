import GameServer from "./GameServer";
import WebSocket from "ws";
import * as http from "http";
import Game from "./entity/Game";
import Card from "./entity/Card";

export default class WSCommander {
    
    private server: GameServer;
    
    public constructor() {
        this.server = new GameServer();
    }
    
    private static handToJSON(hand: Card[]): any {
        let json: any = {};
        for (let i = 0; i < hand.length; i++) {
            json[i] = hand[i].id;
        }
        return json;
    }
    
    private static generateRandomHand(): Card[] {
        let hand: Card[] = [];
        for (let i = 0; i < 5; i++) {
            hand.push(Card.getCardByID(Math.floor(Math.random() * 15) + 1) || Card.card_0);
        }
        return hand;
    }
    
    public onConnection(ws: WebSocket, request: http.IncomingMessage) {
        
        let is_in_game = false;
        let player: "a" | "b" = "a";
        
        let game: Game;
        
        let game_history: string[] = [];
        
        let hand: Card[] = [];
        
        //populate the hand of the player since this is the first time they are connected
        hand = WSCommander.generateRandomHand();
        
        function botRunner(hand: Card[]) {
            if(game.player_b_health <= 0) { //player b is dead
                is_in_game = false; //make sure the game actually ends
                ws.send(JSON.stringify({
                    event_type: "game_over",
                    winner: "a",
                    history: game_history,
                }));
                
                //don't kill the socket until it 100% received the game over message
                setTimeout(() => {
                    ws.close();
                }, 1000);
                return;
            } else if(game.player_a_health <= 0) { //player a is dead
                is_in_game = false; //make sure the game actually ends
                ws.send(JSON.stringify({
                    event_type: "game_over",
                    winner: "b",
                    history: game_history,
                }));
                
                //don't kill the socket until it 100% received the game over message
                setTimeout(() => {
                    ws.close();
                }, 1000);
                return;
            }
            
            let card_to_play = hand[Math.floor(Math.random() * hand.length)];
            game.playCard(card_to_play, "bot");
            
            ws.send(JSON.stringify({
                type: "opponent_play",
                card: card_to_play.id,
            }));
            
            game_history.push(`\nOpponent played ${card_to_play.name}`);
            
            ws.send(JSON.stringify({
                event_type: "turn_start",
                player_a_health: game.getPlayerAHealth(),
                player_b_health: game.getPlayerBHealth(),
                cards: WSCommander.generateRandomHand(),
            }));
            
            game_history.push(`You now have ${game.getPlayerAHealth()} health and your opponent now has ${game.getPlayerBHealth()} health`);
            
        }
        
        ws.on("message", (raw_data) => {
            
            try {
                
                const data = JSON.parse(raw_data.toString());
                console.log(JSON.stringify(data));
                
                switch(data.event_type) {
                    case "play": {
                        is_in_game = true;
                        game = new Game(ws, "bot");
                        ws.send(JSON.stringify({
                            event_type: "turn_start",
                            player_a_health: game.getPlayerAHealth(),
                            player_b_health: game.getPlayerBHealth(),
                            cards: WSCommander.generateRandomHand(),
                        }));
                        return GameServer.games.push(game);
                    }
                    
                    case "CardPlayEvent": {
                        if(!is_in_game)
                            return;
                        
                        const card_id = data.card_id;
                        
                        const card = Card.getCardByID(card_id);
                        
                        if(!card)
                            return ws.send(JSON.stringify({
                                event_type: "error",
                                message: "Card not found"
                            }));
                        
                        if(!game)
                            return ws.send(JSON.stringify({
                                event_type: "error",
                                message: "Game not found"
                            }));
                        
                        game.playCard(card, ws);
                        game_history.push(`You played ${card.name}`);
                        
                        hand = WSCommander.generateRandomHand();
                        game_history.push(`You received new hand: ${hand.map(c => c.name).join(", ")}`);
                        
                        ws.send(JSON.stringify({
                            event_type: "card_played_success",
                            player_a_health: game.getPlayerAHealth(),
                            player_b_health: game.getPlayerBHealth(),
                            cards: WSCommander.handToJSON(hand),
                        }));
                        
                        botRunner(WSCommander.generateRandomHand());
                    }
                }
                
            } catch(e) {
                console.error(e);
                ws.send(JSON.stringify({
                    "event_type": "error",
                    "message": "bad data sent",
                }));
            }
            
        });
    }
    
}
