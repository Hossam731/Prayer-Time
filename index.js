let city = document.getElementById("city");
let cityName = document.getElementById("city-name");
let currentdate = document.getElementById("current-date");
let prayerTimes = document.getElementById("prayer-times");
let cityAndcountry = {
    "cairo": "EGY",
    "riyadh": "SAU",
    "dubai": "ARE",
    "istanbul": "TUR",
    "makkah": "SAU"
}
for (let i = 0; i < Object.keys(cityAndcountry).length; i++) {
    city.innerHTML += `<option value="${Object.keys(cityAndcountry)[i]}">${Object.keys(cityAndcountry)[i]}</option>`
}
async function getPrayerTime() {
    time = new Date();;
    let date = `${time.getDate()}-${time.getMonth() + 1}-${time.getFullYear()}`
    url = `https://api.aladhan.com/v1/timingsByCity/${date}?city=${city.value}&country=${cityAndcountry[city.value]}&method=5&timezonestring=Africa/Cairo`
    let response = await axios.get(url);
    cityName.textContent = city.value
    currentdate.textContent = response.data.data.date.readable
    prayerTimes.innerHTML = `
    <tr>
        <td>الفجر</td>
        <td>${response.data.data.timings.Fajr}</td>
    </tr>
    <tr>
        <td>الظهر</td>
        <td>${response.data.data.timings.Dhuhr}</td>
    </tr>
    <tr>
        <td>العصر</td>
        <td>${response.data.data.timings.Asr}</td>
    </tr>
    <tr>
        <td>المغرب</td>
        <td>${response.data.data.timings.Maghrib}</td>
    </tr>
    <tr>
        <td>العشاء</td>
        <td>${response.data.data.timings.Isha}</td>
    </tr>
    `

}
city.onchange = getPrayerTime
