<template>
  <article class="news-item">
    <div class="news-item__card">
      <div class="news-item__media">
        <picture class="news-item__media-pic">
          <img src="/img/news.again/item-1.jpg" class="news-item__media-img" alt="">
        </picture>
      </div>
      <div class="news-item__content">
        <div class="news-item__date">1 января 2021</div>
        <NuxtLink :to="to" class="news-item__title fz-h3">{{ title }}</NuxtLink>
        <p class="news-item__text">
          {{ text }}
        </p>
        <NuxtLink :to="to" class="news-item__link">
          <span>Подробнее</span>
          <svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.311943 0.0515471C0.18293 0.111753 0.103372 0.193461 0.0453161 0.322474C-0.0148901 0.453638 -0.0148901 0.664359 0.045316 0.795523C0.0775692 0.87078 0.597922 1.40188 2.39335 3.19732L4.69839 5.5045L2.39335 7.80954C0.600071 9.60497 0.0775676 10.1382 0.0453143 10.2135C-0.0471451 10.4178 0.00661031 10.7166 0.163576 10.8628C0.324843 11.0134 0.602221 11.0542 0.806492 10.9575C0.959157 10.8843 5.95412 5.88724 6.01862 5.74103C6.08098 5.60126 6.07883 5.39699 6.01217 5.25723C5.93906 5.10456 0.941957 0.109603 0.795742 0.0450965C0.655978 -0.0172604 0.451707 -0.0151099 0.311943 0.0515471Z" fill="#CB0B13"/>
          </svg>
        </NuxtLink>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string,
  text: string,
  slug: string
}>();

const to = computed( () => {
  return {
    name: 'articles-slug',
    params: {
      slug: props.slug
    }
  }
} )
</script>

<style scoped lang="scss">
.news-item {

}

.news-item__media-pic {
  min-height: 25.1rem;
  position: relative;

  @media (max-width: $mobile) {
    min-height: 18rem;
  }
}

.news-item__media-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.news-item__content {
  padding-top: 2rem;
}

.news-item__date {
  font-size: var(--fz-secondary);
  line-height: 140%;
  margin-bottom: .5rem;
  color: var(--fg-black);
  opacity: .3;
}

.news-item__title {
  color: var(--fg-regular);
  display: block;
  margin-bottom: 1rem;

  @media (max-width: $mobile) {
    margin-bottom: .7rem;
  }
}

.news-item__link {
  margin-top: 1.4rem;
  display: flex;
  align-items: center;
  color: var(--fg-red);
  font-weight: 700;

  & svg {
    margin-left: .5rem;
  }

  & path {
    transition: var(--tr-regular);
  }

  @media(any-hover: hover) {
    &:hover {
      color: var(--bg-button-primary-hover);

      & path {
        fill: var(--bg-button-primary-hover);;
      }
    }
  }
}
</style>