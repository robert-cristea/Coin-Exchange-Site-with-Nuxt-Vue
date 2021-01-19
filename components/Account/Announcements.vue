<template>
  <a-card class="account-card border-none h-100">
    <h4
      slot="title"
      style="margin: 0"
      class="Roboto-Bold account-default-text-color"
    >
      {{ $t('text_announcements') }}
    </h4>
    <div slot="extra" class="Roboto-Medium">
      <a-button
        @click="$router.push(localeRoute('/account/notifications'))"
        class="border-none"
        ><a-icon type="right"
      /></a-button>
    </div>
    <div class="account-announcements-list">
      <a-list item-layout="horizontal" :data-source="NotificationList">
        <a-list-item slot="renderItem" slot-scope="item">
          <a-list-item-meta>
            <p slot="title" class="account-default-text-color Roboto-Regular">
              {{ item.NotificationText }}
            </p>
            <p
              align="right"
              slot="description"
              class="Roboto-Regular account-announcements-text"
            >
              {{ item.UpdatedOn }}
            </p>
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </div>
  </a-card>
</template>
<script>
export default {
  data() {
    return {
      NotificationList: [],
    }
  },
  mounted() {
    this.getUserNotifications()
  },
  methods: {
    async getUserNotifications() {
      const {
        $axios,
        $cookies,
        $config: { FINANCE_API_URL },
      } = this
      let authHeaders = { Authorization: 'Bearer ' + $cookies.get('Token') }
      const response = await $axios.get(
        FINANCE_API_URL + '/GetUserNotifications',
        {
          headers: authHeaders,
        }
      )
      if (response.data.Success) {
        const { NotificationList } = response.data
        this.NotificationList = NotificationList
      }
    },
  },
}
</script>

<style lang="less" scoped>
.account-card {
  box-shadow: 0px 0px 9px #00000012;
  border-radius: 4px;
}

.account-card-secondary-text {
  color: #778090;
}
.account-default-text-color {
  color: var(--text-color);
}
.account-announcements-list {
  max-height: 250px;
  overflow-y: scroll;
}
.account-announcements-list::-webkit-scrollbar {
  display: none;
}
.account-announcements-text {
  padding-right: 20px;
}
.account-announcements-date {
  padding-left: 20px;
}
</style>
