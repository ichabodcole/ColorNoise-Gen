import NoiseBase from './NoiseBase';

class WhiteNoise extends NoiseBase {
    constructor() {
        super();
    }

    update () {
        return this.random();
    }
}

export default WhiteNoise;
