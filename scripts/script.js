
const getRandomDate = () => {
    const max = Date.now()
    const min = max - 31556926000
    const randomDate = new Date(Math.floor(Math.random() * (max - min) + min))
    return randomDate
}



const users = [
    {
        id: 0,
        firstName: "Mark",
        lastName: "Webber",
        avatar: "avatar-mark-webber.webp"
    },
    {
        id: 1,
        firstName: "Angela",
        lastName: "Gray",
        avatar: "avatar-angela-gray.webp"
    },
    {
        id: 2,
        firstName: "Jacob",
        lastName: "Thompson",
        avatar: "avatar-jacob-thompson.webp"
    },
    {
        id: 3,
        firstName: "Rizky",
        lastName: "Hasanuddin",
        avatar: "avatar-rizky-hasanuddin.webp"
    },
    {
        id: 4,
        firstName: "Kimberley",
        lastName: "Smith",
        avatar: "avatar-kimberly-smith.webp"
    },
    {
        id: 5,
        firstName: "Nathan",
        lastName: "Peterson",
        avatar: "avatar-nathan-peterson.webp"
    },
    {
        id: 6,
        firstName: "Anna",
        lastName: "Kim",
        avatar: "avatar-anna-kim.webp"
    }


]


class Notification {
    constructor(user, timestamp){
        this.user = user;
        this.read = false;
        this.timestamp = ;
        this.id = Notification.idIncrementor
        Notification.idIncrementor++;
        this.createHTML();
        this.elapsedTimeSpan.innerText = "1m"
    }
    static idIncrementor = 0;
    
    notificationContainer;
    textSpan;
    subjectSpan;
    dotSpan;
    elapsedTimeSpan;
    createHTML(){
        const container = document.createElement("div");
        const left = document.createElement("div");
        const right = document.createElement("div");
        const p = document.createElement("p");
        const userSpan = document.createElement("span");
        const textSpan = document.createElement("span");
        const subjectSpan = document.createElement("span");
        const dotSpan = document.createElement("span");
        const img = document.createElement("img");
        const br = document.createElement("br");
        const time = document.createElement("span");
        container.classList.add("notification");
        left.classList.add("left-section");
        right.classList.add("right-section");
        userSpan.classList.add("user");
        textSpan.classList.add("text");
        subjectSpan.classList.add("subject");
        dotSpan.classList.add("dot");
        container.appendChild(left);
        container.appendChild(right);
        left.appendChild(img);
        right.appendChild(p);
        p.appendChild(userSpan);
        p.appendChild(textSpan);
        p.appendChild(subjectSpan);
        p.appendChild(dotSpan);
        p.appendChild(br);
        p.appendChild(time);
    

        container.setAttribute("id", "notification_" + this.id)
        img.setAttribute("src", "./assets/images/" + this.user.avatar)
        userSpan.innerText = `${this.user.firstName} ${this.user.lastName}`;
        dotSpan.innerText = " •";
        
        
        this.elapsedTimeSpan = time;
        this.textSpan = textSpan;
        this.notificationContainer = container;
        this.subjectSpan = subjectSpan;
        this.dotSpan = dotSpan;


    }
}

class Follow extends Notification {
    constructor(user, timestamp){
        super(user, timestamp);
        this.text = " followed you";
        this.textSpan.innerText = this.text;
    }
    
    
}
class PostReaction extends Notification {
    constructor(user, timestamp, postName){
        super(user, timestamp);
        this.postName = postName;
        this.text = " reacted to your recent post";
        this.textSpan.innerText = this.text;
        this.subjectSpan.innerText = ` ${this.postName}`;

    }
    
}
class Join extends Notification {
    constructor(user, timestamp, grpName){
        super(user, timestamp);
        this.grpName = grpName;
        this.text = " has joined your group";
        this.textSpan.innerText = this.text;
        this.subjectSpan.innerText = ` ${this.groupName}`;
    }
    
}
class PrivateMessage extends Notification {
    constructor(user, timestamp, msg){
        super(user, timestamp);
        this.msg = msg;
        this.text = " sent you a private message";
        this.textSpan.innerText = this.text;
    }
    

}
class Comment extends Notification {
    constructor(user, timestamp, img){
        super(user, timestamp);
        this.img = img;
        this.text = " commented on your picture";
        this.textSpan.innerText = this.text;
    }
    
}
class Leave extends Notification {
    constructor(user, timestamp, groupName){
        super(user, timestamp);
        this.groupName = groupName;
        this.text = " left the group";
        this.textSpan.innerText = this.text;
        this.subjectSpan.innerText = ` ${this.groupName}`;
    }
    
}


const notifications = [];

notifications.push(new PostReaction(
    users.find(u => u.id === 0),
    getRandomDate(),
    "My first tournament today!"
));
notifications.push(new Follow(
    users.find(u => u.id === 1),
    getRandomDate(),
));
notifications.push(new Join(
    users.find(u => u.id === 2),
    getRandomDate(),
    "Chess Club"
));
notifications.push(new PrivateMessage(
    users.find(u => u.id === 3),
    getRandomDate(),
    "Hello, thanks for setting up the Chess Club. \
I've been a member for a few weeks now and I'm already having lots of fun and improving my game."
));
notifications.push(new Comment(
    users.find(u => u.id === 4),
    getRandomDate(),
    "image-chess.webp"
));
notifications.push(new PostReaction(
    users.find(u => u.id === 5),
    getRandomDate(),
    "5 end-game strategies to increase your win rate"
));
notifications.push(new Leave(
    users.find(u => u.id === 6),
    getRandomDate(),
    "Chess Club"
));

notifications.sort((a,b) => a.timestamp - b.timestamp);





const epochToMinutes = (epoch) => {
    const mins = Math.floor(epoch/60000);
    return mins;
}
const epochToMonths = (epoch) => {
    const mths = Math.floor(epoch/2629743000);
    return mths;
}
const epochToHours = (epoch) => {
    const hrs = Math.floor(epoch/3600000);
    return hrs;
}
const epochToDays = (epoch) => {
    const days = Math.floor(epoch/86400000);
    return days;
}
const epochToWeeks = (epoch) => {
    const wks = Math.floor(epoch/604800000);
    return wks;
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

const notificationsContainer = document.querySelector("#notificationContainer")

notifications.forEach(n => notificationsContainer.appendChild(n.notificationContainer))
notifications.forEach(n => console.log(n.id));