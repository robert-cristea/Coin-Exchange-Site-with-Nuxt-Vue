<template>
  <div id="bounty-page">
    <AboutHeader />
    <BugBountyHeader />
    <BugBountyList
      type="RULES"
      :title-style="{ color: '#788298' }"
      :list-item-style="{ color: '#000000' }"
    >
      <span slot="title">{{ $t('text_bb_rules') }}</span>
    </BugBountyList>
    <BugBountyList
      type="OUTOFSCOPE"
      :container-style="{ backgroundColor: '#374e65' }"
      :title-style="{ color: '#ffffff' }"
      :list-item-style="{ color: '#ffffff' }"
    >
      <span slot="title">{{ $t('text_bb_outofscope') }}</span>
    </BugBountyList>
    <BugPrize>
      <span slot="prizeTitle"> {{ $t('text_rwds') }}</span>
      <span slot="prizeDetail">
        {{ $t('text_bb_rwds_0') }}
        {{ $t('text_bb_rwds_1') }}
        {{ $t('text_bb_rwds_2') }}
      </span>
    </BugPrize>
    <BugBountyForm />
  </div>
</template>

<script>
export default {
  components: {
    AboutHeader: () => import('~/components/AboutHeader.vue'),
    BugBountyHeader: () => import('~/components/BugBounty/BugBountyHeader.vue'),
    BugBountyList: () => import('~/components/BugBounty/BugBountyList.vue'),
    BugPrize: () => import('~/components/BugBounty/BugPrize.vue'),
    BugBountyForm: () => import('~/components/BugBounty/BugBountyForm.vue'),
  },
}
</script>

<style scoped></style>
