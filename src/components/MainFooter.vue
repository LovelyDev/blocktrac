<template>
  <b-row no-gutters id="main_footer">
    <b-col>
      © 2020 Dev Null Productions LLC | All Rights Reserved 

      <span id="main_about">
        <sup><router-link to="/about">About</router-link></sup>
      </span>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'MainFooter',
}
</script>

<style scoped>
#main_footer{
  text-align: center;
}

#main_about{
  margin-left: 5px;
}
</style>
