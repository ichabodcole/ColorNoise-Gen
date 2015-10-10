import { NoiseTypes, ColorNoiseGen } from '../lib/ColorNoiseGen';

describe("ColorNoiseGen", function() {
    var ctx, noiseGen, gainNode;

    beforeAll(function() {
        ctx = allen.getAudioContext();
        gainNode = ctx.createGain();
    });

    beforeEach(function() {
        window.ColorNoiseGenProcessors = null;
        noiseGen = new ColorNoiseGen(ctx);
    });

    it('should be defined', function() {
        expect(ColorNoiseGen).toBeDefined();
    });

    describe('constructor', function() {

        it("should be an instance of NoiseGen", function() {
            expect(noiseGen instanceof ColorNoiseGen).toBe(true);
        });

        it('should increate the global ColorNoiseGenProcessors by 1', function() {
            var processorCount;

            noiseGen.__getProcessorIndex();
            processorCount = window.ColorNoiseGenProcessors.length;
            expect(processorCount).toEqual(1);
        });
    });

    describe('properties', function() {
        it('should have an input property of type AudioNode', function() {
            expect(allen.isAudioNode(noiseGen.input)).toEqual(true);
        });

        it('should have an output property of type AudioNode', function() {
            expect(allen.isAudioNode(noiseGen.output)).toEqual(true);
        });

        it('should have a noiseType property defaulted to "brown"', function() {
            expect(noiseGen.noiseType).toEqual('brown');
        });
    });

    describe('methods', function(){
        describe('start', function() {
            it('should have a start method', function() {
                expect(noiseGen.start).toBeDefined();
            });
        });

        describe('stop', function() {
            it('should have a stop method', function() {
                expect(noiseGen.stop).toBeDefined();
            });
        });

        describe('remove', function() {
            it('should have a remove method', function() {
                expect(noiseGen.remove).toBeDefined();
            });

            it('should descrease the global ColorNoiseGenProcessors length by 1', function() {
                var processorCountAfter, processorCountBefore;
                processorCountBefore = window.ColorNoiseGenProcessors.length;
                noiseGen.remove();
                processorCountAfter = window.ColorNoiseGenProcessors.length;
                expect(processorCountAfter).toEqual(processorCountBefore - 1);
            });
        });

        describe('connect', function() {
            it('should have a method connect that takes and AudioNode', function() {
                var connect;
                connect = function() {
                    noiseGen.connect(gainNode);
                };
                expect(connect).not.toThrow();
            });

            it('should take a web audio component instance', function() {
                var connect;
                connect = function() {
                    noiseGen.connect(new ColorNoiseGen(ctx));
                };
                expect(connect).not.toThrow();
            });
        });

        describe('disconnect', function() {
            it('should have a method disconnect', function() {
                expect(noiseGen.disconnect).toBeDefined();
            });
        });

        describe('setNoiseType', function() {
            it('should change the noise type', function() {
                noiseGen.noiseType ='white';
                expect(noiseGen.noiseType).toEqual('white');
            });

            it('should create a new noise object with an update method', function() {
                var update;

                noiseGen.noiseType = 'white';
                update = function() {
                    noiseGen.noise.update();
                };
                expect(update).not.toThrow();
            });
        });
    });
});
