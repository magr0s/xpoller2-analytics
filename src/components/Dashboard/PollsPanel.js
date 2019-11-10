const POLLS_DB = [
  {
    id: 1,
    title: 'Id qui sunt nostrud pariatur proident exercitation ad voluptate laboris culpa est consectetur est.',
    answers: [
      { id: 1, title: 'Minim commodo ut dolore laboris voluptate ipsum.', vote: 8 },
      { id: 2, title: 'Magna est labore adipisicing do anim ea aliqua incididunt.', vote: 14 },
      { id: 3, title: 'Minim ea duis exercitation ex..', vote: 26 }
    ]
  },
  {
    id: 2,
    title: 'Dolore labore labore labore exercitation velit magna aute elit culpa voluptate.',
    answers: [
      { id: 1, title: 'Proident aliqua ullamco eiusmod et amet officia quis.', vote: 5 },
      { id: 2, title: 'Irure consectetur laboris do duis nisi.', vote: 24 },
      { id: 3, title: 'Consequat fugiat minim magna occaecat ipsum duis tempor.', vote: 16 },
      { id: 4, title: 'Commodo dolor commodo incididunt laboris tempor adipisicing ullamco quis deserunt cupidatat proident quis veniam nisi.', vote: 8 }
    ]
  },
  {
    id: 3,
    title: 'Qui dolor et duis quis incididunt esse commodo aliqua non ea dolor occaecat incididunt.',
    answers: [
      { id: 1, title: 'Esse pariatur sunt ullamco duis dolor reprehenderit magna ullamco.', vote: 5 },
      { id: 2, title: 'Do deserunt sunt ullamco adipisicing aliquip commodo voluptate incididunt officia irure eu dolor irure.', vote: 24 },
      { id: 3, title: 'Fugiat laboris anim quis duis commodo fugiat aute culpa labore reprehenderit adipisicing nulla dolore do.', vote: 16 },
      { id: 4, title: 'Esse non magna nostrud tempor ipsum anim reprehenderit consequat.', vote: 8 }
    ]
  }
]

const QUESTION_COLUMNS = [
  {
    label: 'Опрос',
    name: 'title',
    required: true,
    field: row => (row.title),
    align: 'left',
    style: 'width: 35%'
  },
  {
    label: 'Результаты',
    name: 'results',
    align: 'left',
  }
]

const ANSWER_COLUMNS = [
  {
    label: 'Ответ',
    name: 'title',
    field: 'title',
    align: 'left'
  },
  {
    label: 'Голоса',
    name: 'vote',
    field: 'vote',
    align: 'right',
    style: 'width: 75px'
  }
]

Vue.component('PollsPanel', {
  data () {
    return {
      list: [],
      search: '',
      highlightTop: false
    }
  },

  mounted () {
    this.update()
  },

  methods: {
    update () {
      this.list = POLLS_DB
    },

    highlight (top, curr) {
      if (this.highlightTop) {
        if (top.id === curr.id) {
          return {
            'bg-light-green-2': true
          }
        } else {
          return {
            'text-grey-6': true
          }
        }
      }
    }
  },

  render (h) {
    return h(
      'QTable',
      {
        props: {
          separator: 'cell',
          wrapCells: true,
          filter: this.search,
          // hideBottom: true,
          flat: true,
          tableHeaderClass: 'bg-grey-11',

          columns: QUESTION_COLUMNS,
          data: this.list
        },

        scopedSlots: {
          'top': () => {
            return h(
              'div',
              {
                class: 'flex full-width'
              },
              [
                h(
                  'QInput',
                  {
                    attrs: {
                      placeholder: 'Поиск опроса'
                    },

                    props: {
                      value: this.search,
                      dense: true,
                      outlined: true,
                      rounded: true
                    },

                    on: {
                      input: value => (this.search = value)
                    }
                  },
                  [
                    h(
                      'QIcon',
                      {
                        props: {
                          name: 'search',
                          size: 'xs'
                        },

                        slot: 'prepend'
                      }
                    )
                  ]
                ),

                h('QSpace'),

                h(
                  'QToggle',
                  {
                    props: {
                      value: this.highlightTop,
                      label: 'Показать лучшие результаты'
                    },

                    on: {
                      input: value => (this.highlightTop = value)
                    }
                  }
                )
              ]
            )
          },

          // 'header-cell-results': (props) => {
          //   const {
          //     col: { label }
          //   } = props

          //   return h(
          //     'QTh',
          //     {
          //       attrs: {
          //         colspan: 2
          //       },

          //       props: {
          //         props
          //       }
          //     },
          //     label
          //   )
          // },

          // 'body': (props) => {
          //   const { row, cols } = props
          //   const { answers } = row
          //   const topAnswer = answers.reduce((prev, curr) => (prev.vote > curr.vote) ? prev : curr)

          //   return answers.map((answer, i) => (
          //     h(
          //       'QTr',
          //       [
          //         !i && h(
          //           'QTd',
          //           {
          //             class: 'text-weight-medium',

          //             attrs: {
          //               rowspan: answers.length
          //             },

          //             props: {
          //               props: {
          //                 col: cols[i],
          //                 row
          //               }
          //             }
          //           },
          //           row.title
          //         ),

          //         h(
          //           'QTd',
          //           {
          //             class: {
          //               ...this.highlight(topAnswer, answer)
          //             },

          //             style: {
          //               paddingLeft: '8px',
          //               paddingRight: '8px',
          //               borderLeft: '1px solid rgba(0,0,0,0.12)'
          //             }
          //           },
          //           `${++i}. ${answer.title}`
          //         ),

          //         h(
          //           'QTd',
          //           {
          //             class: {
          //               'text-right': true,
          //               ...this.highlight(topAnswer, answer)
          //             },
          //             style: "width: 75px",
          //           },
          //           answer.vote
          //         )
          //       ]
          //     )
          //   ))
          // }
          'body-cell-results': (props) => {
            const {
              row: { answers }
            } = props

            return h(
              'QTd',
              {
                style: {
                  padding: '0'
                }
              },
              [
                h(
                  'QTable',
                  {
                    props: {
                      hideBottom: true,
                      hideHeader: true,
                      separator: 'cell',
                      square: true,
                      flat: true,
                      dense: true,
                      wrapCells: true,

                      columns: ANSWER_COLUMNS,
                      data: answers
                    },

                    scopedSlots: {
                      'body': (props) => {
                        return h(
                          'QTr',
                          [
                            answers.map((answer, i) => (
                              h(
                                'QTd',
                                {
                                  style: {}
                                }
                              )
                            ))
                          ]
                        )
                      }
                    }
                  }
                )
              ]
            )
          }
        }
      }
    )
  }
})
