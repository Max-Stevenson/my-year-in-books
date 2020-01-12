$(document).ready(function () {
  $.getJSON('/reviews/reviews.json', (data) => {
    $.get('/templates/review.htm', (templates) => {

      window.onload = () => {
        let month = location.hash.substring(2);
        let index = getCurrentIndex(data, month);
        renderReview(data, templates, index);
      };

      window.onhashchange = () => {
        if ($(window).width() <= 600) {
          if ($('.sidebar').hasClass('sidebar-active')) {
            $('.sidebar').toggleClass('sidebar-active');
          };
        };

        let hash = location.hash.substring(2);

        if (hash === 'about') {
          renderAbout();
        };

        let targetIndex = getCurrentIndex(data, hash);
        renderReview(data, templates, targetIndex);
      };

      window.onpopstate = (event) => {
        if (event.state != null) {
          let index = getCurrentIndex(data, event.state);
          renderReview(data, templates, index);
        };
      };

      window.addEventListener('swiped-left', () => {
        changeContent(data, templates, 1);
      });

      window.addEventListener('swiped-right', () => {
        changeContent(data, templates, -1);
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
    });
  });
});

const renderReview = (data, templates, index = 0) => {
  let template = $(templates).filter('#tpl-review').html();
  $('#target').html(Mustache.render(template, data[index]));
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
  month = $('.month-heading').text().toLowerCase();
  history.pushState(month, null, `http://localhost:3000/#/${month}`);
};

const getCurrentIndex = (data, month) => {
  let index = data.findIndex((element) => {
    return element.month.trim().toLowerCase() === month.trim().toLowerCase();
  });
  return index < 0 ? index = 0 : index;
};

const renderAbout = () => {
  $.get('/templates/about.htm', (templates) => {
    let template = $(templates).filter('#tpl-aboutPage').html();
    $('#target').html(Mustache.render(template, null));
  });
};

$('#sidebar-mobile-control').on('click', () => {
  $('.sidebar').toggleClass('sidebar-active');
});

$('#sidebar-mobile-collapse').on('click', () => {
  $('.sidebar').toggleClass('sidebar-active');
});
