import './BaseTable'

const POLL_COLUMNS = [
  {
    name: 'poll',
    field: 'name',
    align: 'left'
  }
]

const QUESTION_COLUMNS = [
  {
    label: 'Вопросы',
    name: 'question',
    field: 'text',
    align: 'left'
  }
]

const OPTION_COLUMNS = [
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
            columns: POLL_COLUMNS
          },

          offset: ['65px', '50px'],

          endpoint: 'polls',

          limit: 60,

          title: 'Тесты'
        },

        scopedSlots: {
          body: (props) => {
            const { row, colsMap } = props
            const { name, questions } = row

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
                          col: colsMap.poll,
                          row
                        }
                      }
                    },
                    name
                  )
                ]
              ),

              props.expand && h(
                'QTr',
                {
                  class: 'bg-grey-1'
                },
                [
                  h(
                    'QTd',
                    [
                      h(
                        'QTable',
                        {
                          props: {
                            columns: QUESTION_COLUMNS,
                            data: questions,
                            dense: true,
                            square: true,
                            flat: true,
                            hideBottom: true
                          },

                          scopedSlots: {
                            body: (props) => {
                              const { row, colsMap } = props
                              const { text, options } = row

                              return [
                                h(
                                  'QTr',
                                  {
                                    props: { props }
                                  },
                                  [
                                    h(
                                      'QTd',
                                      {
                                        class: 'cursor-pointer',

                                        props: {
                                          col: colsMap.question,
                                          row
                                        },
                                        on: {
                                          click: () => (props.expand = !props.expand)
                                        }
                                      },
                                      text
                                    )
                                  ]
                                ),

                                props.expand && h(
                                  'QTr',
                                  [
                                    h(
                                      'QTd',
                                      [
                                        h(
                                          'QTable',
                                          {
                                            props: {
                                              data: options,
                                              columns: OPTION_COLUMNS,
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
