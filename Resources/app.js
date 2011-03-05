// note: Accelerometer does not work in simulator
Ti.include("vibration_js/vibration.js");


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
    text:'Vibration Test version: 0.895',
    top:10,
    font:{fontSize:14},
    color:'#555',
    width:300,
    height:'auto'
});
win.add(version);
var units = Titanium.UI.createLabel(
{
    text:'Units in mG',
    top:60,
    left:10,
    font:{fontSize:14},
    color:'#555',
    width:300,
    height:'auto'
});
win.add(units);
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
Ti.App.addEventListener('vibration_update', function(e) 
{
    var v, display;
    v = e.vibration;
    display = v.toFixed(1);
    scale_div.text = display;
});

Vibration.start();

win.open();
