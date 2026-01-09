<template>
  <section class="banners section" v-if="banners?.success && banners?.data?.length" >
    <div class="banners__container container">
<!--      <div class="banners__header block__header">-->
<!--        <h2 class="block__title fz-h2">Популярные категории</h2>-->
<!--      </div>-->

      <div class="banners__grid">
        <NuxtLink
            v-for="banner in banners.data"
            :key="banner.id"
            :to="`/catalog?category=${banner.slug}`"
            class="banners__item"
        >
          <div class="banners__item-media">
            <img
                v-if="banner.banner_url"
                :src="banner.banner_url"
                :alt="banner.name"
                class="banners__item-image"
            />
            <div v-else class="banners__item-placeholder">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 16V8C21 6.895 20.105 6 19 6H5C3.895 6 3 6.895 3 8V16C3 17.105 3.895 18 5 18H19C20.105 18 21 17.105 21 16Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M3 10H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
          <div class="banners__item-content">
            <h3 class="banners__item-title">{{ banner.name }}</h3>
            <p v-if="banner.description" class="banners__item-description">
              {{ banner.description }}
            </p>

          </div>
        </NuxtLink>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">

interface Banner {
  id: number
  name: string
  slug: string
  banner_url?: string
  description?: string
}

const { data: banners } = await useApi<{
  success: boolean
  data: Banner[]
}>('/public/catalog/home-banners')

</script>

<style scoped lang="scss">
.banners {
  padding: 7rem 0 5.2rem;

  @media (max-width: $tablet) {
    padding: 5rem 0 4rem;
  }

  @media (max-width: $mobile) {
    padding: 3rem 0 2.5rem;
  }
}

.banners__header {
  margin-bottom: 4rem;

  @media (max-width: $tablet) {
    margin-bottom: 3rem;
  }

  @media (max-width: $mobile) {
    margin-bottom: 2rem;
  }
}

.banners__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: $tablet) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  @media (max-width: $mobile) {
    grid-template-columns: 1fr;
    gap: 1.2rem;
  }
}

.banners__item {
  display: flex;
  flex-direction: column;
  background: #F3F4F8;
  border-radius: 3rem;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  text-decoration: none;
  color: inherit;

  &:hover {
    transform: translateY(-0.06rem);
    box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.03);

    .banners__item-image {
      transform: scale(1.03);
    }

  }

  @media (max-width: $tablet) {
    border-radius: 2rem;
  }

  @media (max-width: $mobile) {
    border-radius: 1.5rem;
  }
}

.banners__item-media {
  position: relative;
  width: 100%;
  padding-top: 56.25%; // 16:9 aspect ratio
  overflow: hidden;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.banners__item-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.banners__item-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(0, 0, 0, 0.2);
}

.banners__item-content {
  padding: 2.5rem 3rem 3rem;
  position: relative;

  @media (max-width: $tablet) {
    padding: 2rem 2.5rem 2.5rem;
  }

  @media (max-width: $mobile) {
    padding: 1.5rem 2rem 2rem;
  }
}

.banners__item-title {
  font-size: 2.4rem;
  font-weight: 500;
  line-height: 1.2;
  color: var(--fg-black);
  margin-bottom: 1rem;
  font-family: var(--ff-cormorant);

  @media (max-width: $tablet) {
    font-size: 2rem;
  }

  @media (max-width: $mobile) {
    font-size: 1.8rem;
    margin-bottom: 0.8rem;
  }
}

.banners__item-description {
  font-size: 1.5rem;
  line-height: 1.5;
  color: var(--fg-gray);
  margin-bottom: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (max-width: $mobile) {
    font-size: 1.4rem;
    -webkit-line-clamp: 3;
  }
}

.banners__item-arrow {
  position: absolute;
  bottom: 2.5rem;
  right: 3rem;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background: var(--bg-filter-button);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--fg-white);
  transition: all 0.3s ease;
  opacity: 0.8;

  @media (max-width: $tablet) {
    bottom: 2rem;
    right: 2.5rem;
    width: 3.5rem;
    height: 3.5rem;

    svg {
      width: 1.6rem;
      height: 1.6rem;
    }
  }

  @media (max-width: $mobile) {
    bottom: 1.5rem;
    right: 2rem;
    width: 3rem;
    height: 3rem;

    svg {
      width: 1.4rem;
      height: 1.4rem;
    }
  }
}

.banners__empty {
  text-align: center;
  padding: 5rem 0;
  font-size: 1.6rem;
  color: var(--fg-gray);

  @media (max-width: $mobile) {
    padding: 3rem 0;
    font-size: 1.4rem;
  }
}
</style>