import { NoiseTypes } from './constants';

import Silence from './noise-modules/Silence';
import WhiteNoise from './noise-modules/White';
import BrownNoise from './noise-modules/Brown';
import PinkNoise from './noise-modules/Pink';

// Noise Factory returns a the given type of noise generator.
var NoiseFactory  = {
    create: function (type) {
        var noise;

        switch (type) {
            case NoiseTypes.WHITE_NOISE:
                noise = new WhiteNoise();
                break;

            case NoiseTypes.PINK_NOISE:
                noise = new PinkNoise();
                break;

            case NoiseTypes.BROWN_NOISE:
                noise = new BrownNoise();
                break;

            case NoiseTypes.SILENCE:
                noise = new Silence();
                break;

            default:
                noise = new BrownNoise();
        }

        return noise;
    }
};

export default NoiseFactory;
