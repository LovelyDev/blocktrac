<template>
  <MainLayout section="profile">
    <div id="profile">
      <h1>Account:</h1>

      <b-container id="profile_content">
        <b-row class="header_row">
          <b-col>
            <b>My profile</b>
          </b-col>
        </b-row>

        <b-row class="input_row">
          <b-col>
            Email address
          </b-col>

          <b-col>
            {{email}}
          </b-col>

          <b-col class="action">
            Update
          </b-col>
        </b-row>

        <b-row class="input_row">
          <b-col>
            Password
          </b-col>

          <b-col>
           *****
          </b-col>

          <b-col class="action">
            Change Password
          </b-col>
        </b-row>

        <b-row class="header_row">
          <b-col>
            <b>Plan details</b>
          </b-col>
        </b-row>

        <b-row class="input_row">
          <b-col>
            Plan details
          </b-col>

          <b-col>
            {{membership_level}}
          </b-col>

          <b-col class="action">
            Change plan
          </b-col>
        </b-row>

        <b-row class="header_row">
          <b-col>
            <b>Billing</b>
          </b-col>
        </b-row>

        <b-row class="input_row">
          <b-col>
            TODO
          </b-col>
        </b-row>
      </b-container>
    </div>
  </MainLayout>
</template>

<script>
import MainLayout     from './components/MainLayout.vue'
import Authentication from './mixins/authentication'

// TODO batch size (range above in template and default below in script)
//      from payment plan / config

export default {
  name: 'Profile',

  mixins : [Authentication],

  components: {
    MainLayout
  }
}
</script>

<style scoped>
#profile{
  width: 50%;
  margin: auto;
  margin-top: 20px;
}

#profile_content{
  background-color: white;
  border: 1px solid #ededed;
  padding: 25px;
}

.header_row{
  margin: 20px;
  border-bottom: 1px solid #ededed;
}

.input_row{
  margin: 20px;
}

.input_row .col{
  padding: 10px;
}

.action{
  color: blue;
  cursor: pointer;
}
</style>
