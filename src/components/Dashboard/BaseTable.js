Vue.component('BaseTable', {
  props: {
    opts: {
      type: Object,
      default: () => ({})
    },

    offset: {
      type: Object,
      default: () => ([0, 0])
    },

    endpoint: {
      type: String,
      required: true
    },

    limit: {
      type: Number,
      default: () => (50)
    },

    title: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      ...this.opts,
      data_: [],
      filter: '',
      pagination: {
        rowsNumber: 0,
        rowsPerPage: 0
      },

      loading: true
    }
  },

  computed: {
    height () {
      return (this.offset.length) ? `calc(100% - ${this.offset.join(' - ')})` : false
    }
  },

  mounted () {
    this.fetch({
      page: 0,
      query: this.filter
    })
  },

  methods: {
    onRequest (props) {
      const { filter } = props

      this.fetch({
        page: 0,
        query: filter
      })
    },

    async fetch (props) {
      this.loading = true

      const { page, query, append = false } = props

      try {
        await this.$axios.get(process.env.api, {
          params: {
            endpoint: this.endpoint,
            start: page * this.limit,
            limit: this.limit,
            query
          }
        })
          .then(({ data }) => {
            if (data.success) {
              this.pagination.rowsNumber = data.total

              append ? this.data_.push(...data.results) : this.data_ = data.results
            }
          })
          .finally(() => (this.loading = false))
      } catch (e) {
        throw e
      }
    },

    onVScroll (props) {
      const {
        direction,
        to,
        index
      } = props

      const page = Math.ceil(to / this.limit)

      !this.loading &&
        direction === 'increase' &&
        (to - index) < 15 &&
        to < (this.pagination.rowsNumber - 1) &&
        this.pagination.rowsNumber > this.data_.length &&
        this.fetch({
          page,
          query: this.filter,
          append: true
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
          hideHeader: true,
          tableHeaderClass: 'bg-grey-11',
          tableStyle: {
            maxHeight: this.height
          },
          columns: [],

          ...this.opts,

          loading: this.loading,
          virtualScroll: true,
          rowsPerPageOptions: [0],
          pagination: this.pagination,
          filter: this.filter,
          data: this.data_
        },

        on: {
          'update:pagination': (pagination) => {
            this.pagination = pagination
          },

          request: this.onRequest,

          'virtual-scroll': this.onVScroll

        },

        scopedSlots: {
          top: () => (
            h(
              'div',
              {
                class: 'flex'
              },
              [
                h(
                  'div',
                  {
                    class: 'text-h5 text-weight-light'
                  },
                  this.title
                ),

                h(
                  'QSeparator',
                  {
                    class: 'q-mx-md',

                    props: {
                      vertical: true
                    }
                  }
                ),

                h(
                  'QInput',
                  {
                    style: 'min-width: 380px',

                    attrs: {
                      placeholder: 'Быстрый поиск'
                    },

                    props: {
                      value: this.filter,
                      dense: true,
                      outlined: true,
                      rounded: true,
                      clearable: true
                    },

                    on: {
                      input: val => (this.filter = val)
                    }
                  },
                  [
                    h(
                      'QIcon',
                      {
                        props: {
                          name: 'search',
                          size: '16px'
                        },

                        slot: 'prepend'
                      }
                    )
                  ]
                )
              ]
            )
          ),

          ...this.$scopedSlots
        }
      }
    )
  }
})
