import Noise from './Noise';

class BrownNoise extends Noise {
    constructor () {
        this.base = 0;
    }

    update () {
        var r = this.random() * 0.1;
        this.base += r;

        if (this.base < -1 || this.base > 1) {
            this.base -= r;
        }

        return this.base;
    }
}

export default BrownNoise;
