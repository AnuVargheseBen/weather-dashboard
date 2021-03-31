import moment from 'moment';

const DATE_TIME_FORMATE = 'YYYY-MM-DD HH:mm';

const DATE_TIME_SUNRISE_SUNSET = 'YYYY-MM-DD HH:mm A';

function getUpcoming24Hour(daysForecast) {
  // const curHour = new Date().getHours();
  const curDate = daysForecast.location.localtime;
  const curHour = parseInt(moment(curDate).format('HH'));
  console.log({ curHour });
  const currentDay = daysForecast.forecast.forecastday[0].hour;
  const nextDay = daysForecast.forecast.forecastday[1].hour;
  const currentDayTime = currentDay
    .concat(nextDay)
    .slice(curHour, curHour + 13)
    .map((item) => {
      return { ...item, timeObj: moment(item.time, DATE_TIME_FORMATE) };
    });
  console.log({ currentDayTime });

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
        'https://www.flaticon.com/svg/vstatic/svg/1852/1852525.svg?token=exp=1617178886~hmac=cdab683822a9b9c746f3e5673d23ae22',
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
        'https://www.flaticon.com/svg/vstatic/svg/1852/1852525.svg?token=exp=1617178886~hmac=cdab683822a9b9c746f3e5673d23ae22',
    },
    {
      timeObj: moment(`${nextDateStr} ${nextSunsetStr}`, DATE_TIME_SUNRISE_SUNSET),
      type: 'Sunset',
      icon:
        'https://www.flaticon.com/svg/vstatic/svg/2294/2294957.svg?token=exp=1617196522~hmac=53d9ab02aa4a37ee9fdbe79399f881be',
    },
  ]);

  let result = [];
  for (let hour of currentDayTime) {
    const { timeObj: curTime } = hour;
    let sunriseOrSunset = null;

    sunriseSunsets.forEach((item) => {
      const { timeObj: nextTime } = item;
      if (curTime.isBefore(nextTime) && curTime.add(1, 'hours').isAfter(nextTime)) {
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
