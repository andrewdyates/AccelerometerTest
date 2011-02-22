// note: Accelerometer does not work in simulator
Ti.include("vibration.js");

/*
// Window
Titanium.UI.setBackgroundColor('#000');
var win = Titanium.UI.createWindow(
{  
    title:'Root Window',
    backgroundColor:'#fff',
    exitOnClose: true
});

// Labels
var version = Titanium.UI.createLabel(
{
    text:'version: 0.55',
    top:240,
    font:{fontSize:12},
    color:'#555',
    width:300,
    height:'auto'
});
win.add(version);
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
    text:'v:',
    top:85,
    left:10,
    font:{fontSize:14},
    color:'#555',
    width:300,
    height:'auto'
});
win.add(variance);
var mean = Titanium.UI.createLabel(
{
    text:'u:',
    top:115,
    left:10,
    font:{fontSize:14},
    color:'#555',
    width:300,
    height:'auto'
});
win.add(mean);
var units = Titanium.UI.createLabel(
{
    text:'Units in mm/s^2',
    top:130,
    left:10,
    font:{fontSize:14},
    color:'#555',
    width:300,
    height:'auto'
});
win.add(mean);
var scale_div = Titanium.UI.createLabel(
{
    text:'20',
    top:180,
    font:{fontSize:48},
    color:'#000',
    height:'auto',
    textAlign:'center'
});
win.add(scale_div);


// Accelerometer Event listener
// samples every 100ms
Ti.Accelerometer.addEventListener('update',function(e)
{
    var v, display;

    var sum = function(a,b){ return a+b; };
    ts.text = e.timestamp;
    Sampler.push(e.x, e.y, e.z);

    x.text = 'x: ' + e.x + ' => ' + Sampler.items[Sampler.items.length-1][0];
    y.text = 'y:' + e.y + ' => ' + Sampler.items[Sampler.items.length-1][1];
    z.text = 'z:' + e.z + ' => ' + Sampler.items[Sampler.items.length-1][2];

    v = Sampler.vibration;
    variance.text = 'v:' + v + " mm/s^2";

    display = v.toFixed(1);

    mean.text = 'mx:' + Math.round(Sampler.mean[0]) + 
	' my:' + Math.round(Sampler.mean[1]) +
	' mz:' + Math.round(Sampler.mean[2]);

    scale_div.text = display;
    
    if (v <= 1) {
	// red
	scale_div.color = "#ff0000";
    } else if (v > 1 && v <= 20) {
	// orange
	scale_div.color = "#ffa200";
    } else if (v > 20 && v <= 50) {
	// yellow
	scale_div.color = "#aeff00";
    } else {
	// green
	scale_div.color = "#2aff00";
    }
});


win.open();
*/