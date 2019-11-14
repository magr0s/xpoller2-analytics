import './BaseTable'

const QUESTION_COLUMNS = [
  {
    label: 'Опрос',
    name: 'question',
    field: 'text',
    required: true,
    align: 'left',
    style: 'width: 35%'
  }
]

const ANSWER_COLUMNS = [
  {
    label: 'Ответы',
    name: 'option',
    field: 'option',
    align: 'left',
    style: 'background-color: #e0e0e0'
  },
  {
    label: 'Голоса',
    name: 'votes',
    field: 'votes',
    align: 'right',
    style: 'width: 75px; background-color: #e0e0e0'
  }
]

Vue.component('PollsPanel', {
  render (h) {
    return h(
      'BaseTable',
      {
        props: {
          opts: {
            columns: QUESTION_COLUMNS
          },

          offset: ['65px', '50px'],

          endpoint: 'polls',

          limit: 60,

          title: 'Опросы'
        },

        scopedSlots: {
          body: (props) => {
            const { row, colsMap } = props
            const { text, closed, options } = row

            return [
              h(
                'QTr',
                {
                  class: 'cursor-pointer',

                  props: { props },

                  on: {
                    click: () => (props.expand = !props.expand)
                  }
                },
                [
                  h(
                    'QTd',
                    {
                      class: 'text-weight-bold',
                      props: {
                        props: {
                          col: colsMap.question,
                          row
                        }
                      }
                    },
                    text
                  )
                ]
              ),

              props.expand && h(
                'QTr',
                {
                  class: 'bg-grey-1 no-pointer-events'
                },
                [
                  h(
                    'QTd',
                    [
                      h(
                        'QTable',
                        {
                          props: {
                            columns: ANSWER_COLUMNS,
                            data: options,
                            dense: true,
                            square: true,
                            flat: true,
                            hideBottom: true
                          }
                        }
                      )
                    ]
                  )
                ]
              )
            ]
          }
        }
      }
    )
  }
})
