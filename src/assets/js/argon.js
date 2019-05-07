import Chart from 'chart.js';

export default function () {
  // Variable
  // const $toggle = $('[data-toggle="chart"]');
  const mode = 'light';
  const fonts = {
    base: 'Open Sans'
  };

  // Colors
  const colors = {
    gray: {
      100: '#f6f9fc',
      200: '#e9ecef',
      300: '#dee2e6',
      400: '#ced4da',
      500: '#adb5bd',
      600: '#8898aa',
      700: '#525f7f',
      800: '#32325d',
      900: '#212529'
    },
    theme: {
      default: '#172b4d',
      primary: '#5e72e4',
      secondary: '#f4f5f7',
      info: '#11cdef',
      success: '#2dce89',
      danger: '#f5365c',
      warning: '#fb6340'
    },
    black: '#12263F',
    white: '#FFFFFF',
    transparent: 'transparent'
  };

  // Methods
  // Chart.js global options
  function chartOptions() {
    // Options
    const options = {
      defaults: {
        global: {
          responsive: true,
          maintainAspectRatio: false,
          defaultColor: (mode === 'dark') ? colors.gray[700] : colors.gray[600],
          defaultFontColor: (mode === 'dark') ? colors.gray[700] : colors.gray[600],
          defaultFontFamily: fonts.base,
          defaultFontSize: 13,
          layout: {
            padding: 0
          },
          legend: {
            display: false,
            position: 'bottom',
            labels: {
              usePointStyle: true,
              padding: 16
            }
          },
          elements: {
            point: {
              radius: 0
              // backgroundColor: colors.theme.primary
            },
            line: {
              tension: 0.4,
              borderWidth: 4,
              borderColor: colors.theme.primary,
              backgroundColor: colors.transparent,
              borderCapStyle: 'rounded'
            },
            rectangle: {
              backgroundColor: colors.theme.warning
            },
            arc: {
              backgroundColor: colors.theme.primary,
              borderColor: (mode === 'dark') ? colors.gray[800] : colors.white,
              borderWidth: 4
            }
          },
          tooltips: {
            enabled: true,
            mode: 'index',
            intersect: false
          }
        },
        doughnut: {
          cutoutPercentage: 83,
          legendCallback: (chart) => {
            const { data } = chart;
            let content = '';

            data.labels.forEach((label, index) => {
              const bgColor = data.datasets[0].backgroundColor[index];
              content += `
                <span class="chart-legend-item">
                  <i class="chart-legend-indicator" style="background-color: ${bgColor}"></i>
                  ${label}
                </span>
              `;
            });
            return content;
          }
        }
      }
    };

    // yAxes
    Chart.scaleService.updateScaleDefaults('linear', {
      gridLines: {
        borderDash: [2],
        borderDashOffset: [2],
        color: (mode === 'dark') ? colors.gray[900] : colors.gray[300],
        drawBorder: false,
        drawTicks: false,
        lineWidth: 0,
        zeroLineWidth: 0,
        zeroLineColor: (mode === 'dark') ? colors.gray[900] : colors.gray[300],
        zeroLineBorderDash: [2],
        zeroLineBorderDashOffset: [2]
      },
      ticks: {
        beginAtZero: true,
        padding: 10,
        callback(value) {
          if ((value % 10) === 0) return value;
          return '';
        }
      }
    });

    // xAxes
    Chart.scaleService.updateScaleDefaults('category', {
      gridLines: {
        drawBorder: false,
        drawOnChartArea: false,
        drawTicks: false
      },
      ticks: {
        padding: 20
      },
      maxBarThickness: 10
    });

    return options;
  }

  // Parse global options
  function parseOptions(parent, options) {
    Object.keys(options).forEach((item) => {
      if (typeof options[item] !== 'object') parent[item] = options[item];
      else parseOptions(parent[item], options[item]);
    });
  }

  // Parse global options
  parseOptions(Chart, chartOptions());
}
