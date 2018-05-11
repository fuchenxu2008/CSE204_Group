export const getOption = (data) => ({
  tooltip: {
    trigger: 'item',
    triggerOn: 'mousemove',
  },
  series: [
    {
      type: 'tree',
      data: [data],
      left: '2%',
      right: '2%',
      top: '8%',
      bottom: '20%',
      symbol: 'emptyCircle',
      orient: 'vertical',
      expandAndCollapse: false,
      label: {
        normal: {
          position: 'top',
          rotate: 0,
          verticalAlign: 'middle',
          align: 'right',
          fontSize: 20,
        }
      },
      leaves: {
        label: {
          normal: {
            position: 'bottom',
            rotate: 0,
            verticalAlign: 'middle',
            align: 'center',
            fontSize: 20,
          }
        }
      },
      animationDurationUpdate: 750
    }
  ]
});
