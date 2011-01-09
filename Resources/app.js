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

function compute_variance(){
    var x_sq_sum = 0;
    var y_sq_sum = 0;
    var z_sq_sum = 0;
    var x_var, y_var, z_var;
    var v;

    var n = samples.length;
    for (var i=0; i<n; i++){
	x_sq_sum += Math.pow(samples[i][0], 2);
	y_sq_sum += Math.pow(samples[i][1], 2);
	z_sq_sum += Math.pow(samples[i][2], 2);
    }
    // note: x and y averages are 0, z is -1^2 == 1
    x_var = x_sq_sum / n;
    y_var = y_sq_sum / n;
    z_var = (z_sq_sum - n) / n;

    v = (x_var + y_var + z_var) / 3;
    // debug negative variance
    if (v < 0) {
	alert("Warning! v=" + v + " x_var=" + x_var + " y_var=" + y_var + "z_var=" + z_var);
    }
    return v;
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
