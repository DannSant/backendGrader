const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let rolesValidos = {
    values: ["USER_ROLE", "ADMIN_ROLE"],
    message: "{VALUE} no es un rol valido"
};

let userSchema = new Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es necesario"]
    },
    email: {
        type: String,
        required: [true, "El correo es necesario"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "El password es necesario"]
    },
    img: {
        type: String,
        required: false
    },
    rol: {
        type: String,
        default: "USER_ROLE",
        enum: rolesValidos
    },
    status: {
        type: Boolean,
        default: true
    }
});

userSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

userSchema.plugin(uniqueValidator, {
    message: "{PATH} debe de ser unico"
});

module.exports = mongoose.model("User", userSchema);
