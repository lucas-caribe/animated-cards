const maxTilt = 30;

const cards = document.querySelectorAll('.card');

cards.forEach(card => {
  card.addEventListener('mousemove', function(event) {
    const { pageX, pageY } = event;
    const { target } = event;
    const bounding = target.getBoundingClientRect();
    const x = Math.max(0, pageX - Math.round(bounding.left));
    const y = Math.max(0, pageY - Math.round(bounding.top));
    const width = bounding.width;
    const height = bounding.height;

    const posX = width / 2 - x;
    const posY = height / 2 - y;

    const hypotenuseCursor = Math.sqrt(Math.pow(posX, 2) + Math.pow(posY, 2));
    const hypotenuseMax = Math.sqrt(
      Math.pow(width / 2, 2) + Math.pow(height / 2, 2)
    );

    const ratio = hypotenuseCursor / hypotenuseMax;

    if (target.classList.contains('cover')) {
      const highlight = target.children[0];

      target.style.transform = `rotate3d(${posY / hypotenuseCursor}, ${-posX / hypotenuseCursor}, 0, ${ratio * maxTilt}deg)`;
      target.style.filter = `brightness(${1.6 - y / height})`;

      highlight.style.transform = `translateX(${posX * ratio * 0.75}px) translateY(${posY * ratio}px)`;
    }
  });

  card.addEventListener('mouseleave', function(event) {
    const cover = event.target.children[0];
    if (cover) {
      const highlight = cover.children[0];

      cover.style.transform = '';
      cover.style.filter = '';

      highlight.style.transform = '';
    }
  });
});
