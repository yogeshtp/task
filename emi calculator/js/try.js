document.addEventListener("DOMContentLoaded", function () {
  calculateAndDisplayEMI();
  createChart();
});

let principal;
let interestRate;
let loanTermMonths;
let emi;
let totalAmountPayable;
let totalInterestPayable;
let mychart;

// loan amount
let loanAmountInput = document.getElementById("loan__amount--input");

$("#loan-range").ionRangeSlider({
  min: 75000,
  max: 350000,
  from: 99000,
  prefix: "$",
  step: 1000,
  prettify_enabled: true,
  prettify_separator: ",",
  onChange: function (data) {
    loanAmountInput.value = data.from;
    calculateAndDisplayEMI();
  },
  onStart: function (data) {
    loanAmountInput.value = data.from;
  },
  onFinish: function (data) {
    loanAmountInput.value = data.from;
    calculateAndDisplayEMI();
    mychart.destroy();
    createChart();
  },
});

loanAmountInput.addEventListener("input", function (e) {
  let loanChange = $("#loan-range").data("ionRangeSlider");
  loanChange.update({
    from: e.target.value,
  });
  calculateAndDisplayEMI();
});

// loan duration
let loanDuration = document.getElementById("loan__duration--period");
let monthDuration = document.getElementById("month");
let yearDuration = document.getElementById("year");
let loanDurationInput = document.getElementById("loan__duration--input");
let loanRangeSlider;
let currentLoanDurationValue;

let initialPeriod;
initialPeriod = "month"; // Moved the initialization here

let initialFromValue = initialPeriod === "month" ? 14 : 1;

loanRangeSlider = $("#duration-range")
  .ionRangeSlider({
    min: initialPeriod === "month" ? 12 : 1,
    max: initialPeriod === "month" ? 72 : 6 * 12,
    from: initialFromValue,
    onChange: function (data) {
      updateLoanDurationInputValue(data.from, initialPeriod);
      calculateAndDisplayEMI();
    },
    onStart: function (data) {
      updateLoanDurationInputValue(data.from, initialPeriod);
    },
    onFinish: function (data) {
      loanDurationInput.value = data.from;
      calculateAndDisplayEMI();
      mychart.destroy();
      createChart();
    },
  })
  .data("ionRangeSlider");

loanDuration.addEventListener("click", function (e) {
  let period, min, max, from;

  if (e.target.id == "month") {
    period = "month";
    min = 12;
    max = 72;
    from = Math.min(currentLoanDurationValue || 14, max);
    monthDuration.classList.add("period-active");
    yearDuration.classList.remove("period-active");
  } else if (e.target.id == "year") {
    period = "year";
    min = 1;
    max = 6; // 6 years
    from = Math.min(currentLoanDurationValue || 1, max);
    yearDuration.classList.add("period-active");
    monthDuration.classList.remove("period-active");
  }

  loanRangeSlider.update({
    min: min,
    max: max,
    from: from,
  });

  updateLoanDurationInputValue(from, period);
});

if (initialPeriod === "month") {
  monthDuration.classList.add("period-active");
  yearDuration.classList.remove("period-active");
} else {
  yearDuration.classList.add("period-active");
  monthDuration.classList.remove("period-active");
}

loanDurationInput.addEventListener("input", function (e) {
  let loanChange = $("#duration-range").data("ionRangeSlider");
  let inputValue = parseFloat(e.target.value);

  if (initialPeriod === "year") {
    inputValue *= 12;
  }
  inputValue = Math.min(
    Math.max(inputValue, loanChange.options.min),
    loanChange.options.max
  );

  loanChange.update({
    from: inputValue,
  });
  currentLoanDurationValue = inputValue;
  calculateAndDisplayEMI();
});

// rate of interest
let loanInterestInput;
loanInterestInput = document.getElementById("loan__interest--input");

$("#interest-range").ionRangeSlider({
  min: 10.99,
  max: 35,
  from: 10.99,
  step: 0.5,
  prettify_enabled: true,
  onChange: function (data) {
    loanInterestInput.value = data.from;
    calculateAndDisplayEMI();
  },
  onStart: function (data) {
    loanInterestInput.value = data.from;
  },
  onFinish: function (data) {
    loanInterestInput.value = data.from;
    calculateAndDisplayEMI();
    mychart.destroy();
    createChart();
  },
});

loanInterestInput.addEventListener("input", function (e) {
  let interestChange = $("#loan-range").data("ionRangeSlider");
  interestChange.update({
    from: e.target.value,
  });
  calculateAndDisplayEMI();
});

// Chart initialization
const ctx = document.getElementById("myChart");

function updateLoanDurationInputValue(value, period) {
  if (period === "month") {
    loanDurationInput.value = value;
  } else if (period === "year") {
    loanDurationInput.value = value / 12;
  }
  currentLoanDurationValue = value;
}

function calculateAndDisplayEMI() {
  principal = parseFloat(loanAmountInput.value);
  interestRate = parseFloat(loanInterestInput.value) / 100 / 12;
  loanTermMonths = parseFloat(loanDurationInput.value);

  emi =
    (principal * interestRate * Math.pow(1 + interestRate, loanTermMonths)) /
    (Math.pow(1 + interestRate, loanTermMonths) - 1);

  totalAmountPayable = emi * loanTermMonths;
  totalInterestPayable = totalAmountPayable - principal;

  document.getElementById("resultEMI").innerText = `₹${emi.toFixed(2)}`;
  document.getElementById(
    "total_amount_dynamic"
  ).innerText = `₹${totalAmountPayable.toFixed(2)}`;
  document.getElementById(
    "total_interest_dynamic"
  ).innerText = `₹${totalInterestPayable.toFixed(2)}`;

  console.table({ emi, totalAmountPayable, totalInterestPayable });
  return emi;
}

let emiUI = calculateAndDisplayEMI();

function createChart() {
  const data = {
    labels: ["Total Interest Payable", "Total Amount Payable"],
    datasets: [
      {
        data: [totalInterestPayable, totalAmountPayable],
        backgroundColor: ["#d8e024", "#2e93eb"],
        borderWidth: 0,
        rotation: 90,
      },
    ],
  };

  mychart = new Chart(ctx, {
    type: "pie",
    data: data,
    options: {
      useBorderRadius: true,
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });

  console.table({ totalAmountPayable, totalInterestPayable });
}
