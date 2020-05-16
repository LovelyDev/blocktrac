<!--
  * Plan Page
  * Rendered when user selects a plan from options on Plans page
  * and presents user with plan overview and options to customize.
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <MainLayout section="plan">
    <div id="plan">
      <h3>Your Plan</h3>

      <div id="plan_container">
        <div id="plan_details">
          <div id="plan_details_subcontainer">
            <div id="plan_overview">
              <h4 id="plan_name">{{plan}}</h4>
              <span>${{details.cost}} <span>/month</span></span>
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
                     :class="{active : enable_additional}">Buy additional</span>
              </b-form-checkbox>
            </div>

            <div id="additional_filters">
              <span>Filters:</span>
              <b-form-spinbutton class="additional_item" inline
                                :max="max_additions.filters"
                                v-model="additional_filters"
                                :disabled="!enable_additional"/>
            </div>

            <div id="additional_sinks">
              <span>Sinks:</span>
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
                   :class="{selected : (!period || period == 1)}"
                   @click="set_period(1)">
                <div><b>1 month</b></div>
                <div><b>${{details.cost}}</b></div>
              </div>

              <div v-for="(cost, month) in details.monthly_costs"
                   :key="'month' + month"
                   class="plan_period"
                   :class="{selected : (period == month)}"
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
              <span class="order_detail_label">Filters:</span>
              <span class="order_detail_value">{{total_filters}}</span>
            </div>

            <div class="order_detail">
              <span class="order_detail_label">Sinks:</span>
              <span class="order_detail_value">{{total_sinks}}</span>
            </div>

            <div class="order_detail">
              <span class="order_detail_label">Sinks per filter:</span>
              <span class="order_detail_value">{{details.sinks_per_filter}}</span>
            </div>

            <div class="order_detail">
              <span class="order_detail_label">Alert Time:</span>
              <span class="order_detail_value">{{alert_time_text}}</span>
            </div>

            <div class="order_detail">
              <span class="order_detail_label">Instant Alerts:</span>
              <span class="order_detail_value">{{instant_alerts ? 'Yes' : 'No'}}</span>
            </div>
          </div>

          <div id="order_overview">
            <div class="order_detail">
              <span class="order_detail_label">Total:</span>
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
import MainLayout     from './components/MainLayout'
import Authentication from './mixins/authentication'

import ziti from './ziti'

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
      additional_filters : null,
      additional_sinks : null,
      max_additions : ziti.MAX_ADDITIONS,
      period : null
    }
  },

  computed : {
    details : function(){
      if(!this.plan) return {};

      return ziti.membership_features[this.plan];
    },

    instant_alerts : function(){
      return this.details.notification_times.includes(0);
    },

    alert_time_text : function(){
      return this.instant_alerts ? 'Instant' : (this.details.notification_times[0] + ' min');
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
        cost += this.additional_filters * ziti.additions_cost.filters * period;

      if(this.enable_additional && this.additional_sinks)
        cost += this.additional_sinks * ziti.additions_cost.sinks * period;

      return cost;
    },
  },

  watch : {
    enable_additional : function(){
      if(!this.enable_additional){
        this.additional_filters = null;
        this.additional_sinks = null;
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

#plan h3{
  font-family: var(--theme-font3);
}

#plan_container{
  display: flex;
  justify-content: space-between;
}

#main_layout.md #plan_container,
#main_layout.sm #plan_container,
#main_layout.xs #plan_container{
  flex-direction: column;
}


#plan_details{
  flex-basis: 78%;
  background-color: white;
  border: 1px solid var(--theme-color3);
  border-radius: 4px;
  padding: 20px;
}

#order_container{
  flex-basis: 20%;
  background-color: var(--theme-color1);
  border-radius: 4px;
  padding: 20px;
}

#main_layout.md #order_container,
#main_layout.sm #order_container,
#main_layout.xs #order_container{
  margin-top: 15px;
}

#main_layout.xs #order_container{
  padding: 20px 10px;
}

#plan_details_subcontainer{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
}

#main_layout.sm #plan_details_subcontainer,
#main_layout.xs #plan_details_subcontainer{
  flex-direction: column;
  align-items: unset;
  padding: 0;
}

#plan_overview{
  flex-basis: 20%;
  font-family: var(--theme-font5);
}

#main_layout.sm #plan_overview,
#main_layout.xs #plan_overview{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#plan_overview span{
  font-family: var(--theme-font1);
}

#plan_specifics{
  flex-basis: 60%;
  display: flex;
  justify-content: space-between;
  font-size: 1.1rem;
}

#main_layout.sm #plan_specifics,
#main_layout.xs #plan_specifics{
  margin-top: 10px;
}

#filters,
#sinks{
  flex-basis: 20%;
  padding: 0 10px;
  border-right: 1px solid var(--theme-color3);
}

#alert_time{
  flex-basis: 45%;
  padding: 0 10px;
}

#main_layout.sm #filters,
#main_layout.xs #filters,
#main_layout.sm #sinks,
#main_layout.xs #sinks,
#main_layout.sm #alert_time,
#main_layout.xs #alert_time{
  flex-basis: 33%;
  text-align: center;
  padding: 0;
}

.specifics_label{
  font-family: var(--theme-font1);
}

.specifics_value{
  font-weight: bold;
  font-family: var(--theme-font4);
}

#plan_name{
  text-transform: capitalize;
}

#additional_items{
  display: flex;
  padding: 20px;
}

#main_layout.sm #additional_items,
#main_layout.xs #additional_items{
  flex-direction: column;
  padding: 20px 0;
}

#enable_additional{
  flex-basis: 25%;
  display: flex;
  align-items: center;
  margin-right: 10px;
}

#enable_additional_label{
  color: gray;
  font-family: var(--theme-font3);
}

#enable_additional_label.active{
  color: black;
}

#additional_filters,
#additional_sinks{
  flex-basis: 25%;
  font-family: var(--theme-font1);
}

#additional_filters span,
#additional_sinks span{
  margin-right: 10px;
}

#main_layout.sm #additional_filters,
#main_layout.sm #additional_sinks,
#main_layout.xs #additional_filters,
#main_layout.xs #additional_sinks{
  display: flex;
  align-items: center;
  justify-content: space-between;
}

#additional_filters{
  margin-right: 10px;
}

#main_layout.sm #additional_filters,
#main_layout.xs #additional_filters{
  margin-right: unset;
  margin-bottom: 10px;
}

#period_selector{
  margin-top: 50px;
  font-family: var(--theme-font5);
}

#main_layout.md #period_selector,
#main_layout.sm #period_selector,
#main_layout.xs #period_selector{
  margin-top: 10px;
}

#period_selector h4{
  font-family: var(--theme-font4);
}

#plan_periods{
  display: flex;
  justify-content: space-evenly;
}

#main_layout.sm #plan_periods,
#main_layout.xs #plan_periods{
  flex-direction: column;
}

.plan_period{
  padding: 20px;
  border: 1px solid var(--theme-color1);
  border-radius: 4px;
  cursor: pointer;
}

#main_layout.sm .plan_period,
#main_layout.xs .plan_period{
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 10px;
}

.plan_period.selected{
  background-color: var(--theme-color1);
  color: white;
}

.orig_cost{
  text-decoration: line-through;
  font-family: var(--theme-font1);
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

.order_detail h4{
  font-family: var(--theme-font5);
}

.order_detail_label{
  font-family: var(--theme-font1);
}

.order_detail_value{
  font-family: var(--theme-font5);
  font-weight: bold;
}

#order_overview{
  border-top: 1px solid white;
  text-align: center;
}

#checkout_button{
  margin-top: 25px;
  border-radius: 25px;
  font-family: var(--theme-font3);
  font-weight: bold;
}
</style>
