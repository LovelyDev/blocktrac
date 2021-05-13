import { shallow_mount_vue } from '../../setup';
import XRPCurrencyAmount from '../../../src/components/currency_amount/XRP.vue';
import config from '../../../src/config/config';


describe("XRPCurrencyAmount", () => {
  let component;

  describe("dom", () => {
    describe("drops", () => {
      it('renders xrp amount', () => { // TODO this seems to be an unexpected failure 111 / 1000000 = 0.000111 ! .amount = 0.00011
        component = shallow_mount_vue(XRPCurrencyAmount, {
          propsData: {
            amount: 111,
            no_amount: false
          }
        });
        expect(component.find(".amount").text()).toBe('0.00011'); // abbrev util limits this small number to 5 decimals
      });

      describe("no amount", () => {
        it('does not render amount', () => {
          component = shallow_mount_vue(XRPCurrencyAmount, {
            propsData: {
              amount: 111,
              no_amount: true
            }
          });
          expect(component.find(".amount")).not.toExist();
        });
      })
    })

    describe("iou", () => {
      it('renders amount', () => {
        component = shallow_mount_vue(XRPCurrencyAmount, {
          propsData: {
            amount: {
              currency: 'XRP',
              value: 100
            },
            no_amount: false
          }
        });
        expect(component.find(".amount").text()).toBe("100");
      });

      describe("no amount", () => {
        it('does not render amount', () => {
          component = shallow_mount_vue(XRPCurrencyAmount, {
            propsData: {
              amount: {
                currency: 'XRP',
                value: 100
              },
              no_amount: true
            }
          });
          expect(component.find(".amount")).not.toExist();
        });
      })

      it('renders currency icon', () => {
        const currencyString = 'XRP';
        component = shallow_mount_vue(XRPCurrencyAmount, {
          propsData: {
            amount: {
              currency: currencyString,
              value: 100
            },
          }
        });
        const currencyIconComponent = component.findComponent({ name: 'CurrencyIcon' });
        expect(currencyIconComponent.exists()).toBe(true);
        expect(currencyIconComponent.props('currency')).toBe(currencyString);
      });

      it('renders issuer link', () => {
        const issuerString = 'abc123';
        component = shallow_mount_vue(XRPCurrencyAmount, {
          propsData: {
            amount: {
              currency: 'XRP',
              value: 100,
              issuer: issuerString
            }
          }
        });
        const accountLinkComponent = component.findComponent({ name: 'AccountLink' });
        expect(accountLinkComponent.exists()).toBe(true);
        expect(accountLinkComponent.props('account')).toBe(issuerString);
      });

      describe("no issuer", () => {
        it('does not render issuer', () => {
          component = shallow_mount_vue(XRPCurrencyAmount, {
            propsData: {
              amount: {
                currency: 'XRP',
                value: 100
              },
              no_issuer: true
            }
          });
          const accountLinkComponent = component.findComponent({ name: 'AccountLink' });
          expect(accountLinkComponent.exists()).toBe(false);
        });
      })
    })
  })

  describe("#computed", () => {
    describe("#is_drops", () => {
      describe("typeof amount is a string", () => {
        it('is true', () => {
          component = shallow_mount_vue(XRPCurrencyAmount, {
            propsData: {
              amount: '1000'
            }
          });
          expect(component.vm.is_drops).toBe(true);
        });
      })

      describe("typeof amount is a number", () => {
        it('is true', () => {
          component = shallow_mount_vue(XRPCurrencyAmount, {
            propsData: {
              amount: 1000
            }
          });
          expect(component.vm.is_drops).toBe(true);
        });
      })

      describe("typeof amount is not a string or number", () => {
        it('is false', () => {
          component = shallow_mount_vue(XRPCurrencyAmount, {
            propsData: {
              amount: {
                currency: 'XRP',
                value: 100
              },
            }
          });
          expect(component.vm.is_drops).toBe(false);
        });
      })
    })

    describe("#is_iou", () => {
      it('equals !is_drops', async () => {
        component = shallow_mount_vue(XRPCurrencyAmount, {
          propsData: {
            amount: 100
          }
        });
        expect(component.vm.is_iou).toBe(!component.vm.is_drops);

        await component.setProps({
          amount: {
            currency: 'XRP',
            value: 100
          }
        });
        expect(component.vm.is_iou).toBe(!component.vm.is_drops);
      });
    })

    describe("xrp amount", () => {
      const oneMillion = 1000000 / config.DROPS_PER_XRP;
      const twoMillion = 2000000 / config.DROPS_PER_XRP;
      it.each`
      dividend    | quotient
      ${1000000}  | ${oneMillion}
      ${2000000}  | ${twoMillion}
    `('divides amount by DROPS_PER_XRP', ({dividend, quotient}) => {
        component = shallow_mount_vue(XRPCurrencyAmount, {
          propsData: {
            amount: dividend
          }
        });
        expect(component.vm.xrp_amount).toBe(quotient);
      });
    })
  })
})
