<template>
  <div>
    <Index :class="{ 'block-pointer': isSignUpLoading }">
      <template slot="auth-card-header">
        <SignUpFormHeader />
      </template>
      <template slot="auth-card-feedback">
        <a-alert
          class="my-10"
          v-if="showError"
          v-bind:message="$t('warning_title')"
          :description="errorMsg"
          type="warning"
          closable
        ></a-alert>
      </template>
      <template slot="auth-card-content">
        <SignUpFormContent
          :isSignUpLoading="isSignUpLoading"
          :error4Msg="error4Msg"
          @signUp="createAccount"
          @clear-error4="error4Msg = null"
        />
      </template>
      <template slot="auth-card-actions">
        <SignUpFormFooter />
      </template>
    </Index>
  </div>
</template>

<script>
import Index from '~/components/NewAccount5/index'

export default {
  middleware: ['public'],
  layout: 'account',
  components: {
    Index,
  },
  data: () => ({}),
  methods: {},
}
</script>
