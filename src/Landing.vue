<template>
  <div>
    <full-page>
      <div class="section">
        <div id="first_section" class="subsection">
          <div style="text-align: center">
          <h1>{{site_name}}</h1>
          <h6>By <a href="https://devnull.network">Dev Null Productions</a></h6>
          </div>

          <img src="./assets/filter.jpg" />

          <h2 id="description1">
            Monitor XRP Blockchain transactions in real time and setup alerts to be notified via email, text, and more!
          </h2>

          <a id="nav1" class="nav" href="/live">
            <h2>
              Start Now
            </h2>
          </a>
        </div>
      </div>

      <div class="section">
        <div id="second_section" class="subsection">
          <div>
            <h2 id="description2">
              With Zerp tracker you can setup powerful filtering expressions to hone in on exactly the type of activity that you are interested in...
            </h2>

            <h3 id="description3">
              $..[?(parseInt(@.Amount) > 500000000)]
            </h3>
          </div>

          <div>
            <h3 id="description4">
              Or use pre-existing templates to setup alerts for many types of common patterns...
            </h3>

            <h3>
              <table id="description5">
                <tr>
                  <td class="label">Transaction Type:</td>
                  <td class="spacing">▼</td>
                  <td class="value">OfferCreate</td>
                </tr>

                <tr>
                  <td class="label">Transaction Result:</td>
                  <td class="spacing">▼</td>
                  <td class="value">Success</td>
                </tr>
              </table>
            </h3>
          </div>
        </div>
      </div>

      <div class="section">
        <div id="third_section" class="subsection">
          <h4 id="description6">
            <ul>
              <li>Monitor your account</li>
              <li>Look for money flow/volume patterns</li>
              <li>Watch order book updates & status</li>
              <li>Much more!</li>
            </ul>
          </h4>

          <a id="nav2" class="nav" href="/live">
            <h2>
              Begin Today
            </h2>
          </a>
        </div>
      </div>
    </full-page>
  </div>
</template>

<script>
import config from './config'

export default {
  name: 'Landing',

  computed : {
    site_name : function(){
      return config.SITE_NAME;
    }
  }
}
</script>

<style scoped>
.subsection{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
  background-size: 100% 100%;
}

.nav{
  border-radius: 5px;
  padding: 5px;
  text-decoration: none;
}

.nav h2{
  margin-bottom: 0;
}


/****/

#first_section{
  align-items: center;
  background-image: url('./assets/landing-bg1.png');
}

#description1{
  color: white;
  width: 50%;
  text-align: center;
}

#nav1{
  border: 3px solid white;
  color: white;
}

/****/

#second_section{
  background-image: url('./assets/landing-bg2.png');
  padding-left: 50px;
  padding-right: 50px;
}

#description2{
  width: 75%;
  color: white;
}

#description3{
  text-align: right;
  color: white;
}

#description5{
  float: right;
  margin-top: 25px;
  border: 1px solid black;
}

#description5 tr{
  border-bottom: 2px solid black;
}

#description5 .label{
  padding: 25px;
  background-color: #bfbfff;
}

#description5 .spacing{
  border-left: 1px solid black;
  padding: 25px;
  background-color: yellow;
}

#description5 .value{
  padding: 25px;
  background-color: yellow;
}

/****/

#third_section{
  background-image: url('./assets/landing-bg3.png');
}

#nav2{
  border: 1px solid gray;
  align-self: center;
  background-color: white;
  color: black;
}
</style>
