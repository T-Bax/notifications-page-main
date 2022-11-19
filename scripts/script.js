
//Function to get a random date - used for dummy data
const getRandomDate = () => {
    const max = Date.now()
    const min = max - 31556926000
    const randomDate = new Date(Math.floor(Math.random() * (max - min) + min))
    return randomDate
}


//START Dummy User Data
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
//END Dummy User Data


//Class to work with Epoch time conversions and calculations
class Epoch{
    static epochToMinutes = (epoch) => {
        const mins = Math.floor(epoch/60000);
        return `${mins}m`;
    }
    static epochToMonths = (epoch) => {
        const mths = Math.floor(epoch/2629743000);
        const returnText = mths > 1 ? `${mths} months` : `${mths} month`
        return returnText;
    }
    static epochToHours = (epoch) => {
        const hrs = Math.floor(epoch/3600000);
        const returnText = hrs > 1 ? `${hrs} hours` : `${hrs} hour`
        return returnText;
    }
    static epochToDays = (epoch) => {
        const days = Math.floor(epoch/86400000);
        const returnText = days > 1 ? `${days} days` : `${days} day`
        return returnText;
    }
    static epochToWeeks = (epoch) => {
        const wks = Math.floor(epoch/604800000);
        const returnText = wks > 1 ? `${wks} weeks` : `${wks} week`
        return returnText;
    }
    static epochToYears = (epoch) => {
        const yrs = Math.floor(epoch/31556926000);
        const returnText = yrs > 1 ? `${yrs} years` : `${yrs} year`
        return returnText;
    }
    static convertFromEpoch = (epoch) => {
        switch(true){
            case epoch > 31556926000: 
                return this.epochToYears(epoch)
            case epoch > 2629743000: 
                return this.epochToMonths(epoch)
            case epoch > 604800000: 
                return this.epochToWeeks(epoch)
            case epoch > 86400000: 
                return this.epochToDays(epoch)
            case epoch > 3600000: 
                return this.epochToHours(epoch)
            default: 
                return this.epochToMinutes(epoch)   
        }
    }


    static getTimeElapsed(date){
        const a = date.getTime();
        const b = Date.now();

        const c = b - a;
        
        const value = this.convertFromEpoch(c);

        return value;
    }
}

//START Notification classes
class Notification {
    constructor(user, timestamp){
        this.user = user;
        this.read = false;
        this.timestamp = timestamp;
        this.id = Notification.idIncrementor
        Notification.idIncrementor++;
        this.createHTML();
        this.elapsedTimeSpan.innerText = `${Epoch.getTimeElapsed(timestamp)} ago`
        if(this.read === false)
            Notification.unreadMsgsCounter++;
        
    }
    static idIncrementor = 0;
    static unreadMsgsCounter = 0;
    notificationContainer;
    textSpan;
    subjectSpan;
    dotSpan;
    elapsedTimeSpan;
    rightContainer;


    markAsRead(){
        if(this.read === false){
            this.read = true;
            this.dotSpan.classList.toggle("hidden");
            this.notificationContainer.classList.toggle("read");
            Notification.unreadMsgsCounter--
            updateMsgCounter();
        }
    };
    notificationClicked(){
        this.markAsRead();
    };
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
        time.classList.add("timestamp");
        container.classList.add("notification");
        left.classList.add("left-section");
        right.classList.add("right-section");
        userSpan.classList.add("user");
        textSpan.classList.add("text");
        subjectSpan.classList.add("subject");
        dotSpan.classList.add("dot");
        img.setAttribute("alt", "avatar")
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
        
        this.rightContainer = right;
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
        this.subjectSpan.innerText = ` ${this.grpName}`;
    }
    
}
class PrivateMessage extends Notification {
    constructor(user, timestamp, msg){
        super(user, timestamp);
        this.msg = msg;
        this.text = " sent you a private message";
        this.textSpan.innerText = this.text;

        this.msgDiv = document.createElement("div");
        this.msgDiv.classList.add("message-container", "hidden");
        this.msgDiv.innerText = msg;
        this.rightContainer.appendChild(this.msgDiv)
        this.rightContainer.classList.add("flex-column");
        
    }
    

    notificationClicked(){
        super.notificationClicked();
        this.msgDiv.classList.toggle("hidden")
    }

   
    

}
class Comment extends Notification {
    constructor(user, timestamp, img){
        super(user, timestamp);
        this.img = img;
        this.text = " commented on your picture";
        this.textSpan.innerText = this.text;
        this.msgDiv = document.createElement("img");
        this.msgDiv.classList.add("comment-img");
        this.msgDiv.setAttribute("src", `./assets/images/${img}`)
        this.msgDiv.setAttribute("alt", img)
        
        this.rightContainer.appendChild(this.msgDiv)
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
//END Notification Classes

//Function used to control generation of dummy data
function getDummyNotifications(){
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
    notifications.sort((a,b) => b.timestamp - a.timestamp);

    return notifications;
}

//function to update Unread msg counter
function updateMsgCounter(){
    unreadMsgCounter.innerText = Notification.unreadMsgsCounter;
}

//INITIALIZATION Routine

//Set dynamic tag links
const unreadMsgCounter = document.querySelector(".unread-msg-counter")
const notificationsContainer = document.querySelector("#notificationContainer")
const markAll = document.querySelector(".mark-as-read")

//init notifications and populate HTML notification container
const notifications = getDummyNotifications();
notifications.forEach(n => notificationsContainer.appendChild(n.notificationContainer))

//refresh unread messages counter
updateMsgCounter();



//add event listeners
notifications.forEach( n => n.notificationContainer.addEventListener("click", function(){
    n.notificationClicked();
}))
markAll.addEventListener("click", function(){
    notifications.forEach(n => n.markAsRead())
    unreadMsgCounter.innerText = Notification.unreadMsgsCounter;
})

//end event listeners

//END INITIALIZATION






