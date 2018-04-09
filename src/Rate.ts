import { Coin } from './Coin';
import { Player } from './Player';

export class Rate {

    //The coin we're talking about
    private _coin: Coin;

    //The player that owns the coin
    private _player: Player;

    //The price of the coin
    private _price: number;

    //The percentage the coin will either increase or decrease
    private _percentage: number = 0;

    //The maximum value of a coin
    private _maxValue: number;

    constructor(price: number, maxValue: number, coin: Coin, player: Player) {
        this._coin = coin;
        this._price = price;
        this._maxValue = maxValue;
        this._player = player;
    }

    public calculateRate() {
        let newValue = this._price * this._percentage;
        let volatility = Math.random() * 2;
        let rnd = Math.random() * (Math.random() * 2);
        let old_price = this._price;

        let change_percent = 2 * volatility * rnd;
        if (change_percent > volatility)
            change_percent -= (2 * volatility);
        let change_amount = old_price * change_percent;
        newValue = old_price + change_amount;

        if (this._price == 0) {
            this._price = 1;
        }
        if (newValue >= 0 && newValue < this._maxValue && newValue >= 0) {
            this._price = newValue;
            this._coin.linesGraph.push(this._price);
        } else if (newValue > this._maxValue) {
            this._coin.linesGraph.push(this._maxValue);
        } else if (newValue < 0) {
            this._coin.linesGraph.push(0);
        }
    }

    get price(): number {
        return this._price;
    }

    private randomIntFromInterval(min, max) {
        return Math.random() * (max - min + 1) + min
    }


}