<template>
  <MainLayout section="checkout">
    <div id="success_checkout" v-if="success">
      <div id="success_img_container">
        <img id="success_img" src="./assets/green-check.svg"/>
      </div>

      <h4>
        You have been successfully updated to the
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
          Enjoy your {{period ? (period + ' month') : ''}} <span class="plan_name">{{plan}}</span> Plan
        </h4>

        <h5>
          <b>Total Due: ${{total_cost}}</b>
        </h5>

        <div id="next_payment">
          Next payment: {{next_payment}}
        </div>

        <table id="payment_details">
          <tr>
            <td v-if="mq_gt_sm"
                class="form_text">
              First Name:
            </td>

            <td>
              <div v-if="mq_lt_md">
                First Name:
              </div>

              <input type="text"
                     class="form_input"
                     v-model="first_name" />
            </td>
          </tr>

          <tr>
            <td v-if="mq_gt_sm"
                class="form_text">
              Last Name:
            </td>

            <td>
              <div v-if="mq_lt_md">
                Last Name:
              </div>

              <input type="text"
                     class="form_input"
                     v-model="last_name" />
            </td>
          </tr>

          <tr>
            <td v-if="mq_gt_sm"
                class="form_text">
              Card Number:
            </td>

            <td>
              <div v-if="mq_lt_md"
                  class="form_text">
                Card Number:
              </div>

              <input type="text"
                     class="form_input"
                     v-model="card_number" />
            </td>
          </tr>

          <tr>
            <td v-if="mq_gt_sm"
                class="form_text">
              Expiration Date:
            </td>

            <td>
              <div v-if="mq_lt_md"
                  class="form_text">
                Expiration Date:
              </div>

              <input type="text"
                     class="form_input"
                     v-model="expiration_date" />
            </td>
          </tr>

          <tr>
            <td v-if="mq_gt_sm"
                class="form_text">
              Security Code:
            </td>

            <td>
              <div v-if="mq_lt_md"
                  class="form_text">
                Security Code:
              </div>

              <input type="text"
                     class="form_input"
                     v-model="security_code" />
            </td>
          </tr>

          <tr>
            <td v-if="mq_gt_sm"></td>
            <td style="text-align: right">
              <b-button id="place_order"
                        @click="submit">
                Place Order
              </b-button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from './components/MainLayout'

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
  width: 50%;
  margin: auto;
  margin-top: 50px;
  padding: 100px;
  background-color: white;
  border: 1px solid var(--theme-color3);
  border-radius: 4px;
  text-align: center;
  font-family: var(--theme-font2);
}

#success_checkout h4{
  font-family: var(--theme-font3);
  margin-bottom: 20px;
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
  width: 50%;
  margin: auto;
  margin-top: 20px;
}

#main_layout.md #checkout_container,
#main_layout.sm #checkout_container{
  width: 80%;
}

#main_layout.xs #checkout_container{
  width: unset;
}


#checkout_container h3{
  font-family: var(--theme-font3);
}

#checkout_subcontainer{
  padding: 30px;
  background-color: white;
  border-radius: 4px;
}

#main_layout.xs #checkout_subcontainer{
  padding: 15px;
}

#checkout_subcontainer h5{
  font-family: var(--theme-font3);
}

#enjoy{
  padding: 20px;
  margin-bottom: 20px;
  text-align: center;
  background-color: var(--theme-color1);
  color: white;
  font-family: var(--theme-font2);
  border-radius: 6px;
}

.plan_name{
  text-transform: capitalize;
}

#next_payment{
  color: var(--theme-color2);
  font-family: var(--theme-font1);
  opacity: 0.6;
}

#payment_details{
  width: 100%;
  border-collapse: separate;
  border-spacing: 15px;
}

#payment_details input{
  width: 100%;
}

#place_order{
  background-color: var(--theme-color1);
  border: none;
  border-radius: 25px;
  padding: 6px 25px;
  font-family: var(--theme-font3);
  font-weight: bold;
}
</style>
