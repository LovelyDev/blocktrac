const jsonpath = require('./vendor/jsonpath')

function round_value(value, decimals){
  if(!value) {
    value = 0;
  }

  if(decimals == 0)
    return parseInt(value);

  if(!decimals)
    decimals = Math.abs(value) < 0.0001 ? 10 : 5;

  value = Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
  return value;
}

export default {
  delim_value : function(value){
    var delim = parseFloat(value).toString().split(".");
    delim[0] = delim[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return delim.join(".");
  },

  round_value : round_value,

  abbrev : function(value){
    if(value > 1000000000000)
      return round_value(value/1000000000000, 2) + "T"

    else if(value > 1000000000)
      return round_value(value/1000000000, 2) + "B"

    else if(value > 1000000)
      return round_value(value/1000000, 2) + "M"

    else if(value > 1000)
      return round_value(value/1000, 2) + "K"

    return round_value(value)
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

  ///

  // XXX: validator methods copied from fr0xrpl util module

  is_valid_jsonpath : function(jp){
    try{
      jsonpath.parse(jp);
      return true;

    }catch(err){
      return false;
    }
  },

  is_valid_email : function(email){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },

  is_valid_sms : function(test){
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im).test(test);
  },

  is_valid_url : function(test){
    return (/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi).test(test)
  },

  is_valid_integer : function(test){
    return Number(test) === test &&
                     test % 1 === 0
  },

  is_valid_float : function(test){
    return Number(test) === test &&
                     test % 1 !== 0
  },

  is_valid_string : function(test){
    return typeof test === 'string' ||
            test instanceof String
  },

  ///

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
