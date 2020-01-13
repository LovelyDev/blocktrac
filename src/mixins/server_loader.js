// TODO remove once filters, sinks, and templates are retrieved from server
import filters from '../assets/stub-filters.json'
import sinks   from '../assets/stub-sinks.json'
import templates from '../assets/stub-filter-templates.json'

export default {
  methods : {
    load_filters : function(cb){
      // TODO: actually get filters from server
      cb(filters);
    },

    load_sinks : function(cb){
      // TODO: actually get sinks from server
      cb(sinks);
    },

    load_templates : function(cb){
      // TODO: actually get templates from server
      cb(templates);
    }
  }
}
