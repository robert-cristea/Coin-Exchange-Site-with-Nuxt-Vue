<template>
  <div class="notification-page">
    <a-card class="notification-card border-none">
      <div class="notification-card-body">
        <div slot="title" class="notification-card-header">
          <h1 class="Roboto-Medium">{{ $t('text_notification') }}</h1>
          <a-row type="flex" align="middle">
            <a-col :span="20"> </a-col>

            <a-col :span="4">
              <a-button
                class="Roboto-Medium float-right delete-notification"
                @click="deleteNotification"
                >{{ $t('text_delete_message') }}</a-button
              >
            </a-col>
          </a-row>
        </div>
        <a-list size="large" :data-source="Notification">
          <a-list-item
            class="notifications-list-item"
            slot="renderItem"
            :key="item.NotificationUniqueId"
            slot-scope="item"
            @click="reading = [item]"
          >
            <a-list-item-meta class="notification-list-meta">
              <div slot="avatar" class="notification-list-avatar">
                <div
                  style="margin: auto 10px"
                  class="notification-dot"
                  :class="{ viewed: item.Viewed, notViewed: !item.Viewed }"
                ></div>
                <img src="~/assets/icons/header/message.svg" alt="message" />
              </div>
              <p slot="title" class="notification-list-title Roboto-Medium">
                {{ item.NotificationTitle }}
              </p>
              <div
                slot="description"
                class="notification-list-description-flex"
              >
                <p class="notification-list-desc Roboto-Regular">
                  {{ item.NotificationText }}
                </p>
              </div>
            </a-list-item-meta>
            <div slot="extra" class="notification-list-item-extra">
              <span class="notification-list-date Roboto-Regular">
                {{ item.UpdatedOn }}
              </span>
            </div>
          </a-list-item>
        </a-list>
      </div>
    </a-card>
  </div>
</template>

<script>
export default {
  middleware: ['auth'],
  head(){
    return{
      title: 'Bildirim Detayı | Cointral.com',
    }
  },
  data() {
    return {
      Notification: [],
    }
  },
  methods: {
    async getNotification() {
      const {
        $axios,
        $cookies,
        $config: { FINANCE_API_URL },
      } = this
      let authHeaders = { Authorization: 'Bearer ' + $cookies.get('Token') }
      const response = await $axios.get(FINANCE_API_URL + '/GetNotification', {
        params: {
          NotificationKey: this.$route.params.id,
        },
        headers: authHeaders,
      })
      if (response.data.Success) {
        this.Notification = [response.data.Notification]
      }
    },
    // async deleteNotification() {
    //   // let payload = { NotificationKey: this.$route.params.id }
    //   // const {
    //   //   $axios,
    //   //   $cookies,
    //   //   $config: { FINANCE_API_URL },
    //   // } = this
    //   // let authHeaders = {
    //   //   'Content-Type': 'application/json',
    //   //   Authorization: 'Bearer ' + $cookies.get('Token'),
    //   // }
    //   // const response = await $axios.delete(
    //   //   FINANCE_API_URL + '/DeleteNotification',
    //   //   {
    //   //     headers: authHeaders,
    //   //     data: payload,
    //   //   }
    //   // )
    //   // if (response.data.Success) {
    //   //   this.$router.push('/account/notifications')
    //   // }
    // },
    async deleteNotification() {
      let payload = { NotificationKey: this.$route.params.id }
      const {
        $axios,
        $cookies,
        $config: { FINANCE_API_URL },
      } = this
      try {
        const response = await $axios({
          method: 'delete',
          url: FINANCE_API_URL + '/DeleteNotification',
          data: payload,
          headers: {
            Authorization: 'Bearer ' + $cookies.get('Token'),
            'Content-Type': 'application/json',
          },
        })
        if (response.data.Success) {
          this.$router.push(this.localeRoute('/account/notifications'))
        } else {
          return false
        }
      } catch (e) {
        
        return false
      }
    },
  },
  watch: {
    $route: {
      handler: function (val) {
        this.getNotification()
      },
      immediate: true,
    },
  },
}
</script>

<style scoped>
.notification-page {
  min-height: 100vh;
  margin: 50px auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
.notification-card {
  width: 1000px;
}
.notification-card-header {
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
  border-bottom: 1px solid #e8e8e8;
}
.new-notifications-total-text {
  font-size: 18px;
}
.delete-notification {
  color: red;
}
.notification-list-avatar {
  display: flex;
  margin-top: 5px;
}
.notification-list-title,
.notification-list-desc {
  margin-bottom: 0;
}
.notification-list-title {
  font-size: 16px;
  color: #1e2026;
}
.notification-list-desc {
  font-size: 12px;
  color: #858e9d;
}
.notification-list-date {
  color: #566788;
}
.notification-list-item-extra {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.notification-dot {
  margin-top: 5px;
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
</style>
