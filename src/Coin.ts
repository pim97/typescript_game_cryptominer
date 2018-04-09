import { Player } from './Player';
import { Rate } from './Rate';
import { GraphsComponent } from './app/graphs/graphs.component';

export class Coin {
    
    //De prijs van een cookie
    _price: number;

    //De naam van een cookie
    _name: string;

    //Het plaatje van de cookie
    _image: string;

    //De hoeveelheid cookies van dit cookie
    _amount:number = 0;

    //Increasing per mine
    _increase:number = 0;

    //The player that is playing
    _player:Player;

    //The percentage it is increasing each click
    _percentIncrease:number = 0.01;

    //Current rate of currency
    _rate:Rate;

    //The lines for the graph
    _lines:Array<any> = new Array<any>();

    //Id of coin
    _id:number;

    constructor(id:number, player:Player, name:string, price:number, image:string, increase:number, rate:number, maxValue:number) {
        this._id = id;
        this._price = price;
        this._name = name;
        this._image = image;
        this._increase = increase;
        this._player = player;
        this._rate = new Rate(rate, maxValue, this, player);
    }

    //mining a coin
    public mine():void {
        this._amount += this._increase;
        this._increase += this._percentIncrease;

        let miningImage = document.getElementById(this._name);

        if (miningImage != null) {
            if (!miningImage.classList.contains("hidden")) {
                miningImage.style.visibility = "initial";
                miningImage.classList.add("animation");

                setTimeout(function() {
                    miningImage.classList.remove("animation");
                    miningImage.style.visibility = "hidden";
                }.bind(this), 2000);
            }
        } else {
            console.log("Could not find image");
        }
        console.log("called");
    }
    
    //selling a coin
    public sell(amount:number):void {
        if (amount <= 0) {
            return;
        }
        if (this._amount >= amount) {
            this._amount -= amount;
            let increaseValue = (Number.parseFloat(amount.toString()) * this._rate.price);
            this._player.money += increaseValue;
        }
    }

    //buying a coin
    public buy(amount:number):void {
        if (amount <= 0) {
            return;
        }
        let cost = amount * this._price;

        if (cost > this._player.money) {
            return;
        }
        this._player.money -= cost;
        let increaseAmount = cost / (Number.parseFloat(this._rate.price.toString()));
        this._amount += increaseAmount;
    }

    //getter of name
    get name():string {
        return this._name;
    }    

    //getter of amount
    get amount():number {
        return this._amount;
    }

    get image():string {
        return this._image;
    }

    get rate():number {
        return this._rate.price;
    }

    get rateObject():Rate {
        return this._rate;
    }

    get linesGraph():Array<number> {
        return this._lines;
    }

    get increase():number {
        return this._increase;
    }

}