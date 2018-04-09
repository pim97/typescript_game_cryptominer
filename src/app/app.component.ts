import { Component } from '@angular/core';
import { Coin } from '../Coin';
import { Player } from '../Player';
import { Upgrade } from '../Upgrade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public lineChartData:Array<any> = [
  ];
  public lineChartLabels:Array<any> = [];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';
 
  public updateGraph():void {
    var d = new Date();
    var curr_hour = d.getHours();
    var curr_min = d.getMinutes();
    var curr_sec = d.getSeconds();
    let data = Array<any>();

    for (let q = 0; q < this._player.coins.length; q++) {
        if (this._player.coins[q].linesGraph.length >= this.lineChartLabels.length) {
          this.lineChartLabels.push(curr_hour+":"+curr_min+":"+curr_sec);
        }
        data[q] = {data: this._player.coins[q].linesGraph, label: this._player.coins[q].name};
    }
    this.lineChartData = data;
  }
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

  protected _player: Player = new Player();

  // (alias) new Coin(id: number, player: Player, name: string, price: number, image: string, increase: number, rate: number, maxValue: number): Coi
  constructor() {
    this._player._time = 180;
    this._player._coin.push(new Coin(0, this._player, 'Bitcoin', 1, 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1510040391', 0.001, 1, 10000));
    this._player._coin.push(new Coin(1, this._player, 'IOTA', 1, 'https://files.coinmarketcap.com/static/img/coins/32x32/iota.png', 10, 1, 10));
    this._player._coin.push(new Coin(2, this._player, 'XVG', 1, 'https://files.coinmarketcap.com/static/img/coins/32x32/verge.png', 0.01, 1, 1));
    this._player._coin.push(new Coin(3, this._player, 'Facebook_coin', 0.01, 'http://www.usave.com/images/USA_facebook.png', 0.0001, 0.05, 0.1));
    
   
    // (alias) new Upgrade(upgradeName: string, player: Player, cost: number, perSecond: number, coin: Coin, image: string): Upgrade
    
    this._player._upgrades.push(new Upgrade("BTC Upgrade", this._player, 1, 0.01, this._player.getCookie("Bitcoin"), "https://www.cryptocompare.com/media/19633/btc.png?anchor=center&mode=crop&width=32&height=32"));
    this._player._upgrades.push(new Upgrade("IOTA Upgrade", this._player, 5, 1, this._player.getCookie("IOTA"), "https://files.coinmarketcap.com/static/img/coins/32x32/iota.png"));
    this._player._upgrades.push(new Upgrade("Verge Upgrade", this._player, 20, 5, this._player.getCookie("XVG"), "https://files.coinmarketcap.com/static/img/coins/32x32/verge.png"));
    this._player._upgrades.push(new Upgrade("Facebook Upgrade", this._player, 20, 5, this._player.getCookie("Facebook_coin"), "http://www.usave.com/images/USA_facebook.png"));
    this._player._upgrades.push(new Upgrade("Buy BMW (BTC upgrade)", this._player, 20000, 1, this._player.getCookie("Bitcoin"), "http://cartechnology.co.uk/images/icons/BMW.png"));
    
    //
    for (let i = 0; i < this._player.coins.length; i++) {
      this.lineChartData.push(null);
    }
    
    this.loop();
  }

  get player():Player {
    return this._player;
  }

  private _tick = 0;

  public loop = (): void => {
    this._tick++;
    this._player.giveAIMoney();

    if (this._tick == 60) {
        if (this._player._time <= 0) {
            if (this._player._aiMoney >= this._player._money) {
                window.alert("You've lost the game, try again!");
            } else {
                window.alert("You've won the game, good job!");
            }
            window.location.reload();
        }
        this._player.decreaseTime;

        for (let i = 0; i < this._player.coins.length; i++) {
            this._player.coins[i].rateObject.calculateRate();
            this.updateGraph();
        }
        for (let i = 0; i < this._player.upgrades.length; i++) {
            let increase = this._player.upgrades[i].perSecond;

            this._player.upgrades[i].coin._amount += increase;
            this._tick = 0;
        }
    }
    
    requestAnimationFrame(this.loop);
  }

}

