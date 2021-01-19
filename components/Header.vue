<template>
  <div class="navbar">
    <div v-show="isMobile" class="navbar-mobile">
      <NavbarBrand />
      <div class="navbar-mobile-end">
        <nuxt-link v-show="isLoggedIn" :to="localePath('/account/notifications')">
          <img
            src="~/assets/icons/notification.svg"
            style="margin-right: 15px"
            alt="notification"
          />
        </nuxt-link>
        <a-button
          v-show="isLoggedIn"
          type="link"
          style="background-color: #1c2740 !important"
          @click="showUserDrawer"
        >
          <img src="~/assets/icons/user.svg" alt="user" />
        </a-button>
        <a-button
          type="link"
          style="background-color: #1c2740 !important"
          @click="showDrawer"
        >
          <img src="~/assets/icons/menu-icon.svg" alt="menu-icon" />
        </a-button>
      </div>

      <!-- HAMBURGER DRAWER -->
      <a-drawer
        placement="right"
        :closable="true"
        :visible="visible"
        :after-visible-change="afterVisibleChange"
        @close="onClose"
        :bodyStyle="{ 'background-color': '#1C2740', height: '100vh' }"
      >
        <div v-show="!isLoggedIn" class="ant-drawer-mobile-buttons">
          <a-button
            class="Roboto-Regular"
            type="link"
            ghost
            @click="$router.push(localeRoute('/login'))"
            >{{ $t('login_text') }}</a-button
          >
          <a-button
            type="primary"
            class="btn-text-dark Roboto-Regular"
            @click="$router.push(localeRoute('/signup'))"
            >{{ $t('signup_text') }}</a-button
          >
        </div>
        <a-menu
          v-show="isLoggedIn"
          :open-keys="openKeys"
          mode="inline"
          theme="dark"
          :inline-collapsed="false"
          @openChange="onOpenChange"
        >
          <a-sub-menu key="sub1">
            <span slot="title">
              <img
                style="margin-right: 15px"
                src="~/assets/images/wallet.svg"
                alt="wallet"
              />
              <span>{{ $t('text_wallet') }}</span>
            </span>
            <a-menu-item>
              <nuxt-link :to="localePath('/my/wallet/main-wallet')">{{
                $t('text_main_wallet')
              }}</nuxt-link>
            </a-menu-item>
            <a-menu-item>
              <nuxt-link :to="localePath('/my/wallet/fiat-wallet')">{{
                $t('text_fiat_wallet')
              }}</nuxt-link>
            </a-menu-item>
            <!-- <a-menu-item>
              <nuxt-link :to="localePath('/my/wallet/p2p-wallet')">{{
                $t('text_p2p_wallet')
              }}</nuxt-link>
            </a-menu-item> -->
            <a-menu-item>
              <nuxt-link :to="localePath('/my/wallet/history')">{{
                $t('main_wallet_history')
              }}</nuxt-link>
            </a-menu-item>
          </a-sub-menu>

          <a-sub-menu key="sub2">
            <span slot="title">
              <img
                style="margin-right: 15px"
                src="~/assets/images/mobile/MobileEmirler.svg"
                alt="wallet"
              />
              <span>{{ $t('text_orders') }}</span>
            </span>
            <a-menu-item>
              <nuxt-link :to="localePath('/my/orders/exchange/open')">{{
                $t('text_spot_open_orders')
              }}</nuxt-link>
            </a-menu-item>
            <a-menu-item>
              <nuxt-link :to="localePath('/my/orders/exchange/history')">{{
                $t('text_spot_order_history')
              }}</nuxt-link>
            </a-menu-item>
            <a-menu-item>
              <nuxt-link :to="localePath('/my/orders/buy-sell/history')">{{
                $t('text_spot_buying_selling')
              }}</nuxt-link>
            </a-menu-item>
          </a-sub-menu>

          <a-sub-menu key="sub3">
            <span slot="title">
              <img
                style="margin-right: 15px"
                src="~/assets/images/mobile/mobileTümpiyasalar.svg"
                alt="wallet"
              />
              <span>{{ $t('text_buy_crypto') }}</span>
            </span>
            <a-menu-item>
              <nuxt-link :to="localePath('/buy-crypto/USD/BTC')">{{
                $t('text_third_party_payments')
              }}</nuxt-link>
            </a-menu-item>
            <a-menu-item>
              <nuxt-link :to="localePath('/otc')">{{
                $t('text_otc_buying_selling')
              }}</nuxt-link>
            </a-menu-item>
          </a-sub-menu>

          <a-sub-menu key="sub4">
            <span slot="title">
              <img
                style="margin-right: 15px"
                src="~/assets/images/mobile/MobileAl-Sat.svg"
                alt="wallet"
              />
              <span>{{ $t('header_text_buy_sell') }}</span>
            </span>
            <a-menu-item>
              <nuxt-link :to="localePath('/swap/BTC-ETH')">{{
                $t('text_swap')
              }}</nuxt-link>
            </a-menu-item>
            <a-menu-item>
              <nuxt-link :to="localePath('/trade/BTC_USDT')">{{
              $t('text_exchange_c2c')
            }}</nuxt-link>
          </a-menu-item>
          <a-menu-item>
            <nuxt-link :to="localePath('/trade/fiat/BTC_TRY')">{{
              $t('text_exchange_c2f')
            }}</nuxt-link>
            </a-menu-item>
            <!-- <a-menu-item>
              <nuxt-link :to="localePath('/P2PMarket')">{{
                $t('text_p2p')
              }}</nuxt-link>
            </a-menu-item> -->
            <a-menu-item>
              <nuxt-link :to="localePath('/otc')">OTC</nuxt-link>
            </a-menu-item>
            <a-menu-item>
              <nuxt-link :to="localePath('/cash')">{{
                $t('cash_heading_text')
              }}</nuxt-link>
            </a-menu-item>
          </a-sub-menu>

          <a-sub-menu class="ant-drawer-end" key="sub5">
            <span slot="title">
              <img
                style="margin-right: 15px"
                src="~/assets/images/mobile/lMobileLanguage.svg"
                alt="wallet"
              />
              <span v-show="$i18n.getLocaleCookie() === 'tr'">Türkçe (Seçili Dil)</span>
              <span v-show="$i18n.getLocaleCookie() === 'en'">English (Selected)</span>
            </span>
            <a-menu-item
              v-for="(lang, item) in $i18n.locales"
              :key="item"
              :value="lang.code"
              @click="switchLanguage(lang.code)"
              >{{ lang.name }}</a-menu-item
            >
          </a-sub-menu>
        </a-menu>
      </a-drawer>

      <!-- USER DRAWER -->
      <a-drawer
        v-show="isLoggedIn"
        placement="right"
        :closable="true"
        :visible="userDrawer"
        :after-visible-change="afterVisibleChange"
        @close="onCloseUserDrawer"
        :bodyStyle="{ 'background-color': '#1C2740', height: '100vh' }"
      >
        <a-menu
          :default-open-keys="['sub1']"
          mode="inline"
          theme="dark"
          :inline-collapsed="false"
          @click="userMenuClicked"
        >
          <a-menu-item
            style="height: 70px; display: flex; flex-direction: column"
          >
            <span>{{ cst }}</span>
            <template v-show="isKycVerified">
              <a-tag color="#52c41a" style="width: fit-content">
                <span style="color: #fff">Verified</span>
              </a-tag>
            </template>
            <template v-show="!isKycVerified">
              <a-tag color="#2a4f70" style="width: fit-content">
                <span style="color: #4dbcf3">Unverified</span>
              </a-tag>
            </template>
          </a-menu-item>

          <a-menu-item class="ant-drawer-end">
            <nuxt-link :to="localePath('/account/security')">
              <img
                style="width: 14px; margin-right: 10px"
                src="~/assets/images/mobile/mobileSecurity.svg"
                alt="security"
              />
              <span>{{ $t('header_text_security') }}</span>
            </nuxt-link>
          </a-menu-item>

          <a-menu-item>
            <nuxt-link :to="localePath('/account/referral')">
              <img
                style="width: 14px; margin-right: 10px"
                src="~/assets/images/mobile/mobilReferral.svg"
                alt="security"
              />
              {{ $t('header_text_reference') }}
            </nuxt-link>
          </a-menu-item>

          <a-menu-item class="ant-drawer-end" @click="logOut">
            <img
              style="width: 14px; margin-right: 10px"
              src="~/assets/images/mobile/mobileLogout.svg"
              alt="security"
            />
            <span>{{ $t('header_text_logout') }}</span>
          </a-menu-item>
        </a-menu>
      </a-drawer>

      <!-- LANGUAGE DRAWER -->
      <a-drawer
        placement="right"
        :closable="true"
        :visible="langDrawer"
        @close="closeLangDrawer"
        :bodyStyle="{
          'background-color': '#1C2740',
          height: '100vh',
          width: '100vw',
        }"
      >
        <a-menu
          style="margin-top: 30px"
          :default-selected-keys="['1']"
          :default-open-keys="['sub1']"
          mode="inline"
          theme="dark"
          :inline-collapsed="false"
          @click="langDrawerClicked"
        >
          <a-menu-item>
            <a-icon type="pie-chart" />
            <span>Türkçe</span>
          </a-menu-item>
          <a-menu-item>
            <a-icon type="pie-chart" />
            <span>English</span>
          </a-menu-item>
        </a-menu>
      </a-drawer>
    </div>

    <div v-show="!isMobile" class="navbar-desktop">
      <NavbarBrand />
      <div class="navbar-collapse">
        <a-menu
          mode="horizontal"
          theme="dark"
          class="border-none Roboto-Regular header-menu-left"
        >
          <!-- submenu -->
          <a-sub-menu class="sub-menu">
            <span slot="title" class="submenu-title-wrapper">
              <img width="18" src="~/assets/icons/menu.svg" alt="menu" />
            </span>
            <a-menu-item v-for="(item, i) in submenuItems" :key="i">
              <a :href="item.extern ? item.link : localePath(item.link)">
                <img
                  class="submenu-image"
                  width="25"
                  :src="
                    require(`../assets/images/homepage/product/icons/${
                      i + 1
                    }.svg`)
                  "
                  alt="submenu_image"
                />
                {{ item.text }}
              </a>
            </a-menu-item>
          </a-sub-menu>
        </a-menu>
        <a-menu
          mode="horizontal"
          class="border-none Roboto-Regular header-menu-left"
        >
          <a-sub-menu
          style="padding:0px"
            popupClassName="header-submenu-content"
            class="header-sub-menu"
          >
            <div slot="title" >
               {{ $t('exchange_text')}}
              <a-icon style="font-size: 0.6rem" type="caret-down"></a-icon>
            </div>
            <a-menu-item class="Roboto-Regular White">
              <nuxt-link :to="localePath('/trade/BTC_USDT')">{{
              $t('text_exchange_c2c')
            }}</nuxt-link>
            </a-menu-item>
            <a-menu-item class="Roboto-Regular">
              <nuxt-link :to="localePath('/trade/fiat/BTC_TRY')">{{
              $t('text_exchange_c2f')
            }}
              </nuxt-link>
            </a-menu-item>
          </a-sub-menu>

          <!-- <a-menu-item>
            <nuxt-link :to="localePath('/P2PMarket')">{{
              $t('text_p2p')
            }}</nuxt-link>
          </a-menu-item> -->

          <a-menu-item>
            <nuxt-link :to="localePath('/otc')">OTC</nuxt-link>
          </a-menu-item>

          <a-menu-item>
            <nuxt-link :to="localePath('/swap/BTC-ETH')">{{
              $t('swap_text')
            }}</nuxt-link>
          </a-menu-item>

          <a-menu-item>
            <nuxt-link :to="localePath('/buy-crypto/USD/BTC')">{{
              $t('text_buy')
            }}</nuxt-link>
          </a-menu-item>

          <a-menu-item>
            <nuxt-link :to="localePath('/cash')">{{
              $t('cash_heading_text')
            }}</nuxt-link>
          </a-menu-item>
        </a-menu>
      </div>

      <div class="navbar-end">
        <a-menu
          mode="horizontal"
          class="border-none Roboto-Regular header-menu-right"
        >
          <a-sub-menu
            v-show="isLoggedIn"
            popupClassName="header-submenu-content"
            class="header-sub-menu"
          >
            <div slot="title">
              {{ $t('text_wallet') }}
              <a-icon style="font-size: 0.6rem" type="caret-down"></a-icon>
            </div>
            <a-menu-item class="Roboto-Regular White">
              <nuxt-link :to="localePath('/my/wallet/main-wallet')">{{
                $t('text_main_wallet')
              }}</nuxt-link>
            </a-menu-item>
            <a-menu-item class="Roboto-Regular">
              <nuxt-link :to="localePath('/my/wallet/fiat-wallet')">
                {{ $t('text_fiat_wallet') }}
              </nuxt-link>
            </a-menu-item>
            <!-- <a-menu-item class="Roboto-Regular">
              <nuxt-link :to="localePath('/my/wallet/p2p-wallet')">{{
                $t('text_p2p_wallet')
              }}</nuxt-link>
            </a-menu-item> -->
          </a-sub-menu>

          <a-sub-menu
            v-show="isLoggedIn"
            popupClassName="header-submenu-content"
            class="header-sub-menu"
          >
            <div slot="title">
              {{ $t('text_orders') }}
              <a-icon style="font-size: 0.6rem" type="caret-down"></a-icon>
            </div>
            <a-menu-item class="Roboto-Regular">
              <nuxt-link :to="localePath('/my/orders/exchange/open')">{{
                $t('text_spot_order')
              }}</nuxt-link>
            </a-menu-item>
            <!-- <a-menu-item class="Roboto-Regular">
              <nuxt-link :to="localePath('/my/orders/exchange/history')">{{
                $t('text_p2p_order')
              }}</nuxt-link>
            </a-menu-item> -->
            <a-menu-item class="Roboto-Regular">
              <nuxt-link :to="localePath('/my/orders/buy-sell/history')">{{
                $t('text_buyingsellinghistory')
              }}</nuxt-link>
            </a-menu-item>
          </a-sub-menu>

          <a-sub-menu
            v-show="isLoggedIn"
            popupClassName="header-submenu-content"
            class="header-sub-menu header-sub-menu-icon"
          >
            <span slot="title">
              <img
                width="20px"
                src="~/assets/icons/header/user.svg"
                alt="profile"
              />
              <!-- <a-icon style="font-size: 30px; color: #90dafe" type="user" /> -->
            </span>

            <a-menu-item
              class="Roboto-Regular"
              :class="{
                'ant-menu-item-selected': $route.path === '/account/dashboard',
              }"
            >
              <nuxt-link :to="localePath('/account/dashboard')">{{
                $t('text_dashboard')
              }}</nuxt-link>
            </a-menu-item>
            <a-menu-item
              class="Roboto-Regular"
              :class="{
                'ant-menu-item-selected': $route.path === '/account/security',
              }"
            >
              <nuxt-link :to="localePath('/account/security')">{{
                $t('text_security')
              }}</nuxt-link>
            </a-menu-item>
            <!-- <a-menu-item class="Roboto-Regular">
              {{ $t('text_identity') }}
            </a-menu-item>-->
            <a-menu-item
              class="Roboto-Regular"
              :class="{
                'ant-menu-item-selected': $route.path === '/account/referral',
              }"
            >
              <nuxt-link :to="localePath('/account/referral')">{{
                $t('text_referral')
              }}</nuxt-link>
            </a-menu-item>
            <a-menu-item @click="logOut" class="Roboto-Regular logout-menu">
              <span>{{ $t('text_logout') }}</span>
              <icon-logout />
            </a-menu-item>
          </a-sub-menu>

          <a-sub-menu
            v-show="isLoggedIn"
            popupClassName="header-submenu-content"
            class="header-sub-menu header-sub-menu-icon"
          >
            <span slot="title">
              <img
                width="20px"
                src="~/assets/icons/header/bell.svg"
                alt="bell"
              />
              <!-- <a-icon type="bell" /> -->
            </span>
            <a-menu-item
              style="padding: 0; margin: 0; height: 300px; border-radius: 0"
            >
              <NotificationCard />
            </a-menu-item>
          </a-sub-menu>

          <a-sub-menu
            v-show="isLoggedIn"
            popupClassName="header-submenu-content"
            class="header-sub-menu header-sub-menu-icon"
          >
            <span slot="title">
              <img
                width="20px"
                src="~/assets/icons/header/ScanQrIcon.svg"
                alt="icon"
              />
            </span>
            <a-menu-item
              style="
                padding: 0px;
                margin: 0;
                height: fit-content;
                border-radius: 0;
              "
              class="qr_menu_item Roboto-Medium"
            >
              <div class="d-flex">
                <div class="d-flex flex-column">
                  <div
                    class="qr_menu_item_subitem"
                    :class="{
                      qr_menu_item_active: ActiveQrCode === 'APPLE_APPSTORE',
                    }"
                    @click.stop="ActiveQrCode = 'APPLE_APPSTORE'"
                  >
                    <p
                      class="border-none m-0"
                      style="text-align: left"
                      size="large"
                      ghost
                    >
                      <img
                        width="15px"
                        style="margin: 5px"
                        src="~/assets/icons/header/apple.svg"
                        alt="icon"
                      />
                      App Store
                    </p>
                  </div>
                  <div
                    class="qr_menu_item_subitem"
                    :class="{
                      qr_menu_item_active: ActiveQrCode === 'GOOGLE_PLAYSTORE',
                    }"
                    @click.stop="ActiveQrCode = 'GOOGLE_PLAYSTORE'"
                  >
                    <p
                      class="border-none m-0"
                      style="text-align: left"
                      size="large"
                      ghost
                    >
                      <img
                        width="15px"
                        style="margin: 5px"
                        src="~/assets/icons/header/googlePlay.svg"
                        alt="icon"
                      />
                      Google Play
                    </p>
                  </div>
                </div>
                <div class="qr_menu_item_subitem text-white">
                  <div class="d-flex flex-column justify-content-center">
                    <vue-qrcode
                      v-show="ActiveQrCode === 'GOOGLE_PLAYSTORE'"
                      :value="PlayStoreLink"
                      :options="{ width: 100, height: 100 }"
                    />
                    <vue-qrcode
                      v-show="ActiveQrCode === 'APPLE_APPSTORE'"
                      :value="AppStoreLink"
                      :options="{ width: 100, height: 100 }"
                    />
                    <h5 @click.stop="openLink" class="text-white Roboto-Regular">
                        İndirmek için Tara
                      </h5>
                  </div>
                </div>
              </div>
            </a-menu-item>
          </a-sub-menu>
        </a-menu>

        <a-button
          v-show="!isLoggedIn"
          @click="$router.push(localeRoute('/login'))"
          class="Roboto-Regular"
          type="link"
          ghost
          >{{ $t('login_text') }}</a-button
        >

        <a-button
          v-show="!isLoggedIn"
          @click="$router.push(localeRoute('/signup'))"
          type="primary"
          class="btn-text-dark Roboto-Regular"
          >{{ $t('signup_text') }}</a-button
        >
        <a-menu
          v-show="!isLoggedIn"
          mode="horizontal"
          class="border-none Roboto-Regular header-menu-right"
        >
          <a-sub-menu
            popupClassName="header-submenu-content"
            class="header-sub-menu header-sub-menu-icon"
          >
            <span slot="title">
              <img
                width="20px"
                src="~/assets/icons/header/ScanQrIcon.svg"
                alt="icon"
              />
            </span>
            <a-menu-item
              style="
                padding: 0px;
                margin: 0;
                height: fit-content;
                border-radius: 0;
              "
              class="qr_menu_item Roboto-Medium"
            >
              <div class="d-flex">
                <div class="d-flex flex-column">
                  <div
                    class="qr_menu_item_subitem"
                    :class="{
                      qr_menu_item_active: ActiveQrCode === 'APPLE_APPSTORE',
                    }"
                    @click.stop="ActiveQrCode = 'APPLE_APPSTORE'"
                  >
                    <p
                      class="border-none m-0"
                      style="text-align: left"
                      size="large"
                      ghost
                    >
                      <img
                        width="15px"
                        style="margin: 5px"
                        src="~/assets/icons/header/apple.svg"
                        alt="icon"
                      />
                      App Store
                    </p>
                  </div>
                  <div
                    class="qr_menu_item_subitem"
                    :class="{
                      qr_menu_item_active: ActiveQrCode === 'GOOGLE_PLAYSTORE',
                    }"
                    @click.stop="ActiveQrCode = 'GOOGLE_PLAYSTORE'"
                  >
                    <p
                      class="border-none m-0"
                      style="text-align: left"
                      size="large"
                      ghost
                    >
                      <img
                        width="15px"
                        style="margin: 5px"
                        src="~/assets/icons/header/googlePlay.svg"
                        alt="icon"
                      />
                      Google Play
                    </p>
                  </div>
                </div>
                <div class="qr_menu_item_subitem text-white">
                  <div class="d-flex flex-column justify-content-center">
                    <vue-qrcode
                      v-show="ActiveQrCode === 'GOOGLE_PLAYSTORE'"
                      :value="PlayStoreLink"
                      :options="{ width: 100, height: 100 }"
                    />
                    <vue-qrcode
                      v-show="ActiveQrCode === 'APPLE_APPSTORE'"
                      :value="AppStoreLink"
                      :options="{ width: 100, height: 100 }"
                    />
                    <h5 @click.stop="openLink" class="text-white Roboto-Regular">
                      İndirmek için Tara
                    </h5>
                  </div>
                </div>
              </div>
            </a-menu-item>
          </a-sub-menu>
        </a-menu>

        <a-select
          :default-value="$i18n.locale"
          class="select-outline select-outline-primary text-white no-border Roboto-Regular"
          style="width: 100px; margin-left: 10px"
        >
          <a-icon
            slot="suffixIcon"
            type="caret-down"
            class="text-white"
          ></a-icon>
          <a-select-option
            v-for="(lang, item) in availableLocales"
            :key="item"
            :value="lang.code"
            @click="switchLanguage(lang.code)"
            >{{ lang.name }}</a-select-option
          >
        </a-select>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarBrand from './NavbarBrand'
import { mapGetters } from 'vuex'
import NotificationCard from '~/components/NotificationCard'
import IconLogout from '@/components/Icons/IconLogout.vue'
import jwt_decode from 'jwt-decode'
import VueQrcode from '@chenfengyuan/vue-qrcode'

export default {
  components: {
    NavbarBrand,
    NotificationCard,
    IconLogout,
    VueQrcode,
  },
  props: {
    loginlayout: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      ActiveQrCode: 'APPLE_APPSTORE',
      PlayStoreLink:
        'https://play.google.com/store/apps/details?id=com.cointral.exchange',
      AppStoreLink:
        'https://apps.apple.com/tt/app/cointral-bitcoin-al-sat/id1536116477',
      isMobile: null,
      isNavbarOpen: false,
      UserInfo: null,
      visible: false,
      userDrawer: false,
      langDrawer: false,
      rootSubmenuKeys: ['sub1', 'sub2', 'sub3', 'sub4'],
      openKeys: ['sub1'],
      cst: '',
      productsIconsUrl: '../assets/images/homepage/product/icons/',
      submenuItems: [
        { text: 'Nakit', link: '/cash' },
        { text: 'Hızlı Takas', link: '/swap/BTC-ETH' },
        { text: 'Kredi Kartı', link: 'buy-crypto' },
        { text: 'OTC', link: '/otc' },
        { text: 'P2P', link: '/P2PMarket' },
        { text: 'Kurumsal', link: '/account/corporate' },
        { text: 'Altın', link: 'https://cointral.store/', extern: true },
        {
          text: 'Gayrimenkul',
          link: 'https://realty.cointral.com/',
          extern: true,
        },
      ],
    }
  },
  mounted() {
    const token = this.$cookies.get('Token')
    if (!!token) {
      const { cst } = jwt_decode(token)
      const cstArr = cst.split('@')
      const cstName = cst.substring(0, 2) + '***'
      this.cst = cstName + '@' + cstArr[1]
      this.getUserInfo()
    }

    this.isMobile = window.innerWidth < 1000

    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 1000
    })

  },
  watch: {
    $route(to, from) {
      this.visible = false
      this.userDrawer = false
    },
  },
  computed: {
    // ...mapGetters({ isLoggedIn: 'auth/isLoggedIn' }),
    availableLocales() {
      return this.$i18n.locales
    },
    isKycVerified() {
      return this.UserInfo ? this.UserInfo.KYCVerified : false
    },
    activeLangCode () {
      return this.$cookies.get('i18n_redirected')
    },
    isLoggedIn: {
      get () {
         let token = this.$cookies.get('Token')
         return !!token ? true : false
      },
      cache: false
    }
  },
  methods: {
    openLink () {
      if (this.ActiveQrCode === 'APPLE_APPSTORE') {
          window.open(this.AppStoreLink)
        } else if (this.ActiveQrCode === 'GOOGLE_PLAYSTORE') {  
          window.open(this.PlayStoreLink)
      } 
    },
    async switchLanguage(code) {
      await this.$i18n.setLocale(code)
    },
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(
        (key) => this.openKeys.indexOf(key) === -1
      )
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
    },
    logOut() {
      this.userDrawer = false
      const { $store, $cookies, $router } = this
      $cookies.removeAll()
      $store.commit('auth/setLoggedIn', false)
      $router.push(this.localeRoute('/login'))
    },

    userMenuClicked(key) {
      key ? (this.userDrawer = false) : null
      switch (key) {
        case '1':
          this.pushRoutePath('/wallet')
          break
        default:
          break
      }
    },

    langDrawerClicked() {
      key ? (this.langDrawer = false) : null
      switch (key) {
        case '1':
          break
        default:
          break
      }
    },

    async getUserInfo() {
      const {
        $axios,
        $cookies,
        $config: { FINANCE_API_URL },
      } = this
      let authHeaders = { Authorization: 'Bearer ' + $cookies.get('Token') }
      const response = await $axios.get(FINANCE_API_URL + '/GetUserInfo', {
        headers: authHeaders,
      })
      if (response.data.Success) {
        const { UserInfo } = response.data
        this.UserInfo = UserInfo
      }
    },

    afterVisibleChange(val) {},

    showDrawer() {
      this.visible = true
    },

    onClose() {
      this.visible = false
    },

    showUserDrawer() {
      this.userDrawer = true
    },

    onCloseUserDrawer() {
      this.userDrawer = false
    },

    closeLangDrawer() {
      this.langDrawer = false
    },
  },
}
</script>

<style scoped>
.sub-menu {
  padding: 0 !important;
}
.submenu-image {
  border-radius: 5px;
  padding: 2px;
  margin-right: 18px;
}
</style>

<style lang="scss" scoped>
@import '~/assets/scss/breakpoints.scss';

$padding-y: 0.5rem;
$padding-x: 1rem;

.header-menu-left,
.header-menu-right {
  background: #1c2640;
  color: white;
}

.header-menu-right {
  .header-sub-menu {
    width: 80px;
  }

  .header-sub-menu-icon {
    width: 60px;
  }

  .header-sub-menu {
    border-bottom: 0;
  }

  .header-sub-menu:hover {
    border-bottom: 0;
  }
}

.header-submenu-content .ant-menu {
  background: #1c2640 !important;
}

.navbar {
  height: 60px;
  display: flex;
  background: #1c2640;

  .navbar-mobile {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .navbar-brand {
      padding: 0;

      img {
        width: 100%;
      }
    }
  }

  .navbar-desktop {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .navbar-brand {
      padding-left: 1rem;
    }
  }

  @include bp(tablet) {
    align-items: center;
    justify-content: space-between;
    padding: $padding-x;

    .navbar-mobile-end {
      display: block;
    }
  }

  &-collapse {
    padding-left: 30px;
    height: 100%;
    display: flex;
    align-items: center;

    @include bp(tablet) {
      display: none;
    }

    ul {
      padding: 0;
      margin: 0;
      display: flex;
      list-style: none;
      height: 100%;

      li {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 20px;

        a {
          color: #fff;
        }

        &:hover {
          cursor: pointer;
          color: #71d4ff;
          border-bottom: 3px solid #50c5ff;
        }
      }
    }
  }

  &-end {
    margin-left: auto;
    display: flex;
    align-items: center;
    height: 100%;

    ul {
      list-style-type: none;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      margin: 0;
      height: 100%;
      top: 60px !important;

      li {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 20px;
        height: 100%;
        cursor: pointer;

        a {
          color: #fff;
        }

        &:first-child:hover {
          cursor: pointer;
          color: #71d4ff;
          border-bottom: 3px solid #50c5ff;
        }
      }
    }

    @include bp(tablet) {
      display: none;
    }

    padding: 0px $padding-x;
  }
}

.header-dropdown-overlay .ant-dropdown {
  top: 60px !important;
}

.header-dropdown-overlay .ant-dropdown-menu {
  background: #1c2640;
  min-width: 160px;
  border-radius: 0;
  padding: 15px 0 0 0;
}

.header-dropdown-overlay .ant-dropdown-menu-item-active {
  background-color: black;
  color: #90dafe;
}

.header-dropdown-overlay .ant-dropdown-menu li {
  padding: 10px 12px;
}

.header-dropdown-overlay .ant-dropdown-menu li a {
  padding: 10px auto;
  color: #ffffff;
}

.header-dropdown-overlay .ant-dropdown-menu li a:hover {
  color: #90dafe;
}
.logout-menu {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.qr_menu_item_subitem {
  padding: 8px;
}
.qr_menu_item,
.qr_menu_item:hover,
.qr_menu_item:active {
  background-color: #27365f !important;
  color: white !important;
}
.qr_menu_item_active {
  background-color: #3f507e !important;
  color: #90dafe !important;
}
.qr_menu_item_subitem:hover {
  background-color: #3f507e !important;
  color: #90dafe;
}
</style>
