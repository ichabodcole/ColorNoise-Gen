//Abstract NoiseBase Class
class NoiseBase {
    constructor() {
        // if (new.target === NoiseBase) {
        //     throw new TypeError('Cannot construct Abstract NoiseBase instances directly');
        // }

        if (this.update === void 0) {
            throw new TypeError('NoiseBase child instances must override update method');
        }
    }

    random () {
        return Math.random() * 2 - 1;
    }
}

export default NoiseBase;
