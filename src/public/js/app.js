$(document).ready(function () {
  $.getJSON('/reviews/reviews.json', (data) => {
    console.log(data);
  })
    .done(function () {
      console.log("second success");
    })
    .fail(function (jqxhr, textStatus, error) {
      var err = textStatus + ", " + error;
      console.log("Request Failed: " + err);
    });
});

const changeContent = (index) => {
  $.getJSON('src/reviews/reviews.json', (data) => {
    $.get('src/templates/review.htm', (templates) => {
      console.log(data);


      let currentIndex = getCurrentIndex(data, $('.month-heading').text());
      let newIndex = currentIndex + index;

      if (newIndex > data.length - 1) {
        newIndex = 0;
      } else if (newIndex < 0) {
        newIndex = data.length - 1;
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

// $aboutLink = $('#about-link');
// $aboutLink.click((event) => {
//   console.log('clicked');

//   // const $slideshowContainer = $('.slideshow-container');
//   // $slideshowContainer.toggleClass('hidden');

//   // const $aboutContent = $('#about-content');
//   // $aboutContent.toggleClass('active');
// })
