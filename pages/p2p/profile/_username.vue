<template>
  <div class="Roboto-Regular" id="p2p-profile" v-if="data">
    <div class="container" style="padding-bottom: 25px">
      <a-row class="strip">
        <a-col>
          <a-breadcrumb>
            <span slot="separator">></span>
            <a-breadcrumb-item>p2p</a-breadcrumb-item>
            <a-breadcrumb-item>profile</a-breadcrumb-item>
            <a-breadcrumb-item>{{ username }}</a-breadcrumb-item>
          </a-breadcrumb>
        </a-col>
      </a-row>
      <a-row class="strip">
        <a-col :span="24" :md="16">
          <a-avatar size="small" style="background-color: #5047d6">
            {{ username[0].toUpperCase() }}
          </a-avatar>
          <span class="username">{{ username.toUpperCase() }}</span>
        </a-col>
        <a-col :md="8">
          <div>
            <a-space :size="30">
              <h4>
                E-posta
                <a-icon
                  v-if="data.UserInfo.EmailVerified"
                  theme="twoTone"
                  two-tone-color="#52c41a"
                  type="check-circle"
                />
                <a-icon v-else type="exclamation-circle" />
              </h4>
              <h4>
                SMS
                <a-icon
                  v-if="data.UserInfo.SMSVerified"
                  theme="twoTone"
                  two-tone-color="#52c41a"
                  type="check-circle"
                />
                <a-icon v-else type="exclamation-circle" />
              </h4>
              <h4>
                Kilmlik Dogrulama
                <a-icon
                  v-if="data.UserInfo.KYCVerified"
                  theme="twoTone"
                  two-tone-color="#52c41a"
                  type="check-circle"
                />
                <a-icon v-else type="exclamation-circle" />
              </h4>
            </a-space>
            <a-divider />
          </div>
        </a-col>
      </a-row>
      <a-row class="strip">
        <a-col :md="4" :span="24">
          <a-statistic
            title="Guvenlik teminati"
            :value="data.UserInfo.SecurityBalance"
            style="margin-right: 50px"
          />
        </a-col>
        <a-col :md="4" :span="24">
          <a-statistic
            title="Toplam emirler"
            :value="
              data.UserInfo.TotalBuyOpenOrders +
              data.UserInfo.TotalSellOpenOrders
            "
            style="margin-right: 50px"
          />
        </a-col>
        <a-col :md="4" :span="24">
          <a-statistic
            title="30g tamamlanma orani"
            :value="data.UserInfo.MonthlyCompletionRate"
            style="margin-right: 50px"
          >
            <template #suffix>
              <span> %</span>
            </template>
          </a-statistic>
        </a-col>
        <a-col :md="4" :span="24">
          <a-statistic
            title="30g emirler"
            :value="1"
            style="margin-right: 50px"
          />
        </a-col>
        <a-col :md="8">
          <a-statistic
            title="Ort. serbest birakma suresi"
            value="3.63"
            style="margin-right: 50px"
          >
            <template #suffix>
              <span> Min</span>
            </template>
          </a-statistic>
        </a-col>
      </a-row>
    </div>
    <div class="strip" style="background-color: #fafafa">
      <div class="container">
        <h1>Kullanicidan al</h1>
        <a-row type="flex" justify="space-around">
          <a-col :span="12" :md="24">
            <a-row
              type="flex"
              justify="center"
              :gutter="10"
              class="h-100"
              style="padding-top: 25px"
            >
              <a-col :span="24" :md="5">
                <div class="ant-statistic-title">Coin</div>
              </a-col>
              <a-col :span="24" :md="5">
                <div class="ant-statistic-title">Fiyat</div>
              </a-col>
              <a-col :span="24" :md="6">
                <div class="ant-statistic-title">Limit/Kullanilabilir</div>
              </a-col>
              <a-col :span="24" :md="7">
                <div class="ant-statistic-title">Odeme</div>
              </a-col>
            </a-row>
          </a-col>
          <a-col :span="12" :md="24">
            <div
              v-for="(item, i) in data.SellOpenOrderList"
              :key="i"
              class="content-row"
            >
              <div
                @click="!buyRowIndex ? (buyRowIndex = i) : (buyRowIndex = null)"
              >
                <a-row type="flex" justify="center" :gutter="10">
                  <a-col :span="24" :md="5">
                    <a-space align="center" :size="20">
                      <img height="30" :src="getAssetIcon(item.Asset_)" />
                      <div
                        class="ant-statistic-content"
                        v-text="item.Asset_"
                      ></div>
                    </a-space>
                  </a-col>
                  <a-col :span="24" :md="5">
                    <a-statistic :value="item.FiatPrice">
                      <template #suffix>
                        <span> {{ item.FiatCurrency }}</span>
                      </template>
                    </a-statistic>
                  </a-col>
                  <a-col :span="24" :md="6">
                    <a-row>
                      <a-col :span="12">
                        <span class="limit-kulanlilabilir mr-1"
                          >Kullanılabilir</span
                        >
                      </a-col>
                      <a-col :span="12">
                        <span> {{ item.Available }} {{ item.Asset_ }} </span>
                      </a-col>
                    </a-row>
                    <a-row>
                      <a-col :span="12">
                        <span class="limit-kulanlilabilir mr-1">Limit</span>
                      </a-col>
                      <a-col :span="12">
                        <span>
                          {{ item.Min }} {{ item.FiatCurrency }} -
                          {{ item.Max }}
                          {{ item.FiatCurrency }}
                        </span>
                      </a-col>
                    </a-row>
                  </a-col>
                  <a-col :span="24" :md="4">
                    <div>Mercantil Ban</div>
                    <div>K Pana</div>
                  </a-col>
                  <a-col :span="24" :md="3">
                    <div>
                      <a-button block class="button" @click="buyRowIndex = i"
                        >{{ item.Asset_ }} AL</a-button
                      >
                    </div>
                  </a-col>
                </a-row>
              </div>
              <div v-show="buyRowIndex === i">
                <a-divider />
                <P2PRequestForm
                  FormTitle="Almak İstiyorum"
                  ListType="BUY"
                  :FormData="item"
                  :key="'buy' + i"
                  @cancel="buyRowIndex = null"
                />
              </div>
            </div>
          </a-col>
        </a-row>
        <h1>Kullanicidan sat</h1>
        <a-row type="flex" justify="space-around">
          <a-col :span="12" :md="24">
            <a-row
              type="flex"
              justify="center"
              :gutter="10"
              class="h-100"
              style="padding-top: 25px"
            >
              <a-col :span="24" :md="5">
                <div class="ant-statistic-title">Coin</div>
              </a-col>
              <a-col :span="24" :md="5">
                <div class="ant-statistic-title">Fiyat</div>
              </a-col>
              <a-col :span="24" :md="6">
                <div class="ant-statistic-title">Limit/Kullanilabilir</div>
              </a-col>
              <a-col :span="24" :md="7">
                <div class="ant-statistic-title">Odeme</div>
              </a-col>
            </a-row>
          </a-col>
          <a-col :span="12" :md="24">
            <div
              v-for="(item, i) in data.BuyOpenOrderList"
              :key="i"
              class="content-row"
            >
              <div
                @click="
                  !sellRowIndex ? (sellRowIndex = i) : (sellRowIndex = null)
                "
              >
                <a-row type="flex" justify="center" :gutter="10">
                  <a-col :span="24" :md="5">
                    <a-space align="center" :size="20">
                      <img height="30" :src="getAssetIcon(item.Asset_)" />
                      <div
                        class="ant-statistic-content"
                        v-text="item.Asset_"
                      ></div>
                    </a-space>
                  </a-col>
                  <a-col :span="24" :md="5">
                    <a-statistic :value="item.FiatPrice">
                      <template #suffix>
                        <span> {{ item.FiatCurrency }}</span>
                      </template>
                    </a-statistic>
                  </a-col>
                  <a-col :span="24" :md="6">
                    <a-row>
                      <a-col :span="12">
                        <span>Kullanılabilir</span>
                      </a-col>
                      <a-col :span="12">
                        <span> {{ item.Available }} {{ item.Asset_ }} </span>
                      </a-col>
                    </a-row>
                    <a-row>
                      <a-col :span="12">
                        <span>Limit</span>
                      </a-col>
                      <a-col :span="12">
                        <span>
                          {{ item.Min }} {{ item.FiatCurrency }} -
                          {{ item.Max }}
                          {{ item.FiatCurrency }}
                        </span>
                      </a-col>
                    </a-row>
                  </a-col>
                  <a-col :span="24" :md="4">
                    <div>Mercantil Ban</div>
                    <div>K Pana</div>
                  </a-col>
                  <a-col :span="24" :md="3">
                    <div>
                      <a-button block class="button" @click="sellRowIndex = i"
                        >{{ item.Asset_ }} AL</a-button
                      >
                    </div>
                  </a-col>
                </a-row>
              </div>
              <div v-show="sellRowIndex === i">
                <a-divider />
                <P2PRequestForm
                  FormTitle="Satmak İstiyorum"
                  ListType="SELL"
                  :FormData="item"
                  :key="'sell' + i"
                  @cancel="sellRowIndex = null"
                />
              </div>
            </div>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>
<script>
// username
export default {
  head() {
    return {
      title: 'Profil | Cointral.com',
    }
  },
  data: () => ({
    breadcrumb: null,
    data: null,
    username: null,
    userBalance: null,
    sellRowIndex: null,
    buyRowIndex: null,
  }),
  asyncData ({ app, params, redirect }) {
    if (!params.username) {
        redirect(app.localePath('/soon'))
    }
  },
  created() {
    this.username = this.$route.params.username
  },
   beforeMount() {
    const allowedHosts = ['localhost']
    if (!allowedHosts.includes(window.location.hostname)) {
      this.$router.push(this.localeRoute('/soon'))
    }
  },
  mounted() {
    this.GetP2PCustomer()
    this.GetUserBalance()
  },
  methods: {
    async GetP2PCustomer() {
      const { $axios, $config, $cookies } = this
      let authHeader = { Authorization: 'Bearer ' + $cookies.get('Token') }
      const response = await $axios.get(
        $config.FINANCE_API_URL + '/GetP2PCustomer',
        { headers: authHeader, params: { Username: this.username } }
      )
      if (response.data.Success) {
        this.data = response.data
      }
    },
    async GetUserBalance() {
      const { $axios, $config, $cookies } = this
      let authHeader = { Authorization: 'Bearer ' + $cookies.get('Token') }
      const response = await $axios.get(
        $config.FINANCE_API_URL + '/GetUserBalance',
        { headers: authHeader }
      )
      if (response.data.Success) {
        this.userBalance = response.data
      }
    },
    getAssetIcon(symbol) {
      try {
        return require(`~/assets/icons/${symbol.toLowerCase()}.svg`)
      } catch (e) {
        return require('~/assets/images/NotFound.svg')
      }
    },
  },
}
</script>

<style lang="less" scoped>
.ant-divider-horizontal {
  margin: 5px 0;
}
.strip {
  padding: 10px 0;
}
.content-row {
  background-color: #fff;
  padding: 20px 0;
  margin-bottom: 10px;
  transition: all 0.5s;
}
.content-row:hover {
  cursor: pointer;
  box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14),
    0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);
}
.ant-col {
  padding: 10px 0;
}

.pl {
  padding-left: 20px !important;
}
.pr {
  padding-right: 20px !important;
}
.button {
  background-color: #52c41a;
  color: white;
}
.username {
  font-size: 20px;
  color: #5047d6;
  vertical-align: middle;
  margin-left: 10px;
}
</style>
<style lang="less">
#p2p-profile .ant-descriptions-row > th,
#p2p-profile .ant-descriptions-row > td {
  padding-bottom: 0 !important;
}

#p2p-profile .ant-descriptions-item-content .ant-statistic-content-value {
  font-size: 14px;
}

#p2p-profile .ant-descriptions-item-content .ant-statistic-content-suffix {
  font-size: 12px;
}

#p2p-profile .ant-descriptions-item-label {
  color: rgba(0, 0, 0, 0.45);
}
</style>
