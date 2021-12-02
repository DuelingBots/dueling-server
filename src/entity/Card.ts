
export default class Card {
    
    private static cards: Card[] = [];
    
    private constructor(
        public name: string,
        public id: number,
        public onRun: (player_a_health: number,
                       player_b_health: number,
                       player_playing: "a" | "b",
                       player_a_shield_percentage: number,
                       player_b_shield_percentage: number) => {},
    ) {
        Card.cards.push(this);
    }
    
    private static getCard(name: string): Card | undefined {
        return Card.cards.find(card => card.name === name);
    }
    
    private static rand(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    public static card_0 = new Card(
        "Dummy Card",
        0,
        (player_a_health, player_b_health, player_playing) => {
            if (player_playing === "a") {
                return {
                    player_a_health: player_a_health + 1,
                    player_b_health: player_b_health,
                };
            } else {
                return {
                    player_a_health: player_a_health,
                    player_b_health: player_b_health + 1,
                };
            }
        },
    );
    
    private static card_1_natures_gift = new Card(
        "Nature's Gift",
        1,
        (player_a_health, player_b_health, player_playing) => {
            if (player_playing === "a") {
                return {
                    player_a_health: Math.min(player_a_health + Card.rand(300, 500), 850),
                    player_b_health: player_b_health,
                };
            } else {
                return {
                    player_a_health: player_a_health,
                    player_b_health: Math.min(player_b_health + Card.rand(300, 500), 850),
                };
            }
        },
    );
    
    private static card_2_chronicles_of_hp_i = new Card(
        "Chronicles of HP I",
        2,
        (player_a_health, player_b_health, player_playing) => {
            if (player_playing === "a") {
                return {
                    player_a_health: Math.min(player_a_health + 50, 850),
                    player_b_health: player_b_health,
                };
            } else {
                return {
                    player_a_health: player_a_health,
                    player_b_health: Math.min(player_b_health + 50, 850),
                };
            }
        },
    );
    
    private static card_3_chronicles_of_hp_ii = new Card(
        "Chronicles of HP II",
        3,
        (player_a_health, player_b_health, player_playing) => {
            if (player_playing === "a") {
                return {
                    player_a_health: Math.min(player_a_health + 60, 850),
                    player_b_health: player_b_health,
                };
            } else {
                return {
                    player_a_health: player_a_health,
                    player_b_health: Math.min(player_b_health + 60, 850),
                };
            }
        },
    );
    
    private static card_4_chronicles_of_hp_iii = new Card(
        "Chronicles of HP III",
        4,
        (player_a_health, player_b_health, player_playing) => {
            if (player_playing === "a") {
                return {
                    player_a_health: Math.min(player_a_health + 75, 850),
                    player_b_health: player_b_health,
                };
            } else {
                return {
                    player_a_health: player_a_health,
                    player_b_health: Math.min(player_b_health + 75, 850),
                };
            }
        },
    );
    
    private static card_5_chronicles_of_hp_iv = new Card(
        "Chronicles of HP IV",
        5,
        (player_a_health, player_b_health, player_playing) => {
            if (player_playing === "a") {
                return {
                    player_a_health: Math.min(player_a_health + 95, 850),
                    player_b_health: player_b_health,
                };
            } else {
                return {
                    player_a_health: player_a_health,
                    player_b_health: Math.min(player_b_health + 95, 850),
                };
            }
        },
    );
    
    private static card_6_shield_of_var_i = new Card(
        "Shield of Var I",
        6,
        (player_a_health, player_b_health, player_playing) => {
            if (player_playing === "a") {
                return {
                    player_a_shield_percentage: 20,
                };
            } else {
                return {
                    player_b_shield_percentage: 20,
                };
            }
        },
    );
    
    private static card_7_shield_of_var_ii = new Card(
        "Shield of Var II",
        7,
        (player_a_health, player_b_health, player_playing) => {
            if (player_playing === "a") {
                return {
                    player_a_shield_percentage: 30,
                };
            } else {
                return {
                    player_b_shield_percentage: 30,
                };
            }
        },
    );
    
    private static card_8_shield_of_var_iii = new Card(
        "Shield of Var III",
        8,
        (player_a_health, player_b_health, player_playing) => {
            if (player_playing === "a") {
                return {
                    player_a_shield_percentage: 45,
                };
            } else {
                return {
                    player_b_shield_percentage: 45,
                };
            }
        },
    );
    
    private static card_9_shield_of_var_iv = new Card(
        "Shield of Var IV",
        9,
        (player_a_health, player_b_health, player_playing) => {
            if (player_playing === "a") {
                return {
                    player_a_shield_percentage: 75,
                };
            } else {
                return {
                    player_b_shield_percentage: 75,
                };
            }
        },
    );
    
    private static card_10_shield_of_lava = new Card(
        "Shield of Lava",
        10,
        (player_a_health, player_b_health, player_playing) => {
            if (player_playing === "a") {
                return {
                    player_a_shield_percentage: 100,
                };
            } else {
                return {
                    player_b_shield_percentage: 100,
                };
            }
        },
    );
    
    private static card_11_thug_worm_i = new Card(
        "Thug Worm I",
        11,
        (player_a_health, player_b_health, player_playing, player_a_shield_percentage, player_b_shield_percentage) => {
            if (player_playing === "a") {
                return {
                    player_b_health: player_b_health - (250 * (1 - player_b_shield_percentage / 100)),
                };
            } else {
                return {
                    player_a_health: player_a_health - (250 * (1 - player_a_shield_percentage / 100)),
                };
            }
        },
    );
    
    private static card_12_thug_worm_ii = new Card(
        "Thug Worm II",
        12,
        (player_a_health, player_b_health, player_playing, player_a_shield_percentage, player_b_shield_percentage) => {
            if (player_playing === "a") {
                return {
                    player_b_health: player_b_health - (300 * (1 - player_b_shield_percentage / 100)),
                };
            } else {
                return {
                    player_a_health: player_a_health - (300 * (1 - player_a_shield_percentage / 100)),
                };
            }
        },
    );
    
    private static card_13_thug_worm_iii = new Card(
        "Thug Worm III",
        13,
        (player_a_health, player_b_health, player_playing, player_a_shield_percentage, player_b_shield_percentage) => {
            if (player_playing === "a") {
                return {
                    player_b_health: player_b_health - (330 * (1 - player_b_shield_percentage / 100)),
                };
            } else {
                return {
                    player_a_health: player_a_health - (330 * (1 - player_a_shield_percentage / 100)),
                };
            }
        },
    );
    
    private static card_14_frozen_waterfall_i = new Card(
        "Frozen Waterfall I",
        14,
        (player_a_health, player_b_health, player_playing, player_a_shield_percentage, player_b_shield_percentage) => {
            if (player_playing === "a") {
                return {
                    player_a_health: player_b_health - (80 * (1 - player_a_shield_percentage / 100)),
                };
            } else {
                return {
                    player_b_health: player_a_health - (80 * (1 - player_b_shield_percentage / 100)),
                };
            }
        },
    );
    
    private static card_15_frozen_waterfall_ii = new Card(
        "Frozen Waterfall II",
        15,
        (player_a_health, player_b_health, player_playing, player_a_shield_percentage, player_b_shield_percentage) => {
            if (player_playing === "a") {
                return {
                    player_a_health: player_b_health - (100 * (1 - player_a_shield_percentage / 100)),
                };
            } else {
                return {
                    player_b_health: player_a_health - (100 * (1 - player_b_shield_percentage / 100)),
                };
            }
        },
    );
    
    /**
     * Get a specific card by its id.
     * 
     * @param card_id {number} The ID of the card to be played.
     */
    public static getCardByID(card_id: number): Card | undefined {
        switch (card_id) {
            case 1:
                return Card.card_1_natures_gift;
            case 2:
                return Card.card_2_chronicles_of_hp_i;
            case 3:
                return Card.card_3_chronicles_of_hp_ii;
            case 4:
                return Card.card_4_chronicles_of_hp_iii;
            case 5:
                return Card.card_5_chronicles_of_hp_iv;
            case 6:
                return Card.card_6_shield_of_var_i;
            case 7:
                return Card.card_7_shield_of_var_ii;
            case 8:
                return Card.card_8_shield_of_var_iii;
            case 9:
                return Card.card_9_shield_of_var_iv;
            case 10:
                return Card.card_10_shield_of_lava;
            case 11:
                return Card.card_11_thug_worm_i;
            case 12:
                return Card.card_12_thug_worm_ii;
            case 13:
                return Card.card_13_thug_worm_iii;
            case 14:
                return Card.card_14_frozen_waterfall_i;
            case 15:
                return Card.card_15_frozen_waterfall_ii;
                
            default:
                return undefined;
        }
    }
    
}
