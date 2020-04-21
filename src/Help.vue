<template>
  <MainLayout section="help">
    <div id="help">
      <h1 style="text-align: center">Help</h1>

      <div id="help_content">
        <div id="help_categories">
          <b-list-group>
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
import MainLayout from './components/MainLayout.vue'

// TODO finish flushing out FAQ answers

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
              value : "Zerp Tracker is a persistent transaction tracker for the XRP Blockchain. It allows you to setup filter-based alerts to be notified via any number of mechanisms (known as 'sinks') upon XRP Ledger activity."
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
               value : "Many resources are avaiable online pertaining to XRP technologies. See the <a href='https://en.wikipedia.org/wiki/Ripple_(payment_protocol)'>Ripple</a> Wikipedia article and the <a href='https://xrpl.org'>XRPL.org</a> dev portal."
            }
          ]
        },

        "Account" : {
          icon : "person",
          topics : [
            {
              title : "How do I sign up?",
              value : "Answer5"
            },

            {
              title : "What if I forgot my password?",
              value : "Answer6"
            },

            {
              title : "How do I modify my profile?",
              value : "Answer7"
            },

            {
              title : "How do I create new transaction sinks?",
              value : "Answer8"
            },

            {
              title : "What kind of sinks are available for me?",
              value : "Answer9"
            }
          ]
        },

        "Filters" : {
          icon : "down-triangle-lines-gray",
          topics : [
            {
              title : "How do I create new filters?",
              value : "Answer10"
            },

            {
              title : "What is this JSONPath buisiness?",
              value : "Answer11"
            },

            {
              title : "How often am I notified of matched filters?",
              value : "Answer12"
            },

            {
              title : "How can I be altered more frequently / instantaneously?",
              value : "Answer13"
            }
          ]
        },

        "Payments" : {
          icon : "txs/payment-channels-gray",
          topics : [
            {
                title : "What are the different membership levels?",
                value : "Answer14"
            },

            {
              title : "What is a premium account?",
              value : "Answer15"
            },

            {
              title : "What payment options are available to me?",
              value : "Answer16"
            },

            {
              title : "What happs when my account becomes unfunded?",
              value : "Answer17"
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
  padding: 25px;
}

#help_content{
  border: 1px solid #ededed;
  background-color: white;
  padding: 25px;

  display: flex;
}

#help_categories{
  flex-basis:  22%;
}

.help_category{
  display: flex;
  cursor: pointer;
  border: none;
  font-family: var(--theme-font5);
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
  flex-basis: 5%;
}

#help_topics{
  flex-basis:  76%;
  padding: 15px;
}

.topic{
  padding: 25px;
  text-align: justify;
  border-bottom: 1px solid var(--theme-color3);
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
