const test = require('tape');
const DPTLib = require('../../../src');

var tests = [
    [[0x00], {data: 0, priority: 0}],
    [[0x01], {data: 1, priority: 0}],
    [[0x02], {data: 0, priority: 1}],
    [[0x03], {data: 1, priority: 1}]
];
var defaultTypes = [
    "DPT2", "DPT2.001", "DPT2.002", "DPT2.003", "DPT2.004", "DPT2.005", "DPT2.006", "DPT2.007", "DPT2.008", "DPT2.009",
    "DPT2.010", "DPT2.011", "DPT2.012"
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
            t.deepEqual(converted, obj, `${dptName} fromBuffer ${JSON.stringify(buf)}`);
        }
        t.end();
    });
}