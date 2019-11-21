
export default class ServiceModel {
    constructor({ userId_own, user_guest, title = '', active = true, id = '', price = '' }) {
        this.id = id;
        this.title = title
        this.userId_own = userId_own;
        this.user_guest = user_guest;
        this.active = active
        this.price = price;
    }

    toObject() {
        return ({

        })

    }

}