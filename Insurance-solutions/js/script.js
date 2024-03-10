$(document).ready(function () {
  $(" .solutions__Container.owl-carousel").owlCarousel({
    loop: false,
    margin: 10,
    dots: true,
    responsive: {
      0: {
        items: 1,
      },
      767: {
        items: 2,
      },
      1000: {
        items: 2,
      },
    },
  });
});

// if ($(window).width() <= 1023) {
//   $(".solutions__Container").addClass("owl-carousel");
//   $(".owl-carousel").owlCarousel({
//     loop: false,
//     margin: 10,
//     dots: true,
//     responsive: {
//       0: {
//         items: 1,
//       },
//       767: {
//         items: 2,
//       },
//       1000: {
//         items: 3,
//       },
//     },
//   });
// }
