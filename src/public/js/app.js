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

  if ($currentReviewIndex > $bookReviews.length - 1) {
    $currentReviewIndex = 0;
  } else if ($currentReviewIndex < 0) {
    $currentReviewIndex = $bookReviews.length - 1;
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

$(document).keydown(function (e) {
  switch (e.which) {
    case 37:
      changeContent(-1);
      console.log('left');
      break;

    case 39:
      changeContent(1);
      break;

    default: return;
  }
  e.preventDefault();
});

$aboutLink = $('#about-link');
$aboutLink.click((event) => {
  const $slideshowContainer = $('.slideshow-container');
  $slideshowContainer.toggleClass('hidden');

  const $aboutContent = $('#about-content');
  $aboutContent.toggleClass('active');
});

const data = fetch('reviews/sapiens.json').then(response => response.json());
Promise.all([data])
  .then(response => {
    console.log(response);

    $.get('templates/review.htm', (templates) => {
      var template = $(templates).filter('#tpl-greeting').html();
      $('#target').append(Mustache.render(template, response[0]));
  });

  }).catch(error => console.log('Unable to get all template data: ', error.message));