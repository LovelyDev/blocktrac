const jsonpath = require('./vendor/jsonpath')

export default {
  delim_value : function(value){
    var delim = parseFloat(value).toString().split(".");
    delim[0] = delim[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return delim.join(".");
  },

  round_value : function(value, decimals){
    if(!value) {
      value = 0;
    }

    if(decimals == 0)
      return parseInt(value);

    if(!decimals)
      decimals = Math.abs(value) < 0.0001 ? 10 : 5;

    value = Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
    return value;
  },

  ledger_time_to_unix : function(t){
    return (t + 946684800)*1000;
  },

  hex_to_ascii : function(hex){
    var hex = hex.toString();
    var str = '';
    for (var n = 0; n < hex.length; n += 2) {
      str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str;
  },

  capitalize : function(string){
    return string[0].toUpperCase() + string.slice(1);
  },

  // XXX: copied from fr0xrpl util#is_valid_jsonpath
  is_valid_jsonpath : function(jp){
    try{
      jsonpath.parse(jp);
      return true;

    }catch(err){
      return false;
    }
  },

  // XXX: copied from fr0xrpl util#is_valid_email
  is_valid_email : function(email){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },

  // XXX: copied from fr0xrpl Filter#matcher and Template#apply_params
  filter_matcher : function(filter){
    if(filter.Template){
      if(filter.params.length != Object.keys(filter.Template.params).length)
        throw "params mismatch"

      var jp = filter.Template.jsonpath;
      for(var p = 0; p < filter.params.length; p++){
        jp = jp.replace(new RegExp("PARAM_" + (p+1), "g"), filter.params[p])
      }

      return jp
    }

    return filter.jsonpath;
  }
}
