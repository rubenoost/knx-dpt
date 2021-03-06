const test = require('tape');
const DPTLib = require('../../../src');

var tests = [
    [[0b11000000, 0b11011001, 0b10011001, 0b10011010], -6.8]
];
var defaultTypes = [
    "DPT14", "DPT14.000", "DPT14.001", "DPT14.002", "DPT14.003", "DPT14.004", "DPT14.005", "DPT14.006", "DPT14.007",
    "DPT14.008", "DPT14.009", "DPT14.010", "DPT14.011", "DPT14.012", "DPT14.013", "DPT14.014", "DPT14.015", "DPT14.016",
    "DPT14.017", "DPT14.018", "DPT14.019", "DPT14.020", "DPT14.021", "DPT14.022", "DPT14.023", "DPT14.024", "DPT14.025",
    "DPT14.026", "DPT14.027", "DPT14.028", "DPT14.029", "DPT14.030", "DPT14.031", "DPT14.032", "DPT14.033", "DPT14.034",
    "DPT14.035", "DPT14.036", "DPT14.037", "DPT14.038", "DPT14.039", "DPT14.040", "DPT14.041", "DPT14.042", "DPT14.043",
    "DPT14.044", "DPT14.045", "DPT14.046", "DPT14.047", "DPT14.048", "DPT14.049", "DPT14.050", "DPT14.051", "DPT14.052",
    "DPT14.053", "DPT14.054", "DPT14.055", "DPT14.056", "DPT14.057", "DPT14.058", "DPT14.059", "DPT14.060", "DPT14.061",
    "DPT14.062", "DPT14.063", "DPT14.064", "DPT14.065", "DPT14.066", "DPT14.067", "DPT14.068", "DPT14.069", "DPT14.070",
    "DPT14.071", "DPT14.072", "DPT14.073", "DPT14.074", "DPT14.075", "DPT14.076", "DPT14.077", "DPT14.078", "DPT14.079"
];
var epsilon = 0.00001;

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
            t.ok(Math.abs(converted - obj) < epsilon, `${dptName} fromBuffer ${JSON.stringify(buf)}`);
        }
        t.end();
    });
}