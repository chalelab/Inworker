
export default class CommentModel {
    constructor({ comment, userId_own, user_guest,date, price, details }) {
        this.comment = comment;
        this.userId_own = userId_own;
        this.user_guest = user_guest;
        this.date = date;
    }

    toObject() {
        return ({
            title: this.title,
            price: this.price,
            details: this.details
        })

    }

}