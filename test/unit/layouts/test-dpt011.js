const test = require('tape');
const DPTLib = require('../../../src');

var tests = [
    [[25, 12, 95], new Date('25 Dec 1995')],
    [[25, 12, 15], new Date('25 Dec 2015')]
];
var defaultTypes = ["DPT11", "DPT11.001"];

for(var type in defaultTypes) {
    var dptName = defaultTypes[type];
    test(dptName, function (t) {
        var dpt = DPTLib.resolve(dptName);
        t.plan(tests.length * 4);
        for (var i = 0; i < tests.length; i++) {
            let buf = new Buffer(tests[i][0]);
            let val = tests[i][1];

            // backward test (value to raw data)
            let converted = dpt.formatAPDU(val);
            t.deepEqual(converted, buf, `${dptName} formatAPDU ${JSON.stringify(val)}`);

            // forward test (raw data to value)
            converted = dpt.fromBuffer(buf);
            t.equal(converted.getDate(), val.getDate(), `${dptName} fromBuffer ${JSON.stringify(buf)}`);
            t.equal(converted.getMonth(), val.getMonth(), `${dptName} fromBuffer ${JSON.stringify(buf)}`);
            t.equal(converted.getFullYear(), val.getFullYear(), `${dptName} fromBuffer ${JSON.stringify(buf)}`);
        }
        t.end()
    });
}