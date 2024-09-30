export class WebSocketMessage {
    constructor(
        public mode: string,
        public message: string,
        public time: string,
    ) {}
}

export class User {
    constructor(
        public userId: string,
        public username: string,
        public email: string,
        public department: string,
        public level: string,
        public rememberPwd: string,
        public sendEmail: string
    ) {}
}

export class VerifyData {
    constructor(
        public id: string,
        public result: string
    ) {}
}

export class ColorType {
    constructor(
        public label: string,
        public value: string,
        public textColor: string
    ) {}
}

export class EventData {

    public eventId: number;
    public reservationDate: string;
    public reservationStartTime: string;
    public reservationEndTime: string;
    public username: string;
    public clientname: string;
    public consumeType: string;
    public treatment: string;
    public cmslime: string;
    public consultant: string;
    public instrumentCheck: string;
    public doctor: string;
    public nurse: string;
    public remark: string;
    public createDate: string;
    public createTime: string;
    public lastDate: string;
    public lastTime: string;
    public backgroundColor: string;
    public status: string;
    

    constructor(
        reservationDate: string,
        reservationStartTime: string,
        reservationEndTime: string
    ) {
        this.reservationDate = reservationDate;
        this.reservationStartTime = reservationStartTime;
        this.reservationEndTime = reservationEndTime;
        this.backgroundColor = ''
    }
}