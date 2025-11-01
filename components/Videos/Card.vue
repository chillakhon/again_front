<script setup lang="ts">
const props = defineProps<{
  link: string
  id?: number | string
}>()

const openVideo = (l: string) => window.open(l, "_blank")
</script>

<template>
  <div class="videos__item item--center" @click="openVideo(link)">
    <img
        v-if="id"
        :src="`/img_videos__thumbnail/${id}.png`"
        alt="Video preview"
        class="videos__thumbnail"
    />
    <video
        v-else
        :src="link"
        class="videos__thumbnail"
        muted
        playsinline
    ></video>

    <button class="">
      <svg
          width="60"
          height="60"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50" cy="50" r="48" fill="rgba(255,255,255,0.7)" />
        <polygon points="40,30 75,50 40,70" fill="#CB0B13" />
      </svg>
    </button>
  </div>
</template>

<style scoped lang="scss">
.videos__item {
  min-height: 44rem;
  position: relative;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 1rem;

  .videos__thumbnail {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .videos__play {
    position: absolute;
    cursor: pointer;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 50%;
    padding: 1rem;
  }
}
</style>
