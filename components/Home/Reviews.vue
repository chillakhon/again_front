<template>
  <section class="reviews">
    <div class="reviews__container container">
      <div class="reviews-block__header block__header">
        <div class="block__header-title">Наши клиенты пишут</div>
      </div>
      <div class="reviews__row">
        <div class="reviews-item">
          <div class="reviews-item__media img--cover">
            <img src="/img/reviews.again/item-1.jpg" class="reviews-item__media-img" alt="">
          </div>
          <div class="reviews-item__content">
            <div class="reviews-item__text"><p>Ткань мягкая, не смотря на дополнительный слой, ничего не потеет. Использовала днём примерно 4-6 часов, ничего не протекло, при том, что я ходила и сидела. Ощущения «мокрых трусов» не было абсолютно. Кожа в них дышит, это очень понравилось. Ну и лично мне было в них комфортнее, чем с прокладкой.</p><p>Каких-то запахов нет ни при использовании, ни после стирки. Стираются легко, только сохнут дольше, чем обычные, но это нормально.</p></div>
            <div class="reviews-item__name">Оксана</div>
          </div>
        </div>

        <div class="reviews-item">
          <div class="reviews-item__media img--cover">
            <img src="/img/reviews.again/item-2.jpg" class="reviews-item__media-img" alt="">
          </div>
          <div class="reviews-item__content">
            <div class="reviews-item__text"><p>Трусы:<br> + нет запаха<br> + нет ощущения сырости, впитывают хорошо<br> + нравится как ноги обтягивает, ощущение, что плотно сидят!<br> + сама ткань очень приятная к телу.</p></div>
            <div class="reviews-item__name">Дарья</div>
          </div>
        </div>

        <div class="reviews-item">
          <div class="reviews-item__media img--cover">
            <img src="/img/reviews.again/item-3.jpg" class="reviews-item__media-img" alt="">
          </div>
          <div class="reviews-item__content">
            <div class="reviews-item__text"><p>Спасибо большое! Это лучшее изобретение человечества, как же я мучалась раньше, и как я рада, что с свои 36 я узнала о таких замечательных трусах, выдержали рабочий день, я в восторге. Раньше пользовалась прокладками, так вечно то раздражение, то натрешь, то ночью все съехало и все мимо… Спасибо за Ваш труд!</p></div>
            <div class="reviews-item__name">Юлия</div>
          </div>
        </div>

        <div class="reviews-item">
          <div class="reviews-item__media img--cover">
            <img src="/img/reviews.again/item-4.jpg" class="reviews-item__media-img" alt="">
          </div>
          <div class="reviews-item__content">
            <div class="reviews-item__text"><p>Трусики покупала дочке. Получила посылку и дочка сразу начала их использовать, и ей понравилось. Они мягкие, но плотные. Полное ощущение защищенности. Поэтому покупаем еще одни на смену.</p></div>
            <div class="reviews-item__name">Оксана Иванова</div>
          </div>
        </div>

        <div class="reviews-item">
          <div class="reviews-item__media img--cover">
            <img src="/img/reviews.again/item-5.jpg" class="reviews-item__media-img" alt="">
          </div>
          <div class="reviews-item__content">
            <div class="reviews-item__text"><p>Добрый день!<br> Да, подарок получила. Мне все очень понравилось, в использовании все супер!<br> Единственное так и не поняла максимальное время сколько носить. Хотелось бы какую-то памятку. Рассматриваю покупку еще такого белья.<br> В целом если оценить белье, я ставлю оценку 5 из 5<br> Спасибо большое!</p></div>
            <div class="reviews-item__name">Юлия</div>
          </div>
        </div>

        <div class="reviews-item">
          <div class="reviews-item__media img--cover">
            <img src="/img/reviews.again/item-6.jpg" class="reviews-item__media-img" alt="">
          </div>
          <div class="reviews-item__content">
            <div class="reviews-item__text"><p>Здравствуйте!<br> Удобно, нигде не вырезается, правильно подобрали размер, не протекает, и днем, и ночью комфортны в использовании, легко стираются (даже вручную)👌<br> Такое ощущение, что месячные даже стали менее болезненными, появилось чувство радости, что не придется с прокладками носиться, чудеса🥰<br> Хотелось бы побольше моделей, вижу, что сейчас есть выбор и цвета, и модели, закажу себе еще одну пару на смену😊</p></div>
            <div class="reviews-item__name">Оксана Иванова</div>
          </div>
        </div>

        <div class="reviews-item">
          <div class="reviews-item__media img--cover">
            <img src="/img/reviews.again/item-7.jpg" class="reviews-item__media-img" alt="">
          </div>
          <div class="reviews-item__content">
            <div class="reviews-item__text"><p>Добрый день! Трусы очень понравились, ставлю 5 из 5! Ходила в них целый день, ничего не протекло, и в целом намного удобнее, чем с прокладками. Придраться не к чему, благодарю за качественный продукт</p></div>
            <div class="reviews-item__name">Юлия</div>
          </div>
        </div>

      </div>
      <button class="reviews__btn btn _border">НАПИСАТЬ ОТЗЫВ</button>
    </div>
  </section>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.reviews {
  padding: 3.5rem 0 9rem;

  @media (max-width: $mobile) {
    padding: 2.5rem 0 2.25rem;
  }
}

.reviews__row {
  max-width: 98.2rem;
  margin: 0 auto;
}

.reviews__btn {
  margin-top: 4rem;
}

.reviews-item {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 3rem;

  &:last-child {
    margin-bottom: 0;
  }

  &:nth-child(even) {
    .reviews-item__media {
      order: 2;
    }

    .reviews-item__content {
      order: 1;
      margin-left: 0;
      margin-right: 3.3rem;
    }
  }

  @media (max-width: $mobile) {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 2rem;

    .reviews-item__media {
      order: 2 !important;
      margin-top: 1rem;
    }

    .reviews-item__content {
      order: 1 !important;
      margin-left: 0 !important;
      margin-right: 0 !important;
      width: 100% !important;
    }
  }
}

.reviews-item__media {
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  overflow: hidden;

  @media (max-width: $mobile) {
    width: 4.9rem;
    height: 4.9rem;
    margin-left: 0 !important;
  }
}

.reviews-item__content {
  width: calc(100% - 10rem);
  margin-left: 3.3rem;
  padding: 3.1rem 4.3rem 3.2rem 5rem;
  background: #F3F4F8;
  border-radius: 1rem;

  @media (max-width: $mobile) {
    padding: 2.2rem 1.5rem 2.3rem;
  }
}

.reviews-item__text {
  & > * {
    margin-bottom: 1.7rem;
    font-size: var(--fz-1-5);
    color: var(--fg-gray);
    line-height: 130%;

    &:last-child {
      margin-bottom: 0;
    }

    @media (max-width: $mobile) {
      font-size: var(--fz-regular);
    }
  }
}

.reviews-item__name {
  margin-top: 1rem;
  color: var(--fg-gray);
  opacity: .5;
}

</style>