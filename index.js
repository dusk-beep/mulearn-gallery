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
    for (let i = 0; i < 30; i++) {
      const response = await fetch(`https://picsum.photos/200/300?random=${i}`);
      const img = document.createElement('img');
      img.src = response.url;
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

// ctr.addeventlistener('scroll', () => {
//   const containerheight = ctr.scrollheight;
//   const scrollpos = ctr.scrolltop + ctr.clientheight;
//
//   if (
//     scrollpos >= containerheight - containerheight * (20 / 100) &&
//     !isfetching
//   ) {
//     console.log('reached bottom, fetching images...');
//     fetchimages();
//   }
// });
//
window.addEventListener('scroll', () => {
  const scrollTop = ctr.scrollTop;
  const scrollHeight = ctr.scrollHeight;
  const clientHeight = ctr.clientHeight;

  console.log(scrollHeight, scrollTop, clientHeight);

  if (
    scrollTop + clientHeight >= scrollHeight - scrollHeight * (20 / 100) &&
    !isFetching
  ) {
    console.log('Fetching more images...');
    fetchImages();
  }
});

fetchImages();
