import {Spielfeld} from './../src/Spielfeld';

describe('updateData', function() {
    let spielfeld;
    let ships = [
      {"name": "schlachtschiff", "position": [15, 16, 17, 18, 19]},
      {"name": "u-boot", "position": [82, 83]}
    ];

    beforeEach(() => {
        spielfeld = new Spielfeld();
    });

    it('should remove the hitposition from the ships data array', () => {
        let shotposition = 17;
        let data = spielfeld.updateData(shotposition, ships);
        console.log(data[0][0].position.indexOf(17));
        expect(data[0][0].position.indexOf(17)).toEqual(-1);
    });
});