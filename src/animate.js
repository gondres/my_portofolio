import { animate, stagger, splitText, createTimeline } from 'https://esm.sh/animejs';

export const EntranceAnimation = (elements) => {
  const targets = Array.from(elements || []).filter(Boolean);
  if (targets.length === 0) return;

  animate(targets, {
    translateY: [30, 0],
    opacity: [0, 1],
    duration: 1200,
    ease: 'outElastic(1, .8)',  // v4 format
    delay: stagger(150),
  });
};

export const HeaderTextReveal = (elements) => {
  const targets = Array.from(elements || []).filter(Boolean);
  if (targets.length === 0) return;

  animate(targets, {
    translateX: [-50, 0],
    opacity: [0, 1],
    duration: 1000,
    ease: 'outQuart',           // v4 format
    delay: stagger(200),
  });
};

export const FloatAnimation = (el) => {
  if (!el) return;

  animate(el, {
    translateY: [-10, 10],
    duration: 3000,
    direction: 'alternate',
    loop: true,
    ease: 'inOut(2)',           // v4 format
  });
};

export const HeroSplitReveal = (el) => {
  if (!el) return;

  const { words, chars } = splitText(el, {
    words: { wrap: 'clip' },
    chars: true,
  });

  words.forEach(w => {
    w.style.display = 'inline-block';
    w.style.verticalAlign = 'bottom';
  });

  createTimeline({
    loop: true,
    defaults: { ease: 'inOut(3)', duration: 1000 },
  })
    .add(words, {
      y: [$el => +$el.dataset.line % 2 ? '100%' : '-100%', '0%'],
    }, stagger(20))
    .add(chars, {
      y: $el => +$el.dataset.line % 2 ? '100%' : '-100%',
    }, stagger(10, { from: 'random' }))
    .init();
};