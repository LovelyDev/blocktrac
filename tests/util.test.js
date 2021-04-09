import setup from './setup'
import util  from '../src/util'

describe("util", () => {
  describe("#round_value", () => {
    it("defaults to 0", () => {
      expect(util.round_value()).toBe(0)
    })

    describe("decimals == 0", () => {
      it("rounds value to integer", () => {
        expect(util.round_value(4.2, 0)).toBe(4)
      })
    })

    describe("decimals is not set", () => {
      describe("value < 0.0001", () => {
        it("rounds value to 10 decimal places", () => {
          expect(util.round_value(0.00001234567)).toBe(0.0000123457)
        })
      })

      describe("value >= 0.0001", () => {
        it("rounds value to 5 decimal places", () => {
          expect(util.round_value(0.123456)).toBe(0.12346)
        })
      })
    })

    it("rounds value to specified number of decimal places", () => {
      expect(util.round_value(1.2345, 3)).toBe(1.235)
    })
  })

  describe("#why_code_unsafe", () => {
    describe("code could not be parsed", () => {
      test.todo("returns 'invalid code'")
    })

    describe("FunctionExpression present", () => {
      test.todo("returns 'has_function'")
    })

    describe("ArrowFunctionExpression present", () => {
      test.todo("returns 'has_function'")
    })

    describe("FunctionDeclaration present", () => {
      test.todo("returns 'has_function'")
    })

    describe("DoWhileStatement present", () => {
      test.todo("returns 'has_loop'")
    })

    describe("ForStatement present", () => {
      test.todo("returns 'has_loop'")
    })

    describe("ForInStatement present", () => {
      test.todo("returns 'has_loop'")
    })

    describe("ForOfStatement present", () => {
      test.todo("returns 'has_loop'")
    })

    describe("WhileStatement present", () => {
      test.todo("returns 'has_loop'")
    })

    describe("CallExpression present (not parseInt or parseFloat)", () => {
      test.todo("returns 'has_call'")
    })

    describe("parseInt present", () => {
      test.todo("does not return 'has_call'")
    })

    describe("parseFloat present", () => {
      test.todo("does not return 'has_call'")
    })

    test.todo("returns empty object")
  })

  describe("#why_jsonpath_unsafe", () => {
    describe("filter_expression unsafe", () => {
      test.todo("returns why_code_unsafe")
    })

    describe("script_expression unsafe", () => {
      test.todo("returns why_code_unsafe")
    })

    test.todo("returns empty object")
  })

  describe("#delim_value", () => {
    it("returns delimiated value", () => {
      expect(util.delim_value(123456789.123)).toBe("123,456,789.123")
    })
  })

  describe("#abbrev", () => {
    it("returns abbreviated value", () => {
      expect(util.abbrev(2345000000000)).toEqual("2.35T")
      expect(util.abbrev(2345000000)).toEqual("2.35B")
      expect(util.abbrev(2345000)).toEqual("2.35M")
      expect(util.abbrev(2345)).toEqual("2.35K")
      expect(util.abbrev(234.56)).toEqual("234.56")
    })
  })

  describe("#ledger_time_to_unix", () => {
    test.todo("coverts ledger time to unix time")
  })

  describe("#hex_to_ascii", () => {
    test.todo("converts hex integer value to ascii text")
  })

  describe("#capitalize", () => {
    it("returns capitalized string", () => {
      expect(util.capitalize("abc")).toEqual("Abc")
    })
  })

  describe("#wrap_tx", () => {
    test.todo("wraps tx in top level transaction object")
  })

  describe("#is_valid_jsonpath", () => {
    describe("jsonpath can be parsed", () => {
      test.todo("returns true")
    })

    describe("jsonpath cannot be parsed", () => {
      test.todo("returns false")
    })
  })

  describe("#is_valid_jsonpath_length", () => {
    describe("jsonpath <= ziti.max_jsonpath_length", () => {
      test.todo("returns true")
    })

    describe("jsonpath > ziti.max_jsonpath_length", () => {
      test.todo("returns false")
    })
  })

  describe("#is_valid_email", () => {
    describe("email is valid", () => {
      test.todo("returns true")
    })

    describe("email is not valid", () => {
      test.todo("returns false")
    })
  })

  describe("#is_valid_sms", () => {
    describe("sms is valid", () => {
      test.todo("returns true")
    })

    describe("sms is not valid", () => {
      test.todo("returns false")
    })
  })

  describe("#is_valid_url", () => {
    describe("url is valid", () => {
      test.todo("returns true")
    })

    describe("url is not valid", () => {
      test.todo("returns false")
    })
  })

  describe("#is_valid_integer", () => {
    describe("integer is valid", () => {
      it("returns true", () => {
        expect(util.is_valid_integer(4)).toBe(true)
      })
    })

    describe("integer is not valid", () => {
      it("returns false", () => {
        expect(util.is_valid_integer("4")).toBe(false)
        expect(util.is_valid_integer(4.2)).toBe(false)
      })
    })
  })

  describe("#is_valid_float", () => {
    describe("float is valid", () => {
      it("returns true", () => {
        expect(util.is_valid_float(4.2)).toBe(true)
      })
    })

    describe("float is not valid", () => {
      it("returns false", () => {
        expect(util.is_valid_float("4.2")).toBe(false)
      })
    })
  })

  describe("#is_valid_string", () => {
    describe("string is valid", () => {
      it("returns true", () => {
        expect(util.is_valid_string("abc")).toBe(true)
      })
    })

    describe("string is not valid", () => {
      it("returns false", () => {
        expect(util.is_valid_string(4.2)).toBe(false)
      })
    })
  })

  describe("#is_valid_credit_card_number", () => {
    describe("credit_card_number is valid", () => {
      test.todo("returns true")
    })

    describe("credit_card_number is not valid", () => {
      test.todo("returns false")
    })
  })

  describe("#is_valid_credit_card_cvc", () => {
    describe("credit_card_cvc is valid", () => {
      test.todo("returns true")
    })

    describe("credit_card_cvc is not valid", () => {
      test.todo("returns false")
    })
  })

  describe("#is_jsonpath_unsafe", () => {
    describe("jsonpath is unsafe", () => {
      test.todo("returns true")
    })

    describe("jsonpath is safe", () => {
      test.todo("returns false")
    })
  })

  describe("#is_jsonpath_complex", () => {
    describe("jsonpath is complex", () => {
      test.todo("returns true")
    })

    describe("jsonpath is not complex", () => {
      test.todo("returns false")
    })
  })

  describe("#filter_matcher", () => {
    describe("template based filter", () => {
      test.todo("returns constructed jsonpath")
    })

    test.todo("returns jsonpath")
  })
})
