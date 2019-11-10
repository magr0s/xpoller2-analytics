const COLUMNS = [
  {
    label: 'Опрос',
    name: 'question',
    field: val => (val.question.text),
    required: true,
    align: 'left',
    style: 'width: 35%'
  },
  {
    label: 'Ответ',
    name: 'option',
    field: val => (val.option.option),
    align: 'left',
  }
]

Vue.component('UsersPanel', {
  data () {
    return {
      list: [],
      user: null,
      search: '',
      pagination: {
        rowsPerPage: 0
      }
    }
  },

  computed: {
    polls () {
      return (this.user) ? this.user.polls : []
    }
  },

  methods: {
    filterFn (val, update, abort) {
      update(() => {
        if (val.length >= 2) {
          try {
            this.$axios.get(process.env.api, {
              params: {
                endpoint: 'users',
                // query: val
              }
            })
              .then(({ data }) => {
                if (data.success) {
                  this.list = data.results
                }
              })
          } catch (e) {
            throw e
          }
        }
      })
    }
  },

  render (h) {
    return h(
      'QTable',
      {
        class: 'full-height',

        props: {
          separator: 'cell',
          wrapCells: true,
          filter: this.search,
          hideBottom: true,
          virtualScroll: true,
          flat: true,
          tableHeaderClass: 'bg-grey-11',
          tableStyle: 'height: calc(100% - 65px)',
          rowPerPageOptions: [0],
          pagination: this.pagination,

          columns: COLUMNS,
          data: this.polls
        },

        on: {
          'update:pagination': value => (this.pagination = value)
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
                  'QSelect',
                  {
                    style: 'min-width: 226px',

                    props: {
                      value: this.user,
                      label: 'Пользователь',
                      dense: true,
                      outlined: true,
                      rounded: true,
                      useInput: true,
                      inputDebounce: 100,
                      clearable: true,
                      hideDropdownIcon: true,
                      optionsDense: true,

                      options: this.list,
                      optionValue: 'id',
                      optionLabel: 'username'
                    },

                    on: {
                      input: value => (this.user = value),

                      filter: this.filterFn,

                      clear: value => (this.list = [])
                    }
                  }
                ),

                h('QSpace'),

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
                )
              ]
            )
          },

          'body-cell-question': (props) => {
            const { row } = props
            const {
              question: { closed, text }
            } = row

            return h(
              'QTd',
              {
                class: 'text-weight-medium',

                props: {
                  props
                }
              },
              [
                h(
                  'QIcon',
                  {
                    class: 'q-mr-xs',

                    props: {
                      name: (closed) ? 'lock' : 'lock_open',
                      color: (closed) ? 'negative' : 'positive',
                      size: '12px',
                      round: true
                    }
                  },
                  [
                    h(
                      'QTooltip',
                      {
                        props: {
                          anchor: 'top middle',
                          self: 'bottom middle',
                          transitionShow: 'rotate',
                          transitionHide: 'fade'
                        }
                      },
                      (closed) ? 'Опрос закрыт' : 'Открыт для голосования'
                    )
                  ]
                ),

                text
              ]
            )
          }
        }
      }
    )
  }
})
