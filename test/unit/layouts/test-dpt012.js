const test = require('tape');
const DPTLib = require('../../../src');

var tests = [
    // MSB LSB
    [[0x00,0x00,0x00,0x00],0],
    [[0x00,0x00,0x00,0x01],1],
    [[0x00,0x00,0x01,0x00],256],
    [[0x00,0x00,0x01,0x01],257],
    [[0x00,0x01,0x00,0x00],65536],
    [[0x00,0x01,0x00,0x01],65537],
    [[0x00,0x01,0x01,0x00],65792],
    [[0x00,0x01,0x01,0x01],65793],
    [[0x01,0x00,0x00,0x00],16777216],
    [[0x01,0x00,0x00,0x01],16777217],
    [[0x01,0x00,0x01,0x00],16777472],
    [[0x01,0x00,0x01,0x01],16777473],
    [[0x01,0x01,0x00,0x00],16842752],
    [[0x01,0x01,0x00,0x01],16842753],
    [[0x01,0x01,0x01,0x00],16843008],
    [[0x01,0x01,0x01,0x01],16843009],
];
var defaultTypes = ["DPT12", "DPT12.001"];

for(var type in defaultTypes) {
    var dptName = defaultTypes[type];
    test(dptName, function (t) {
        var dpt = DPTLib.resolve(dptName);
        t.plan(tests.length * 2);
        for (var i = 0; i < tests.length; i++) {
            var buf = new Buffer(tests[i][0]);
            var obj = tests[i][1];

            // backward test (object to raw data)
            var converted = dpt.formatAPDU(obj);
            t.deepEqual(converted, buf, `${dptName} formatAPDU ${JSON.stringify(obj)}`);

            // forward test (raw data to object)
            converted = dpt.fromBuffer(Buffer.from(buf));
            t.equal(converted, obj, `${dptName} fromBuffer ${JSON.stringify(buf)}`);
        }
        t.end();
    });
}