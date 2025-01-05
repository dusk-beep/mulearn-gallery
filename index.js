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

// ctr.addEventListener('scroll', () => {
//   const containerHeight = ctr.scrollHeight;
//   const scrollPos = ctr.scrollTop + ctr.clientHeight;
//
//   if (
//     scrollPos >= containerHeight - containerHeight * (20 / 100) &&
//     !isFetching
//   ) {
//     console.log('Reached bottom, fetching images...');
//     fetchImages();
//   }
// });
//
window.addEventListener('scroll', () => {
  const scrollTop = ctr.scrollTop; // Vertical scroll position
  const scrollHeight = ctr.scrollHeight; // Total content height
  const clientHeight = ctr.clientHeight; // Visible height of the container

  // Trigger fetch when near the bottom of the container
  if (
    scrollTop + clientHeight >= scrollHeight - scrollHeight * (20 / 100) &&
    !isFetching
  ) {
    console.log('Fetching more images...');
    fetchImages();
  }
});

fetchImages();
