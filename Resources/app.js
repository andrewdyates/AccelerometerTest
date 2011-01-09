// Window
Titanium.UI.setBackgroundColor('#000');
var win = Titanium.UI.createWindow(
{  
    title:'Root Window',
    backgroundColor:'#fff',
    exitOnClose: true
});

// Labels
var x = Titanium.UI.createLabel(
{
    text:'x:',
    top:10,
    left:10,
    font:{fontSize:14},
    color:'#555',
    width:300,
    height:'auto'
});
win.add(x);

var y = Titanium.UI.createLabel(
{
    text:'y:',
    top:30,
    left:10,
    font:{fontSize:14},
    color:'#555',
    width:300,
    height:'auto'
});
win.add(y);

var z = Titanium.UI.createLabel(
{
    text:'z:',
    top:50,
    left:10,
    font:{fontSize:14},
    color:'#555',
    width:300,
    height:'auto'
});
win.add(z);

var ts = Titanium.UI.createLabel(
{
    text:'timestamp:',
    top:70,
    left:10,
    font:{fontSize:14},
    color:'#555',
    width:300,
    height:'auto'
});
win.add(ts);

var variance = Titanium.UI.createLabel(
{
    text:'variance:',
    top:90,
    left:10,
    font:{fontSize:14},
    color:'#555',
    width:300,
    height:'auto'
});
win.add(variance);

// This should be an object with methods "add sample", "compute variance", 
// "clear" with "max_sample_size" an init argument
// 
// This object should then be imported and unit tested 
// array of triplets (x,y,z)
var samples = [];
// maximum sample size
var MAX_SAMPLE_SIZE = 20;
// units of g (m/s)

function push_sample(x, y, z){
    samples.push([x,y,z]);
    if (samples.length > MAX_SAMPLE_SIZE) {
	samples.shift();
    }
}

// this could be optimized to use previous avg and var calcuations
function compute_variance() 
{
    /* DOCSTRING
     * This should describe the parameters and return values. */
    var x_sq_sum = 0, x_sum = 0;
    var y_sq_sum = 0, y_sum = 0;
    var z_sq_sum = 0, z_sum = 0;
    var x_avg, y_avg, z_avg;
    var x_var, y_var, z_var;
    var m2_avg;
    var n;

    n = samples.length;

    // this should be in map-reduce form
    for (var i=0; i<n; i++){
	x_sum += samples[i][0];
	y_sum += samples[i][1];
	z_sum += samples[i][2];
	x_sq_sum += Math.pow(samples[i][0], 2);
	y_sq_sum += Math.pow(samples[i][1], 2);
	z_sq_sum += Math.pow(samples[i][2], 2);
    }
    x_avg = x_sum / n;
    y_avg = y_sum / n;
    z_avg = z_sum / n;

    // these should be standard deviations
    x_var = (x_sq_sum - (n * Math.pow(x_avg, 2))) / n;
    y_var = (y_sq_sum - (n * Math.pow(y_avg, 2))) / n;
    z_var = (z_sq_sum - (n * Math.pow(z_avg, 2))) / n;

    // this should be an average of standard deviations
    // this could also be calculated from s_sqaured from each dimension
    m2_avg = (x_var + y_var + z_var) / 3;

    // debug negative variance
    if (m2_avg < 0) {
	alert("Warning! v=" + v + " x_var=" + x_var + " y_var=" + y_var + "z_var=" + z_var);
    }

    return m2_avg;
}


// Accelerometer Event listener
Ti.Accelerometer.addEventListener('update',function(e)
{
    ts.text = e.timestamp;
    x.text = 'x: ' + e.x;
    y.text = 'y:' + e.y;
    z.text = 'z:' + e.z;

    push_sample(e.x, e.y, e.z);
    v = compute_variance();
    variance.text = 'variance:' + v;
});

// note: Accelerometer does not work in simulator

win.open();
