import { Coin } from './Coin';
import { Player } from './Player';

export class Upgrade {

    //The player that is upgrading
    _player: Player;

    //The cost of the upgrade
    _cost: number;

    //Upgrade name
    _upgradeName: string;

    //The amount of coin generated per second
    _perSecond: number;

    //The coin it referrs to
    _coin: Coin;

    //The amount of upgrades the player has
    _amount: number = 0;

    //Image of the upgrade
    _image: string;

    constructor(upgradeName: string, player: Player, cost: number, perSecond: number, coin: Coin, image: string) {
        this._upgradeName = upgradeName;
        this._player = player;
        this._cost = cost;
        this._perSecond = perSecond;
        this._coin = coin;
        this._image = image;
    }

    //Buys the upgrade
    public buy(buyAmount: number) {
        console.log("Performing buy action");

        let moneyPlayerHas = this._player._money;
        let costUpgrade = this._cost * buyAmount;

        if (moneyPlayerHas > costUpgrade) {
            let alert = document.getElementById("alert");
            if (alert != null) {
                alert.style.visibility = "initial";
                alert.innerHTML = "<strong>Success!</strong> You've bought a ";
                alert.innerHTML += this.upgradeName;

                setTimeout(function () {
                    alert.style.visibility = "hidden";
                }.bind(this), 2000);
            }
            this._player.money -= costUpgrade;
            this._amount += buyAmount;
        }
    }

    get coin(): Coin {
        return this._coin;
    }

    get perSecond(): number {
        return this._perSecond * this._amount;
    }

    get upgradeName(): string {
        return this._upgradeName;
    }

    get amount(): number {
        return this._amount;
    }

    get image(): string {
        return this._image;
    }
}