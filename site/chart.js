'use strict';

function formatDate(date) {
  var mm = date.getMonth() + 1; // getMonth() is zero-based
  var dd = date.getDate();

  const zeroPadded = (number) => (number > 9 ? '' : '0') + number;

  const dateSting = [date.getFullYear(), mm, dd].map(zeroPadded).join('-');
  const timeSting = [date.getHours(), date.getMinutes(), date.getSeconds()].map(zeroPadded).join(':');

  return dateSting + ' ' + timeSting;
}

var chart = c3.generate({
  data: {
    x: 'x',
    columns: [
      ['x', '2010-03-22', '2010-03-23', '2010-03-24', '2010-03-25', '2010-03-26', '2010-03-27', '2010-03-28', '2010-03-29', '2010-03-30', '2010-04-01', '2010-04-02', '2010-04-03', '2010-04-04'],
      ['data1', 400, 150, 250, 600, 700, 800, 900, 1000, 1100, 1101, 1102, 1103, 1104],
      ['data2', 300, 250, 450, 400, 700, 800, 900, 1000, 1100, 1101, 1102, 1103, 1104]
    ]
  },
  axis: {
    x: {
      type: 'timeseries',
      tick: {
        format: '%Y-%m-%d'
      }
    }
  },
  tooltip: {
    format: {
      title: function (date) { return formatDate(date); },
    }
  }
});
