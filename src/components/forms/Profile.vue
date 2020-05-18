<!--
  * Profile Form
  * High level user account settings and options. Here the user
  * can change their email, password, and billing information.
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <b-container id="profile_form">
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
        <img src="../../assets/pencil-blue.svg" />
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
        <img src="../../assets/pencil-blue.svg" />
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
        <router-link to="/plans">Change plan</router-link>
      </b-col>

      <b-col v-else
             class="action" cols=1>
        <img src="../../assets/pencil-blue.svg" />
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
</template>

<script>
import Authentication from '../../mixins/authentication'

// TODO handle change email / password

export default {
  name: 'Profile',

  mixins : [Authentication],
}
</script>

<style scoped>
#profile_form{
  background-color: white;
  border: 1px solid #ededed;
  padding: 25px;
  max-width: unset;
}

#main_layout.md #profile_form,
#main_layout.sm #profile_form,
#main_layout.xs #profile_form{
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
  font-size: 3.6vw;
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

.action a{
  color: blue;
}

.action a:hover{
  text-decoration: none;
}

#membership_level{
  text-transform: capitalize;
}
</style>
