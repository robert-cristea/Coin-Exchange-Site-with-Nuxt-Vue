export default {
  data() {
    /* eslint-disable */
    return {
      emailRegex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      passwordRegex: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\S+$).{8,}$/,
    }
  },
  methods: {
    EmailValidator(rule, value, callback) {
      if (value === '') {
        callback(new Error(this.$t('validation_text_email')))   
      } else if (!this.emailRegex.test(value.toString().toLowerCase())) {
        callback(new Error(this.$t('validation_text_valid_email')))
      }
      callback()
    },
    PasswordValidator(rule, value, callback) {
      if (value === '') {
        callback(new Error(this.$t('validation_text_password')))
      } else if (!this.passwordRegex.test(value.toString())) {
        callback(
          new Error(
            this.$t('password_text_regex')
          )
        )
      } else {
        callback()
      }
    },
    PasswordValidatorEmail(rule, value, callback) {
      if (value === '') {
        callback(new Error(this.$t('validation_text_password')))
      } else if (!this.passwordRegex.test(value.toString())) {
        callback(
          new Error(
            this.$t('password_text_regex')
          )
        )
      } else {
        if (this.signUpEmail.confirmPassword !== '') {
          this.$refs.signUpEmailFormRef.validateField('confirmPassword')
        }
        callback()
      }
    },
    PasswordValidatorMobile(rule, value, callback) {
      if (value === '') {
        callback(new Error(this.$t('validation_text_password')))
      } else if (!this.passwordRegex.test(value.toString())) {
        callback(
          new Error(
            this.$t('password_text_regex')
          )
        )
      } else {
        if (this.signUpMobile.confirmPassword !== '') {
          this.$refs.signUpMobileFormRef.validateField('confirmPassword')
        }
        callback()
      }
    },
    confirmPasswordValidatorEmail(rule, value, callback) {
      if (value === '') {
        callback(new Error(this.$t('validation_text_password_again')))
      } else if (value !== this.signUpEmail.Password) {
        callback(new Error(this.$t('validation_text_password_match')))
      } else {
        callback()
      }
    },
    confirmPasswordValidatorMobile(rule, value, callback) {
      if (value === '') {
        callback(new Error(this.$t('validation_text_password_again')))
      } else if (value !== this.signUpMobile.Password) {
        callback(new Error(this.$t('validation_text_password_match')))
      } else {
        callback()
      }
    },
    ResetPasswordValidator(rule, value, callback) {
      if (value === '') {
        callback(new Error(this.$t('validation_text_password'))) 
      } else if (!this.passwordRegex.test(value.toString())) {
        callback(
          new Error(
            this.$t('password_text_regex')
          )
        )
      } else {
        if (this.resetPasswords.ConfirmPassword !== '') {
          this.$refs.resetPasswordsRef.validateField('ConfirmPassword')
        }
        callback()
      }
    },
    ConfirmResetPasswordValidator(rule, value, callback) {
      if (value === '') {
        callback(new Error(this.$t('validation_text_password_again')))
      } else if (value !== this.resetPasswords.NewPassword) {
        callback(new Error(this.$t('validation_text_password_match')))
      } else {
        callback()
      }
    },
    DocumentTypeValidator(rule, value, callback) {
      if (value === '' || value === null || !value) {
        callback(new Error(this.$t('validation_text_document_type')))
      } else {
        callback()
      }
    },
  },
}
