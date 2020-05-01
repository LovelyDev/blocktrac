import Vue   from 'vue'
import VueMq from 'vue-mq'

// From bootstrap:
// xs - 0 on up
// sm - 576 on up
// md - 768 on up
// lg - 992 on up
// xl - 1200 on up
//
// vue-mq defines upper-bound of media-query
// range hence levels are shifted
Vue.use(VueMq, {
  breakpoints: {
    xs: 576,
    sm: 768,
    md: 992,
    lg: 1200,
    xl: Infinity
  }
})

// Custom mixin to define mq helpers
// lt = less than
// gt = greater than
Vue.mixin({
  computed : {
    mq_xs : function(){
      return this.$mq == 'xs';
    },

    mq_gt_xs : function(){
      return this.$mq != 'xs;'
    },

    mq_sm : function(){
      return this.$mq == 'sm';
    },

    mq_lt_sm : function(){
      return this.$mq == 'xs';
    },

    mq_gt_sm : function(){
      return ['md', 'lg', 'xl'].includes(this.$mq);
    },

    mq_md : function(){
      return this.$mq == 'md';
    },

    mq_lt_md : function(){
      return ['xs', 'sm'].includes(this.$mq);
    },

    mq_gt_md : function(){
      return ['lg', 'xl'].includes(this.$mq);
    },

    mq_lg : function(){
      return this.$mq == 'lg';
    },

    mq_lt_lg : function(){
      return ['xs', 'sm', 'md'].includes(this.$mq);
    },

    mq_gt_lg : function(){
      return this.$mq == 'xl';
    },

    mq_xl : function(){
      return this.$mq == 'xl';
    },

    mq_lt_xl : function(){
      return this.$mq != 'xl';
    }
  },

  methods : {
    mq_in : function(mq){
      return mq.includes(this.$mq);
    }
  }
})
