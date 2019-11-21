
export default class CommentModel {
    constructor({ comment, userId_own, offertId,id }) {
        this.comment = comment;
        this.userId_own = userId_own;
        this.offertId = offertId;
        this.id = id;
    }

    toObject() {
        return ({
            title: this.title,
            price: this.price,
            details: this.details
        })

    }

}