<template>
  <div class="checkout__block">
    <div class="checkout__block-title fz-h2">Получатель</div>
    <div class="checkout__user">
      <FormInput
        name="first_name"
        placeholder="Введите имя*"
        v-model="firstName"
      />
      <FormInput
          name="last_name"
          placeholder="Введите фамилию*"
          v-model="lastName"
      />
      <FormInput
          name="surname"
          placeholder="Введите отчество*"
          v-model="surname"
      />
      <FormInput
          name="phone"
          placeholder="Введите номер телефона*"
          v-model="phone"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const firstName = defineModel( 'firstName' );
const lastName = defineModel( 'lastName' );
const surname = defineModel( 'surname' );
const phone = defineModel( 'phone' );
</script>

<style scoped lang="scss">

</style>