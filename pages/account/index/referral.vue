<template>
  <div class="reference">
    <div class="header">
      <div>
        <h1>Arkadaşlarınızı Davet Edin. Birlikte - Kazanın</h1>
        <span>
          Arkadaşlarınız her alım satım yaptığında %25 referans geliri kazanın.
        </span>
      </div>
    </div>

    <infos class="infos" />

    <reference />
  </div>
</template>

<script>
export default {
  name: 'Reference',
  head(){
    return{
      title: 'Referans | Cointral.com',
    }
  },
  components: {
    infos: () => import('@/components/Reference/infos'),
    reference: () => import('@/components/Reference/referenceHistory'),
  },
}
</script>

<style lang="scss" scoped>
.reference {
  background-color: #f5f6f7;
}

.header {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 328px;
  color: white;
  background: url("../../../assets/images/referral/referral-banner.png");
  background-color: #1b5092;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border: none;
  margin-top: -1px;

  h1 {
    color: white !important;
  }
  @media (max-width: 1000px) {
    padding: 23px;
    margin-bottom: 200px;
  }
}
.infos {
  position: relative;
  margin-bottom: 10px;
  background-color: white;
}

@media (max-width: 989px) {
  .reference{
    margin-top: -17px;
  }
}

@media (max-width: 768px) {
  .header {
      margin-bottom: 250px;
  }
}


@media (max-width: 600px) {

  .table-responsive > div{
    width: 600px;
  }
  .referenceHistory {
    margin-top: 130px !important;
  }
}
</style>
