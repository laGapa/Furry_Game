export class Coin {
    constructor() {
        //Pomijamy startową pozycję Furusia
        let x = Math.floor(Math.random() * 10);
        let y = Math.floor(Math.random() * 10);
        while (x === 0 && y === 0) {
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);
        }
        this.x = x;
        this.y = y;
    }
}
