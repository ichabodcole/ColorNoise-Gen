import Noise from './Noise';

class PinkNoise extends Noise {

    constructor () {
        this.alpha = 1;
        this.poles = 5;
        this.multipliers = this.__zeroFill([], this.poles);
        this.values      = this.__zeroFill([], this.poles);
        this.__fillArrays();
    }

    update () {
        var x = this.random() * 1;

        for (var i=0; i < this.poles; i++) {
            x -= this.multipliers[i] * this.values[i];

            this.values.unshift(x);
            this.values.pop();
        }
        return x * 0.5;
    }

    __fillArrays () {
        var a = 1;
        for (var i=0; i < this.poles; i++) {
            a = (i - this.alpha / 2) * a / (i+1);
            this.multipliers[i] = a;
        }

        for (var j=0; j < (this.poles * 5); j++) {
            this.update();
        }
    }

    __zeroFill (myArray, fillSize) {
        for (var i=0; i < fillSize; i++) {
            myArray[i] = 0;
        }
    }
}

export default PinkNoise;
