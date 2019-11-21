
export default class UserModel {
    constructor({ name, email, id , avatar }) {
        this.name = name;
        this.email = email;
        this.id = id;
        this.avatar = avatar;
    }

    toObject() {
        return ({
            title: this.title,
            price: this.price,
            details: this.details
        })

    }

}