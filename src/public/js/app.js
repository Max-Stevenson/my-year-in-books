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
  let $selector = $('.active');
  let $currentReviewIndex = $bookReviews.index($selector);
  $($bookReviews[$currentReviewIndex]).removeClass('active');
  $currentReviewIndex += index;
  
  if ($currentReviewIndex > $bookReviews.length-1) {
    $currentReviewIndex = 0;
  } else if ($currentReviewIndex < 0) {
    $currentReviewIndex = $bookReviews.length-1;
  };

  $($bookReviews[$currentReviewIndex]).addClass('active');
};

const $MonthNavLink = $('.month-link');

$MonthNavLink.click((event) => {
  const month = event.target.text.trim();
  let $monthSelector = $(`h1:contains(${month})`)[0].parentElement.parentElement;
  let $newMonthIndex = $bookReviews.index($monthSelector);

  let $selector = $('.active');
  let $currentReviewIndex = $bookReviews.index($selector);
  $($bookReviews[$currentReviewIndex]).removeClass('active');

  $($bookReviews[$newMonthIndex]).addClass('active');
});