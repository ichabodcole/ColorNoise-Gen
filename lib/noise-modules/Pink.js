import NoiseBase from './NoiseBase';

class PinkNoise extends NoiseBase {

    constructor () {
        super();
        this.alpha = 1;
        this.poles = 5;
        this.multipliers = this.__zeroFill([], this.poles);
        this.values      = this.__zeroFill([], this.poles);
        this.__fillArrays();
    }

    update () {
        var x = this.random() * 1;

        for (var i = 0; i < this.poles; i++) {
            x -= this.multipliers[i] * this.values[i];

            this.values.unshift(x);
            this.values.pop();
        }
        return x * 0.5;
    }

    __fillArrays () {
        var a = 1;
        for (var i = 0; i < this.poles; i++) {
            a = (i - this.alpha / 2) * a / (i + 1);
            this.multipliers[i] = a;
        }

        for (var j = 0; j < (this.poles * 5); j++) {
            this.update();
        }
    }

    __zeroFill (array, fillSize) {
        for (var i = 0; i < fillSize; i++) {
            array[i] = 0;
        }
        return array;
    }
}

export default PinkNoise;
