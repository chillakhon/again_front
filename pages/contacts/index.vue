<template>
  <Breadcrumbs />
  <div class="contacts page-padding">
    <div class="contacts__container container">
      <div class="contacts__content">
        <div class="contacts-block__header block__header _left _30">
          <h1 class="block__header-title">Контакты</h1>
        </div>
        <div class="contacts__menu contacts-menu">
          <div class="contacts-menu__item">
            <div class="contacts-menu__item-icon">
              <img src="/img/contacts.again/icon-1.svg" alt="">
            </div>
            <div class="contacts-menu__item-text">Как вернуть или обменять товар</div>
          </div>
          <div class="contacts-menu__item">
            <div class="contacts-menu__item-icon">
              <img src="/img/contacts.again/icon-2.svg" alt="">
            </div>
            <div class="contacts-menu__item-text">Как выбрать размер и впитываемость</div>
          </div>
          <div class="contacts-menu__item">
            <div class="contacts-menu__item-icon">
              <img src="/img/contacts.again/icon-3.svg" alt="">
            </div>
            <div class="contacts-menu__item-text">Отследить заказ</div>
          </div>
        </div>
      </div>
      <ContactsForm />
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.contacts__container  {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  @media (max-width: $tablet) {
    flex-wrap: wrap;
  }
}

.contacts-block__header {
  margin-bottom: 2.5rem;
}
</style>