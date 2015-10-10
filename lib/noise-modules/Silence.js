import NoiseBase from './NoiseBase';

class Silence extends NoiseBase {
    constructor() {
        super();
    }

    update () {
        return 0;
    }
}

export default Silence;
