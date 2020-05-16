<!--
  * Profile Page
  * High level user account settings and options. Here the user
  * can change their email, password, and billing information.
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <MainLayout section="profile">
    <div id="profile">
      <h1>Account:</h1>

      <b-container id="profile_content">
        <b-row class="header_row">
          <b-col class="label">
            My profile
          </b-col>
        </b-row>

        <b-row class="input_row">
          <b-col  class="label" cols=4>
            Email address
          </b-col>

          <b-col class="value">
            {{email}}
          </b-col>

          <b-col v-if="mq_gt_sm"
                 class="action" cols=2>
            Update
          </b-col>

          <b-col v-else
                 class="action" cols="1">
            <img src="./assets/pencil-blue.svg" />
          </b-col>
        </b-row>

        <b-row class="input_row">
          <b-col class="label" cols=4>
            Password
          </b-col>

          <b-col class="value">
           *****
          </b-col>

          <b-col v-if="mq_gt_sm"
                 class="action" cols=2>
            Change Password
          </b-col>

          <b-col v-else
                 class="action" cols=1>
            <img src="./assets/pencil-blue.svg" />
          </b-col>
        </b-row>

        <b-row class="header_row">
          <b-col class="label">
            Plan details
          </b-col>
        </b-row>

        <b-row class="input_row">
          <b-col class="label" cols=4>
            Plan details
          </b-col>

          <b-col id="membership_level" class="value">
            {{membership_level}}
          </b-col>

          <b-col v-if="mq_gt_sm"
                 class="action" cols=2>
            Change plan
          </b-col>

          <b-col v-else
                 class="action" cols=1>
            <img src="./assets/pencil-blue.svg" />
          </b-col>
        </b-row>

        <b-row class="header_row">
          <b-col class="label">
            Billing
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
import MainLayout     from './components/MainLayout'
import Authentication from './mixins/authentication'

// TODO handle change email / password / plan actions

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
  width: 70%;
  margin: auto;
  margin-top: 20px;
  font-family: var(--theme-font4);
}

#main_layout.md #profile,
#main_layout.sm #profile,
#main_layout.xs #profile{
  width: unset;
}

#profile h1{
  font-family: var(--theme-font3);
}

#profile_content{
  background-color: white;
  border: 1px solid #ededed;
  padding: 25px;
  max-width: unset;
}

#main_layout.md #profile_content,
#main_layout.sm #profile_content,
#main_layout.xs #profile_content{
  padding: 10px;
}

.label{
  padding: 0;
}

#main_layout.md .label,
#main_layout.sm .label,
#main_layout.xs .label,
#main_layout.md .value,
#main_layout.sm .value,
#main_layout.xs .value{
  font-size: 3.8vw;
}

.header_row{
  margin: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #ededed;
  font-weight: bold;
}

#main_layout.md .header_row,
#main_layout.sm .header_row,
#main_layout.xs .header_row{
  margin: 10px 0;
}

.input_row{
  margin: 20px;
}

#main_layout.md .input_row,
#main_layout.sm .input_row,
#main_layout.xs .input_row{
  margin: 20px 0;
}

.action{
  color: blue;
  cursor: pointer;
}

#membership_level{
  text-transform: capitalize;
}
</style>
