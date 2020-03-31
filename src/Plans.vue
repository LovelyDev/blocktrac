<template>
  <MainLayout section="plans">
    <div id="plans">
      <h3>Plans</h3>

      <div id="plans_container">
        <div v-for="(plan, name) in plans"
             :key="name"
             class="plan"
             :class="is_suggested_plan(name) ? 'suggested' : ''">
          <div class="plan_header">
            <h4 class="plan_name">
              {{name}}
              <span v-if="is_current_plan(name)">(Current Plan)</span>
            </h4>

            <div class="plan_cost">
              <b>{{plan.cost == 0 ? "Free" : "$" + plan.cost}}</b>
              <span v-if="plan.cost != 0"> /month</span>
            </div>

            <div class="plan_details">
              <div class="plan_detail">
                <div>Filters:</div>
                <b>{{plan.filters}}</b>
              </div>

              <div class="plan_detail">
                <div>Sinks:</div>
                <b>{{plan.sinks}}</b>
              </div>

              <div class="plan_detail">
                <div>Alert time:</div>
                <b>{{plan.alert_time == 0 ? 'Instant' : plan.alert_time}}</b>
                <span v-if="plan.alert_time != 0"> min</span>
              </div>
            </div>
          </div>

          <div class="plan_additions">
            <div>
              <b-form-checkbox v-model="enable_additional[name]" switch>
                <span class="enable_additional"
                     :class="enable_additional[name] ? 'active' : ''">Buy additional</span>
              </b-form-checkbox>
            </div>

            <table class="additional_items">
              <tr>
                <td>Filters:</td>
                <td><b-form-spinbutton class="additional_item" inline
                                       :max="max_additions.filters"
                                       v-model="additional_filters[name]"
                                       :disabled="!enable_additional[name]"/></td>
              </tr>

              <tr>
                <td>Sinks:</td>
                <td><b-form-spinbutton class="additional_item" inline
                                       :max="max_additions.sinks"
                                       v-model="additional_sinks[name]"
                                       :disabled="!enable_additional[name]"/></td>
              </tr>
            </table>

            <b-button class="upgrade" v-if="upgrade_enabled[name]">
              Upgrade ${{total_cost[name]}}
            </b-button>

            <b-button class="upgrade" v-else disabled>
              <span v-if="is_current_plan(name)">Current Plan</span>
              <span v-else>Subscription Ends in {{expires}} days</span>
            </b-button>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script>
import MainLayout     from './components/MainLayout.vue'
import Authentication from './mixins/authentication'

import fr0xrpl from './fr0xrpl'

export default {
  name: 'Plans',

  mixins : [Authentication],

  components: {
    MainLayout
  },

  data : function(){
    return {
      levels : fr0xrpl.MEMBERSHIP_LEVELS,
      plans : fr0xrpl.MEMBERSHIP_FEATURES,
      max_additions : fr0xrpl.MAX_ADDITIONS,
      additions_cost : fr0xrpl.ADDITIONS_COST,
       enable_additional : {},
      additional_filters : {},
        additional_sinks : {}
    }
  },

  computed : {
    suggested_plan : function(){
      if(this.membership_level == this.levels[this.levels.length-1])
        return null;

      return this.levels[this.levels.indexOf(this.membership_level)+1];
    },

    total_cost : function(){
      return this.levels.reduce(function(cost, level){
               if(level == this.membership_level)
                 cost[level] = 0;
               else
                 cost[level] = this.plans[level].cost;

               if(this.enable_additional[level] && this.additional_filters[level])
                 cost[level] += this.additional_filters[level] * this.additions_cost.filters;

               if(this.enable_additional[level] && this.additional_sinks[level])
                 cost[level] += this.additional_sinks[level] * this.additions_cost.sinks;

               return cost;
             }.bind(this), {});
    },

    upgrade_enabled : function(){
      var enabled = {};

      // only enable for current level if purchasing additional options
      enabled[this.membership_level] =
        this.total_cost[this.membership_level] > 0;

      // no downgrades
      var level_index = this.levels.indexOf(this.membership_level);
      if(level_index != 0)
        for(var l = 0; l < level_index; l += 1)
          enabled[this.levels[l]] = false;

      // allow upgrade
      if(level_index != this.levels.length - 1)
        for(l = level_index + 1; l < this.levels.length; l += 1)
          enabled[this.levels[l]] = true;

      return enabled;
    },

    expires : function(){
      // TODO
      return 5;
    }
  },

  methods : {
    is_current_plan : function(plan){
      return this.membership_level == plan;
    },

    is_suggested_plan : function(plan){
      return this.suggested_plan == plan;
    }
  }
}
</script>

<style scoped>
#plans{
  width: 80%;
  margin: auto;
  margin-top: 20px;
}

#plans_container{
  display: flex;
  justify-content: space-between;
}

.plan{
  background-color: white;
  border-radius: 5px;
}

.plan.suggested{
  border: 3px solid black;
}

.plan_header{
  background-color: #ecf0f6;
  padding: 20px;
  border-radius: 5px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

/* XXX: offset border */
.plan.suggested .plan_header{
  padding-top: 17px;
}

.plan_name{
  text-transform: capitalize;
}

.plan_cost{
  margin-bottom: 10px;
}

.plan_details{
  display: flex;
  justify-content: space-between;
}

.plan_detail{
  border-right: 1px solid #cdd0d3;
  padding: 15px;
  padding-top: 0;
  padding-bottom: 0;
  text-align: right
}

.plan_detail:last-child{
  border-right: none;
}

.plan_additions{
  margin-top: 5px;
  text-align: center;
}

.enable_additional{
  color: gray;
}

.enable_additional.active{
  color: black;
}

.additional_items{
  width: 75%;
  margin: auto;
}

.additional_item{
  border: none;
}

.upgrade{
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
