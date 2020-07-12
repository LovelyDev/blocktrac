describe("CreateEditFilter", () => {
  describe("dom", () => {
    describe("#by_category", () => {
      describe("!editing_filter && !saving_filter", () => {
        test.todo("is rendered")
      })

      describe("editing_filter", () => {
        test.todo("is not rendered")
      })

      describe("saving_filter", () => {
        test.todo("is not rendered")
      })

      describe("is_template_filter", () => {
        test.todo("is .active")
      })

      describe("clicked", () => {
        test.todo("sets template filter type")
      })
    })

    describe("#by_expression", () => {
      describe("!editing_filter && !saving_filter", () => {
        test.todo("is rendered")
      })

      describe("editing_filter", () => {
        test.todo("is not rendered")
      })

      describe("saving_filter", () => {
        test.todo("is not rendered")
      })

      describe("is_expression_filter", () => {
        test.todo("is .active")
      })

      describe("clicked", () => {
        test.todo("sets expression filter type")
      })
    })

    describe("is_template_filter", () => {
      test.todo("renders 'Category'")

      describe("category select", () => {
        test.todo("renders option for each template")
      })
    })

    describe("!is_template_filter", () => {
      test.todo("does not render 'Category'")
      test.todo("does not render category select")
    })

    describe("is_template_filter and template_has_params", () => {
      describe("!valid_template_expression", () => {
        test.todo("renders template_expression_error")
      })

      test.todo("renders row for each template param")

      describe("param input", () => {
        test.todo("is tied to param")

        describe("input event", () => {
          test.todo("set_param")
        })
      })

      describe("template param is not valid", () => {
        test.todo("renders template param error")
      })
    })

    describe("!is_template_filter || !template_has_params", () => {
      test.todo("does not render template params")
    })

    describe("is_expression_filter", () => {
      test.todo("renders 'Expression'")

      describe("expression input", () => {
        test.todo("is tied to jsonpath")
      })

      describe("#expression_error", () => {
        describe("!has_expression", () => {
          test.todo("renders 'Expression required'")
        })

        describe("!valid_expression", () => {
          test.todo("renders 'Invalid expression'")
        })

        describe("!expression_too_long", () => {
          test.todo("renders 'Expression too long'")
        })

        describe("!safe_expression", () => {
          test.todo("renders unsafety_reason")
        })

        describe("!complex_expression", () => {
          test.todo("renders 'Too complex'")
        })

        describe("no error", () => {
          test.todo("renders placeholder")
        })
      })

      describe("name input", () => {
        test.todo("is tied to name")
      })

      describe("name error", () => {
        describe("!has_name", () => {
          test.todo("renders 'Name required'")
        })
      })

      describe("disable checkbox", () => {
        describe("editing_filter", () => {
          test.todo("is rendered")
        })

        test.todo("is tied to disable")
      })

      describe("logged_in", () => {
        test.todo("renders SinksInputs")
      })
    })
  })

  describe("computed", () => {
    describe("#editing_filter", () => {
      describe("edit_filter is set", () => {
        test.todo("is true")
      })

      describe("edit_filter is not set", () => {
        test.todo("is false")
      })
    })

    describe("#saving_filter", () => {
      describe("saving_filter is set", () => {
        test.todo("is true")
      })

      describe("saving_filter is not set", () => {
        test.todo("is false")
      })
    })

    describe("#is_template_filter", () => {
      describe("filter_type == 'template'", () => {
        test.todo("is true")
      })

      describe("filter_type != 'template'", () => {
        test.todo("is false")
      })
    })

    describe("#is_expression_filter", () => {
      describe("filter_type == 'expression'", () => {
        test.todo("is true")
      })

      describe("filter_type != 'expression'", () => {
        test.todo("is false")
      })
    })

    describe("#has_name", () => {
      describe("name != ''", () => {
        test.todo("is true")
      })

      describe("name == ''", () => {
        test.todo("is false")
      })
    })

    describe("#has_expression", () => {
      describe("jsonpath != ''", () => {
        test.todo("is true")
      })

      describe("jsonpath == ''", () => {
        test.todo("is false")
      })
    })

    describe("#valid_expression", () => {
      describe("does not have expression", () => {
        test.todo("is false")
      })

      describe("expression is valid", () => {
        test.todo("is true")
      })

      describe("expression is not valid", () => {
        test.todo("is false")
      })
    })

    describe("#expression_too_long", () => {
      describe("does not have expression", () => {
        test.todo("is false")
      })

      describe("expression not valid", () => {
        test.todo("is false")
      })

      describe("expression is too long", () => {
        test.todo("is true")
      })

      describe("expression is not too long", () => {
        test.todo("is false")
      })
    })

    describe("#safe_expression", () => {
      describe("does not have expression", () => {
        test.todo("is false")
      })

      describe("expression not valid", () => {
        test.todo("is false")
      })

      describe("expression is safe", () => {
        test.todo("is true")
      })

      describe("expression is not safe", () => {
        test.todo("is false")
      })
    })

    describe("#complex_expression", () => {
      describe("does not have expression", () => {
        test.todo("is false")
      })

      describe("expression not valid", () => {
        test.todo("is false")
      })

      describe("expression is complex", () => {
        test.todo("is true")
      })

      describe("expression is not complex", () => {
        test.todo("is false")
      })
    })

    describe("#unsafety_reasons", () => {
      describe("safe expression", () => {
        test.todo("returns undefined")
      })

      test.todo("returns unsafety reason")
    })

    describe("#valid_template_expression", () => {
      describe("template does not have params", () => {
        test.todo("is true")
      })

      describe("template params length != params length", () => {
        test.todo("is true")
      })

      describe("params are not valid", () => {
        test.todo("is true")
      })

      describe("template based expression is valid", () => {
        test.todo("is true")
      })

      describe("template based expression is not valid", () => {
        test.todo("is false")
      })
    })

    describe("#params_are_valid", () => {
      describe("template does not have params", () => {
        test.todo("is true")
      })

      describe("template params length != params length", () => {
        test.todo("is true")
      })

      describe("a param is invalid", () => {
        test.todo("is false")
      })

      test.todo("is true")
    })

    describe("#is_valid", () => {
      describe("name is falsey", () => {
        test.todo("is false")
      })

      describe("expression filter", () => {
        describe("not valid expression", () => {
          test.todo("is false")
        })

        describe("expression too long", () => {
          test.todo("is false")
        })

        describe("expression is unsafe", () => {
          test.todo("is false")
        })

        test.todo("is true")
      })

      describe("template filter", () => {
        describe("not valid template expression", () => {
          test.todo("is false")
        })

        describe("params are not valid", () => {
          test.todo("is false")
        })

        test.todo("is true")
      })
    })

    describe("#selected_template", () => {
      test.todo("is template with given id")
    })

    describe("#template_has_params", () => {
      describe("template params.length > 0", () => {
        test.todo("is true")
      })

      describe("template params.length == 0", () => {
        test.todo("is false")
      })
    })

    describe("#template_params", () => {
      test.todo("is template params")
    })

    describe("#converted_params", () => {
      test.todo("converts integer params")
      test.todo("converts float params")
      test.todo("does not convert other params")
    })

    describe("#server_params", () => {
      test.todo("includes filter name")

      describe("not editing filter", () => {
        describe("template filter", () => {
          test.todo("includes template")
          test.todo("includes converted template params")
        })

        describe("expression filter", () => {
          test.todo("includes jsonpath")
        })
      })

      describe("editing filter", () => {
        test.todo("includes disabled flag")
      })

      describe("logged in", () => {
        test.todo("includes sinks")
      })
    })

    describe("#client_params", () => {
      test.todo("includes filter name")

      describe("is_template_filter", () => {
        test.todo("includes template")
        test.todo("includes converted template params")
      })

      describe("is_expression_filter", () => {
        test.todo("includes jsonpath")
      })
    })
  })

  describe("watch", () => {
    describe("templates", () => {
      test.todo("sets initial template")
    })
  })

  describe("methods", () => {
    describe("#set_filter_type", () => {
      test.todo("sets filter type")
    })

    describe("#set_param", () => {
      test.todo("sets specified param")
    })

    describe("#is_template_param_valid", () => {
      describe("param == ''", () => {
        test.todo("is false")
      })

      describe("param == null", () => {
        test.todo("is false")
      })

      describe("template param is string and param is not valid string", () => {
        test.todo("is false")
      })

      describe("template param is integer and param is not valid integer", () => {
        test.todo("is false")
      })

      describe("template param is float and param is not valid float", () => {
        test.todo("is false")
      })

      test.todo("is true")
    })

    describe("#template_param_error", () => {
      describe("string param", () => {
        test.todo('is param Required')
      })

      describe("integer param", () => {
        test.todo('is Number required')
      })

      describe("float param", () => {
        test.todo('is Decimal required')
      })

      test.todo("is null")
    })

    describe("#parse_edit_filter", () => {
      test.todo("sets name")

      describe("edit_filter.Template is set", () => {
        test.todo("sets template filter_type")
        test.todo("sets template")
        test.todo("sets params")
      })

      describe("edit_filter.Template is not set", () => {
        test.todo("sets expression filter_type")
        test.todo("sets jsonpath")
      })

      test.todo("sets disable flag")
    })

    describe("#parse_duplicate_filter", () => {
      test.todo("sets name")

      describe("duplicate_filter.Template is set", () => {
        test.todo("sets template filter_type")
        test.todo("sets template")
        test.todo("sets params")
      })

      describe("duplicate_filter.Template is not set", () => {
        test.todo("sets expression filter_type")
        test.todo("sets jsonpath")
      })
    })

    describe("#parse_save_filter", () => {
      describe("save_filter.jsonpath is set", () => {
        test.todo("sets expression filter_type")
        test.todo("sets jsonpath")
      })
    })
  })

  describe("#created", () => {
    describe("edit_filter is set", () => {
      test.todo("parses edit filter")
    })

    describe("duplicate_filter is set", () => {
      test.todo("parses duplicate filter")
    })

    describe("save_filter is set", () => {
      test.todo("parses save filter")
    })
  })
})
