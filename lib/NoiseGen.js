'use strict';

import NoiseTypes from './constants';
import NoiseFactory from './NoiseFactory';

const STOPPED = 0;
const PLAYING = 0;

class NoiseGen {

  constructor (ctx, noiseType=NoiseTypes.BROWN_NOISE) {

        this.processors = window.NoiseGenProcessors = window.NoiseGenProcessors || [];

        this.input  = ctx.createGain();
        this.output = ctx.createGain();

        this.__noiseType    = null;

        this.instanceCount  = 0;
        this.bufferSize     = 4096;
        this.audioProcessor = null;
        this.noise          = null;
        this.state          = this.STOPPED;
        this.timeout        = null;
        this.bufferTimeout  = 250;

        this.noiseType      = noiseType;

        this.__createInternalNodes(ctx);
        this.__routeNodes();
    }

    //Public Methods
    start () {
        if (this.state === STOPPED) {
            this.__clearProcessorTimeout();
            this.__setNoiseGenerator(this.noiseType);
            this.__createProcessorLoop();
            this.audioProcessor.connect(this.output);
            this.state = PLAYING;
        }
    }

    stop () {
        if (this.state === PLAYING) {
            this.__setNoiseGenerator(NoiseGen.SILENCE);
            this.__createProcessorTimeout();
            this.state = STOPPED;
        }
    }

    remove () {
       return this.__removeProcessor(this.audioProcessor);
    }

    connect (dest) {
        return this.output.connect(dest.input ? dest.input : dest);
    }

    disconnect () {
        return this.output.disconnect();
    }

    set noiseType (noiseType) {
        this.__noiseType = noiseType;
        this.__setNoiseGenerator();
    }

    get noiseType() {
        return this.__noiseType;
    }


    // Private methods
    __createInternalNodes (ctx) {
        this.audioProcessor = this.__storeProcessor(ctx.createScriptProcessor(this.bufferSize, 1, 2));
    }

    __routeNodes () {
        return this.input.connect(this.output);
    }

    // Create an array attached to the global obect.
    // The ScripProcessor must be added to the global object or it will
    // get get garbage collected to soon.
    __getProcessorIndex () {
        return window.NoiseGenProcessors;
    }

    // Store the processor node in the global processor array.
    __storeProcessor (node) {
        node.id = this.processors.length;
        this.processors[node.id] = node;

        return node;
    }

    // Remove the processor node from the global processor array.
    __removeProcessor (node) {
        delete this.processors[node.id];
        this.processors.splice(node.id, 1);

        return node;
    }

    __createProcessorLoop () {
        this.audioProcessor.onaudioprocess = (e)=> {
            var outBufferL = e.outputBuffer.getChannelData(0);
            var outBufferR = e.outputBuffer.getChannelData(1);
            var i = 0;
            while (i < this.bufferSize) {
                outBufferL[i] = this.noise.update();
                outBufferR[i] = this.noise.update();
                i++;
            }
        };
    }

    __setNoiseGenerator () {
        this.noise = NoiseFactory.create(this.noiseType);
    }

    // We create a small delay between the stop method call and the disconnect to
    // allow time for the audio buffer to fill will silence
    __createProcessorTimeout () {
        this.timeout = setTimeout(()=> {
            if (this.state === STOPPED) {
                this.audioProcessor.disconnect();
            }
        }, this.bufferTimeout);
    }

    __clearProcessorTimeout () {
        if (this.timeout !== null) {
            clearTimeout(this.timeout);
        }
    }
}

export {
    NoiseTypes,
    NoiseGen
};

export default NoiseGen;