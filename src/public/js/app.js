$(document).ready(function () {
  $.getJSON('/reviews/reviews.json', (data) => {
    $.get('/templates/review.htm', (templates) => {

      renderReview(data, templates);

      $(window).on('hashchange', (event) => {
        let month = location.hash.substring(2);
        let targetIndex = getCurrentIndex(data, month);
        renderReview(data, templates, targetIndex);
      });

      $(window).on('popstate', (e) => {
        console.log(e); 
      });

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

      // const $MonthNavLink = $('.month-link');
      // $MonthNavLink.click((event) => {
      //   // event.preventDefault();
      //   const month = event.target.text.trim();
      //   let index = getCurrentIndex(data, month);
      //   renderReview(data, templates, index);
      // });

      // $homeLink = $('#home-link');
      // $homeLink.click((event) => {
      //   event.preventDefault();
      //   renderReview(data, templates, 0)
      // });
    });
  });
});

const renderReview = (data, templates, index = 0) => {
  let template = $(templates).filter('#tpl-greeting').html();
  $('#target').html(Mustache.render(template, data[index]));
  let month = data[index].month.toLowerCase();
  history.pushState({ id: month }, 'My Year In Books', `http://localhost:3000/#/${month}`);
};

const changeContent = (data, templates, index) => {
  let month = $('.month-heading').text().toLowerCase();
  let currentIndex = getCurrentIndex(data, month);
  let newIndex = currentIndex + index;

  if (newIndex > data.length - 1) {
    newIndex = 0;
  } else if (newIndex < 0) {
    newIndex = data.length - 1;
  };

  renderReview(data, templates, newIndex);
};

const getCurrentIndex = (data, month) => {
  let index = data.findIndex((element) => {
    return element.month.trim().toLowerCase() === month.trim().toLowerCase();
  });
  return index < 0 ? index = 0 : index;
};

$aboutLink = $('#about-link');
$aboutLink.click((event) => {
  event.preventDefault();

  const $slideshowContainer = $('.slideshow-container');
  $slideshowContainer.toggleClass('hidden');

  const $aboutContent = $('#about-content');
  $aboutContent.toggleClass('active');
});


