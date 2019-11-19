
export default class OfertModel {
    constructor({ id, title, userId, active, date, price, details }) {
        this.id = id;
        this.title = title;
        this.userId = userId;
        this.active = active;
        this.date = date;
        this.price = price;
        this.details = details;
    }

    toObject() {
        return ({
            title: this.title,
            price: this.price,
            details: this.details
        })

    }

}