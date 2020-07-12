const mqs = ['xs', 'sm', 'md', 'lg', 'xl']

describe("mq", () => {
  for(var mqi = 0; mqi < mqs.length; mqi += 1){
    const mq = mqs[mqi]

    describe("mq_" + mq, () => {
      describe("mq == " + mq, () => {
        test.todo("is true")
      })

      describe("mq != " + mq, () => {
        test.todo("is false")
      })
    })

    if(mqi != 0){
      describe("mq_lt_" + mq, () => {
        describe("mq < " + mq, () => {
          test.todo("is true")
        })

        describe("mq == " + mq, () => {
          test.todo("is false")
        })

        describe("mq > " + mq, () => {
          test.todo("is false")
        })
      })

      describe("mq_lte_" + mq, () => {
        describe("mq < " + mq, () => {
          test.todo("is true")
        })

        describe("mq == " + mq, () => {
          test.todo("is true")
        })

        describe("mq > " + mq, () => {
          test.todo("is false")
        })
      })
    }

    if(mqi != mqs.length - 1){
      describe("mq_gt_" + mq, () => {
        describe("mq < " + mq, () => {
          test.todo("is false")
        })

        describe("mq == " + mq, () => {
          test.todo("is false")
        })

        describe("mq > " + mq, () => {
          test.todo("is true")
        })
      })

      describe("mq_gte_" + mq, () => {
        describe("mq < " + mq, () => {
          test.todo("is false")
        })

        describe("mq == " + mq, () => {
          test.todo("is true")
        })

        describe("mq > " + mq, () => {
          test.todo("is true")
        })
      })
    }
  }
})
