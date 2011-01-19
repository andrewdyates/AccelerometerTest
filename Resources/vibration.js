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

// there should be a "Sampler object" here
// init to a size, push triplets, keeps own cache
// returns useful values when queried

Sampler = {
    size: DFT_SAMPLE_SIZE,
    // sample vector
    items: [],
    // cache
    cache: {
	item: null,
	sums: null,
	sum_sqs: null
    },
//    averages
//    deviations
    
    push: function(x, y, z) {
	this.items.push([x,y,z]);
	if (this.items.length > this.size) {
	    this.cache.item = this.items.shift();
	}
    },

    avg_deviation: function() {
	var sums = [0, 0, 0];
	var sq_sums = [0, 0, 0];
	var devs = [null, null, null];
	var avgs = [null, null, null];
	var dev_avg;
	var n;
	var i, k;

	n = this.items.length;
	if(n == 0) {
	    return null;
	}
	
	// compute sums if the cache is incomplete
	if (!(this.cache.item && this.cache.sums && this.cache.sum_sqs)) {
	    for (i=0; i<n; i++) {
		for (k=0; k<=2; k++) {
		    sums[k] += this.items[i][k];
		    sq_sums[k] += Math.pow(this.items[i][k], 2);
		}
	    }
	// update sums from cache values otherwise
	} else {
	    for (k=0; k<=2; k++) {
		sums[k] = this.cache.sums[k] - 
		    this.cache.item[k] + this.items[n-1][k];
		sq_sums[k] = this.cache.sq_sums[k] - 
		    Math.pow(this.cache.item[k], 2) + 
		    Math.pow(this.items[n-1][k]);
	    }
	}

	// update cache
	this.cache.sums = sums.slice();
	this.cache.sq_sums = sq_sums.slice();
	this.cache.item = this.items[n-1].slice();

	// compute deviations
	for (k=0; k<=2; k++) {
	    avg[k] = sums[k] / n;
	    dev[k] = Math.sqrt(sq_sums[k] / n - Math.pow(avg[k], 2));
	}

	// return average deviation over three dimensions
	dev_avg = (dev[0] + dev[1] + dev[2]) / 3;
	return dev_avg;
    }
};
