const contentIndex = 0;
const $bookReviews = $('.wrapper');
const $rightButton = $('#right-button');

$rightButton.click(() => {
  changeContent();
});

const changeContent = (index) => {
  $bookReviews[0].style.display = "none";
  $bookReviews[1].style.display = "block";
};

