$(document).ready(function () {
  function initSlick() {
    $("#key__benefits__container").slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
      prevArrow: '<button type="button" class="slick-prev">Previous</button>',
      nextArrow: '<button type="button" class="slick-next">Next</button>',
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    });
  }

  function destroySlick() {
    if ($("#key__benefits__container").hasClass("slick-initialized")) {
      $("#key__benefits__container").slick("unslick");
    }
  }
  if (window.matchMedia("(max-width: 767px)").matches) {
    initSlick();
  }
  const mediaQuery = window.matchMedia("(max-width: 767px)");
  mediaQuery.addListener(function () {
    if (mediaQuery.matches) {
      initSlick();
    } else {
      destroySlick();
    }
  });
});
// let benefitsArr = [
//   {
//     img: "../assets/quick_settlement.svg",
//     title: "Title 1",
//     description: "Description 1",
//   },
//   {
//     img: "../assets/quick_depreciation.svg",
//     title: "Title 2",
//     description: "Description 2",
//   },
//   {
//     img: "../assets/roadside.svg",
//     title: "Title 3",
//     description: "Description 3",
//   },
// ];
// //   ,
// //   {
// //     img: "image4.jpg",
// //     title: "Title 4",
// //     description: "Description 4",
// //   },
// //   {
// //     img: "image5.jpg",
// //     title: "Title 5",
// //     description: "Description 5",
// //   },

// // let benefitsContainer = document.getElementsByClassName(
// //   "key__benefits__elements"
// // );

// // benefitsArr.map((item) => {
// //   let div = document.createElement("div");
// //   let img = document.createElement("img");
// //   let h1 = document.createElement("h1");
// //   let p = document.createElement("p");

// //   img.src = item.img;
// //   h1.textContent = item.title;
// //   p.textContent = item.description;

// //   div.appendChild(img);
// //   div.appendChild(h1);
// //   div.appendChild(p);

// //   benefitsContainer.appendChild(div);
// // });
