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
        public rememberPwd: string
    ) {}
}

export class VerifyData {
    constructor(
        public id: string,
        public result: string
    ) {}
}

export class eventData {
    constructor(
        eventId: number,
        reservationStartTime: string,
        reservationEndTime: string,
        username: string,
        clientname: string,
        consumeType: string,
        treatment: string,
        cmslime: string,
        consultant: string,
        instrumentCheck: string,
        nurse: string,
        remark: string,
        createDate: string,
        createTime: string,
        lastDate: string,
        lastTime: string
    ) {}
}