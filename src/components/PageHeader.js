Vue.component('PageHeader', {
  props: {
    title: {
      type: String,
      default: () => ('')
    }
  },

  render (h) {
    return h(
      'QHeader',
      {
        props: {
          elevated: true
        }
      },
      [
        h(
          'QToolbar',
          [
            h(
              'QToolbarTitle',
              {
                class: 'text-bold'
              },
              this.title
            )
          ]
        )
      ]
    )
  }
})
