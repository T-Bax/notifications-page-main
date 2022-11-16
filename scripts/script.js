const notifications = [
    {
        noun: "Mark Webber",
        verb: "reacted to your recent post",
        subject: "My first tournament day!",
        read: false,
        timestamp: new Date(2022,11,13,15,20)
    }
];

const epochToMinutes = (epoch) => {
    const yrs = Math.floor(epoch/60000);
    return yrs;
}
const epochToMonths = (epoch) => {
    const yrs = Math.floor(epoch/2629743000);
    return yrs;
}
const epochToHours = (epoch) => {
    const yrs = Math.floor(epoch/3600000);
    return yrs;
}
const epochToDays = (epoch) => {
    const yrs = Math.floor(epoch/86400000);
    return yrs;
}
const epochToWeeks = (epoch) => {
    const yrs = Math.floor(epoch/604800000);
    return yrs;
}
const epochToYears = (epoch) => {
    const yrs = Math.floor(epoch/31556926000);
    return yrs;
}

const convertFromEpoch = (epoch) => {
    switch(true){
        case epoch > 31556926000: 
            return epochToYears(epoch)
        case epoch > 2629743000: 
            return epochToMonths(epoch)
        case epoch > 604800000: 
            return epochToWeeks(epoch)
        case epoch > 86400000: 
            return epochToDays(epoch)
        case epoch > 3600000: 
            return epochToHours(epoch)
        default: 
            return epochToMinutes(epoch)
        
    }

}




const d = new Date("2022-02-15").getTime();
const e = new Date("2022-03-26").getTime();

let a = (Date.now());
let b = notifications[0].timestamp.getTime();

console.log(d,e)
let dif = e - d
console.log(dif);
console.log(convertFromEpoch(dif))