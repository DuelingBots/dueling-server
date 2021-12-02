import WebSocket from "ws";
import Card from "./Card";


export default class Game {
    
    public player_a_health: number = 850;
    public player_b_health: number = 850;
    
    public player_a_shield_percentage: number = 0;
    public player_b_shield_percentage: number = 0;
    
    constructor(
        public playerA: WebSocket,
        public playerB: WebSocket | "bot",
    ) {}

    /**
     * Get the health of the player A.
     * @returns {number}
     */
    public getPlayerAHealth(): number {
        return this.player_a_health;
    }
    
    /**
     * Get the health of player B.
     * @returns {number}
     */
    public getPlayerBHealth(): number {
        return this.player_b_health;
    }
    
    /**
     * Play a card
     * @param card {Card} the card to be played
     * @param player {WebSocket} the player who is playing the card
     * @returns {void}
     */
    public playCard(card: Card, player: WebSocket | "bot"): "player_a" | "player_b" | "continued" {
        const data: any = card.onRun(
            this.player_a_health,
            this.player_b_health,
            player === "bot" ? "b" : "a",
            this.player_a_shield_percentage,
            this.player_b_shield_percentage);
        console.log(`data: ${JSON.stringify(data)}`);
        if(data.player_a_health) {
            this.player_a_health = data.player_a_health;
            this.player_a_shield_percentage = 0;
        }
        if(data.player_b_health) {
            this.player_b_health = data.player_b_health;
            this.player_b_shield_percentage = 0;
        }
        if(data.player_a_shield_percentage)
            this.player_a_shield_percentage = data.player_a_shield_percentage;
        if(data.player_b_shield_percentage)
            this.player_b_shield_percentage = data.player_b_shield_percentage;
        
        //game end state checking
        if(this.player_b_health <= 0) {
            return "player_a";
        } else if(this.player_a_health <= 0) {
            return "player_b";
        } else {
            return "continued";
        }
    }
    
}
