<template>
  <MainLayout section="plan">
    <div id="plan">
      <h3>Your Plan</h3>

      <div id="plan_container">
        <div id="plan_details">
          <div id="plan_details_subcontainer">
            <div id="plan_overview">
              <h4 id="plan_name">{{plan}}</h4>
              ${{details.cost}} /month
            </div>

            <div id="plan_specifics">
              <div id="filters">
                <div class="specifics_label">Filters:</div>
                <div class="specifics_value">{{details.filters}}</div>
              </div>

              <div id="sinks">
                <div class="specifics_label">Sinks:</div>
                <div class="specifics_value">{{details.sinks}}</div>
              </div>

              <div id="alert_time">
                <div class="specifics_label">Alert Time:</div>
                <div class="specifics_value">{{alert_time_text}}</div>
              </div>
            </div>
          </div>

          <div id="additional_items">
            <div id="enable_additional">
              <b-form-checkbox v-model="enable_additional" switch>
                <span id="enable_additional_label"
                     :class="enable_additional ? 'active' : ''">Buy additional</span>
              </b-form-checkbox>
            </div>

            <div id="additional_filters">
              Filters:
              <b-form-spinbutton class="additional_item" inline
                                :max="max_additions.filters"
                                v-model="additional_filters"
                                :disabled="!enable_additional"/>
            </div>

            <div id="additional_sinks">
              Sinks:
              <b-form-spinbutton class="additional_item" inline
                                :max="max_additions.sinks"
                                v-model="additional_sinks"
                                :disabled="!enable_additional"/>
            </div>
          </div>

          <div id="period_selector">
            <h4>Choose period</h4>

            <div id="plan_periods">
              <div class="plan_period"
                   :class="!period || period == 1 ? 'selected' : ''"
                   @click="set_period(1)">
                <div><b>1 month</b></div>
                <div><b>${{details.cost}}</b></div>
              </div>

              <div v-for="(cost, month) in details.monthly_costs"
                   :key="'month' + month"
                   class="plan_period"
                   :class="period == month ? 'selected' : ''"
                   @click="set_period(month)">
                <div><b>{{month}} months</b></div>
                <div><span class="orig_cost">${{month * details.cost}}</span> <b>${{cost}}</b></div>
              </div>
            </div>
          </div>
        </div>

        <div id="order_container">
          <h4><b>Your order</b></h4>

          <div id="order_details">
            <div class="order_detail">
              <span>Filters:</span>
              <span class="order_detail_value">{{total_filters}}</span>
            </div>

            <div class="order_detail">
              <span>Sinks:</span>
              <span class="order_detail_value">{{total_sinks}}</span>
            </div>

            <div class="order_detail">
              <span>Sinks per filter:</span>
              <span class="order_detail_value">{{details.sinks_per_filter}}</span>
            </div>

            <div class="order_detail">
              <span>Alert Time:</span>
              <span class="order_detail_value">{{alert_time_text}}</span>
            </div>

            <div class="order_detail">
              <span>Instant Alerts:</span>
              <span class="order_detail_value">{{instant_alerts ? 'Yes' : 'No'}}</span>
            </div>
          </div>

          <div id="order_overview">
            <div class="order_detail">
              <span>Total:</span>
              <span class="order_detail_value">${{total_cost}}</span>
            </div>

            <router-link :to="{name : 'checkout',
                               params : {plan : plan,
                                         filters : additional_filters,
                                         sinks : additional_sinks,
                                         period : period}}">
              <b-button id="checkout_button" variant="light">
                Checkout
              </b-button>
            </router-link>
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
  name: 'Plan',

  mixins : [Authentication],

  components: {
    MainLayout
  },

  props : {
       plan : String,
    filters : Number,
      sinks : Number
  },

  data : function(){
    return {
      enable_additional : false,
      additional_filters : 0,
      additional_sinks : 0,
      max_additions : fr0xrpl.MAX_ADDITIONS,
      period : null
    }
  },

  computed : {
    details : function(){
      if(!this.plan) return {};

      return fr0xrpl.MEMBERSHIP_FEATURES[this.plan];
    },

    instant_alerts : function(){
      return this.details.alert_time == 0;
    },

    alert_time_text : function(){
      return this.instant_alerts ? 'Instant' : (this.details.alert_time + ' min');
    },

    total_filters : function(){
      if(!this.enable_additional || !this.additional_filters)
        return this.details.filters;
      return this.details.filters + this.additional_filters;
    },

    total_sinks : function(){
      if(!this.enable_additional || !this.additional_sinks)
        return this.details.sinks;
      return this.details.sinks + this.additional_sinks;
    },

    total_cost : function(){
      var cost = this.period ?
                 this.details.monthly_costs[this.period] :
                 this.details.cost;

      var period = this.period ? this.period : 1;

      if(this.enable_additional && this.additional_filters)
        cost += this.additional_filters * fr0xrpl.ADDITIONS_COST.filters * period;

      if(this.enable_additional && this.additional_sinks)
        cost += this.additional_sinks * fr0xrpl.ADDITIONS_COST.sinks * period;

      return cost;
    },
  },

  watch : {
    enable_additional : function(){
      if(!this.enable_additional){
        this.additional_filters = 0;
        this.additional_sinks = 0;
      }
    },
  },

  methods : {
    set_period : function(month){
      this.period = month;
    },
  },

  created : function(){
    // if no plan specified, nav to plans
    if(!this.plan)
      this.$router.push({path : '/plans'});

    if(this.filters || this.sinks)
      this.enable_additional = true;

    if(this.filters)
      this.additional_filters = this.filters;

    if(this.sinks)
      this.additional_sinks = this.sinks;
  }
}
</script>

<style scoped>
#plan{
  width: 80%;
  margin: auto;
  margin-top: 20px;
}

#plan_container{
  display: flex;
}

#plan_details{
  flex-basis: 80%;
  background-color: white;
  border: 1px solid var(--theme-color3);
  border-radius: 4px;
  padding: 20px;
  margin-right: 20px;
}

#order_container{
  flex-basis: 20%;
  background-color: var(--theme-color1);
  border-radius: 4px;
  padding: 20px;
}

#plan_details_subcontainer{
  display: flex;
  padding: 20px;
}

#plan_overview{
  flex-basis: 20%;
}

#plan_specifics{
  flex-basis: 50%;
  display: flex;
  justify-content: space-evenly;
}

#plan_specifics > div{
  padding: 10px;
  border-right: 1px solid #9F9F9F;
}

#plan_specifics > div:last-child{
  border-right: none;
}

.specifics_value{
  font-weight: bold;
}

#plan_name{
  text-transform: capitalize;
}

#additional_items{
  display: flex;
  padding: 20px;
}

#enable_additional{
  flex-basis: 20%;
  display: flex;
  align-items: center;
}

#enable_additional_label{
  color: gray;
}

#enable_additional_label.active{
  color: black;
}

#additional_filters,
#additional_sinks{
  flex-basis: 25%;
}

#period_selector{
  margin-top: 50px;
}

#plan_periods{
  display: flex;
  justify-content: space-evenly;
}

.plan_period{
  padding: 20px;
  border: 1px solid var(--theme-color1);
  border-radius: 4px;
  cursor: pointer;
}

.plan_period.selected{
  background-color: var(--theme-color1);
  color: white;
}

.orig_cost{
  text-decoration: line-through;
}

#order_container{
  color: white;
  display: flex;
  flex-direction: column;
}

#order_details{
  flex-grow: 1;
}

.order_detail{
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}

.order_detail_value{
  font-weight: bold;
}

#order_overview{
  border-top: 1px solid white;
  text-align: center;
}

#checkout_button{
  margin-top: 10px;
}
</style>
