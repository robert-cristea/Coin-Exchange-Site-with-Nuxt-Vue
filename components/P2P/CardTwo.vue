<template>
  <a-card class="request-card border-none h-100 w-100">
    <div class="title" slot="title">
      <a-row
        class="title-content"
        :gutter="16"
        type="flex"
        align="middle"
        justify="space-between"
      >
        <a-col :span="24">
          <p class="m-0 Roboto-Regular">
            {{
              RequestInfo.IsRequestOwner
                ? RequestInfo.P2P_OrderUsername
                : RequestInfo.P2PRequestUsername
            }}
            ile konuşuyorsun
          </p>
        </a-col>
      </a-row>
    </div>
    <!-- <a-row>
      <a-col :span="24">
        <a-alert
          type="info"
          class="Roboto-Regular border-none"
          show-icon
          description="Emre yıldırım kullanıcısının 1.00 USDT karşılığında 1 USD ödeme
          aldığında dair onay vermesi gerekiyor."
        ></a-alert>
      </a-col>
    </a-row> -->
    <div class="chat-container">
      <div class="chat-box" ref="chatBox">
        <p v-if="!ChatMessages.length" align="center" class="Roboto-Medium">
          Sohbet Mesajınız Bulunmaktadır.
        </p>
        <p
          class="chat-message w-100"
          v-for="(msg, index) in ChatMessages"
          :align="msg.IsRequestOwner ? 'right' : 'left'"
        >
          {{ msg.Message }}
        </p>
      </div>
    </div>
    <div class="chat-actions">
      <a-input
        v-model="Message"
        class="actions-input Roboto-Regular"
        size="large"
        placeholder="Bir mesaj yazınız.."
        @keyup.enter="sendChatMessage"
      >
        <div slot="suffix">
          <a-button
            :loading="isSendingMessage"
            :disabled="!Message"
            @click="sendChatMessage"
            class="Roboto-Regular"
            type="primary"
          >
            Gonder
          </a-button>
        </div>
      </a-input>
    </div>
  </a-card>
</template>

<script>
export default {
  name: 'CardTwo',
  props: {
    RequestInfo: {
      required: true,
      type: Object,
    },
    RefreshTime: {
      required: true,
      type: Number,
    },
  },
  data() {
    return {
      ChatMessages: [],
      Message: undefined,
      isSendingMessage: false,
    }
  },
  created() {
    this.getChatMessages()
  },
  methods: {
    async sendChatMessage() {
      if (!this.Message) {
        return
      }
      try {
        this.isSendingMessage = true
        const { $cookies, $axios, $config } = this
        const authHeaders = { Authorization: 'Bearer ' + $cookies.get('Token') }
        const { data } = await $axios.post(
          $config.FINANCE_API_URL + '/SendMessage',
          {
            RequestUniqueId: this.$route.params.id,
            Message: this.Message,
          },
          {
            headers: authHeaders,
          }
        )
        const { Success, Message, ErrorCode } = data
        if (Success) {
          this.Message = undefined
          this.getChatMessages()
        }
      } catch (error) {
        console.error(error)
      } finally {
        this.isSendingMessage = false
      }
    },
    async getChatMessages() {
      const { $cookies, $axios, $config } = this
      const authHeaders = { Authorization: 'Bearer ' + $cookies.get('Token') }
      const { data } = await $axios.get(
        $config.FINANCE_API_URL + '/GetChatMessages',
        {
          params: { RequestId: this.$route.params.id },
          headers: authHeaders,
        }
      )
      const { Success, ChatMessageList, Message, ErrorCode } = data
      if (Success) {
        this.ChatMessages = ChatMessageList
        this.$nextTick(() => {
          // this.$refs.chatBox.scroll({
          //   top: this.$refs.chatBox.scrollHeight,
          //   behavior: 'smooth',
          // })
        })
      }
    },
  },
  watch: {
    RefreshTime(val) {
      if (val === 0) {
        this.getChatMessages()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.request-card {
  box-shadow: 0px 0px 10px #0000001a;
  position: relative;
}
.title {
  font-size: 14px;
  color: #838b9a;
  .title-content {
    padding: 20px 0px;
    border-bottom: 1px solid #f4f4f4;
  }
}
.chat-container {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: space-between;
  .chat-box {
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    max-height: 400px;
    overflow-y: scroll;
  }
  .chat-box::-webkit-scrollbar {
    width: 4px;
  }
  .chat-box::-webkit-scrollbar-track {
    background-color: transparent;
  }
  .chat-box::-webkit-scrollbar-thumb {
    background-color: skyblue;
    border-radius: 3px;
  }
}
.chat-actions {
  position: absolute;
  left: 10%;
  right: 10%;
  bottom: 20px;
}
.actions-input >>> .ant-input-group-addon {
  background: transparent !important;
}
.actions-input::placeholder {
  font-family: 'Roboto-Medium';
}
.chat-message {
  word-break: break-all;
  background-color: #f7fbff;
  color: grey;
  border-radius: 3px;
  font-family: 'Roboto-Regular';
  padding: 10px;
}
</style>
