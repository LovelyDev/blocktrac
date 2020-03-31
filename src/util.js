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

  // XXX: copied from fr0xrpl Filter#matcher and Template#applyParams
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
