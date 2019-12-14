$(document).ready(function () {
  $.getJSON('/reviews/reviews.json', (data) => {
    $.get('/templates/review.htm', (templates) => {

      renderReview(data, templates);
      $(document).on('click', '#right-button', () => {
        changeContent(data, templates, 1);
      });

      $(document).on('click', '#left-button', () => {
        changeContent(data, templates, -1);
      });

      $(document).keydown(function (e) {
        switch (e.which) {
          case 37:
            changeContent(data, templates, -1);
            break;

          case 39:
            changeContent(data, templates, 1);
            break;

          default: return;
        }
        e.preventDefault();
      });
    });
  });
});

const renderReview = (data, templates, index = 0) => {
  let template = $(templates).filter('#tpl-greeting').html();
  $('#target').html(Mustache.render(template, data[index]));
};

const changeContent = (data, templates, index) => {
  let currentIndex = getCurrentIndex(data, $('.month-heading').text());
  let newIndex = currentIndex + index;

  if (newIndex > data.length - 1) {
    newIndex = 0;
  } else if (newIndex < 0) {
    newIndex = data.length - 1;
  };

  renderReview(data, templates, newIndex);
};

const getCurrentIndex = (data, month) => {
  let index = currentIndex = data.findIndex((element) => {
    return element.month.trim() === month;
  });
  return index < 0 ? index = 0 : index;
};

const $MonthNavLink = $('.month-link');
$MonthNavLink.click((event) => {
  const month = event.target.text.trim();
  changeContent()
});



// $aboutLink = $('#about-link');
// $aboutLink.click((event) => {
//   console.log('clicked');

//   // const $slideshowContainer = $('.slideshow-container');
//   // $slideshowContainer.toggleClass('hidden');

//   // const $aboutContent = $('#about-content');
//   // $aboutContent.toggleClass('active');
// })
