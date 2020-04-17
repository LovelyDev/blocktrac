<template>
  <div id="account_monitor">
    <p><b>Monitor your account</b></p>

    <div id="account_monitor_input_container">
      <div id="account_monitor_input_wrapper">
        <span id="account_monitor_icon">
          <img src="../assets/search.svg" />
        </span>

        <input type="text"
               placeholder="Account ID" /> </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AccountMonitor'
}
</script>

<style scoped>
#account_monitor{
  text-align: center;
}

p{
  margin-bottom: 5px;
}

#account_monitor_input_container{
  background-color: white;
  padding: 25px;
  border: 1px solid var(--theme-color3);
}

#account_monitor_input_wrapper{
  position: relative;
}

#account_monitor_icon{
  position: absolute;
  left: 10px;
  top: 5px;
  font-size: 1.2rem;
}

input{
  width: 100%;
  padding-left: 30px;
  padding-top: 10px;
  padding-bottom: 7px;
  color: var(--theme-color4);
}
</style>
