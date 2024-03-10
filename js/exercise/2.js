// Write a JavaScript program to find the area of a triangle where three sides are 5, 6, 7.
// √s(s−a)(s−b)(s−c) s ( s − a ) ( s − b ) ( s − c )
// s = (a+b+c)/2
(a = 5), (b = 6), (c = 7);
let semi_permeter = (a + b + c) / 2;
area = Math.floor(
  Math.sqrt(
    semi_permeter *
      (semi_permeter - a) *
      (semi_permeter - b) *
      (semi_permeter - c)
  )
);
console.log(area);
