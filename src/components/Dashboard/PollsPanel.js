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
    label: 'Ответ',
    name: 'option',
    field: 'option',
    align: 'left'
  },
  {
    label: 'Голоса',
    name: 'votes',
    field: 'votes',
    align: 'right',
    style: 'width: 75px'
  }
]

Vue.component('PollsPanel', {
  data () {
    return {
      list: [],
      search: '',
      highlightTop: false,
      pagination: {
        rowsPerPage: 15
      },
      loading: true
    }
  },

  // methods: {
  //   onRefresh () {
  //     this.loading = true
  //     try {
  //       this.$axios.get(process.env.api, {
  //         params: {
  //           endpoint: 'polls',
  //           start: 10
  //         }
  //       })
  //         .then(({ data }) => {
  //           if (data.success) {
  //             this.list = data.results
  //           }
  //         })
  //         .finally(() => (this.loading = false))
  //     } catch (e) {
  //       throw e
  //     }

  //     // this.list = POLLS_DB
  //   },

  //   highlight (top, curr) {
  //     if (this.highlightTop) {
  //       if (top.id === curr.id) {
  //         return {
  //           'bg-light-green-2': true
  //         }
  //       } else {
  //         return {
  //           'text-grey-6': true
  //         }
  //       }
  //     }
  //   }
  // },

  render (h) {
    return h(
      'BaseTable',
      {
        props: {
          opts: {
            columns: QUESTION_COLUMNS
          },

          offset: ['65px', '50px'],

          endpoint: 'polls'
        }
      }
    )
    // return h(
    //   'QTable',
    //   {
    //     class: 'full-height',

    //     props: {
    //       separator: 'cell',
    //       wrapCells: true,
    //       filter: this.search,
    //       hideBottom: true,
    //       virtualScroll: true,
    //       flat: true,
    //       tableHeaderClass: 'bg-grey-11',
    //       tableStyle: 'height: calc(100% - 65px)',
    //       rowPerPageOptions: [0],
    //       pagination: this.pagination,
    //       loading: this.loading,

    //       columns: QUESTION_COLUMNS,
    //       data: this.list
    //     },

    //     on: {
    //       'update:pagination': value => (this.pagination = value)
    //     },

    //     scopedSlots: {
    //       'top': () => {
    //         return h(
    //           'div',
    //           {
    //             class: 'flex full-width'
    //           },
    //           [
    //             h(
    //               'QInput',
    //               {
    //                 attrs: {
    //                   placeholder: 'Поиск опроса'
    //                 },

    //                 props: {
    //                   value: this.search,
    //                   dense: true,
    //                   outlined: true,
    //                   rounded: true
    //                 },

    //                 on: {
    //                   input: value => (this.search = value)
    //                 }
    //               },
    //               [
    //                 h(
    //                   'QIcon',
    //                   {
    //                     props: {
    //                       name: 'search',
    //                       size: 'xs'
    //                     },

    //                     slot: 'prepend'
    //                   }
    //                 )
    //               ]
    //             ),

    //             h('QSpace'),

    //             h(
    //               'QToggle',
    //               {
    //                 props: {
    //                   value: this.highlightTop,
    //                   label: 'Показать лучшие результаты'
    //                 },

    //                 on: {
    //                   input: value => (this.highlightTop = value)
    //                 }
    //               }
    //             )
    //           ]
    //         )
    //       },

    //       'body-cell-question': (props) => {
    //         const {
    //           row: { closed, text }
    //         } = props

    //         return h(
    //           'QTd',
    //           {
    //             class: 'text-weight-medium',

    //             props: {
    //               props
    //             }
    //           },
    //           [
    //             h(
    //               'QIcon',
    //               {
    //                 class: 'q-mr-xs',

    //                 props: {
    //                   name: (closed) ? 'lock' : 'lock_open',
    //                   color: (closed) ? 'negative' : 'positive',
    //                   size: '12px',
    //                   round: true
    //                 }
    //               },
    //               [
    //                 h(
    //                   'QTooltip',
    //                   {
    //                     props: {
    //                       anchor: 'top middle',
    //                       self: 'bottom middle',
    //                       transitionShow: 'rotate',
    //                       transitionHide: 'fade'
    //                     }
    //                   },
    //                   (closed) ? 'Опрос закрыт' : 'Открыт для голосования'
    //                 )
    //               ]
    //             ),

    //             text
    //           ]
    //         )
    //       },

    //       'body-cell-result': (props) => {
    //         const {
    //           row: { options }
    //         } = props
    //         const topOption = options.reduce((prev, curr) => (parseInt(prev.votes) > parseInt(curr.votes)) ? prev : curr)

    //         return h(
    //           'QTd',
    //           {
    //             style: {
    //               padding: '0'
    //             }
    //           },
    //           [
    //             h(
    //               'QTable',
    //               {
    //                 props: {
    //                   hideBottom: true,
    //                   hideHeader: true,
    //                   separator: 'cell',
    //                   square: true,
    //                   flat: true,
    //                   dense: true,
    //                   wrapCells: true,

    //                   columns: ANSWER_COLUMNS,
    //                   data: options
    //                 },

    //                 scopedSlots: {
    //                   'body': (props) => {
    //                     const { row, cols } = props
    //                     return h(
    //                       'QTr',
    //                       {
    //                         class: {
    //                           ...this.highlight(topOption, row)
    //                         }
    //                       },
    //                       cols.map(col => (
    //                         h(
    //                           'QTd',
    //                           {
    //                             props: {
    //                               props: {
    //                                 col,
    //                                 row
    //                               }
    //                             }
    //                           },
    //                           row[col.name]
    //                         )
    //                       ))
    //                     )
    //                   }
    //                 }
    //               }
    //             )
    //           ]
    //         )
    //       }
    //     }
    //   }
    // )
  }
})
