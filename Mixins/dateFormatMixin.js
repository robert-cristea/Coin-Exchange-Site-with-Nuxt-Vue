import moment from 'moment'
export default {
  filters: {
    dateFormat(val) {
      return moment(val).format('yyyy-MM-DD hh:mm:ss')
    },
  },
}
