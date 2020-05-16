/*
 * VueJS text formatting filters
 * Note: These define filters in the context of vuejs and not
 * Zerp Tracker (eg text formatters vs transaction processors)
 *
 * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
 */

import Vue from 'vue';
import util from './util';

// Deliminate the value
Vue.filter('delim', function(value) {
  return util.delim_value(value);
});

// Round the decimal to the given place
Vue.filter('round', function(value, decimals) {
  return util.round_value(value, decimals);
});

// Returns abbreviated numeric representation
Vue.filter('abbrev', function(value){
  return util.abbrev(value)
})

// Return string as is if < length, else truncate and add ellipsis
Vue.filter("ellipsis", function(value, length){
  if(!length || value.length <= length)
    return value;

  return value.substr(0, length) + "...";
})
