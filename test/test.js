function w(s) {
    document.writeln(s);
}
Ti = {
    App: {
	fireEvent: function(name, obj) {
	    // do nothing
	}
    }
};
tests = [];

function run_tests() {
    w('Running Tests...');
    test_push();
    test_scale();
    test_map();
    test_vibration();
}

function test_push() {
    w('Test Push');
    Sampler.push(1,1,1);
    w('Items');
    w(Sampler.items);
}

function test_scale() {
    w('Test _scale');
    Sampler.clear();
    CONST = 0.8;
    var a = Sampler._scale(Sampler.UNIT_SCALE);
    var b = Sampler._scale(CONST);
    var b2 = CONST / Sampler.UNIT_SCALE;
    w('Expecting a=1; a=' + a);
    w('b=' + b);
    w('b2=' + b2);
    var c = Sampler._unscale(b);
    w('Expecting about c=0.8; c=' + c);
}

function test_map() {
    w('Test mapping');
    Sampler.clear();
    var sample = [1, 2, 0.4];
    w(sample);
    var mapped = sample.map(Sampler._scale);
    w(mapped );
}

function test_vibration() {
    w('Test vibration');
    Sampler.clear();
    Sampler.push(1,1,1);
    Sampler.push(2,2,2);
    w(Sampler.mean);
    w(Sampler.std_dev);
    w(Sampler.vibration);
}