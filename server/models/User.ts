import { defineMongooseModel } from '#nuxt/mongoose'
import bcrypt from "bcrypt";

export default defineMongooseModel({
    name: "User",
    schema: {
        name: {
            type: 'string',
            required: true
        },
        email: {
            type: 'string',
            required: true,
            unique: true
        },
        password: {
            type: 'string',
            required: true
        }
    },
    hooks(schema) {
        schema.pre("save", async function(next){
            if(!this.isModified("password")) return next();
            this.password = await bcrypt.hash(this.password, 10);
            next();
        })
        schema.methods.comparePassword = async function(enteredPassword: string) {
            return await bcrypt.compare(enteredPassword, this.password);
        }
    },
    options: {
        timestamps: true
    }
});