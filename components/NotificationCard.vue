<template>
  <a-card :bodyStyle="{ padding: 0 }" class="notifications-card border-none">
    <div slot="title" class="notifications-card-header">
      <div class="Roboto-Medium">
        <span class="new-notifications-count">
          {{ UserNotifications.length }}
        </span>
        <span class="new-notifications-text">
          {{ $t('text_new_notifications') }}
        </span>
        <span class="new-notifications-check">
          <a-button size="small" ghost @click="readAllNotifications">
            <a-icon
              class="Roboto-Medium"
              style="margin: auto; color: #90dafe; width: 20px"
              type="check"
            />
          </a-button>
        </span>
      </div>
      <div class="Roboto-Medium">
        <nuxt-link :to="localePath('/account/notifications')">
          <span style="color: #afc2cb">{{
            $t('text_see_all_notifications')
          }}</span>
        </nuxt-link>
      </div>
    </div>
    <div class="notifications-card-body">
      <a-list size="large" :data-source="UserNotifications">
        <a-list-item
          class="notifications-list-item"
          slot="renderItem"
          :key="item.NotificationUniqueId"
          slot-scope="item, index"
        >
          <a-list-item-meta>
            <div slot="avatar" class="notification-list-avatar">
              <div style="margin: auto 10px" class="notification-dot"></div>
              <img src="~/assets/icons/header/message.svg" alt="message" />
            </div>
            <span slot="title" class="notifications-list-title Roboto-Medium">
              {{ item.NotificationTitle }}
            </span>
            <div slot="description" class="notifications-list-description-flex">
              <p class="notifications-list-desc Roboto-Regular">
                {{ item.NotificationText }}
              </p>
              <p class="notifications-list-date Roboto-Regular">
                {{ item.CreatedOn }}
              </p>
            </div>
          </a-list-item-meta>
        </a-list-item>
        <!-- <a-empty>
          <div slot="image">
            <img
              src="~/assets/icons/header/bell.svg"
              style="width: 20px; height: 20px"
              alt="bell"
            />
          </div>
          <p class="empty-description Roboto-Medium" slot="description">
            Yeni bilidrim bulunmuyor
          </p>
        </a-empty> -->
      </a-list>
    </div>
  </a-card>
</template>

<script>
export default {
  data() {
    return {
      UserNotifications: [],
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
      const authHeaders = { Authorization: 'Bearer ' + $cookies.get('Token') }
      const response = await $axios.get(
        FINANCE_API_URL + '/GetUserNewNotifications',
        {
          headers: authHeaders,
        }
      )
      if (response.data.Success) {
        const { NotificatinsList } = response.data
        this.UserNotifications = NotificatinsList
      }
    },
    async readAllNotifications() {
      try {
        const authHeaders = {
          Authorization: 'Bearer ' + this.$cookies.get('Token'),
        }

        const response = await this.$axios.post(
          this.$config.FINANCE_API_URL + `/ReadAllNotifications`,
          {
            headers: authHeaders,
          }
        )
        this.UserNotifications = []
      } catch (e) {
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.notifications-card {
  width: 470px;
  height: inherit;
  overflow-y: scroll;
  background-color: #1e2126;
  padding: 0;
  border-radius: none;
}
.notifications-card-body {
  padding: 10px;
  height: 250px;
  background: #212731;
}
.notifications-card::-webkit-scrollbar {
  display: none;
}
.notifications-card {
  .ant-card-head-title {
    padding: 0;
  }
}
.notifications-card-header {
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  background: #27365f;
  color: #afc2cb;
}
.notifications-list-item {
  padding: 10px;
  border-bottom: 1px solid #2f394b !important;
}
.notifications-list-title {
  color: #ffffff;
}
.notifications-list-description-flex {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}
.notifications-list-desc,
.notifications-list-date {
  white-space: normal;
  word-break: normal;
  color: #858e9d;
  font-size: 12px;
  margin-bottom: 0;
}
.new-notifications-count,
.new-notifications-check {
  color: #90dafe;
}
.new-notifications-text,
.new-notifications-check {
  margin-left: 5px;
}
.notification-list-avatar {
  display: flex;
  margin-top: 5px;
}
.notification-dot {
  margin-top: 5px;
  width: 10px;
  height: 10px;
  border-radius: 50px;
  background-color: #1dc088;
}
.notifications-card-body .ant-empty-image {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
}
.empty-description {
  color: #b9b9b9;
}
</style>
<style>
.notifications-card .ant-card-head {
  background: #27365f !important;
}
</style>
>
