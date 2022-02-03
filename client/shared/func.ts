import dayjs, { Dayjs } from 'dayjs'
var duration = require('dayjs/plugin/duration')
dayjs.extend(duration)

const satatusColorBlue = '#87b6d8'
const satatusColorGreen = '#71c7a2'
const satatusColorYellow = '#fcbe18'
const satatusColorOrange = '#f89f50'
const satatusColorRed = '#ef464c'

export const getAge = (birth: Dayjs) => {
  const today = dayjs();

  const diff_date = today.diff(birth)
  const ageYear = Math.floor(diff_date / 31536000000)
  const ageMonth = Math.floor((diff_date % 31536000000) / 2628000000)
  const ageDay = Math.floor(((diff_date % 31536000000) % 2628000000) / 86400000)
  const age = {
    yearDob: ageYear,
    monthDob: ageMonth,
    dayDob: ageDay
  }
  const newspewsAgeGroup = calculateAgeGroup(age)
  return {
    ...age,
    newspewsAgeGroup: newspewsAgeGroup
  }
}

export const calculateAgeGroup = (values: any) => {
  const { yearDob, monthDob, dayDob } = values
  if (yearDob == 0) {
    if (monthDob == 0) {
      if (dayDob <= 3) {
        return 1;
      } else {
        return 2;
      }
    } else {
      if (monthDob == 1) {
        return 3;
      } else {
        return 4;
      }
    }
  } else {
    if (yearDob <= 2) {
      return 5;
    } else if (yearDob <= 5) {
      return 6;
    } else if (yearDob <= 7) {
      return 7;
    } else if (yearDob <= 9) {
      return 8;
    } else if (yearDob <= 15) {
      return 9;
    } else {
      return 10;
    }
  }
}

export const inchToCm = (inch: number) => {
  return (inch * 2.54).toFixed(2)
}

export const cmToInch = (cm: number) => {
  return (cm / 2.54).toFixed(2)
}

export const bmiCalc = (weight: number, height: number) => {
  return (weight / Math.pow((height / 100), 2)).toFixed(2)
}

export const bmiColor = (bmiNumber: any) => {
  const bmi = parseFloat(bmiNumber)
  if (bmi && bmi < 18.5) {
    return satatusColorBlue
  } else if (bmi && (bmi >= 18.5 && bmi <= 22.9)) {
    return satatusColorGreen
  } else if (bmi && (bmi >= 23.0 && bmi <= 24.9)) {
    return satatusColorYellow
  } else if (bmi && (bmi >= 25.0 && bmi <= 29.9)) {
    return satatusColorOrange
  } else if (bmi && (bmi >= 30)) {
    return satatusColorRed
  } else {
    return ''
  }
}

export const nutritionCalc = (weight: string | number,
  bmi: string | number, gender: any, age: any) => {
  const WIEGHT = parseFloat(weight.toString())
  const BMI = parseFloat(bmi.toString())
  const AGEMONTH = dayjs(dayjs()).diff(age, 'months')
  const GENDER = gender
  let idx
  if (AGEMONTH > 73) {
    if (BMI < 18.5) {
      return '12'
    } else if (BMI < 23) {
      return '10'
    } else if (BMI < 25) {
      return '09'
    } else {
      return '08'
    }
  }
  if (GENDER === '1') {
    if (AGEMONTH === 0) {
      if (WIEGHT < 2.7) {
        idx = 4
      } else if (WIEGHT < 2.8) {
        idx = 3
      } else if (WIEGHT < 4.0) {
        idx = 2
      } else if (WIEGHT < 4.1) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 1) {
      if (WIEGHT < 3.3) {
        idx = 4
      } else if (WIEGHT < 3.4) {
        idx = 3
      } else if (WIEGHT < 4.8) {
        idx = 2
      } else if (WIEGHT < 5.1) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 2) {
      if (WIEGHT < 3.9) {
        idx = 4
      } else if (WIEGHT < 4.2) {
        idx = 3
      } else if (WIEGHT < 5.6) {
        idx = 2
      } else if (WIEGHT < 5.9) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 3) {
      if (WIEGHT < 4.5) {
        idx = 4
      } else if (WIEGHT < 4.8) {
        idx = 3
      } else if (WIEGHT < 6.5) {
        idx = 2
      } else if (WIEGHT < 6.8) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 4) {
      if (WIEGHT < 5.0) {
        idx = 4
      } else if (WIEGHT < 5.3) {
        idx = 3
      } else if (WIEGHT < 7.2) {
        idx = 2
      } else if (WIEGHT < 7.5) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 5) {
      if (WIEGHT < 5.5) {
        idx = 4
      } else if (WIEGHT < 5.8) {
        idx = 3
      } else if (WIEGHT < 7.9) {
        idx = 2
      } else if (WIEGHT < 8.2) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 6) {
      if (WIEGHT < 6.0) {
        idx = 4
      } else if (WIEGHT < 6.3) {
        idx = 3
      } else if (WIEGHT < 8.5) {
        idx = 2
      } else if (WIEGHT < 8.9) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 7) {
      if (WIEGHT < 6.4) {
        idx = 4
      } else if (WIEGHT < 6.8) {
        idx = 3
      } else if (WIEGHT < 9.1) {
        idx = 2
      } else if (WIEGHT < 9.5) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 8) {
      if (WIEGHT < 6.8) {
        idx = 4
      } else if (WIEGHT < 7.2) {
        idx = 3
      } else if (WIEGHT < 9.6) {
        idx = 2
      } else if (WIEGHT < 10.0) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 9) {
      if (WIEGHT < 7.2) {
        idx = 4
      } else if (WIEGHT < 7.6) {
        idx = 3
      } else if (WIEGHT < 10.0) {
        idx = 2
      } else if (WIEGHT < 10.4) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 10) {
      if (WIEGHT < 7.5) {
        idx = 4
      } else if (WIEGHT < 7.9) {
        idx = 3
      } else if (WIEGHT < 10.4) {
        idx = 2
      } else if (WIEGHT < 10.8) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 11) {
      if (WIEGHT < 7.7) {
        idx = 4
      } else if (WIEGHT < 8.1) {
        idx = 3
      } else if (WIEGHT < 10.7) {
        idx = 2
      } else if (WIEGHT < 11.2) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 12) {
      if (WIEGHT < 7.9) {
        idx = 4
      } else if (WIEGHT < 8.3) {
        idx = 3
      } else if (WIEGHT < 11.1) {
        idx = 2
      } else if (WIEGHT < 11.6) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 13) {
      if (WIEGHT < 8.1) {
        idx = 4
      } else if (WIEGHT < 8.5) {
        idx = 3
      } else if (WIEGHT < 11.4) {
        idx = 2
      } else if (WIEGHT < 11.9) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 14) {
      if (WIEGHT < 8.3) {
        idx = 4
      } else if (WIEGHT < 8.7) {
        idx = 3
      } else if (WIEGHT < 11.8) {
        idx = 2
      } else if (WIEGHT < 12.3) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 15) {
      if (WIEGHT < 8.4) {
        idx = 4
      } else if (WIEGHT < 8.9) {
        idx = 3
      } else if (WIEGHT < 12.1) {
        idx = 2
      } else if (WIEGHT < 12.6) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 16) {
      if (WIEGHT < 8.6) {
        idx = 4
      } else if (WIEGHT < 9.1) {
        idx = 3
      } else if (WIEGHT < 12.4) {
        idx = 2
      } else if (WIEGHT < 12.9) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 17) {
      if (WIEGHT < 8.8) {
        idx = 4
      } else if (WIEGHT < 9.3) {
        idx = 3
      } else if (WIEGHT < 12.7) {
        idx = 2
      } else if (WIEGHT < 13.2) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 18) {
      if (WIEGHT < 8.9) {
        idx = 4
      } else if (WIEGHT < 9.4) {
        idx = 3
      } else if (WIEGHT < 13.0) {
        idx = 2
      } else if (WIEGHT < 13.7) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 19) {
      if (WIEGHT < 9.1) {
        idx = 4
      } else if (WIEGHT < 9.6) {
        idx = 3
      } else if (WIEGHT < 13.3) {
        idx = 2
      } else if (WIEGHT < 14.0) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 20) {
      if (WIEGHT < 9.3) {
        idx = 4
      } else if (WIEGHT < 9.8) {
        idx = 3
      } else if (WIEGHT < 13.6) {
        idx = 2
      } else if (WIEGHT < 14.3) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 21) {
      if (WIEGHT < 9.4) {
        idx = 4
      } else if (WIEGHT < 9.9) {
        idx = 3
      } else if (WIEGHT < 13.9) {
        idx = 2
      } else if (WIEGHT < 14.6) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 22) {
      if (WIEGHT < 9.6) {
        idx = 4
      } else if (WIEGHT < 10.2) {
        idx = 3
      } else if (WIEGHT < 14.1) {
        idx = 2
      } else if (WIEGHT < 14.8) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 23) {
      if (WIEGHT < 9.6) {
        idx = 4
      } else if (WIEGHT < 10.3) {
        idx = 3
      } else if (WIEGHT < 14.3) {
        idx = 2
      } else if (WIEGHT < 15.0) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 24) {
      if (WIEGHT < 9.8) {
        idx = 4
      } else if (WIEGHT < 10.5) {
        idx = 3
      } else if (WIEGHT < 14.5) {
        idx = 2
      } else if (WIEGHT < 15.2) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 25) {
      if (WIEGHT < 9.9) {
        idx = 4
      } else if (WIEGHT < 10.6) {
        idx = 3
      } else if (WIEGHT < 14.7) {
        idx = 2
      } else if (WIEGHT < 15.4) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 26) {
      if (WIEGHT < 10.1) {
        idx = 4
      } else if (WIEGHT < 10.8) {
        idx = 3
      } else if (WIEGHT < 14.9) {
        idx = 2
      } else if (WIEGHT < 15.6) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 27) {
      if (WIEGHT < 10.2) {
        idx = 4
      } else if (WIEGHT < 10.9) {
        idx = 3
      } else if (WIEGHT < 15.2) {
        idx = 2
      } else if (WIEGHT < 15.9) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 28) {
      if (WIEGHT < 10.3) {
        idx = 4
      } else if (WIEGHT < 11.0) {
        idx = 3
      } else if (WIEGHT < 15.5) {
        idx = 2
      } else if (WIEGHT < 16.2) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 29) {
      if (WIEGHT < 10.5) {
        idx = 4
      } else if (WIEGHT < 11.2) {
        idx = 3
      } else if (WIEGHT < 15.7) {
        idx = 2
      } else if (WIEGHT < 16.4) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 30) {
      if (WIEGHT < 10.6) {
        idx = 4
      } else if (WIEGHT < 11.4) {
        idx = 3
      } else if (WIEGHT < 15.9) {
        idx = 2
      } else if (WIEGHT < 16.7) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 31) {
      if (WIEGHT < 10.7) {
        idx = 4
      } else if (WIEGHT < 11.5) {
        idx = 3
      } else if (WIEGHT < 16.2) {
        idx = 2
      } else if (WIEGHT < 17.0) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 32) {
      if (WIEGHT < 10.9) {
        idx = 4
      } else if (WIEGHT < 11.7) {
        idx = 3
      } else if (WIEGHT < 16.4) {
        idx = 2
      } else if (WIEGHT < 17.2) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 33) {
      if (WIEGHT < 11.0) {
        idx = 4
      } else if (WIEGHT < 11.8) {
        idx = 3
      } else if (WIEGHT < 16.7) {
        idx = 2
      } else if (WIEGHT < 17.5) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 34) {
      if (WIEGHT < 11.1) {
        idx = 4
      } else if (WIEGHT < 11.9) {
        idx = 3
      } else if (WIEGHT < 16.9) {
        idx = 2
      } else if (WIEGHT < 17.7) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 35) {
      if (WIEGHT < 11.2) {
        idx = 4
      } else if (WIEGHT < 12.0) {
        idx = 3
      } else if (WIEGHT < 17.2) {
        idx = 2
      } else if (WIEGHT < 18.0) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 36) {
      if (WIEGHT < 11.3) {
        idx = 4
      } else if (WIEGHT < 12.1) {
        idx = 3
      } else if (WIEGHT < 17.3) {
        idx = 2
      } else if (WIEGHT < 18.2) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 37) {
      if (WIEGHT < 11.4) {
        idx = 4
      } else if (WIEGHT < 12.2) {
        idx = 3
      } else if (WIEGHT < 17.6) {
        idx = 2
      } else if (WIEGHT < 18.5) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 38) {
      if (WIEGHT < 11.6) {
        idx = 4
      } else if (WIEGHT < 12.4) {
        idx = 3
      } else if (WIEGHT < 17.8) {
        idx = 2
      } else if (WIEGHT < 18.7) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 39) {
      if (WIEGHT < 11.7) {
        idx = 4
      } else if (WIEGHT < 12.5) {
        idx = 3
      } else if (WIEGHT < 18.1) {
        idx = 2
      } else if (WIEGHT < 19.0) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 40) {
      if (WIEGHT < 11.8) {
        idx = 4
      } else if (WIEGHT < 12.6) {
        idx = 3
      } else if (WIEGHT < 18.2) {
        idx = 2
      } else if (WIEGHT < 19.2) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 41) {
      if (WIEGHT < 11.9) {
        idx = 4
      } else if (WIEGHT < 12.7) {
        idx = 3
      } else if (WIEGHT < 18.5) {
        idx = 2
      } else if (WIEGHT < 19.5) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 42) {
      if (WIEGHT < 12.0) {
        idx = 4
      } else if (WIEGHT < 12.8) {
        idx = 3
      } else if (WIEGHT < 18.7) {
        idx = 2
      } else if (WIEGHT < 19.8) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 43) {
      if (WIEGHT < 12.2) {
        idx = 4
      } else if (WIEGHT < 13.0) {
        idx = 3
      } else if (WIEGHT < 18.9) {
        idx = 2
      } else if (WIEGHT < 20.1) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 44) {
      if (WIEGHT < 12.3) {
        idx = 4
      } else if (WIEGHT < 13.1) {
        idx = 3
      } else if (WIEGHT < 19.1) {
        idx = 2
      } else if (WIEGHT < 20.3) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 45) {
      if (WIEGHT < 12.4) {
        idx = 4
      } else if (WIEGHT < 13.2) {
        idx = 3
      } else if (WIEGHT < 19.4) {
        idx = 2
      } else if (WIEGHT < 20.6) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 46) {
      if (WIEGHT < 12.5) {
        idx = 4
      } else if (WIEGHT < 13.4) {
        idx = 3
      } else if (WIEGHT < 19.6) {
        idx = 2
      } else if (WIEGHT < 20.8) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 47) {
      if (WIEGHT < 12.6) {
        idx = 4
      } else if (WIEGHT < 13.5) {
        idx = 3
      } else if (WIEGHT < 19.8) {
        idx = 2
      } else if (WIEGHT < 21.0) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 48) {
      if (WIEGHT < 12.7) {
        idx = 4
      } else if (WIEGHT < 13.6) {
        idx = 3
      } else if (WIEGHT < 20.0) {
        idx = 2
      } else if (WIEGHT < 21.3) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 49) {
      if (WIEGHT < 12.8) {
        idx = 4
      } else if (WIEGHT < 13.7) {
        idx = 3
      } else if (WIEGHT < 20.3) {
        idx = 2
      } else if (WIEGHT < 21.6) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 50) {
      if (WIEGHT < 12.9) {
        idx = 4
      } else if (WIEGHT < 13.8) {
        idx = 3
      } else if (WIEGHT < 20.5) {
        idx = 2
      } else if (WIEGHT < 21.8) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 51) {
      if (WIEGHT < 13.0) {
        idx = 4
      } else if (WIEGHT < 13.9) {
        idx = 3
      } else if (WIEGHT < 20.7) {
        idx = 2
      } else if (WIEGHT < 22.0) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 52) {
      if (WIEGHT < 13.1) {
        idx = 4
      } else if (WIEGHT < 14.0) {
        idx = 3
      } else if (WIEGHT < 20.9) {
        idx = 2
      } else if (WIEGHT < 22.2) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 53) {
      if (WIEGHT < 13.2) {
        idx = 4
      } else if (WIEGHT < 14.1) {
        idx = 3
      } else if (WIEGHT < 21.1) {
        idx = 2
      } else if (WIEGHT < 22.2) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 54) {
      if (WIEGHT < 13.3) {
        idx = 4
      } else if (WIEGHT < 14.2) {
        idx = 3
      } else if (WIEGHT < 21.3) {
        idx = 2
      } else if (WIEGHT < 22.7) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 55) {
      if (WIEGHT < 13.5) {
        idx = 4
      } else if (WIEGHT < 14.4) {
        idx = 3
      } else if (WIEGHT < 21.6) {
        idx = 2
      } else if (WIEGHT < 23.0) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 56) {
      if (WIEGHT < 13.6) {
        idx = 4
      } else if (WIEGHT < 14.5) {
        idx = 3
      } else if (WIEGHT < 21.8) {
        idx = 2
      } else if (WIEGHT < 23.3) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 57) {
      if (WIEGHT < 13.8) {
        idx = 4
      } else if (WIEGHT < 14.7) {
        idx = 3
      } else if (WIEGHT < 22.0) {
        idx = 2
      } else if (WIEGHT < 23.6) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 58) {
      if (WIEGHT < 13.9) {
        idx = 4
      } else if (WIEGHT < 14.8) {
        idx = 3
      } else if (WIEGHT < 22.2) {
        idx = 2
      } else if (WIEGHT < 23.8) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 59) {
      if (WIEGHT < 14.0) {
        idx = 4
      } else if (WIEGHT < 14.9) {
        idx = 3
      } else if (WIEGHT < 22.5) {
        idx = 2
      } else if (WIEGHT < 24.1) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 60) {
      if (WIEGHT < 14.1) {
        idx = 4
      } else if (WIEGHT < 15.0) {
        idx = 3
      } else if (WIEGHT < 22.7) {
        idx = 2
      } else if (WIEGHT < 24.3) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 61) {
      if (WIEGHT < 14.2) {
        idx = 4
      } else if (WIEGHT < 15.1) {
        idx = 3
      } else if (WIEGHT < 23.0) {
        idx = 2
      } else if (WIEGHT < 24.6) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 62) {
      if (WIEGHT < 14.4) {
        idx = 4
      } else if (WIEGHT < 15.3) {
        idx = 3
      } else if (WIEGHT < 23.2) {
        idx = 2
      } else if (WIEGHT < 24.8) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 63) {
      if (WIEGHT < 14.5) {
        idx = 4
      } else if (WIEGHT < 15.4) {
        idx = 3
      } else if (WIEGHT < 23.4) {
        idx = 2
      } else if (WIEGHT < 25.1) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 64) {
      if (WIEGHT < 14.6) {
        idx = 4
      } else if (WIEGHT < 15.5) {
        idx = 3
      } else if (WIEGHT < 23.6) {
        idx = 2
      } else if (WIEGHT < 25.3) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 65) {
      if (WIEGHT < 14.7) {
        idx = 4
      } else if (WIEGHT < 15.7) {
        idx = 3
      } else if (WIEGHT < 23.9) {
        idx = 2
      } else if (WIEGHT < 25.6) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 66) {
      if (WIEGHT < 14.8) {
        idx = 4
      } else if (WIEGHT < 15.8) {
        idx = 3
      } else if (WIEGHT < 24.1) {
        idx = 2
      } else if (WIEGHT < 25.8) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 67) {
      if (WIEGHT < 14.9) {
        idx = 4
      } else if (WIEGHT < 15.9) {
        idx = 3
      } else if (WIEGHT < 24.4) {
        idx = 2
      } else if (WIEGHT < 26.1) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 68) {
      if (WIEGHT < 15.1) {
        idx = 4
      } else if (WIEGHT < 16.1) {
        idx = 3
      } else if (WIEGHT < 24.5) {
        idx = 2
      } else if (WIEGHT < 26.3) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 69) {
      if (WIEGHT < 15.2) {
        idx = 4
      } else if (WIEGHT < 16.2) {
        idx = 3
      } else if (WIEGHT < 24.7) {
        idx = 2
      } else if (WIEGHT < 26.5) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 70) {
      if (WIEGHT < 15.4) {
        idx = 4
      } else if (WIEGHT < 16.4) {
        idx = 3
      } else if (WIEGHT < 25.0) {
        idx = 2
      } else if (WIEGHT < 26.8) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 71) {
      if (WIEGHT < 15.5) {
        idx = 4
      } else if (WIEGHT < 16.5) {
        idx = 3
      } else if (WIEGHT < 25.3) {
        idx = 2
      } else if (WIEGHT < 27.1) {
        idx = 1
      } else {
        idx = 0
      }
    } else {
      if (WIEGHT < 15.5) {
        idx = 4
      } else if (WIEGHT < 16.6) {
        idx = 3
      } else if (WIEGHT < 25.5) {
        idx = 2
      } else if (WIEGHT < 27.3) {
        idx = 1
      } else {
        idx = 0
      }
    }
    // END GENDER 1
  } else {
    if (AGEMONTH === 0) {
      if (WIEGHT < 2.6) {
        idx = 4
      } else if (WIEGHT < 2.7) {
        idx = 3
      } else if (WIEGHT < 3.8) {
        idx = 2
      } else if (WIEGHT < 3.9) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 1) {
      if (WIEGHT < 3.2) {
        idx = 4
      } else if (WIEGHT < 3.3) {
        idx = 3
      } else if (WIEGHT < 3.5) {
        idx = 2
      } else if (WIEGHT < 3.8) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 2) {
      if (WIEGHT < 3.7) {
        idx = 4
      } else if (WIEGHT < 3.8) {
        idx = 3
      } else if (WIEGHT < 5.3) {
        idx = 2
      } else if (WIEGHT < 5.6) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 3) {
      if (WIEGHT < 4.1) {
        idx = 4
      } else if (WIEGHT < 4.4) {
        idx = 3
      } else if (WIEGHT < 6.1) {
        idx = 2
      } else if (WIEGHT < 6.4) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 4) {
      if (WIEGHT < 4.6) {
        idx = 4
      } else if (WIEGHT < 4.9) {
        idx = 3
      } else if (WIEGHT < 6.8) {
        idx = 2
      } else if (WIEGHT < 7.1) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 5) {
      if (WIEGHT < 5.0) {
        idx = 4
      } else if (WIEGHT < 5.3) {
        idx = 3
      } else if (WIEGHT < 7.4) {
        idx = 2
      } else if (WIEGHT < 7.8) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 6) {
      if (WIEGHT < 5.5) {
        idx = 4
      } else if (WIEGHT < 5.8) {
        idx = 3
      } else if (WIEGHT < 8.0) {
        idx = 2
      } else if (WIEGHT < 8.4) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 7) {
      if (WIEGHT < 5.8) {
        idx = 4
      } else if (WIEGHT < 6.2) {
        idx = 3
      } else if (WIEGHT < 8.6) {
        idx = 2
      } else if (WIEGHT < 9.0) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 8) {
      if (WIEGHT < 6.2) {
        idx = 4
      } else if (WIEGHT < 6.6) {
        idx = 3
      } else if (WIEGHT < 9.1) {
        idx = 2
      } else if (WIEGHT < 9.5) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 9) {
      if (WIEGHT < 6.5) {
        idx = 4
      } else if (WIEGHT < 6.9) {
        idx = 3
      } else if (WIEGHT < 9.4) {
        idx = 2
      } else if (WIEGHT < 9.9) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 10) {
      if (WIEGHT < 6.8) {
        idx = 4
      } else if (WIEGHT < 7.2) {
        idx = 3
      } else if (WIEGHT < 9.9) {
        idx = 2
      } else if (WIEGHT < 10.4) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 11) {
      if (WIEGHT < 7.1) {
        idx = 4
      } else if (WIEGHT < 7.5) {
        idx = 3
      } else if (WIEGHT < 10.3) {
        idx = 2
      } else if (WIEGHT < 10.8) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 12) {
      if (WIEGHT < 7.3) {
        idx = 4
      } else if (WIEGHT < 7.7) {
        idx = 3
      } else if (WIEGHT < 10.6) {
        idx = 2
      } else if (WIEGHT < 11.1) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 13) {
      if (WIEGHT < 7.5) {
        idx = 4
      } else if (WIEGHT < 7.9) {
        idx = 3
      } else if (WIEGHT < 10.9) {
        idx = 2
      } else if (WIEGHT < 11.4) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 14) {
      if (WIEGHT < 7.7) {
        idx = 4
      } else if (WIEGHT < 8.1) {
        idx = 3
      } else if (WIEGHT < 11.2) {
        idx = 2
      } else if (WIEGHT < 11.7) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 15) {
      if (WIEGHT < 7.9) {
        idx = 4
      } else if (WIEGHT < 8.3) {
        idx = 3
      } else if (WIEGHT < 11.4) {
        idx = 2
      } else if (WIEGHT < 12.0) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 16) {
      if (WIEGHT < 8.0) {
        idx = 4
      } else if (WIEGHT < 8.4) {
        idx = 3
      } else if (WIEGHT < 11.7) {
        idx = 2
      } else if (WIEGHT < 12.2) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 17) {
      if (WIEGHT < 8.2) {
        idx = 4
      } else if (WIEGHT < 8.6) {
        idx = 3
      } else if (WIEGHT < 11.9) {
        idx = 2
      } else if (WIEGHT < 12.5) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 18) {
      if (WIEGHT < 8.3) {
        idx = 4
      } else if (WIEGHT < 8.8) {
        idx = 3
      } else if (WIEGHT < 12.2) {
        idx = 2
      } else if (WIEGHT < 12.9) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 19) {
      if (WIEGHT < 8.5) {
        idx = 4
      } else if (WIEGHT < 9.0) {
        idx = 3
      } else if (WIEGHT < 12.5) {
        idx = 2
      } else if (WIEGHT < 13.2) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 20) {
      if (WIEGHT < 8.6) {
        idx = 4
      } else if (WIEGHT < 9.1) {
        idx = 3
      } else if (WIEGHT < 12.7) {
        idx = 2
      } else if (WIEGHT < 13.4) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 21) {
      if (WIEGHT < 8.8) {
        idx = 4
      } else if (WIEGHT < 9.3) {
        idx = 3
      } else if (WIEGHT < 13.0) {
        idx = 2
      } else if (WIEGHT < 13.7) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 22) {
      if (WIEGHT < 8.9) {
        idx = 4
      } else if (WIEGHT < 9.4) {
        idx = 3
      } else if (WIEGHT < 13.2) {
        idx = 2
      } else if (WIEGHT < 13.9) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 23) {
      if (WIEGHT < 9.0) {
        idx = 4
      } else if (WIEGHT < 9.5) {
        idx = 3
      } else if (WIEGHT < 13.5) {
        idx = 2
      } else if (WIEGHT < 14.2) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 24) {
      if (WIEGHT < 9.1) {
        idx = 4
      } else if (WIEGHT < 9.7) {
        idx = 3
      } else if (WIEGHT < 13.8) {
        idx = 2
      } else if (WIEGHT < 14.5) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 25) {
      if (WIEGHT < 9.2) {
        idx = 4
      } else if (WIEGHT < 9.8) {
        idx = 3
      } else if (WIEGHT < 14.0) {
        idx = 2
      } else if (WIEGHT < 14.7) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 26) {
      if (WIEGHT < 9.3) {
        idx = 4
      } else if (WIEGHT < 10.0) {
        idx = 3
      } else if (WIEGHT < 14.3) {
        idx = 2
      } else if (WIEGHT < 15.0) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 27) {
      if (WIEGHT < 9.5) {
        idx = 4
      } else if (WIEGHT < 10.1) {
        idx = 3
      } else if (WIEGHT < 14.5) {
        idx = 2
      } else if (WIEGHT < 15.2) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 28) {
      if (WIEGHT < 9.6) {
        idx = 4
      } else if (WIEGHT < 10.2) {
        idx = 3
      } else if (WIEGHT < 14.7) {
        idx = 2
      } else if (WIEGHT < 15.5) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 29) {
      if (WIEGHT < 9.7) {
        idx = 4
      } else if (WIEGHT < 10.4) {
        idx = 3
      } else if (WIEGHT < 15.0) {
        idx = 2
      } else if (WIEGHT < 15.8) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 30) {
      if (WIEGHT < 9.8) {
        idx = 4
      } else if (WIEGHT < 10.6) {
        idx = 3
      } else if (WIEGHT < 15.2) {
        idx = 2
      } else if (WIEGHT < 16.0) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 31) {
      if (WIEGHT < 10.0) {
        idx = 4
      } else if (WIEGHT < 10.8) {
        idx = 3
      } else if (WIEGHT < 15.5) {
        idx = 2
      } else if (WIEGHT < 16.3) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 32) {
      if (WIEGHT < 10.1) {
        idx = 4
      } else if (WIEGHT < 10.9) {
        idx = 3
      } else if (WIEGHT < 15.7) {
        idx = 2
      } else if (WIEGHT < 16.5) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 33) {
      if (WIEGHT < 10.3) {
        idx = 4
      } else if (WIEGHT < 11.1) {
        idx = 3
      } else if (WIEGHT < 16.0) {
        idx = 2
      } else if (WIEGHT < 16.7) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 34) {
      if (WIEGHT < 10.5) {
        idx = 4
      } else if (WIEGHT < 11.2) {
        idx = 3
      } else if (WIEGHT < 16.2) {
        idx = 2
      } else if (WIEGHT < 17.0) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 35) {
      if (WIEGHT < 10.6) {
        idx = 4
      } else if (WIEGHT < 11.4) {
        idx = 3
      } else if (WIEGHT < 16.5) {
        idx = 2
      } else if (WIEGHT < 17.3) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 36) {
      if (WIEGHT < 10.7) {
        idx = 4
      } else if (WIEGHT < 11.5) {
        idx = 3
      } else if (WIEGHT < 16.6) {
        idx = 2
      } else if (WIEGHT < 17.5) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 37) {
      if (WIEGHT < 10.9) {
        idx = 4
      } else if (WIEGHT < 11.7) {
        idx = 3
      } else if (WIEGHT < 16.9) {
        idx = 2
      } else if (WIEGHT < 17.8) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 38) {
      if (WIEGHT < 11.0) {
        idx = 4
      } else if (WIEGHT < 11.8) {
        idx = 3
      } else if (WIEGHT < 17.1) {
        idx = 2
      } else if (WIEGHT < 18.0) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 39) {
      if (WIEGHT < 11.1) {
        idx = 4
      } else if (WIEGHT < 11.9) {
        idx = 3
      } else if (WIEGHT < 17.4) {
        idx = 2
      } else if (WIEGHT < 18.3) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 40) {
      if (WIEGHT < 11.2) {
        idx = 4
      } else if (WIEGHT < 12.0) {
        idx = 3
      } else if (WIEGHT < 17.6) {
        idx = 2
      } else if (WIEGHT < 18.5) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 41) {
      if (WIEGHT < 11.4) {
        idx = 4
      } else if (WIEGHT < 12.2) {
        idx = 3
      } else if (WIEGHT < 17.8) {
        idx = 2
      } else if (WIEGHT < 18.5) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 42) {
      if (WIEGHT < 11.5) {
        idx = 4
      } else if (WIEGHT < 12.3) {
        idx = 3
      } else if (WIEGHT < 18.0) {
        idx = 2
      } else if (WIEGHT < 19.0) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 43) {
      if (WIEGHT < 11.6) {
        idx = 4
      } else if (WIEGHT < 12.4) {
        idx = 3
      } else if (WIEGHT < 18.2) {
        idx = 2
      } else if (WIEGHT < 19.2) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 44) {
      if (WIEGHT < 11.7) {
        idx = 4
      } else if (WIEGHT < 12.6) {
        idx = 3
      } else if (WIEGHT < 18.5) {
        idx = 2
      } else if (WIEGHT < 19.6) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 45) {
      if (WIEGHT < 11.8) {
        idx = 4
      } else if (WIEGHT < 12.7) {
        idx = 3
      } else if (WIEGHT < 18.7) {
        idx = 2
      } else if (WIEGHT < 19.8) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 46) {
      if (WIEGHT < 11.9) {
        idx = 4
      } else if (WIEGHT < 12.8) {
        idx = 3
      } else if (WIEGHT < 18.8) {
        idx = 2
      } else if (WIEGHT < 20.0) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 47) {
      if (WIEGHT < 12.0) {
        idx = 4
      } else if (WIEGHT < 12.9) {
        idx = 3
      } else if (WIEGHT < 19.0) {
        idx = 2
      } else if (WIEGHT < 20.2) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 48) {
      if (WIEGHT < 12.1) {
        idx = 4
      } else if (WIEGHT < 13.0) {
        idx = 3
      } else if (WIEGHT < 19.3) {
        idx = 2
      } else if (WIEGHT < 20.5) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 49) {
      if (WIEGHT < 12.2) {
        idx = 4
      } else if (WIEGHT < 13.1) {
        idx = 3
      } else if (WIEGHT < 19.5) {
        idx = 2
      } else if (WIEGHT < 20.7) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 50) {
      if (WIEGHT < 12.3) {
        idx = 4
      } else if (WIEGHT < 13.2) {
        idx = 3
      } else if (WIEGHT < 19.7) {
        idx = 2
      } else if (WIEGHT < 20.9) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 51) {
      if (WIEGHT < 12.4) {
        idx = 4
      } else if (WIEGHT < 13.3) {
        idx = 3
      } else if (WIEGHT < 19.9) {
        idx = 2
      } else if (WIEGHT < 21.1) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 52) {
      if (WIEGHT < 12.6) {
        idx = 4
      } else if (WIEGHT < 13.5) {
        idx = 3
      } else if (WIEGHT < 20.0) {
        idx = 2
      } else if (WIEGHT < 21.3) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 53) {
      if (WIEGHT < 12.7) {
        idx = 4
      } else if (WIEGHT < 13.6) {
        idx = 3
      } else if (WIEGHT < 20.3) {
        idx = 2
      } else if (WIEGHT < 21.6) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 54) {
      if (WIEGHT < 12.8) {
        idx = 4
      } else if (WIEGHT < 13.7) {
        idx = 3
      } else if (WIEGHT < 20.4) {
        idx = 2
      } else if (WIEGHT < 21.7) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 55) {
      if (WIEGHT < 12.9) {
        idx = 4
      } else if (WIEGHT < 13.8) {
        idx = 3
      } else if (WIEGHT < 20.6) {
        idx = 2
      } else if (WIEGHT < 21.9) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 56) {
      if (WIEGHT < 13.0) {
        idx = 4
      } else if (WIEGHT < 13.9) {
        idx = 3
      } else if (WIEGHT < 20.8) {
        idx = 2
      } else if (WIEGHT < 22.1) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 57) {
      if (WIEGHT < 13.1) {
        idx = 4
      } else if (WIEGHT < 14.0) {
        idx = 3
      } else if (WIEGHT < 21.1) {
        idx = 2
      } else if (WIEGHT < 22.4) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 58) {
      if (WIEGHT < 13.2) {
        idx = 4
      } else if (WIEGHT < 14.1) {
        idx = 3
      } else if (WIEGHT < 21.3) {
        idx = 2
      } else if (WIEGHT < 22.6) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 59) {
      if (WIEGHT < 13.2) {
        idx = 4
      } else if (WIEGHT < 14.1) {
        idx = 3
      } else if (WIEGHT < 21.3) {
        idx = 2
      } else if (WIEGHT < 22.6) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 60) {
      if (WIEGHT < 13.5) {
        idx = 4
      } else if (WIEGHT < 14.4) {
        idx = 3
      } else if (WIEGHT < 21.8) {
        idx = 2
      } else if (WIEGHT < 23.6) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 61) {
      if (WIEGHT < 13.6) {
        idx = 4
      } else if (WIEGHT < 14.5) {
        idx = 3
      } else if (WIEGHT < 22.1) {
        idx = 2
      } else if (WIEGHT < 23.6) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 62) {
      if (WIEGHT < 13.7) {
        idx = 4
      } else if (WIEGHT < 14.7) {
        idx = 3
      } else if (WIEGHT < 22.3) {
        idx = 2
      } else if (WIEGHT < 23.9) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 63) {
      if (WIEGHT < 13.9) {
        idx = 4
      } else if (WIEGHT < 14.9) {
        idx = 3
      } else if (WIEGHT < 22.6) {
        idx = 2
      } else if (WIEGHT < 24.2) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 64) {
      if (WIEGHT < 14.0) {
        idx = 4
      } else if (WIEGHT < 15.0) {
        idx = 3
      } else if (WIEGHT < 22.8) {
        idx = 2
      } else if (WIEGHT < 24.4) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 65) {
      if (WIEGHT < 14.2) {
        idx = 4
      } else if (WIEGHT < 15.2) {
        idx = 3
      } else if (WIEGHT < 23.1) {
        idx = 2
      } else if (WIEGHT < 24.7) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 66) {
      if (WIEGHT < 14.3) {
        idx = 4
      } else if (WIEGHT < 15.3) {
        idx = 3
      } else if (WIEGHT < 23.4) {
        idx = 2
      } else if (WIEGHT < 25.0) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 67) {
      if (WIEGHT < 14.4) {
        idx = 4
      } else if (WIEGHT < 15.4) {
        idx = 3
      } else if (WIEGHT < 23.6) {
        idx = 2
      } else if (WIEGHT < 25.3) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 68) {
      if (WIEGHT < 14.6) {
        idx = 4
      } else if (WIEGHT < 15.6) {
        idx = 3
      } else if (WIEGHT < 23.9) {
        idx = 2
      } else if (WIEGHT < 25.6) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 69) {
      if (WIEGHT < 14.6) {
        idx = 4
      } else if (WIEGHT < 15.7) {
        idx = 3
      } else if (WIEGHT < 24.1) {
        idx = 2
      } else if (WIEGHT < 25.8) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 70) {
      if (WIEGHT < 14.9) {
        idx = 4
      } else if (WIEGHT < 15.9) {
        idx = 3
      } else if (WIEGHT < 24.3) {
        idx = 2
      } else if (WIEGHT < 26.0) {
        idx = 1
      } else {
        idx = 0
      }
    } else if (AGEMONTH === 71) {
      if (WIEGHT < 14.9) {
        idx = 4
      } else if (WIEGHT < 16.0) {
        idx = 3
      } else if (WIEGHT < 24.6) {
        idx = 2
      } else if (WIEGHT < 26.6) {
        idx = 1
      } else {
        idx = 0
      }
    } else {
      if (WIEGHT < 15.0) {
        idx = 4
      } else if (WIEGHT < 16.1) {
        idx = 3
      } else if (WIEGHT < 24.8) {
        idx = 2
      } else if (WIEGHT < 26.5) {
        idx = 1
      } else {
        idx = 0
      }
    }
  }

  if (idx === 4) {
    return '12'
  } else if (idx === 3) {
    return '11'
  } else if (idx === 2) {
    return '10'
  } else if (idx === 1) {
    return '09'
  } else {
    return '08'
  }
}