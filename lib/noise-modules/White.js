import Noise from './Noise';

class WhiteNoise extends Noise {
    update () {
        return this.random();
    }
}

export default WhiteNoise;
