<template>
  <a-col>
    <div v-if="memo !== null && memo !== ''">
      <a-col>
        <a-col :span="10">
          <a-col align="center">
            <vue-qrcode :value="address" :options="{ width: 137 }" />
          </a-col>

          <a-col align="center">
            <!-- <a-button type="dashed" shape="circle" icon="copy" /> -->
            <a-tooltip
              placement="topLeft"
              v-bind:title="$t('text_copied')"
              arrow-point-at-center
              :trigger="'click'"
              v-clipboard="address"
              @success="handleSuccess"
              @error="handleError"
            >
              <a-button type="link" style="width: 20px; height: 30px;">
                <img
                  style="position: relative; right: 10px; z-index: 5;"
                  src="@/assets/icons/copy.png"
                  alt="Bumble"
                />
              </a-button>
              <div style="word-break: break-all;">
                {{ address }}
              </div>
            </a-tooltip>
          </a-col>
        </a-col>

        <a-col offset="1" :span="3">
          <a-divider type="vertical" style="height: 130px; margin-top: 30px;" />
        </a-col>

        <a-col :span="10">
          <a-col align="center">
            <vue-qrcode :value="memo" :options="{ width: 137 }" />
          </a-col>

          <a-col align="center">
            <!-- <a-button type="dashed" shape="circle" icon="copy" /> -->
            <a-tooltip
              placement="topLeft"
              v-bind:title="$t('text_copied')"
              arrow-point-at-center
              :trigger="'click'"
              v-clipboard="memo"
              @success="handleSuccess"
              @error="handleError"
            >
              <a-button
                type="link"
                style="width: 20px; height: 30px; z-index: 5;"
              >
                <img
                  style="position: relative; right: 10px;"
                  src="@/assets/icons/copy.png"
                  alt="Bumble"
                />
              </a-button>
            </a-tooltip>
            <div style="word-break: break-all;">
              {{ memo }}
            </div>
          </a-col>
        </a-col>
      </a-col>
      <a-row class="with-memo">
        <a-col offset="1" :span="22" class="tip-two memo">
          <a-col :span="2">
            <IconBulb />
          </a-col>
          <a-col :span="22">
            <p class="memo-tip">
              {{ $t('main_wallet_memo_info') }}
              <!-- {{ $t('main_wallet_memo_warning') }} -->
            </p>
          </a-col>
        </a-col>
      </a-row>
    </div>

    <div v-else-if="enabled">
      <a-col align="center">
        {{ name }} {{ $t('main_wallet_coin_address') }}</a-col
      >

      <a-col align="center">
        <vue-qrcode :value="address" :options="{ width: 137 }" />
      </a-col>

      <a-col align="center">
        <!-- <a-button type="dashed" shape="circle" icon="copy" /> -->
        <a-tooltip
          placement="topLeft"
          v-bind:title="$t('text_copied')"
          arrow-point-at-center
          :trigger="'click'"
          v-clipboard="address"
          @success="handleSuccess"
          @error="handleError"
        >
          <a-button type="link" style="width: 20px; height: 30px; z-index: 5;">
            <img
              style="position: relative; right: 10px;"
              src="@/assets/icons/copy.png"
              alt="Bumble"
            />
          </a-button>
        </a-tooltip>
        <div style="word-break: break-all;">{{ address }}</div>
      </a-col>

      <a-row>
        <a-col offset="1" :span="22" class="tip-two">
          <a-col :span="2" style="margin-top: 0;">
            <div class="tips-image-two"></div>
          </a-col>
          <a-col :span="22">
            <p>
              {{ $t('main_wallet_withdraw_info') }}
            </p>
          </a-col>
        </a-col>
      </a-row>
    </div>

    <a-row v-else>
      <a-col
        offset="1"
        :span="22"
        class="tip-two"
        style="background-color: #fdf1f3;"
      >
        <a-col :span="2" style="padding-top: 20px;">
          <img
            style="margin-bottom: 20px;"
            src="@/assets/icons/bulb.svg"
            alt="Red-Bumble"
          />
        </a-col>
        <a-col style="margin-top: 22px;" :span="22">
          <p style="color: #c73953; font-weight: bold;">{{ $t('erc20') }}</p>
        </a-col>
      </a-col>
    </a-row>
  </a-col>
</template>

<script>
import VueQrcode from '@chenfengyuan/vue-qrcode'
import { mapGetters } from 'vuex'
import IconBulb from '@/components/Icons/IconBulb.vue'
export default {
  name: 'NetworkTab',
  components: {
    VueQrcode,
    IconBulb,
  },

  props: {
    name: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    memo: {
      type: String,
      required: false,
    },
    enabled: {
      type: Boolean,
      required: true,
    },
  },

  computed: {
    ...mapGetters({
      SELECTED_ASSET: 'mainwallet/SELECTED_ASSET',
    }),
  },

  methods: {
    handleSuccess(e) {
    },
    handleError(e) {
    },
  },
}
</script>

<style lang="scss" scoped>
p {
  margin: 0;
}
.tip-two {
  margin-top: 30px;
  padding: 17px;
  background: #f5fcff 0% 0% no-repeat padding-box;
  border-radius: 3px;
  opacity: 1;
  text-align: left;
  font-size: 12px;
  display: flex;
  align-items: center;
  &.memo {
    margin-top: 0;
    background: #fdf1f3 0% 0% no-repeat padding-box;
  }
}
.with-memo .tip-two {
  padding: 5px 20px 5px 10px;
  margin-top: 30px;
}
.memo-tip {
  color: #d53454;
}
.tips-image-two {
  width: 20px;
  height: 24px;
  background-image: url('../../assets/icons/Bulb.png');
}
</style>
