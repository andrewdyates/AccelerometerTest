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
	this.v.push([x,y,z]);
	if (this.v.length > this.size) {
	    this.cache.item = this.v.shift();
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

function push_xyz(v, x, y, z) {
    last_set = v.push_rotate([x,y,z]);
}

function push_rotate(v, x, size) {
    /* Add element to fixed-size modular array. 
     * 
     * Arguments:
     *   v: Array
     *   x: item to add to Array
     *   size: int > 0, >= |v| of max array size
     * Modifies:
     *   v: v[v.length-1] = x, |v| <= size
     * Returns:
     *   item shifted from v[0] or null
     * */
    var last = null;
    size = size || DFT_SAMPLE_SIZE;
    v.push(x);
    if (v.length > size) {
	last = v.shift();
    }
    return last;
}

function std_deviation(v, cache) {
    /* Return the standard deviation of an array of numbers.
     * 
     * Arguments:
     *   v: Array of num
     *   cache: [optional] dict of
     *     last: num of last item removed from v
     *     last_sum: num of the sum of last v
     *     last_sum_sqs: num of the sum of squares of last v
     * Modifies:
     *   cache: updates corresponding values
     * Returns:
     *   num of sample variance
     */
    var sum, sum_of_sqs, avg, sigma_sq, sigma;
    cache = cache || {};

    // compute or update sums
    if(cache.item && cache.sum && cache.sum_sqs) {
	var new_item = v[v.length - 1];
	sum = cache.sum - cache.item + new_item;
	sum_sqs = cache.sum_sqs - cache.item*cache.item + new_item*new_item;
    } else {
	sum = v.reduce(function(a, b){return a + b;}, 0);
	sum_sqs = v.reduce(function(a, b){return a + b*b;}, 0);
    }
    // update computed cache values
    cache.sum = sum;
    cache.sum_sqs = sum_sqs;

    avg = sum / v.length;
    sigma_sq = sum_sqs / v.length - avg*avg;
    sigma = Math.sqrt(sigma_sq);
    return sigma;
}

