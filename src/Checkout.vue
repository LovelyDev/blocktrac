<template>
  <MainLayout section="checkout">
    <div id="success_checkout" v-if="success">
      <div id="success_img_container">
        <img id="success_img" src="./assets/green-check.svg"/>
      </div>

      <h4>
        You have been successfully updated to the<br/>
        <b><span class="plan_name">{{plan}}</span></b>
        plan
      </h4>

      <div>
        You can manage you plans from
        <router-link to="/profile">your account</router-link>
      </div>
    </div>

    <div id="checkout_container" v-else>
      <h3>Checkout</h3>

      <div id="checkout_subcontainer">
        <h4 id="enjoy">
          Enjoy your {{period ? (period) + ' month' : ''}} <span class="plan_name">{{plan}}</span> Plan
        </h4>

        <h5>
          <b>Total Due: ${{total_cost}}</b>
        </h5>

        <div id="next_payment">
          Next payment: {{next_payment}}
        </div>

        <table id="payment_details">
          <tr>
            <td>First Name:</td>
            <td><input type="text" v-model="first_name" /></td>
          </tr>

          <tr>
            <td>Last Name:</td>
            <td><input type="text" v-model="last_name" /></td>
          </tr>

          <tr>
            <td>Card Number:</td>
            <td><input type="text" v-model="card_number" /></td>
          </tr>

          <tr>
            <td>Expiration Date:</td>
            <td><input type="text" v-model="expiration_date" /></td>
          </tr>

          <tr>
            <td>Security Code:</td>
            <td><input type="text" v-model="security_code" /></td>
          </tr>

          <tr>
            <td></td>
            <td style="text-align: right">
              <b-button @click="submit">Place Order</b-button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from './components/MainLayout.vue'

import fr0xrpl from './fr0xrpl'

export default {
  name: 'Checkout',

  components: {
    MainLayout
  },

  props : {
    plan : String,
    filters : Number,
    sinks : Number,
    period : Number
  },

  data : function(){
    return {
      success : false,
      first_name : '',
      last_name : '',
      card_number : '',
      expiration_date : '',
      security_code : ''
    }
  },

  computed : {
    details : function(){
      if(!this.plan) return {};

      return fr0xrpl.MEMBERSHIP_FEATURES[this.plan];
    },

    total_cost : function(){
      var cost = this.period ?
                 this.details.monthly_costs[this.period] :
                 this.details.cost;

      var period = this.period ? this.period : 1;

      if(this.filters)
        cost += this.filters * fr0xrpl.ADDITIONS_COST.filters * period;

      if(this.sinks)
        cost += this.sinks * fr0xrpl.ADDITIONS_COST.sinks * period;

      return cost;
    },

    next_payment : function(){
      return 'TODO'
    }
  },

  methods : {
    submit : function(){
      // TODO validate fields, submit payment, wait for confirmation, refresh account info
      this.success = true;
    }
  },

  created : function(){
    // if no plan specified, nav to plans
    if(!this.plan)
      this.$router.push({path : '/plans'});
  }
}
</script>

<style scoped>
#success_checkout{
  width: 60%;
  margin: auto;
  margin-top: 20px;
  padding: 100px;
  background-color: white;
  border: 1px solid #ECECEC;
  border-radius: 4px;
  text-align: center;
}

#success_img_container{
  margin: auto;
  width: 125px;
  height: 125px;
  background-color: rgb(22, 190, 89, 0.2);
  border-radius: 50%;
  margin-bottom: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
}

#success_img{
  width: 100px;
}

#checkout_container{
  width: 60%;
  margin: auto;
  margin-top: 20px;
}

#checkout_subcontainer{
  padding: 30px;
  background-color: white;
  border-radius: 4px;
}

#enjoy{
  padding: 20px;
  margin-bottom: 20px;
  text-align: center;
  background-color: #0091FF;
  color: white;
  border-radius: 6px;
}

.plan_name{
  text-transform: capitalize;
}

#next_payment{
  color: #395366;
}

#payment_details{
  width: 100%;
  border-collapse: separate;
  border-spacing: 15px;
}

#payment_details input{
  width: 100%;
}
</style>
