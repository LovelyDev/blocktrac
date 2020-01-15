// TODO remove once each of these are retrieved from server
import filters      from '../assets/stub-filters.json'
import sinks        from '../assets/stub-sinks.json'
import templates    from '../assets/stub-filter-templates.json'
import filter_tests from '../assets/stub-filter-tests.json'

export default {
  methods : {
    load_filters : function(cb){
      // TODO: get filters from server
      cb(filters);
    },

    load_sinks : function(cb){
      // TODO: get sinks from server
      cb(sinks);
    },

    load_templates : function(cb){
      // TODO: get templates from server
      cb(templates);
    },

    load_filter_tests : function(cb){
      // TODO: get filter tests from server
      cb(filter_tests);
    }
  }
}
