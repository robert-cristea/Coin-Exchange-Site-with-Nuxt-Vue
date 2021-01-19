<template>
  <div :class="!isMobile ? 'notifications-page' : null">
    <div v-if="!isMobile">
      <a-card class="all-notifications-card border-none">
        <div class="notifications-card-body">
          <div slot="title" class="all-notifications-card-header">
            <h1 class="Roboto-Medium">{{ $t('text_notification') }}</h1>
            <a-row type="flex" align="middle">
              <a-col :span="9">
                <span class="new-notifications-total-text Roboto-Medium">
                  {{ $t('text_all_notifications') }}
                  ({{ AllUserNotifications.length }})
                </span>
              </a-col>
              <a-col :span="5">
                <a-checkbox v-model="showUnRead" size="large"></a-checkbox>
                <span class="Roboto-Medium">{{
                  $t('text_hide_read_notifications')
                }}</span>
              </a-col>

              <a-col :span="4">
                <a-button
                  class="Roboto-Medium delete-all"
                  @click="onDeleteAll"
                  >{{ $t('text_delete_all') }}</a-button
                >
                <a-button
                  slot="actions"
                  type="secondary"
                  block
                  class="Roboto-Medium"
                  @click="
                    $router.push(localeRoute('/account/settings/preferences'))
                  "
                >
                  <a-icon type="setting" />
                </a-button>
              </a-col>
            </a-row>
          </div>

          <a-list
            v-if="AllUserNotifications.length == 0"
            :pagination="false"
            size="large"
            :data-source="AllUserNotifications"
          >
          </a-list>
          <a-list
            v-else
            :pagination="true"
            size="large"
            :data-source="AllUserNotifications"
          >
            <a-list-item
              class="notifications-list-item"
              slot="renderItem"
              :key="item.NotificationUniqueId"
              slot-scope="item"
            >
              <nuxt-link
                :to="
                  localePath(
                    '/account/notifications/' + item.NotificationUniqueId
                  )
                "
              >
                <a-list-item-meta class="all-notifications-list-meta">
                  <div slot="avatar" class="notification-list-avatar">
                    <div
                      style="margin: auto 10px"
                      class="notification-dot"
                      :class="{ viewed: item.Viewed, notViewed: !item.Viewed }"
                    ></div>
                    <img
                      src="~/assets/icons/header/message.svg"
                      alt="message"
                    />
                  </div>
                  <p
                    slot="title"
                    class="all-notifications-list-title Roboto-Medium"
                  >
                    {{ item.NotificationTitle }}
                  </p>
                  <div
                    slot="description"
                    class="all-notifications-list-description-flex"
                  >
                    <p class="all-notifications-list-desc Roboto-Regular">
                      {{ item.NotificationText }}
                    </p>
                  </div>
                </a-list-item-meta>
              </nuxt-link>
              <div slot="extra" class="notification-list-item-extra">
                <span class="all-notifications-list-date Roboto-Regular">{{
                  item.CreatedOn
                }}</span>
              </div>
            </a-list-item>
          </a-list>
        </div>
      </a-card>
    </div>

    <div v-if="isMobile">
      <a-card class="border-none">
        <a-row>
          <a-col :span="2">
            <a-button
              class="Roboto-Medium"
              @click="
                $router.push(localeRoute('/account/settings/preferences'))
              "
            >
              <a-icon type="setting" />
            </a-button>
          </a-col>

          <a-col :span="15" align="middle">
            <a-button
              @click="readAllNotifications"
              class="mark-all-as-read Roboto-Medium"
              >{{ $t('text_mark_all_as_read') }}</a-button
            >
          </a-col>

          <a-col :span="7" align="right">
            <a-button class="Roboto-Medium delete-all">{{
              $t('text_delete_all')
            }}</a-button>
          </a-col>
        </a-row>

        <a-divider type="horizontal" />

        <a-row>
          <a-col :span="24">
            <span class="Roboto-Medium">
              {{ $t('text_all_notifications') }}
              ({{ AllUserNotifications.length }})
            </span>
          </a-col>
        </a-row>

        <a-divider type="horizontal" />

        <a-col :span="24">
          <div
            class="Roboto-Regular"
            :key="index"
            v-for="(item, index) in AllUserNotifications"
          >
            <a-col :span="24">
              <a-col class="Roboto-Bold" :span="12">
                <div
                  class="notification-dot-mobile"
                  :class="{ viewed: item.Viewed, notViewed: !item.Viewed }"
                ></div>
              </a-col>
              <a-col style="color: gray" :span="12" align="right">{{
                item.UpdatedOn
              }}</a-col>
            </a-col>

            <a-col class="mobile-row" style="margin-bottom: 20px" :span="24">
              <a-col class="Roboto-Bold" :span="2">
                <img src="~/assets/icons/header/message.svg" alt="message" />
              </a-col>
              <a-col :span="22" align="left">{{ item.NotificationText }}</a-col>
            </a-col>

            <a-divider class="mobile-row" type="horizontal" />
          </div>
        </a-col>
      </a-card>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ['auth'],
  head(){
    return{
      title: 'Bildirimler | Cointral.com',
    }
  },
  data() {
    return {
      AllUserNotifications: [],
      showUnRead: false,
      isMobile: null,
    }
  },
  mounted() {
    this.getUserNotifications()
    this.isMobile = window.innerWidth < 1000

    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 1000
    })
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
        FINANCE_API_URL + '/GetUserNotifications',
        {
          headers: authHeaders,
        }
      )
      if (response.data.Success) {
        
        const { NotificationList } = response.data
        this.AllUserNotifications = NotificationList
      }
    },
    async getUnreadNotifications() {
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
        this.AllUserNotifications = NotificatinsList
      }
    },
    async readAllNotifications() {
      const {
        $axios,
        $cookies,
        $config: { FINANCE_API_URL },
      } = this
      const authHeaders = { Authorization: 'Bearer ' + $cookies.get('Token') }
      const response = await $axios.post(
        FINANCE_API_URL + '/ReadAllNotifications',
        null,
        {
          headers: authHeaders,
        }
      )
      if (response.data.Success) {
        this.AllUserNotifications = []
      }
    },
    async onDeleteAll() {
      const {
        $axios,
        $cookies,
        $config: { FINANCE_API_URL },
      } = this
      const authHeaders = { Authorization: 'Bearer ' + $cookies.get('Token') }
      const response = await $axios.post(
        FINANCE_API_URL + '/ClearAllNotifications',
        null,
        {
          headers: authHeaders,
        }
      )
      if (response.data.Success) {
        this.getUserNotifications()
      }
    },
  },
  watch: {
    showUnRead(val) {
      if (val) {
        this.getUnreadNotifications()
      } else {
        this.getUserNotifications()
      }
    },
  },
}
</script>

<style scoped>
.notifications-page {
  min-height: 100vh;
  margin: 50px auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.all-notifications-card {
  width: 1000px;
}

.all-notifications-card-header {
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
  border-bottom: 1px solid #e8e8e8;
}

.all-notifications-list-title,
.all-notifications-list-desc {
  margin-bottom: 0;
}

.all-notifications-list-title {
  font-size: 16px;
  color: #1e2026;
}

.all-notifications-list-desc {
  width: 700px;
  font-size: 12px;
  color: #858e9d;
}

.all-notifications-list-date {
  color: #566788;
}

.notification-list-item-extra {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.notifications-list-item {
  cursor: pointer;
}

.new-notifications-total-text {
  font-size: 18px;
}

.mark-all-as-read {
  color: #1ba4e8;
}

.delete-all {
  color: red;
}

.notification-dot {
  margin-top: 5px;
  width: 8px;
  height: 8px;
  border-radius: 50px;
}

.notification-dot-mobile {
  width: 8px;
  height: 8px;
  border-radius: 50px;
}

.viewed {
  background-color: #bebebe;
}

.notViewed {
  background-color: #1dc088;
}

.notification-list-avatar {
  display: flex;
  margin-top: 5px;
}

.mobile-row {
  margin-top: 10px;
}
</style>
