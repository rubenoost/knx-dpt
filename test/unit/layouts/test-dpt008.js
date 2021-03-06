const test = require('tape');
const DPTLib = require('../../../src');

var tests = [
    [[0x00, 0x00], 0],
    [[0x00, 0x01], 1],
    [[0x00, 0x0A], 10],
    [[0x00, 0x64], 100],
    [[0x00, 0x7F], 127],
    [[0x00, 0x80], 128],
    [[0x01, 0x00], 256],
    [[0x7F, 0xFF], 32767],
    [[0xFF, 0xFF], -1],
    [[0xFF, 0xF6], -10],
    [[0xFF, 0x9C], -100],
    [[0xFF, 0x80], -128],
    [[0xFF, 0x00], -256],
    [[0x80, 0x00], -32768],
];
var defaultTypes = [
    "DPT8", "DPT8.001", "DPT8.002", "DPT8.003", "DPT8.004", "DPT8.005", "DPT8.006", "DPT8.007", "DPT8.010", "DPT8.011"
];

for (var type in defaultTypes) {
    var dptName = defaultTypes[type];
    test(dptName, function (t) {
        var dpt = DPTLib.resolve(dptName);
        t.plan(tests.length * 2);
        for (var i = 0; i < tests.length; i++) {
            var buf = new Buffer(tests[i][0]);
            var obj = tests[i][1];

            // backward test (object to raw data)
            converted = dpt.formatAPDU(obj);
            t.deepEqual(converted, buf, `${dptName} formatAPDU ${JSON.stringify(obj)}`);

            // forward test (raw data to object)
            var converted = dpt.fromBuffer(buf);
            t.equal(converted, obj, `${dptName} fromBuffer ${JSON.stringify(buf)}`);
        }
        t.end();
    });
}