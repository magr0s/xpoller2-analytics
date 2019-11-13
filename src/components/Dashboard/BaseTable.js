Vue.component('BaseTable', {
  props: {
    opts: {
      type: Object,
      default: () => ({})
    },

    offset: {
      type: Object,
      default: () => ([0, 0])
    }
  },

  data () {
    return {
      data_: [],
      rowsLimit: 10,

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
      start: 0,
      limit: this.rowsLimit,
      query: this.filter
    })
  },

  methods: {
    async onRequest (props) {
      const { filter } = props

      await this.fetch({
        start: 0,
        limit: this.rowsLimit,
        query: filter
      })
    },

    fetch (props) {
      this.loading = true

      try {
        this.$axios.get(process.env.api, {
          params: {
            endpoint: 'polls',
            ...props
          }
        })
          .then(({ data }) => {
            if (data.success) {
              this.pagination.rowsNumber = data.total

              this.data_.push(...data.results)
            }
          })
          .finally(() => (this.loading = false))
      } catch (e) {
        throw e
      }
    },

    onVScroll (props) {
      const {
        direction
      } = props

      if (direction === 'increase') {
        console.log(props)
      }
    }
  },

  render (h) {
    return h(
      'QTable',
      {
        class: 'full-height',

        props: {
          separator: 'cell',
          filter: this.filter,
          tableHeaderClass: 'bg-grey-11',
          tableStyle: {
            height: this.height
          },
          loading: this.loading,
          virtualScroll: true,
          // virtualScrollStickySizeStart: '48px',
          rowsPerPageOptions: [0],
          pagination: this.pagination,
          columns: [],

          ...this.opts,

          data: this.data_
        },

        on: {
          'update:pagination': (pagination) => {
            console.log(pagination)
            this.pagination = pagination
          },

          request: this.onRequest,

          'virtual-scroll': this.onVScroll

        },

        scopedSlots: {
          'top': () => (
            h(
              'div',
              {
                class: 'flex'
              },
              [
                h(
                  'QInput',
                  {
                    style: 'min-width: 380px',

                    attrs: {
                      placeholder: 'Фильтр'
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
                  }
                )
              ]
            )
          ),

          ...this.scopedSlots
        }
      }
    )
  }
})
