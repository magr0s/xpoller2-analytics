import './PollsPanel'
import './UsersPanel'

Vue.component('Dashboard', {
  data () {
    return {
      panel: 'polls'
    }
  },

  render (h) {
    return h(
      'QCard',
      {
        class: 'full-height'
      },
      [
        h(
          'QCardSection',
          {
            class: 'q-pa-none full-height'
          },
          [
            h(
              'QTabs',
              {
                class: 'text-grey-3 bg-primary',

                props: {
                  value: this.panel,
                  dense: true,
                  activeColor: 'white',
                  indicatorColor: 'transparent',
                  square: true
                },

                on: {
                  input: value => (this.panel = value)
                }
              },
              [
                h(
                  'QTab',
                  {
                    props: {
                      name: 'polls',
                      label: 'Статистика по опросам'
                    }
                  }
                ),

                h(
                  'QTab',
                  {
                    props: {
                      name: 'users',
                      label: 'Статистика по пользователям'
                    }
                  }
                )
              ]
            ),

            h(
              'QTabPanels',
              {
                style: 'height: calc(100% - 36px)',
                props: {
                  value: this.panel
                }
              },
              [
                h(
                  'QTabPanel',
                  {
                    class: 'q-pa-none',

                    props: {
                      name: "polls"
                    }
                  },
                  [
                    h('PollsPanel')
                  ]
                ),

                h(
                  'QTabPanel',
                  {
                    class: 'q-pa-none',

                    props: {
                      name: "users"
                    }
                  },
                  [
                    h('UsersPanel')
                  ]
                )
              ]
            )
          ]
        )
      ]
    )
  }
})
