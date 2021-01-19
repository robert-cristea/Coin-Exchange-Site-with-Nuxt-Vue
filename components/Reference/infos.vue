<template>
  <div>
    <div class="infos-body">
      <div class="send-reference">
        <div class="invite">
          <h1>{{ $t('reference_text_invite') }}</h1>
          <span>{{ $t('reference_text_description') }}</span>
        </div>

        <div class="reference-code-area">
          <span>{{ $t('reference_text_reference_code') }}</span>
          <div class="reference-code-copy">
            <span id="reference-code"> {{ referenceDetail.ReferralCode }}</span>
            <a-tooltip>
              <template slot="title">{{ $t('otc_copied') }}</template>
              <img
                class="copy-icon"
                src="../../assets/images/copy.svg"
                @click="copyText('reference-code')"
              />
            </a-tooltip>
          </div>
        </div>
        <div class="default-link-area">
          <p>{{ $t('reference_text_customized_link') }}</p>
          <div class="link-container">
            <span id="default-link"> {{ referenceDetail.ReferenceLink }} </span>
            <a-tooltip>
              <template slot="title">{{ $t('otc_copied') }}</template>
              <img
                class="copy-icon"
                src="../../assets/images/copy.svg"
                @click="copyText('default-link')"
              />
            </a-tooltip>
          </div>
          <a-popover
            v-model="visible"
            v-bind:title="$t('reference_text_customize')"
            trigger="click"
          >
            <div slot="content">
              <a-input placeholder="Link" v-model="link" />
              <a-button @click="updateUserLink(link)">{{
                $t('reference_text_reference_create')
              }}</a-button>
              <a-alert v-if="isError" :message="errorMessage" banner closable />
            </div>

            <a @click="show">{{ $t('reference_text_customize_link') }}</a>
          </a-popover>
        </div>
        <div class="percentages">
          <div class="percentage">
            <p>{{ $t('reference_text_reference_rate') }}</p>
            <span>{{ referenceDetail.CommissionRate }}%</span>
          </div>
        </div>

        <a-button type="primary" class="sendButton" block>{{
          $t('reference_text_invite')
        }}</a-button>
      </div>
      <div class="reference-account">
        <h1>{{ $t('reference_text_reference_account') }}</h1>
        <div>
          <h4>{{ $t('reference_text_reference_rate') }}:</h4>
          <span>25%</span>
        </div>
        <div>
          <h4>{{ $t('reference_text_reference_income') }}:</h4>
          <span>{{ referenceDetail.TotalBTCAmount }} BTC</span>
        </div>
        <div>
          <h4>{{ $t('reference_text_reference_count') }}</h4>
          <span>{{ referenceDetail.TotalFriends }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'infos',
  data() {
    return {
      visible: false,
      referenceDetail: {},
      link: '',
      isError: false,
      errorMessage: '',
    }
  },
  mounted() {
    this.getReferencePageDetail()
  },
  methods: {
    hide() {
      this.visible = false
    },
    show() {
      this.visible = true
    },
    copyText(id) {
      let referenceCode = document.getElementById(id)
      let selection = window.getSelection()
      let range = document.createRange()

      range.selectNodeContents(referenceCode)
      selection.removeAllRanges()
      selection.addRange(range)
      document.execCommand('Copy')
      selection.removeAllRanges()
    },
    updateLink(value) {
      this.link = value
    },
    async getReferencePageDetail() {
      try {
        let authHeaders = {
          Authorization: 'Bearer ' + this.$cookies.get('Token'),
        }
        let deneme = this.$cookies.get('Userkey')
        const response = await this.$axios.get(
          this.$config.FINANCE_API_URL +
            `/GetReferencePageDetail?Offset=0&RowSize=10`,
          {
            headers: authHeaders,
          }
        )

        if (response.data) {
          this.referenceDetail = response.data
        }
      } catch (e) {}
    },
    async updateUserLink(link) {
      try {
        let authHeaders = {
          Authorization: 'Bearer ' + this.$cookies.get('Token'),
        }
        let payload = {
          UserKey: link,
        }

        const response = await this.$axios.post(
          this.$config.FINANCE_API_URL + `/CreateReferenceURL`,
          payload,
          {
            headers: authHeaders,
          }
        )

        if (response.data) {
          if (response.data.Success === false) {
            this.errorMessage = response.data.Message
            this.isError = true
            setTimeout(() => {
              this.isError = false
            }, 3000)
          } else {
            this.referenceDetail.ReferenceLink = response.data.ShortURL
          }
        }
      } catch (e) {
        const response = e.response
        if (response.data && response.data.ErrorCode === '99') {
          this.errorMessage = response.data.Message
          this.isError = true
          setTimeout(() => {
            this.isError = false
          }, 3000)
        }
      }
    },
  },
}
</script>

<style lang="scss">
.copy-icon {
  padding: 0 10px 10px 5px;
}
.link-container {
  display: flex;
}

.infos-body {
  height: 480px;
  display: flex;
  justify-content: center;

  .send-reference {
    width: 721px;
    min-height: 476px;
    background-color: white;
    box-shadow: 0px 0px 20px #0000001a;
    border-radius: 3px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-right: 50px;

    position: relative;
    top: -100px;

    .invite {
      h1 {
        margin: 0;
      }
      div {
        span {
          font-size: 14px;
          letter-spacing: 0px;
          color: #848e9c;
        }
      }
    }
    .reference-code-area {
      span {
        letter-spacing: 0px;
        color: #848e9c;
        font-size: 14px;
      }
      .reference-code-copy {
        span {
          font-size: 32px;
          letter-spacing: 0px;
          color: #212833;
        }
      }
    }
    .default-link-area {
      display: flex;
      p {
        padding-right: 5px;
        letter-spacing: 0px;
        color: #848e9c;
        font-size: 14px;
      }
      div {
        span {
          font-size: 14px;
          letter-spacing: 0px;
          color: #212833;
        }
      }
    }
    .percentages {
      display: flex;
      background: #fafafa 0% 0% no-repeat padding-box;
      max-width: 300px;
      height: 79px;
      border-radius: 3px;
      align-items: center;
      .divider {
        width: 1px;
        height: 47px;
        background: #eaecef 0% 0% no-repeat padding-box;
      }
      .percentage {
        min-width: 320px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-left: 15px;
        p {
          margin: 0;
        }
      }
    }

    .sendButton {
      width: 641px;
    }
  }

  .reference-account {
    margin-top: 120px;
    height: 350px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    position: relative;
    top: -100px;
    h4 {
      letter-spacing: 0px;
      color: #525965;
      font-size: 14px;
    }
    span {
      letter-spacing: 0px;
      color: #212833;
      font-size: 34px;
    }
  }
  @media (max-width: 1000px) {
    height: 480px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    .send-reference {
      width: 100%;
      .percentages {
        width: 100%;
      }
      .sendButton {
        width: 100%;
      }
    }
    .reference-account {
      background-color: white;
      margin-top: 30px;
      min-height: 400px;
      padding: 30px;
    }
  }
}

@media (max-width: 600px) {
  .infos-body .send-reference .default-link-area {
    display: flex;
    flex-direction: column;
  }
}
</style>
