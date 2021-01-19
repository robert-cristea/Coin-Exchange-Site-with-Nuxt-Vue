<template>
  <div class="footer">
    <div class="footer-body">
      <div class="container">
        <div class="mobile-footer">
          <a-collapse accordion expand-icon-position="right" >
            <template #expandIcon="props">
              <a-icon type="plus" v-if="!props.isActive" expand-icon-position="right" />
              <a-icon class="minus" type="minus" v-if="props.isActive" expand-icon-position="right" />
            </template>
            <a-collapse-panel key="1" header="Ürünler">
              <ul>
                <li>
                  <a href="/trade">{{$t('footer_exchange')}}</a>
                </li>
                <li>
                  <a href="">{{$t('footer_branch')}}</a>
                </li>
                <li >
                  <a @click.prevent="$router.push(localePath('/cash'))">{{$t('footer_cash')}}</a>
                </li>
                <li>
                  <a href="https://cointral.store">{{$t('footer_gold')}}</a>
                </li>
                <li>
                  <a href="/otc">{{$t('footer_otc')}}</a>
                </li>
                <li>
                  <a href="#">{{$t('footer_p2p')}}</a>
                </li>
                <li>
                  <a href="/buy-crypto">{{$t('footer_creditcard')}}</a>
                </li>
                <li>
                  <a href="https://swap.cointral.com">{{$t('footer_swap')}}</a>
                </li>
                <li>
                  <a href="https://realty.cointral.com">{{$t('footer_realty')}}</a>
                </li>
                <li>
                  <a href="#">{{$t('footer_corperate')}}</a>
                </li>
              </ul>
            </a-collapse-panel>
            <a-collapse-panel key="2" header="Kurumsal" :disabled="false">
              <ul>
                  <li>
                    <a href="#">{{$t('footer_about_us')}}</a>
                  </li>
                  <li>
                    <a href="#">{{$t('footer_why_cointral')}}</a>
                  </li>
                  <li>
                    <a href="https://cointral.zendesk.com/hc/tr/requests/new"
                      >{{$t('footer_communication')}}</a
                    >
                
                <li></li>
                <h3 class="list-heading">{{$t('footer_legal_info')}}</h3>
                  </li><li>
                  <a href="https://cointral.com/tr/kullanim-kosulu/"
                    >{{$t('footer_user_agreement')}}</a
                  >
                </li>
                <li>
                  <a href="https://cointral.com/tr/kvkk-ve-aydinlatma-metni/"
                    >{{$t('footer_personal_data')}}</a
                  >
                </li>
                <li>
                  <a
                    href="https://cointral.com/tr/suc-gelirlerinin-aklanmasinin-ve-terorun-finansmaninin-onlenmesi-hakkinda-politika/"
                    >{{$t('footer_sga_tf')}}</a >
                </li>
                <li>
                  <a href="https://cointral.com/tr/musterini-tani-politikasi/"
                    >{{$t('footer_kyc_principles')}}</a>
                </li>
                </ul>
              </ul>
            </a-collapse-panel>
            <a-collapse-panel key="3" header="Bilgi Merkezi">
              <ul>
                <li>
                  <a href="https://cointral.com/tr/category/blog/">{{$t('footer_blog')}}</a>
                </li>
                <li>
                  <a href="https://cointral.com/tr/category/haberler/"
                    >{{$t('footer_news')}}</a
                  >
                </li>
                <li>
                  <a
                    href="https://cointral.com/tr/category/gunluk-kripto-para-bulteni/"
                    >{{$t('footer_daily_bulletin')}}</a
                  ><li>
                  </li>
                <h3 class="list-heading">{{$t('footer_buy')}}</h3>
                <ul>
                  <li>
                    <a href="https://cointral.com/tr/bitcoin-satin-al/">{{$t('footer_buy_btc')}}</a>
                  </li>
                  <li>
                    <a href="https://cointral.com/tr/ethereum-satin-al/">{{$t('footer_buy_eth')}}</a>
                  </li>
                  <li>
                    <a href="https://cointral.com/tr/tether-satin-al/">{{$t('footer_buy_usdt')}}</a
                    >
                  </li>
                  <li>
                    <a href="https://cointral.com/tr/litecoin-satin-al/">{{$t('footer_buy_litecoin')}}</a>
                  </li><li>
                    <a href="https://cointral.com/tr/ripple-satin-al/">{{$t('footer_buy_xrp')}}</a>
                  </li>
                </ul>
                </li>
              </ul>
            </a-collapse-panel>
            <a-collapse-panel key="4" header="Destek">
              <ul>
                <li>
                  <a href="https://cointral.zendesk.com/hc/tr">{{$t('footer_support_center')}}</a>
                </li>
                <li>
                  <a href="https://cointral.zendesk.com/hc/tr/articles/360013923799-Limitler">{{$t('footer_limits')}}</a>
                </li>
                <li>
                  <a href="https://cointral.com/tr/komisyon-oranlari/"
                    >{{$t('footer_commissions')}}</a
                  >
                </li>
                <li>
                  <a href="https://cointral.com/tr/cointral-hesabinizin-guvenligini-artirmak-icin-yapmaniz-gereken-4-adim/">{{$t('footer_security')}}</a>
                </li>
              </ul>
            </a-collapse-panel>
            <a-collapse-panel key="5" header="Topluluk">
              <div class="text-right">
                <div class="list-social-media">
                  <div class="list-social-media-item">
                    <a target="_blank" href="https://twitter.com/Cointral/">
                      <IconTwitter />
                    </a>
                  </div>
                  <div class="list-social-media-item">
                    <a target="_blank" href="https://t.me/cointral/">
                      <IconTelegram />
                    </a>
                  </div>
                  <div class="list-social-media-item">
                    <a target="_blank" href="https://www.facebook.com/Cointral/"><IconFacebook /></a>
                  </div>
                  <div class="list-social-media-item">
                    <a target="_blank" href="https://www.youtube.com/cointral/">
                      <IconYoutube />
                    </a>
                  </div>
                  <div class="list-social-media-item">
                    <a target="_blank" href="https://linkedin.com/company/Cointral/">
                      <IconLinkedin />
                    </a>
                  </div> <div class="list-social-media-item">
                    <a target="_blank" href="https://instagram.com/Cointral/">
                      <IconInstagram />
                    </a>
                  </div>
                </div>
                
               <a-select
                  :default-value="$i18n.locale"
                  class="select-outline select-outline-primary text-white no-border Roboto-Regular"
                >
                  <a-icon slot="suffixIcon" type="caret-down" class="text-white"></a-icon>
                  <a-select-option
                    v-for="(lang, item) in $i18n.locales"
                    :key="item"
                    :value="lang.code"
                    @click="$i18n.setLocale(lang.code)"
                  >
                    {{ lang.name }}
                  </a-select-option>
                </a-select>

              </div>
            </a-collapse-panel>
          </a-collapse>
        </div>

        <div class="desktop-footer">
          <a-row type="flex" class="footer-row">
            <a-col>
              <h3 class="list-heading">{{$t('footer_products')}}</h3>
              <ul>
                <li>
                  <a href="/trade">{{$t('footer_exchange')}}</a>
                </li>
                 <li>
                  <a href="https://cointral.com/tr/subeler/">{{$t('footer_branch')}}</a>
                </li>
                <li>
                  <a @click.prevent="$router.push(localePath('/cash'))">{{$t('footer_cash')}}</a>
                </li>
                <li>
                  <a href="https://cointral.store">{{$t('footer_gold')}}</a>
                </li>
                <li>
                  <a href="/otc">{{$t('footer_otc')}}</a>
                </li>
                <li>
                  <a href="#">{{$t('footer_p2p')}}</a>
                </li>
                <li>
                  <a href="/buy-crypto">{{$t('footer_creditcard')}}</a>
                </li>
                <li>
                  <a href="https://swap.cointral.com">{{$t('footer_swap')}}</a>
                </li>
                <li>
                  <a href="https://realty.cointral.com">{{$t('footer_realty')}}</a>
                </li>
                <li>
                  <a href="/login">{{$t('footer_corperate')}}</a>
                </li>
              </ul>
            </a-col>
            <a-col>
              <h3 class="list-heading">{{$t('footer_corperate_title')}}</h3>
              <ul>
                  <li>
                    <a href="#">{{$t('footer_about_us')}}</a>
                  </li>
                  <li>
                    <a href="#">{{$t('footer_why_cointral')}}</a>
                  </li>
                  <li>
                    <a href="https://cointral.zendesk.com/hc/tr/requests/new"
                      >{{ $t('footer_communication') }}</a
                    >
                
                <li></li>
                <h3 class="list-heading">{{$t('footer_legal_info')}}</h3>
                  </li><li>
                  <a href="https://cointral.com/tr/kullanim-kosulu/"
                    >{{$t('footer_user_agreement')}}</a
                  >
                </li>
                <li>
                  <a href="https://cointral.com/tr/kvkk-ve-aydinlatma-metni/"
                    >{{$t('footer_personal_data')}}</a
                  >
                </li>
                <li>
                  <a
                    href="https://cointral.com/tr/suc-gelirlerinin-aklanmasinin-ve-terorun-finansmaninin-onlenmesi-hakkinda-politika/"
                    >{{$t('footer_sga_tf')}}</a >
                </li>
                <li>
                  <a href="https://cointral.com/tr/musterini-tani-politikasi/"
                    >{{$t('footer_kyc_principles')}}</a>
                </li>
                </ul>
              </ul>
            </a-col>
            <a-col>
              <h3 class="list-heading">{{$t('footer_info_center')}}</h3>
              <ul>
                <li>
                  <a href="https://cointral.com/tr/category/blog/">{{$t('footer_blog')}}</a>
                </li>
                <li>
                  <a href="https://cointral.com/tr/category/haberler/"
                    >{{$t('footer_news')}}</a
                  >
                </li>
                <li>
                  <a
                    href="https://cointral.com/tr/category/gunluk-kripto-para-bulteni/"
                    >{{$t('footer_daily_bulletin')}}</a
                  ><li>
                  </li>
                <h3 class="list-heading">{{$t('footer_buy')}}</h3>
                <ul>
                  <li>
                    <a href="https://cointral.com/tr/bitcoin-satin-al/">{{$t('footer_buy_btc')}}</a>
                  </li>
                  <li>
                    <a href="https://cointral.com/tr/ethereum-satin-al/">{{$t('footer_buy_eth')}}</a>
                  </li>
                  <li>
                    <a href="https://cointral.com/tr/tether-satin-al/">{{$t('footer_buy_usdt')}}</a
                    >
                  </li>
                  <li>
                    <a href="https://cointral.com/tr/litecoin-satin-al/">{{$t('footer_buy_litecoin')}}</a>
                  </li><li>
                    <a href="https://cointral.com/tr/ripple-satin-al/">{{$t('footer_buy_xrp')}}</a>
                  </li>
                </ul>
                </li>
              </ul>
            </a-col>
            <a-col class="list-end">
              <h3 class="list-heading">{{$t('footer_support')}}</h3>
              <ul>
                <li>
                  <a href="https://cointral.zendesk.com/hc/tr">{{$t('footer_support_center')}}</a>
                </li>
                <li>
                  <a href="https://cointral.zendesk.com/hc/tr/articles/360013923799-Limitler">{{$t('footer_limits')}}</a>
                </li>
                <li>
                  <a href="https://cointral.com/tr/komisyon-oranlari/"
                    >{{$t('footer_commissions')}}</a
                  >
                </li>
                <li>
                  <a href="https://cointral.com/tr/cointral-hesabinizin-guvenligini-artirmak-icin-yapmaniz-gereken-4-adim/">{{$t('footer_security')}}</a>
                </li>
              </ul>
            </a-col>
            <a-col class="list-end">
              <h3 class="list-heading text-right">{{$t('footer_community')}}</h3>
              <div class="text-right">
                <div class="list-social-media">
                  <div class="list-social-media-item">
                    <a target="_blank" href="https://twitter.com/Cointral/">
                      <IconTwitter />
                    </a>
                  </div>
                  <div class="list-social-media-item">
                    <a target="_blank" href="https://t.me/cointral/">
                      <IconTelegram />
                    </a>
                  </div>
                  <div class="list-social-media-item">
                    <a target="_blank" href="https://www.facebook.com/Cointral/"><IconFacebook /></a>
                  </div>
                  <div class="list-social-media-item">
                    <a target="_blank" href="https://www.youtube.com/cointral/">
                      <IconYoutube />
                    </a>
                  </div>
                  <div class="list-social-media-item">
                    <a target="_blank" href="https://linkedin.com/company/Cointral/">
                      <IconLinkedin />
                    </a>
                  </div> <div class="list-social-media-item">
                    <a target="_blank" href="https://instagram.com/Cointral/">
                      <IconInstagram />
                    </a>
                  </div>
                </div>
                <a-select
                  :default-value="$i18n.locale"
                  class="select-outline select-outline-primary text-white no-border Roboto-Regular w-100"
                >
                  <a-icon slot="suffixIcon" type="caret-down" class="text-white"></a-icon>
                  <a-select-option
                    v-for="(lang, item) in $i18n.locales"
                    :key="item"
                    :value="lang.code"
                    @click="$i18n.setLocale(lang.code)"
                  >
                    {{ lang.name }}
                  </a-select-option>
                </a-select>
              </div>
            </a-col>
          </a-row>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="footer-rights">
        <span> | Tüm Hakları Saklıdır </span>
        <span> | © 2018 Cointral </span>
      </div>
      <div class="footer-web-detail">
      <span> | Blockchain Lab Yazılım A.Ş Mersis No: 0178132817200001 </span>
      <span> | Fulya Mah. Büyükdere Cad. No:76 Quasar 34394 Şişli, İstanbul - TÜRKİYE </span>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'

export default {
  data() {
    return {
      computed: {
        expandIcon(props) {
          /*Open and Close Accordion Icons*/ 
          const close = (
            <span>
              +
            </span>
          );

          const open = (
            <span>
              -
            </span>
          );
          /*------------------------------*/ 

          /*If Accordion is active show open icon else close*/ 
          const icon = props.expanded ? open : close;
          /*--------------------------------------------*/ 

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
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~/assets/scss/breakpoints.scss';

.footer {
  position: relative;
  bottom: 0;
  background: #0d1115;
  width: 100%;
  // margin-top: 20px;

  .footer-body {
    padding: 40px 0;
    border-bottom: 1px solid #1e2841;

    .list-social-media-item {
      justify-content: flex-end;
    }

    .select-language {
      width: 100px;
      margin-left: 10px;

      @include bp(tablet) {
        margin-left: 0;
      }
    }

    .footer-row {
      justify-content: space-between;
      width: 100%;
      @include bp(tablet) {
        flex-direction: column;

        .list-end {
          align-items: flex-start;

          ul li {
            text-align: left;
          }

          .list-social-media-item {
            justify-content: flex-start;
          }
        }
      }
    }

    .list-social-media {
      display: flex;
      flex-wrap: wrap;

      &-item {
        flex: 50%;
        display: flex;
        align-items: center;
        margin-bottom: 25px;
      }
    }

    .list-heading {
      color: #ffffff;
      margin-bottom: 1.2rem;
    }

    .list-end {
      display: flex;
      flex-direction: column;
    }

    ul {
      padding: 0;
      margin: 0;
      list-style: none;
      display: flex;
      flex-direction: column;

      li {
        margin-bottom: 1rem;
        a {
          color: #9caece;
        }
      }
    }
  }

  .footer-bottom {
    width: 100%;
    padding: 30px 0;
    color: #9daecc;
    display: flex;
    justify-content: center;
  }
}

//Mobile Footer Styles
.mobile-footer { 
  display: none;
}

@media (max-width: 992px) {

  .mobile-footer { 
    display: block;
  }

  .desktop-footer { 
    display: none;
  }
  .mobile-footer > .ant-collapse {
    background: #0000 !important;
    border: none !important;
    max-width: 500px;
    margin: 0 auto;
  }

  ::v-deep .mobile-footer > .ant-collapse > .ant-collapse-item > .ant-collapse-header{
    font-size: 20px !important;
    color: #fff !important;
    font-weight: 600 !important;
  }

  ::v-deep .mobile-footer > .ant-collapse > .ant-collapse-item {
    border: none !important;
    padding: 10px 0;
  }

  ::v-deep .mobile-footer > .ant-collapse > .ant-collapse-item > .ant-collapse-content {
    border: none !important;
  }

  ::v-deep .mobile-footer > .ant-collapse > .ant-collapse-item > .ant-collapse-content > .ant-collapse-content-box {
    background: #0d1115 !important;
  }


  .footer .footer-body ul li a {
      color: #787f8d !important;
      font-size: 19px !important;
  }


  .footer .footer-body ul {
    padding: 0 !important;
  }

  .footer .footer-body .list-social-media-item {
    flex: 0;
    display: flex;
    align-items: center;
    margin-right: 35px;
    margin-bottom: 25px;
    justify-content: center;
  }

  // .footer .footer-body .select-language {
  //   margin-left: 40px;
  // }

  .text-right {
    text-align: left;
  }

  ::v-deep .ant-collapse-icon-position-right > .ant-collapse-item > .ant-collapse-header {
    padding-right: 10px !important;
  }
  .minus {
    float: right;
    font-size: 11px;
    margin-right: 6px;
  }


  .footer .footer-bottom {
    width: 100%;
    padding: 20px;
    color: #9daecc;
    flex-direction: column;
    display: flex;
    justify-content: center;
    text-align: center;
  }

  .footer-bottom > span {
      margin: 5px 0;
  }

  .footer-rights, .footer-web-detail {
    display:flex;
    flex-direction: column;
  }

  .footer-rights > span, .footer-web-detail > span {
      margin: 5px;
  }

}

</style>
