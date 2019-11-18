
export default class OfertModel {
    constructor({ id, title, userId, active, date, price }) {
        this.id = id;
        this.title = title;
        this.userId = userId;
        this.active = active;
        this.date = date;
        this.price = price;
    }

    toObject() {
        return ({
            // id: this.id,
            title: this.title,
            price: this.price
            // userId: this.userId,
            // status: this.status,
            // date: this.date,
        })

    }

}