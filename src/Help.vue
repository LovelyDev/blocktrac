<!--
  * Help Page
  * User friendly help topics w/ answers.
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <MainLayout section="help">
    <div id="help">
      <h1 id="help_title">Help</h1>

      <div id="help_content">
        <div id="help_categories">
          <b-list-group v-if="mq_gt_md">
            <b-list-group-item v-for="category in categories"
                               :key="category"
                               class="help_category"
                               :class="{active : is_active(category)}"
                               @click="set_active(category)">
              <div class="category_icon">
                <img :src="icon_for(category)" />
              </div>

              <span class="category_title">{{category}}</span>

              <div class="category_expand">
                <img src="./assets/right-arrow.svg" />
              </div>
            </b-list-group-item>
          </b-list-group>

          <multiselect v-else
                       v-model="active"
                       :options="categories">
            <template slot="option" slot-scope="props">
              <div class="help_category">
                <div class="category_icon">
                  <img :src="icon_for(props.option)" />
                </div>

                <span class="category_title">{{props.option}}</span>
              </div>
            </template>
          </multiselect>
        </div>

        <div id="help_topics">
          <div v-for="topic in topics" :key="topic.title" class="topic">
            <div class="topic_title">{{topic.title}}</div>
            <div class="topic_content" v-html="topic.value" />
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from './components/MainLayout'

import ziti from './ziti'

export default {
  name: 'Help',
  components: {
    MainLayout
  },

  data : function(){
    return {
      active : 'General',

      data : {
        "General" : {
          icon : "gear-gray",
          topics : [
            {
              title : "What is Zerp Tracker?",
              value : "Zerp Tracker is a persistent transaction tracker for the XRP Blockchain. It allows you to setup filters to notified you of ledger activity via any number of mechanisms."
            },

            {
               title : "What is XRP?",
               value : "XRP is a popular Blockchain technology being adopted by banks and financial institutions worldwide for cross border remittances."
            },

            {
               title : "Why should I care about transactions?",
               value : "Transactions are a core component of the XRP Ledger, allowing users to send and receive currencies and tokens representing value over the Internet."
            },

            {
               title : "Where can I find out more?",
               value : "Many resources are avaiable online pertaining to XRP technologies. See the <a href='https://xrpl.org'>XRPL.org</a> portal for example."
            },

            {
               title : "Help! I'm really lost / need tech support / have questions...",
               value : "You may contact Dev Null Productions using the form on the <a href='/about'>About</a> page"
            }
          ]
        },

        "Account" : {
          icon : "person",
          topics : [
            {
              title : "How do I sign up?",
              value : "You may sign up for a new Zerp Tracker account by clicking <b>Register</b> in the upper right corner. You will be prompted to supply a valid email and password. We will send you an email containing a confirmation link, one confirmed you are good to go!"
            },

            {
              title : "What if I forgot my password?",
              value : "Passwords may be reset by clicking <b>Login</b> and then <b>Forgot Password?</b>. You will be prompted for the email you supplied when you signed up. The password reset link will be sent to that."
            },

            {
              title : "How do I modify my profile?",
              value : "Once logged in, click <b>My Account</b> in the upper right and then click <b>Profile</b> in the menu. You can then change your email, password, billing info and more from there."
            },

            {
              title : "How am I notified of new transactions?",
              value : "You can setup sinks (notification endpoints) to be notified of transactions via email, text message, and webhooks. These can all be configured via the <b>Filter Settings</b> on the left-hand sidebar once logged in. Note certain sink types are only available to users signed up for premium plans."
            },

            {
              title : "How many filters / sinks am I permitted to have?",
              value : "This is determined on a plan-by-plan basis, see <a href='/plans'>Plans</a> for more details. You may purchase up to " + ziti.max_additions.filters + " additional filters and " + ziti.max_additions.sinks + " additional sinks beyond your plan"
            }
          ]
        },

        "Filters" : {
          icon : "down-triangle-lines-gray",
          topics : [
            {
              title : "How do I create new filters?",
              value : "Filters may be created by clicking <b>Add New Filter</b> on the left hand sidebar. Note you will only be able to create a certain amount of filters depending on your subscription level."
            },

            {
              title : "What is this JSONPath business?",
              value : "JSONPath is a powerful expression matching language that is used when inspecting each and every transaction in the live transaction stream. There are many online resources with JSONPath documentation and examples, we encourage all users to explore the powerful deep-inspection capabilities that this syntax supports."
            },

            {
              title : "What if I am a non-technical person?",
              value : "Zerp Tracker also provides an extensive library of pre-built expressions for you to use in lieu of writing your own JSONPath filters. Each expression is parameterized with placeholders allowing you to customize them to match exactly the type of transactions you are looking for. Create a new filter and select the <b>Category</b> option to see all the ones that are available!"
            },

            {
              title : "How often am I notified of matched filters?",
              value : "Depending on your subscription level, you will be notified of transactions once a certain number of them have been matched and/or a minimum amount of time has gone by. See the different <a href='/plans'>Plans</a> for more info"
            },

            {
              title : "How can I be altered more frequently / instantaneously?",
              value : "Sign up for a higher subscription level to access more features."
            },

            {
              title : "What happens if my email, sms, url is unavailable when a notification is sent?",
              value : "At the current time we only send notifications once when Zerp Tracker detects matching transactions. Please make sure the target destination is online and accessible to ensure you receive notifications. In the future we may offer the ability to retry notification attempts."
            },

            {
              title : "Can I control how often I receive notifications?",
              value : "Yes! You may edit transaction batch sizes and notification times via the <b>Settings</b> control in the <b>Filters List</b>. You will receive a notification whichever comes first, a filter matches the number of transactions specified by batch size or the amount of time specified by notification time passes since the first matched transaction is detected."
            }
          ]
        },

        "Payments" : {
          icon : "txs/payment-channels-gray",
          topics : [
            {
                title : "What are the different membership levels?",
                value : "Currently " + ziti.membership_levels.join(", ") + " plans are available"
            },

            {
              title : "What is a pro account?",
              value : "Everything above the first (free) membership tier is considered a <b>pro</b> account. These provide advanced features and quicker notification times."
            },

            {
                title : "How much do Pro accounts cost?",
                value : "See available <a href='/plans'>Plans</a> for more details."
            },

            {
              title : "What payment options are available to me?",
              value : "We currently accept only accept credit card payments but are exploring additional payment options (available in the near future)."
            },

            {
              title : "What happens when my account becomes unfunded?",
              value : "You will automatically be billed for your new subscription period when your current one ends. If we are unable to bill your credit card your account will be downgraded to the free tier. If you update your information at any point we will restore your account along with the filters you created."
            }
          ]
        },
      }
    }
  },

  computed : {
    categories : function(){
      return Object.keys(this.data);
    },

    topics : function(){
      return this.data[this.active].topics;
    }
  },

  methods : {
    is_active : function(category){
      return this.active == category;
    },

    set_active : function(category){
      this.active = category;
    },

    icon_for : function(category){
      return require('./assets/' + this.data[category].icon + '.svg');
    }
  }
}
</script>

<style scoped>
#help{
  margin-bottom: 25px;
  padding: 5px;
  padding-top: 25px;
}

#help_title{
  font-family: var(--theme-font3);
  font-weight: bold;
}

#help_content{
  padding: 25px;
  display: flex;
  justify-content: space-between;
}

#main_layout.md #help_content,
#main_layout.sm #help_content,
#main_layout.xs #help_content{
  padding: 5px;
  flex-direction: column;
}

#help_categories{
  flex-basis:  18%;
}

.help_category{
  display: flex;
  cursor: pointer;
  border: none;
  font-family: var(--theme-font5);
  padding: 10px;
  background-color: unset;
  color: #ABB4BF;
}

#main_layout.md .help_category,
#main_layout.sm .help_category,
#main_layout.xs .help_category{
  padding: unset;
}

.help_category:first-child{
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.help_category:last-child{
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.help_category.active{
  background-color: var(--theme-color6);
  border: 1px solid var(--theme-color1);
  color: black;
  opacity: 0.7;
}

.category_icon{
  flex-basis: 5%;
}

.category_icon img{
  width: 20px;
}

.category_title{
  flex-grow: 1;
  margin-left: 10px;
}

.category_expand{
  flex-basis: 7%;
}

#help_topics{
  flex-basis: 80%;
  padding: 15px;
  border: 1px solid #ededed;
  background-color: white;
}

#main_layout.md #help_topics,
#main_layout.sm #help_topics,
#main_layout.xs #help_topics{
  padding: unset;
  border: unset;
  background-color: unset;
}

.topic{
  padding: 10px;
  text-align: justify;
  border-bottom: 1px solid var(--theme-color3);
}

#main_layout.md .topic,
#main_layout.sm .topic,
#main_layout.xs .topic{
  text-align: unset;
}

.topic:last-child{
  border-bottom: none;
}

.topic_title{
  font-weight: bold;
  font-family: var(--theme-font4);
  margin-bottom: 5px;
}

.topic_content{
  font-family: var(--theme-font1);
}
</style>
