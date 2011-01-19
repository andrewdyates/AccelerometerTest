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
    if(cache == undefined) cache = {};

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

