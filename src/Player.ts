import { Coin } from './Coin';
import { Upgrade } from './Upgrade';

export class Player {

    //The money the other AI currenctly has
    _aiMoney = 0;

    //The time that is left
    _time: number = 0;

    //The current money the player has
    _money: number = 0;

    //The cookies the player has
    _coin: Coin[] = [];

    //Upgrades of the player
    _upgrades: Upgrade[] = [];

    //Returns the money
    get money(): number {
        return this._money;
    }

    //Sets the money
    set money(increase: number) {
        this._money = increase;
    }

    //Returns the cookies
    get coins(): Coin[] {
        return this._coin;
    }

    //Returns the upgrades
    get upgrades(): Upgrade[] {
        return this._upgrades;
    }

    //Time the player has left
    get time(): number {
        return this._time;
    }

    //decreases the time left
    get decreaseTime(): number {
        return this._time--;
    }

    //Displays the time left
    get timeDisplay(): string {
        let minutes = Math.floor(this._time / 60);
        let seconds = this._time - minutes * 60;
        return minutes + " minutes " + seconds + " seconds";
    }

    //Returns the cookie
    public getCookie(name: string): Coin {
        for (let i = 0; i < this.coins.length; i++) {
            if (this.coins[i]._name === name) {
                return this.coins[i];
            }
        }
        return null;
    }

    //Returns the cookie
    public getUpgrade(name: string): Upgrade {
        for (let i = 0; i < this._upgrades.length; i++) {
            if (this._upgrades[i]._coin.name === name) {
                return this._upgrades[i];
            }
        }
        return null;
    }

    //Gives the AI money
    public giveAIMoney(): void {
        let random = Math.random() * 100;

        if (random < 100 && random >= 80) {
            this._aiMoney++;
        } else if (random < 80 && random >= 70) {
            this._aiMoney += 10;
        } else if (random > 60 && random < 70) {
            this._aiMoney -= 1;
        } else if (random > 55 && random < 60) {
            this._aiMoney -= 5;
        }
    }


}