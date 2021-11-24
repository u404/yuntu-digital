import 'swiper/swiper-bundle.css';
// import 'swiper/dist/css/swiper.css';

import './styles/index.swiper.scss';

import Swiper from 'swiper';

const initSwiper = () => {
  const appSwiper = new Swiper('#app', {
    direction: 'vertical',
    watchSlidesProgress: true,
    resizeObserver: true,
  });

  appSwiper.slides.on('touchstart', function (e) {
    this.startScroll = this.scrollTop;
    this.touchStart = e.targetTouches[0].pageY;
  }, true);

  appSwiper.slides.on('touchmove', function (e) {
    this.touchCurrent = e.targetTouches[0].pageY;
    const touchesDiff = this.touchCurrent - this.touchStart;
    // console.log(touchesDiff)
    const slide = this;
    const onlyScrolling = (slide.scrollHeight > slide.offsetHeight)
      && (
        (touchesDiff < 0 && this.startScroll === 0)
        || (touchesDiff > 0 && this.startScroll === (slide.scrollHeight - slide.offsetHeight))
        || (this.startScroll > 0 && this.startScroll < (slide.scrollHeight - slide.offsetHeight))
      );
    if (onlyScrolling) {
      e.stopPropagation();
    }
  }, true);

  document.querySelector('.top-bar--mobile').addEventListener('click', () => {
    appSwiper.slideTo(0);
    setTimeout(() => {
      document.querySelectorAll('.swiper-slide').forEach((slide) => {
        slide.scrollTop = 0;
      });
    }, 600);
  });

  document.querySelectorAll('.swiper-slide--long').forEach((slide) => {
    slide.addEventListener('scroll', (e) => {
      const $tips = e.target.querySelector('.dropdown-tips');
      if (e.target.scrollTop > 0) {
        $tips.style.display = 'none';
      } else {
        $tips.style.display = '';
      }
    });
  });

  appSwiper.on('slideChange', (e) => {
    const video = e.slides[e.previousIndex].querySelector('video');
    if (video && !video.paused) {
      video.pause();
    }
  });
};

initSwiper();
