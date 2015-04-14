//Abstract Noise Class
class Noise {
    update () {
        return "Not implemented";
    }

    random () {
        return Math.random() * 2 - 1;
    }
}

export default Noise;
