const ctr = document.querySelector('.ctr');
const msg = document.getElementById('loading-msg');
let isFetching = false;

async function fetchImages() {
  if (isFetching) {
    return;
  }

  try {
    isFetching = true;
    msg.style.display = 'none';
    for (let i = 0; i < 16; i++) {
      const response = await fetch(`https://picsum.photos/200/300?random=${i}`);
      const img = document.createElement('img');
      img.src = response.url;
      // img.style.width = '185px';
      ctr.appendChild(img);
      fadeIn(img, i);
    }
    msg.style.display = 'block';
  } catch (err) {
    console.log(err);
  }
  isFetching = false;
}

function fadeIn(image, i) {
  image.style.animationDelay = 0.2 * i + 's';
}

window.addEventListener('scroll', () => {
  const containerHeight = ctr.scrollHeight;
  const scrollPos = ctr.scrollTop + ctr.clientHeight;

  if (
    scrollPos >= containerHeight - containerHeight * (20 / 100) &&
    !isFetching
  ) {
    console.log('Reached bottom, fetching images...');
    fetchImages();
  }
});

fetchImages();
