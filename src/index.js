import './components/PageHeader'
import './components/Dashboard'

new Vue({
  el: '#q-app',

  data: function () {
    return {}
  },

  methods: {
    pageTweak (offset) {
      return {
        minHeight: `calc(100vh - ${offset}px)`,
        height: `calc(100vh - ${offset}px)`
      }
    }
  },

  render (h) {
    return h(
      'QLayout',
      [
        h(
          'PageHeader',
          {
            props: {
              title: 'xPoller2 Analytics'
            }
          }
        ),

        h(
          'QPageContainer',
          [
            h(
              'QPage',
              {
                class: 'bg-grey-5',

                props: {
                  padding: true,
                  styleFn: this.pageTweak
                }
              },
              [
                h('Dashboard')
              ]
            )
          ]
        )
      ]
    )
  }
})
