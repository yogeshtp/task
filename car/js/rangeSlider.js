$(document).ready(function () {
  $(".js-range-slider").ionRangeSlider({
    type: "double",
    grid: true,
    min: 0,
    max: 10000,
    prefix: "$",
    max_postfix: "+",
  });
});
