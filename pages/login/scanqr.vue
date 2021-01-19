<template>
  <div>
    <Index>
      <template slot="auth-card-header">
        <LoginFormHeader />
      </template>
      <template slot="auth-card-content">
        <ScanQrContent />
      </template>
      <template slot="auth-card-actions">
        <LoginFormFooter :showForgotPassword="false" />
      </template>
    </Index>
  </div>
</template>

<script>
import Index from '~/components/Login/Index'
import LoginFormHeader from '~/components/Login/LoginFormHeader'
import ScanQrContent from '~/components/Login/ScanQrContent'
import LoginFormFooter from '~/components/Login/LoginFormFooter'

export default {
  components: {
    Index,
    LoginFormHeader,
    ScanQrContent,
    LoginFormFooter,
  },
}
</script>
