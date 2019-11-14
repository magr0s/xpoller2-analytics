import './BaseTable'

const USER_COLUMNS = [
  {
    name: 'name',
    required: true,
    align: 'left'
  }
]

const QUESTION_COLUMNS = [
  {
    name: 'question',
    required: true,
    align: 'left'
  }
]

Vue.component('UsersPanel', {
  methods: {
    buildUserName ({ username, fullname, city }) {
      if (fullname) {
        let str = fullname

        if (city) {
          str += ` г. ${city}`
        }

        return str
      }

      return username
    }
  },

  render (h) {
    return h(
      'BaseTable',
      {
        props: {
          opts: {
            columns: USER_COLUMNS
          },

          offset: ['65px', '50px'],

          endpoint: 'users',

          limit: 60,

          title: 'Пользователи'
        },

        scopedSlots: {
          body: (props) => {
            const { row, colsMap } = props
            const { polls } = row

            return [
              h(
                'QTr',
                {
                  props: { props },

                  on: {
                    click: () => (props.expand = !props.expand)
                  }
                },
                [
                  h(
                    'QTd',
                    {
                      class: ' cursor-pointer text-weight-bold',

                      props: {
                        col: colsMap.name,
                        row
                      }
                    },
                    this.buildUserName(row)
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
                    {
                      class: 'highlight--disable'
                    },
                    [
                      (polls.length)
                        ? h(
                          'QTable',
                          {
                            props: {
                              data: polls,
                              columns: QUESTION_COLUMNS,
                              hideHeader: true,
                              hideBottom: true,
                              dense: true,
                              square: true,
                              flat: true,
                              separator: 'cell',
                              tableStyle: {
                                maxHeight: '240px'
                              },
                              virtualScroll: true
                            },

                            scopedSlots: {
                              body: (props) => {
                                const { row, colsMap } = props
                                const { question, option } = row

                                return [
                                  h(
                                    'QTr',
                                    {
                                      props: { props },

                                      on: {
                                        click: () => (props.expand = !props.expand)
                                      }
                                    },
                                    [
                                      h(
                                        'QTd',
                                        {
                                          class: 'text-weight-medium highlight--disable bg-white cursor-pointer',

                                          props: {
                                            col: colsMap.question,
                                            row
                                          },
                                        },
                                        question.text
                                      )
                                    ]
                                  ),

                                  props.expand && h(
                                    'QTr',
                                    {
                                      class: 'bg-grey-4',

                                      props: { props }
                                    },
                                    [
                                      h(
                                        'QTd',
                                        option.option
                                      )
                                    ]
                                  )
                                ]
                              }
                            }
                          }
                        )
                        : h(
                          'span',
                          {
                            class: 'text-grey-8'
                          },
                          'Этот пользователь еще не отвечал на опросы'
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

// Vue.component('UsersPanel', {
//   data () {
//     return {
//       list: [],
//       user: null,
//       search: '',
//       pagination: {
//         rowsPerPage: 0
//       }
//     }
//   },

//   computed: {
//     polls () {
//       return (this.user) ? this.user.polls : []
//     }
//   },

//   methods: {
//     filterFn (val, update, abort) {
//       update(() => {
//         if (val.length >= 2) {
//           try {
//             this.$axios.get(process.env.api, {
//               params: {
//                 endpoint: 'users',
//                 // query: val
//               }
//             })
//               .then(({ data }) => {
//                 if (data.success) {
//                   this.list = data.results
//                 }
//               })
//           } catch (e) {
//             throw e
//           }
//         }
//       })
//     }
//   },

//   render (h) {
//     return h(
//       'QTable',
//       {
//         class: 'full-height',

//         props: {
//           separator: 'cell',
//           wrapCells: true,
//           filter: this.search,
//           hideBottom: true,
//           virtualScroll: true,
//           flat: true,
//           tableHeaderClass: 'bg-grey-11',
//           tableStyle: 'height: calc(100% - 65px)',
//           rowPerPageOptions: [0],
//           pagination: this.pagination,

//           columns: COLUMNS,
//           data: this.polls
//         },

//         on: {
//           'update:pagination': value => (this.pagination = value)
//         },

//         scopedSlots: {
//           'top': () => {
//             return h(
//               'div',
//               {
//                 class: 'flex full-width'
//               },
//               [
//                 h(
//                   'QSelect',
//                   {
//                     style: 'min-width: 226px',

//                     props: {
//                       value: this.user,
//                       label: 'Пользователь',
//                       dense: true,
//                       outlined: true,
//                       rounded: true,
//                       useInput: true,
//                       inputDebounce: 100,
//                       clearable: true,
//                       hideDropdownIcon: true,
//                       optionsDense: true,

//                       options: this.list,
//                       optionValue: 'id',
//                       optionLabel: 'username'
//                     },

//                     on: {
//                       input: value => (this.user = value),

//                       filter: this.filterFn,

//                       clear: value => (this.list = [])
//                     }
//                   }
//                 ),

//                 h('QSpace'),

//                 h(
//                   'QInput',
//                   {
//                     attrs: {
//                       placeholder: 'Поиск опроса'
//                     },

//                     props: {
//                       value: this.search,
//                       dense: true,
//                       outlined: true,
//                       rounded: true
//                     },

//                     on: {
//                       input: value => (this.search = value)
//                     }
//                   },
//                   [
//                     h(
//                       'QIcon',
//                       {
//                         props: {
//                           name: 'search',
//                           size: 'xs'
//                         },

//                         slot: 'prepend'
//                       }
//                     )
//                   ]
//                 )
//               ]
//             )
//           },

//           'body-cell-question': (props) => {
//             const { row } = props
//             const {
//               question: { closed, text }
//             } = row

//             return h(
//               'QTd',
//               {
//                 class: 'text-weight-medium',

//                 props: {
//                   props
//                 }
//               },
//               [
//                 h(
//                   'QIcon',
//                   {
//                     class: 'q-mr-xs',

//                     props: {
//                       name: (closed) ? 'lock' : 'lock_open',
//                       color: (closed) ? 'negative' : 'positive',
//                       size: '12px',
//                       round: true
//                     }
//                   },
//                   [
//                     h(
//                       'QTooltip',
//                       {
//                         props: {
//                           anchor: 'top middle',
//                           self: 'bottom middle',
//                           transitionShow: 'rotate',
//                           transitionHide: 'fade'
//                         }
//                       },
//                       (closed) ? 'Опрос закрыт' : 'Открыт для голосования'
//                     )
//                   ]
//                 ),

//                 text
//               ]
//             )
//           }
//         }
//       }
//     )
//   }
// })
