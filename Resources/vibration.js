// Javascript : Appcelerator Titanium
// -*- coding: utf-8 -*-
// Copyright © 2011 Andrew D. Yates
// All Rights Reserved

/* Vibration.js: Detect iPhone and Android vibrations with Appcelerator.
 * 
 * andrewyates.name@gmail.com
 * https://github.com/andrewdyates
 */

var DFT_SAMPLE_SIZE = 20;


Sampler = {
    size: DFT_SAMPLE_SIZE,
    items: [],
    
    push: function(x, y, z) {
	this.items.push([x,y,z]);
	if (this.items.length > this.size) {
	    this.items.shift();
	}
    },

    variance: function() {
	var sums = [0, 0, 0];
	var sum_sqs = [0, 0, 0];
	var sum_var = 0;
	var avg_var, avg;
	var n;
	var i, k;

	n = this.items.length;
	// edge case if no samples
	if(n == 0) {
	    return 0.0;
	}
	
	for (i=0; i<n; i++) {
	    for (k=0; k<=2; k++) {
		sums[k] += this.items[i][k];
		sum_sqs[k] += Math.pow(this.items[i][k], 2);
	    }
	}

	// compute sum of variance
	for (k=0; k<=2; k++) {
	    avg = sums[k] / n;
	    sum_var += (sum_sqs[k] - n * Math.pow(avg, 2)) / n;
	}

	// return average deviation over three dimensions
	avg_var = sum_var / 3;
	return avg_var;
    }
};
