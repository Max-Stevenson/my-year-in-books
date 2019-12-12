
const changeContent = (index) => {
  $.getJSON('reviews/reviews.json', (data) => {
    $.get('templates/review.htm', (templates) => {
            
      let currentIndex = data.findIndex((element) => {        
        return element.month.trim() === $('.month-heading').text();
      });
      
      let newIndex = currentIndex + index;
      console.log(newIndex);
      
      if (newIndex > data.length-1) {
        newIndex = 0;
      } else if (newIndex < 0) {        
        newIndex = data.length-1;
      };

      var template = $(templates).filter('#tpl-greeting').html();
      $('#target').html(Mustache.render(template, data[newIndex]));

      const $rightButton = $('#right-button');
      const $leftButton = $('#left-button');
      $rightButton.click(() => {
        changeContent(1);
      });
      $leftButton.click(() => {
        changeContent(-1);
      });
    });
  });
};

const $MonthNavLink = $('.month-link');

$MonthNavLink.click((event) => {
  // const month = event.target.text.trim();
  // let $monthSelector = $(`h1:contains(${month})`)[0].parentElement.parentElement;
  // let $newMonthIndex = $bookReviews.index($monthSelector);

  // let $selector = $('.active');
  // let $currentReviewIndex = $bookReviews.index($selector);
  // $($bookReviews[$currentReviewIndex]).removeClass('active');

  // $($bookReviews[$newMonthIndex]).addClass('active');
});

$(document).keydown(function (e) {
  switch (e.which) {
    case 37:
      changeContent(-1);
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

changeContent(0);