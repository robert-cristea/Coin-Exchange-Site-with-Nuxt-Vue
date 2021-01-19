<template>
  <a-card class="account-card border-none h-100">
    <a-tabs v-model="activeKeyActivity">
      <a-tab-pane
        v-for="act in tabListActivity"
        :key="act.key"
        class="Roboto-Medium"
        :class="{
          'tab-label-active': act.key === activeKeyActivity,
          'tab-label-inactive': act.key !== activeKeyActivity,
        }"
      >
        <span v-if="act.key === 'Activity'" slot="tab">
          {{ $t('text_login_activity') }}
        </span>
        <span v-if="act.key === 'Devices'" slot="tab">
          {{ $t('text_browsers') }}
        </span>

        <div v-if="act.key === 'Activity'">
          <a-list
            item-layout="horizontal"
            :data-source="UserLoginActivity"
            class="Roboto-Regular account-activity-list"
          >
            <a-list-item slot="renderItem" slot-scope="item">
              <a-list-item-meta class="account-device-meta">
                <p
                  align="left"
                  slot="title"
                  class="account-device-description"
                >
                  {{ item.Description }}
                </p>
                <p
                  align="left"
                  v-if="item.Browser && item.OS"
                  slot="description"
                  class="account-browser-info"
                >
                  {{ item.Browser }} ({{ item.OS }})
                </p>
              </a-list-item-meta>
              <div class="account-device-list-content">
                <p
                  align="right"
                  class="account-device-ip account-default-text-color"
                >
                  {{ item.IP_Address }}
                </p>
                <p align="right" class="account-device-date">
                  {{ item.CreatedOn }}
                </p>
              </div>
            </a-list-item>
          </a-list>
        </div>
        <div v-if="act.key === 'Devices'">
          <a-list
            item-layout="horizontal"
            :data-source="UserDevicesList"
            class="Roboto-Regular account-devices-list"
          >
            <a-list-item slot="renderItem" slot-scope="item">
              <a-list-item-meta class="account-device-meta">
                <p
                  align="left"
                  v-if="item.Browser && item.OS"
                  slot="title"
                  class="account-browser-info"
                >
                  {{ item.Browser }} ({{ item.OS }})
                </p>
              </a-list-item-meta>
              <div class="account-device-list-content">
                <p
                  align="right"
                  class="account-device-ip account-default-text-color"
                >
                  {{ item.DeviceId }}
                </p>
                <!-- <p  align="right" class="account-device-date">{{ item.CreatedOn }}</p> -->
              </div>
            </a-list-item>
          </a-list>
        </div>
      </a-tab-pane>
      <span slot="tabBarExtraContent" class="Roboto-Medium">
        <a-button
          @click="$router.push(localeRoute('/account/froze'))"
          type="link"
        >
          <u>{{ $t('text_deactivate_account') }}</u>
        </a-button>
        <a-button
          @click="$router.push(localeRoute('/account/activity'))"
          class="border-none"
        >
          <a-icon type="right" />
        </a-button>
      </span>
    </a-tabs>
  </a-card>
</template>

<script>
export default {
  data() {
    return {
      tabListActivity: [
        { key: 'Activity', scopedSlots: { tab: 'titleSlot' } },
        { key: 'Devices', scopedSlots: { tab: 'titleSlot' } },
      ],
      activeKeyActivity: 'Activity',
      UserLoginActivity: [],
      UserDevicesList: [],
      UserLoginActivityParams: {
        From: '2020-01-31',
        To: '2020-12-31',
        Offset: 0,
        PageSize: 10,
      },
    }
  },
  mounted() {
    this.getUserLoginActivities()
    this.getUserDevicesList()
  },
  methods: {
    async getUserLoginActivities() {
      const {
        $axios,
        $cookies,
        $config: { FINANCE_API_URL },
      } = this
      let authHeaders = { Authorization: 'Bearer ' + $cookies.get('Token') }
      const response = await $axios.get(
        FINANCE_API_URL + '/GetAccountLoginActivities',
        {
          params: {
            ...this.UserLoginActivityParams,
          },
          headers: authHeaders,
        }
      )
      if (response.data.Success) {
        const { AccountHistory } = response.data
        this.UserLoginActivity = AccountHistory
      }
    },
    async getUserDevicesList() {
      const {
        $axios,
        $cookies,
        $config: { FINANCE_API_URL },
      } = this
      let authHeaders = { Authorization: 'Bearer ' + $cookies.get('Token') }
      const response = await $axios.get(
        FINANCE_API_URL + '/GetUserBrowserList',
        {
          headers: authHeaders,
        }
      )
      if (response.data.Success) {
        const { UserBrowser } = response.data
        this.UserDevicesList = UserBrowser
      }
    },
  },
}
</script>

<style lang="less" scoped>
.account-default-text-color {
  color: var(--text-color);
}
.account-device-list-content {
  display: flex;
  flex-direction: column;
}
.account-device-meta {
  color: #1ba4e8;
}
.account-device-date,
.account-browser-info {
  color: #1ba4e8;
}
.account-activity-list,
.account-devices-list {
  max-height: 250px;
  overflow-y: scroll;
}
.account-activity-list::-webkit-scrollbar,
.account-devices-list::-webkit-scrollbar {
  display: none;
}
</style>
<style>
.account-card .ant-card-body {
  padding: 10px;
}
@media screen and (max-width: 767px) {
  .account-card .ant-tabs-nav .ant-tabs-tab {
    margin: 0 8px 0 0;
    padding: 12px 4px;
  }
  .account-card .ant-tabs-nav .ant-tabs-tab:last-child {
    margin-right: 0;
  }
}
</style>
