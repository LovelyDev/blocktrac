import util from '../util'

const CREDIT_CARD_MONTHS = [
 '01 Jan',
 '02 Feb',
 '03 Mar',
 '04 Apr',
 '05 May',
 '06 Jun',
 '07 Jul',
 '08 Aug',
 '09 Sep',
 '10 Oct',
 '11 Nov',
 '12 Dec'
]

const CURRENT_YEAR = (new Date()).getFullYear()
const CREDIT_CARD_YEARS  = [
  CURRENT_YEAR,
  CURRENT_YEAR + 1,
  CURRENT_YEAR + 2,
  CURRENT_YEAR + 3,
  CURRENT_YEAR + 4,
  CURRENT_YEAR + 5,
  CURRENT_YEAR + 6,
  CURRENT_YEAR + 7,
  CURRENT_YEAR + 8,
  CURRENT_YEAR + 9,
]

export default {
  data : function(){
    return {
      credit_card_months : CREDIT_CARD_MONTHS,
       credit_card_years : CREDIT_CARD_YEARS,

      credit_card_number : '',
         credit_card_cvc : '',
       credit_card_month : '12 Dec',
        credit_card_year : CURRENT_YEAR
    }
  },

  computed : {
    have_credit_card_number : function(){
      return !!this.credit_card_number;
    },

    invalid_credit_card_number : function(){
      return this.have_credit_card_number &&
             !util.is_valid_credit_card_number(this.credit_card_number);
    },

    have_credit_card_cvc : function(){
      return !!this.credit_card_cvc;
    },

    invalid_credit_card_cvc : function(){
      return this.have_credit_card_cvc &&
             !util.is_valid_credit_card_cvc(this.credit_card_cvc);
    }
  }
}
