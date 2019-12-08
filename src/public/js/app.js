let contentIndex = 0;
const $bookReviews = $('.wrapper');
const $rightButton = $('#right-button');
const $leftButton = $('#left-button');

$rightButton.click(() => {
  changeContent(1);
});

$leftButton.click(() => {
  changeContent(-1);
});

const changeContent = (index) => {
  console.log(index);
  
  contentIndex += index;

  if (contentIndex > 12) {
    contentIndex = 0;
  } else if (contentIndex < 0) {
    contentIndex = 12;
  };

  for (let i = 0; i < $bookReviews.length; i++) {
    $bookReviews[i].style.display = "none";
  };

  $bookReviews[contentIndex].style.display = "block";
};

changeContent(0);
