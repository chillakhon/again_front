<template>
  <div class="modal-thanks__title modal__title">Спасибо</div>
  <div class="modal-thanks__text" v-if="modal.props.text" v-html="modal.props.text"></div>
</template>

<script setup lang="ts">
const modal = useModal();
</script>

<style scoped lang="scss">
.modal-thanks__text {
  max-width: 33.8rem;
  margin: 1.6rem auto 0;
  font-size: 2.3rem;
  line-height: 140%;

  @media (max-width: $mobile) {
    font-size: 1.5rem;
    max-width: 100%;
  }
}

</style>