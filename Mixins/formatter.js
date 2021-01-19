import { mapGetters } from 'vuex'
import moment from 'moment'
export default {
  data() {
    return {
      SymbolPriceDecimalLenght: null,
      SymbolQuantityDecimalLenght: null,
      SymbolTotalDecimalLenght: null,
      regex: /\B(?=(?:\d{3})+$)/g,
      FormatObject: {},
      Options: {},
    }
  },
  computed: {
    ...mapGetters({
      getSymbolData: 'symbol/getSymbolData',
    }),
  },
  methods: {
    formatPriceWithGivenDecimalLength(val, length) {
      return new Intl.NumberFormat('en', {
        minimumFractionDigits: length,
      }).format(Number(val))
    },
    formatAll(val, type) {
      if (type === 'PRICE') {
        return new Intl.NumberFormat('en', {
          minimumFractionDigits: this.getSymbolData.SymbolPriceDecimalLenght,
        }).format(Number(val))
      }
      if (type === 'AMOUNT') {
        return new Intl.NumberFormat('en', {
          minimumFractionDigits: this.getSymbolData.SymbolQuantityDecimalLenght,
        }).format(Number(val))
      }
      if (type === 'TOTAL') {
        return new Intl.NumberFormat('en', {
          minimumFractionDigits: this.getSymbolData.SymbolTotalDecimalLenght,
        }).format(Number(val))
      }
    },
  },
  filters: {
    formatDate(val) {
      moment(val).format('hh:mm:ss')
    },
  },
}
