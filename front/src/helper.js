import jMoment from "moment-jalaali"

const ad_to_jalali = (ad, time = false) => {
    if (time) {
        return jMoment(ad, 'YYYY-MM-DD HH:mm:ss').format('HH:mm:ss - jYYYY/jMM/jDD')
    } else {
        return jMoment(ad, 'YYYY-MM-DD HH:mm:ss').format('jYYYY/jMM/jDD')
    }
}

export { ad_to_jalali }