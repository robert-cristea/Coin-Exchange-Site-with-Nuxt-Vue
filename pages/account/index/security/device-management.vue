<template>
  <div>
    <a-breadcrumb>
      <a-breadcrumb-item>
        <a @click="$router.push(localeRoute('/account/security'))">{{
          $t('header_text_security')
        }}</a></a-breadcrumb-item
      >
      <a-breadcrumb-item>{{ $t('text_device_management') }}</a-breadcrumb-item>
    </a-breadcrumb>

    <div class="header">
      <h1>{{ $t('text_device_management') }}</h1>
      <p>{{ $t('device_management_text_info') }}</p>
    </div>
    <a-table
      v-if="!isMobile"
      :columns="columns"
      :row-key="(record, index) => record.DeviceId"
      :data-source="deviceManagementData"
      @expand="setDeviceManagementRows"
      :rowClassName="() => ['Roboto-Medium', 'expanded-row']"
      :expandIconColumnIndex="4"
      :expandedRowKeys="deviceManagementRowKeys"
      :expandIconAsCell="false"
      :expandIcon="expandIcon"
      :loading="isDeviceManagementLoading"
    >
      <template slot="IP_ItemListIP" slot-scope="record">
        {{ record.IP_ItemList[record.IP_ItemList.length - 1]['IP'] }}
      </template>
      <template slot="IP_ItemListDate" slot-scope="record">
        {{ record[0]['CreatedOn'] }}
      </template>

      <template slot="actions" slot-scope="record">
        <a @click="openDeviceModal(record)"> Sil </a>
      </template>

      <div
        slot="expandedRowRender"
        slot-scope="record"
        :class="{ 'scroll-auto': record.IP_ItemList.length > 2 }"
      >
        <table>
          <tbody class="ant-table-tbody">
            <tr
              class="ant-table-row"
              v-for="(item, index) in record.IP_ItemList"
              :key="index"
            >
              <td style="width: 20%"></td>
              <td style="width: 20%">
                {{ item.CreatedOn }}
              </td>
              <td style="width: 20%">
                {{ item.IP }}
              </td>
              <td style="width: 20%"></td>
              <td style="width: 20%"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </a-table>
    <div v-if="isMobile">
      <div
        class="table-item"
        v-for="(item, index) in deviceManagementData"
        :key="index"
      >
        <div class="table-header">
          <h2>{{ item.Browser }}</h2>

          <a-popover trigger="click">
            <div class="popover-content" slot="content">
              <a @click="showModal(index)">{{
                $t('device_management_text_more')
              }}</a>

              <a-modal
                :footer="null"
                :visible="modalVisible"
                @cancel="handleCancel"
                v-bind:title="$t('device_management_text_more')"
              >
                <div>
                  <h1>{{ item.Browser }}</h1>
                  <template v-for="ip in item.IP_ItemList">
                    <div>
                      <div class="table-content">
                        <div class="table-info">
                          <span>{{ $t('device_management_text_date') }}</span>
                          <p>{{ ip.CreatedOn }}</p>
                        </div>
                        <div class="table-info">
                          <span>{{
                            $t('device_management_text_ipadress')
                          }}</span>
                          <p>{{ ip.IP }}</p>
                        </div>
                      </div>
                    </div>
                  </template>
                </div>
              </a-modal>
              <a @click="deleteDevice(item)">{{
                $t('device_management_text_delete')
              }}</a>
            </div>
            <span>...</span>
          </a-popover>
        </div>
        <div class="table-content">
          <div class="table-info">
            <span>{{ $t('device_management_text_date') }}</span>
            <p>{{ item.IP_ItemList[0].CreatedOn }}</p>
          </div>
          <div class="table-info">
            <span>{{ $t('device_management_text_ipadress') }}</span>
            <p>{{ item.IP_ItemList[0].IP }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- delete device modal -->

    <a-modal
      :footer="null"
      :header="null"
      :width="384"
      :mask-closable="false"
      :visible="ShowDeviceDeleteModal"
      @cancel="closeDeviceModal"
    >
      <div
        slot="closeIcon"
        :class="{
          'custom-modal-icon': !isMobile,
          'custom-modal-icon-mobile': isMobile,
        }"
      >
        <a-icon type="close"></a-icon>
      </div>
      <div class="text-center">
        <img
        style="margin: 10px"
          src="../../../../assets/images/device_managment/deviceDelete.svg"
          alt="deviceDelete.svg"
        />

        <h4 class="Roboto-Medium">
          Seçilen güvenilir cihazı silmek istediğinizden emin misiniz?
        </h4>
        <h4 class="Roboto-Medium">
          Cihaz: {{ ModalDevice.Browser }} ({{ ModalDevice.OS }})
        </h4>
      </div>

      <div
        class="d-flex align-items-center justify-content-center"
        style="margin-top: 10px"
      >
        <a-button
          type="secondary"
          size="large"
          class="Roboto-Medium"
          @click="closeDeviceModal"
          :disabled="isDeviceDeleting"
          block
          >İptal</a-button
        >
        <span style="margin: auto 5px"></span>
        <a-button
          :loading="isDeviceDeleting"
          class="deviceDeleteBtn Roboto-Medium"
          size="large"
          @click="deleteDevice(ModalDevice.DeviceId)"
          block
          >Etkinleştir</a-button
        >
      </div>
    </a-modal>
  </div>
</template>

<script>

import { isMobile } from 'mobile-device-detect'
export default {
  name: 'Management',
  head() {
    return {
      title: this.$t('title_text_device_management'),
    }
  },
  data() {
    return {
      deviceManagementData: [],
      deviceManagementRowKeys: [],
      isMobile,
      visible: [],
      modalVisible: false,
      deneme: false,
      ShowDeviceDeleteModal: false,
      ModalDevice: {},
      isDeviceManagementLoading: false,
      isDeviceDeleting: false,
      columns : [
  {
    title: this.$t('device_management_text_device'),
    dataIndex: 'Browser',
    width: '20%',
    key: 'browser',
  },
  {
    title: this.$t('device_management_text_date'),
    dataIndex: 'IP_ItemList',
    Key: 'IP_ItemListDate',
    width: '20%',
    scopedSlots: { customRender: 'IP_ItemListDate' },
  },
  {
    title: this.$t('device_management_text_ip_address'),
    Key: 'IP_ItemListIP',
    scopedSlots: { customRender: 'IP_ItemListIP' },
    width: '20%',
  },
  {
    title: '',
    Key: 'actions',
    scopedSlots: {
      customRender: 'actions',
    },
    width: '20%',
  },
  {
    title: '',
    dataIndex: 'xpand',
    Key: 'xpand',
    scopedSlots: {
      customRender: 'xpand',
    },
    width: '20%',
  },
  {
    title: '',
    dataIndex: '',
    width: '5%',
  },
],
subcolumns : [
  {
    title: '',
    dataIndex: '',
    width: '20%',
    key: 'browser',
  },
  {
    title: '',
    dataIndex: 'CreatedOn',
    key: 'CreatedOn',
    width: '20%',
  },
  {
    title: '',
    dataIndex: 'IP',
    key: 'IP',
    width: '20%',
  },
  {
    title: '',
    dataIndex: '',
    key: 'actions',
    width: '20%',
  },
  {
    title: '',
    dataIndex: '',
    width: '5%',
  },
],
    }
  },
  mounted() {
    this.getDeviceManagementData()
  },
  methods: {
    showModal(index) {
      this.modalVisible = true
    },
    openDeviceModal(record) {
      this.ShowDeviceDeleteModal = true
      this.ModalDevice = record
    },
    closeDeviceModal() {
      this.ShowDeviceDeleteModal = false
      this.ModalDevice = {}
    },
    handleCancel(e) {
      this.modalVisible = false
    },
    setDeviceManagementRows(expanded, record) {
      if (expanded) {
        this.deviceManagementRowKeys = [record.DeviceId]
      } else {
        this.deviceManagementRowKeys = []
      }
    },
    async getDeviceManagementData() {
      try {
        this.isDeviceManagementLoading = true
        let authHeaders = {
          Authorization: 'Bearer ' + this.$cookies.get('Token'),
        }

        const response = await this.$axios.get(
          this.$config.FINANCE_API_URL + `/GetUserBrowserList`,
          {
            headers: authHeaders,
          }
        )
        if (response.data) {
          let modalSize = []
          this.deviceManagementData = response.data.UserBrowser
          this.visible.length = response.data.UserBrowser.length
          modalSize = response.data.UserBrowser

          modalSize.forEach((element, index) => {
            // this.modalVisible[index] = false
            this.modalVisible = false
          })
        }
      } catch (e) {
      } finally {
        this.isDeviceManagementLoading = false
      }
    },
    async deleteDevice(id) {
      try {
        this.isDeviceDeleting = true
        this.isDeviceManagementLoading = true
        let payload = {
          DeviceId: id,
        }

        const response = await this.$axios({
          method: 'delete',
          url: this.$config.FINANCE_API_URL + '/DeleteBrowser',
          data: payload,
          headers: {
            Authorization: 'Bearer ' + this.$cookies.get('Token'),
            'Content-Type': 'application/json',
          },
        })

        if (response.data.Success) {
          this.getDeviceManagementData()
        }
      } catch (e) {
      } finally {
        this.ModalDevice = {}
        this.ShowDeviceDeleteModal = false
        this.isDeviceDeleting = false
        this.isDeviceManagementLoading = false
      }
    },
    getSubItems(arr) {
      if (arr.length === 1) {
        return []
      }
      return arr.slice(1)
    },
    expandIcon(props) {
      const close = (
        <span>
          <svg
            id="Component_3_39"
            data-name="Component 3 – 39"
            xmlns="http://www.w3.org/2000/svg"
            width="9"
            height="5"
            viewBox="0 0 7 4"
          >
            <path
              id="Polygon_5"
              data-name="Polygon 5"
              d="M3.5,0,7,4H0Z"
              transform="translate(7 4) rotate(180)"
              fill="#858e9d"
            />
          </svg>
        </span>
      )

      const open = (
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="9"
            height="5"
            viewBox="0 0 7 4"
          >
            <g
              id="Component_24"
              data-name="Component 24"
              transform="translate(7 4) rotate(180)"
            >
              <path
                id="Polygon_5"
                data-name="Polygon 5"
                d="M3.5,0,7,4H0Z"
                transform="translate(7 4) rotate(180)"
                fill="#858e9d"
              />
            </g>
          </svg>
        </span>
      )

      const icon = props.expanded ? open : close

      return (
        <a
          class="expand-row-icon"
          onClick={(e) => props.onExpand(props.record, e)}
          style={{ color: 'blue', cursor: 'pointer' }}
        >
          {icon}
        </a>
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.header {
  margin-top: 60px;
  p {
    font-size: 14px;
    letter-spacing: 0px;
    color: #7a8393;
  }
}
.table-item {
  height: 125px;
  widows: 100%;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;

  .table-header {
    display: flex;
    justify-content: space-between;
    span {
      font-size: 25px;
      margin-bottom: 6px;
    }
  }
}
.table-content {
  display: flex;
  flex-direction: column;
  .table-info {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    span {
      font-size: 10px/13px;
      letter-spacing: 0px;
      color: #838b9a;
    }
  }
}
.popover-content {
  display: flex;
  flex-direction: column;
  a {
    height: 44px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 14px/19px;
    letter-spacing: 0px;
    color: #2c2c2c;
  }
}

.device-sub-table thead {
  display: none;
}

.custom-modal-icon {
  position: absolute;
  top: -70%;
  right: -50%;
  color: #c1c6cd;
}
.custom-modal-icon-mobile {
  position: absolute;
  top: -70%;
  right: 0;
  color: #c1c6cd;
}
.deviceDeleteBtn {
  color: #f77e93;
  border: 1px solid #f77e93;
  border-radius: 3px;
}
/*
@author Ahmedkhan
*/
.scroll-auto {
  display: block;
  overflow-y: scroll;
  height: 117px;
}
</style>
