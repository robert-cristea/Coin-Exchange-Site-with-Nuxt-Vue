<template>
  <a-card class="request-card border-none h-100 w-100">
    <div class="title" slot="title">
      <a-row
        class="title-content my-common"
        :gutter="16"
        type="flex"
        align="middle"
        justify="space-between"
      >
        <a-col :span="10">
          <p class="m-0 Roboto-Regular">
            Oluşturma Tarihi {{ RequestInfo.CreatedOn }}
          </p>
        </a-col>
        <a-col :span="14">
          <div class="extra Roboto-Medium">
            <p class="extra-item m-0">Yenilemeye Kalan Süre</p>
            <a-button class="extra-item time-btn" type="secondary">
              {{
                RefreshTime.toString().length === 1
                  ? '00:0' + RefreshTime
                  : '00:' + RefreshTime
              }}
            </a-button>
            <a-button class="extra-item awaiting-approval-btn">{{
              RequestInfo.Status
            }}</a-button>
          </div>
        </a-col>
      </a-row>
    </div>
    <!-- content -->
    <a-row class="my-common" :gutter="16" type="flex" justify="space-between">
      <a-col :span="8">
        <a-card class="h-100 w-100">
          <img
            slot="cover"
            class="card-cover"
            alt="cover"
            src="../../assets/images/p2p-request/card-cover.png"
          />
          <a-card-meta>
            <div slot="title" class="Roboto-Medium">İşlem Hakkında</div>
            <div
              slot="description"
              style="word-break: break-all; white-space: normal"
            >
              BTC’yi seçiyorsanız, lütfen transfer ettiğiniz platformda
              seçtiğiniz para biriminin de BTC olduğundan emin olun; Diğer
              platformlara transfer yapmak istiyorsanız, lütfen karşı platformun
              BTC yatırma adresini girin (Banka transferinde olduğu gibi, karşı
              tarafın kart numarasını girmeniz gerekmektedir..
            </div>
          </a-card-meta>
        </a-card>
      </a-col>
      <a-col :span="16">
        <a-row class="my-common" :gutter="16">
          <a-col :span="24">
            <h4 align="right" class="m-0 Roboto-Regular">
              Talep Numarası : {{ $route.params.id}}
            </h4>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="6">
            <div class="box">
              <h3 align="center" class="box-title Roboto-Medium m-0">Toplam</h3>
              <p align="center" class="Roboto-Medium m-0">
                {{ RequestInfo.Total }} {{ RequestInfo.FiatCurrency }}
              </p>
            </div>
          </a-col>
          <a-col :span="6">
            <div class="box">
              <h3 align="center" class="box-title Roboto-Medium m-0">Fiat</h3>
              <p align="center" class="Roboto-Medium m-0">
                {{ RequestInfo.FiatPrice }} {{ RequestInfo.FiatCurrency }}
              </p>
            </div>
          </a-col>
          <a-col :span="6">
            <div class="box">
              <h3 align="center" class="box-title Roboto-Medium m-0">Miktar</h3>
              <p align="center" class="Roboto-Medium m-0">
                {{ RequestInfo.Amount }} {{ RequestInfo.Asset }}
              </p>
            </div>
          </a-col>
          <a-col :span="6" v-if="!RequestInfo.IsRequestOwner">
            <div class="box">
              <h3 align="center" class="box-title Roboto-Medium m-0">
                Komisyon
              </h3>
              <p align="center" class="Roboto-Medium m-0">
                % {{ RequestInfo.CointralCommission }}
              </p>
            </div>
          </a-col>
        </a-row>

        <!--  -->
        <a-row class="my-common" :gutter="16">
          <a-col :span="24">
            <h3 class="Roboto-Medium underline">Hesap Bilgileri</h3>
            <a-row :gutter="16">
              <a-col :span="6">Adı Soyadı</a-col>
              <a-col>
                <a-tooltip title="Copied !" trigger="click">
                  <span id="NAME">
                    {{ RequestInfo.SellerName }}
                  </span>
                  <img
                    @click="copyText('NAME')"
                    src="~/assets/images/copy.svg"
                  />
                </a-tooltip>
              </a-col>
            </a-row>
            <a-row class="my-common" :gutter="16">
              <a-col :span="6">Hesap Numarası</a-col>
              <a-col>
                <a-tooltip title="Copied !" trigger="click">
                  <span id="IBAN">
                    {{ RequestInfo.IBAN }}
                  </span>
                  <img
                    @click="copyText('IBAN')"
                    src="~/assets/images/copy.svg"
                  />
                </a-tooltip>
              </a-col>
            </a-row>
            <!-- <a-row class="box-row" :gutter="16">
              <a-col :span="12">
                <div class="box-wrapper">
                  <ClickBox />
                </div>
              </a-col>
            </a-row> -->
          </a-col>
        </a-row>
        <!--  -->
      </a-col>
    </a-row>
    <!-- content -->
  </a-card>
</template>

<script>
import moment from 'moment'
export default {
  name: 'CardOne',
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
  methods: {
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
  },
}
</script>

<style lang="scss" scoped>
.request-card {
  min-height: 500px;
  box-shadow: 0px 0px 10px #0000001a;
}
.extra {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .extra-item {
    margin: auto 2px;
  }
}
.spacer {
  flex-grow: 1;
}
.awaiting-approval-btn {
  background-color: #ffe1bc;
  color: #af6116;
  border: none;
}
.title {
  font-size: 14px;
  color: #838b9a;
  .title-content {
    padding: 20px 0px;
    border-bottom: 1px solid #f4f4f4;
  }
}
.underline {
  border-bottom: 1px solid #f4f4f4;
}
.box-wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  .box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 140px;
    min-height: 140px;
  }
}
.box-title {
  color: #a5a4a5;
}
.box {
  border: 1px solid #e2e2e2;
  border-radius: 3px;
  text-align: center;
  padding: 20px;
}
.card-cover {
  background: lightseagreen;
}

.box-row {
  margin-top: 30px;
}
.my-common {
  margin: 10px auto;
}
</style>
