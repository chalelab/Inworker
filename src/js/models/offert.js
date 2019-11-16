
export default class OfertModel {
    constructor({ id, title, userId, status, date }) {
        this.id = id;
        this.title = title;
        this.userId = userId;
        this.status = status
        this.date = date;
    }

    toObject() {
        return ({
            id: this.id,
            title: this.title,
            userId: this.userId,
            status: this.status,
            date: this.date,
        })

    }

}