import moment from 'moment';

const DATE_TIME_FORMATE = 'YYYY-MM-DD HH:mm';

const DATE_TIME_SUNRISE_SUNSET = 'YYYY-MM-DD HH:mm A';

function getUpcoming24Hour(daysForecast) {
  const curDate = daysForecast.location.localtime;
  const curHourObj = moment(curDate);
  const curHour = parseInt(curHourObj.format('HH'));
   const currentDay = daysForecast.forecast.forecastday[0].hour;
  const nextDay = daysForecast.forecast.forecastday[1].hour;
  const currentDayTime = currentDay
    .concat(nextDay)
    .slice(curHour, curHour + 13)
    .map((item) => {
      return { ...item, timeObj: moment(item.time, DATE_TIME_FORMATE) };
    });

  const {
    astro: { sunrise: curSunriseStr, sunset: curSunsetStr },
    date: curDateStr,
  } = daysForecast.forecast.forecastday[0];
  const {
    astro: { sunrise: nextSunriseStr, sunset: nextSunsetStr },
    date: nextDateStr,
  } = daysForecast.forecast.forecastday[1];


  const sunriseSunsets = new Set([
    {
      timeObj: moment(`${curDateStr} ${curSunriseStr}`, DATE_TIME_SUNRISE_SUNSET),
      type: 'Sunrise',
      icon:
        'https://www.flaticon.com/svg/vstatic/svg/362/362408.svg?token=exp=1617564266~hmac=9ceb1ea991a0bfce56144d9eb6fb5ef1',
    },
    {
      timeObj: moment(`${curDateStr} ${curSunsetStr}`, DATE_TIME_SUNRISE_SUNSET),
      type: 'Sunset',
      icon:
        'https://www.flaticon.com/svg/vstatic/svg/2294/2294957.svg?token=exp=1617196522~hmac=53d9ab02aa4a37ee9fdbe79399f881be',
    },
    {
      timeObj: moment(`${nextDateStr} ${nextSunriseStr}`, DATE_TIME_SUNRISE_SUNSET),
      type: 'Sunrise',
      icon:
        'https://www.flaticon.com/svg/vstatic/svg/362/362408.svg?token=exp=1617564266~hmac=9ceb1ea991a0bfce56144d9eb6fb5ef1',
    },
    {
      timeObj: moment(`${nextDateStr} ${nextSunsetStr}`, DATE_TIME_SUNRISE_SUNSET),
      type: 'Sunset',
      icon:
        'https://www.flaticon.com/svg/vstatic/svg/2294/2294957.svg?token=exp=1617196522~hmac=53d9ab02aa4a37ee9fdbe79399f881be',
    },
  ]);

  
  console.log({sunriseSunsets})

  let result = [];
  for (let hour of currentDayTime) {
    const { timeObj: curTime } = hour;
    let sunriseOrSunset = null;

    sunriseSunsets.forEach((item) => {
      const { timeObj: nextTime } = item;
      const curTime1HourLater = moment(curTime).add(1, 'hours')
      if (curTime.isBefore(nextTime) && curTime1HourLater.isAfter(nextTime)) {
        sunriseOrSunset = item;
      }
    });
    result.push(hour);
    if (sunriseOrSunset) {
      result.push(sunriseOrSunset);
      sunriseSunsets.delete(sunriseOrSunset);
    }
  }
  return result;
}

export { getUpcoming24Hour };
