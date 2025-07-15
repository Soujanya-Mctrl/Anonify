import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
    content: string;
    createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
    content: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now }
});

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpry: Date;
    isVerified: boolean
    isAcceptingMsg: boolean;
    messages: Message[];
}

const UserSchema: Schema<User> = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, match: [/.+\@.+\..+/, 'Please use a valid email address.'] },
    password: {
        type: String,
        required: true,
        match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"],
        minlength: [8, "Password must be at least 8 characters long"],
        maxlength: [100, "Password must be at most 100 characters long"]
    },
    verifyCode: { type: String, required: true },
    verifyCodeExpry: { type: Date, required: true },
    isVerified: { type: Boolean, default: false },
    isAcceptingMsg: { type: Boolean, default: true },
    messages: { type: [MessageSchema], default: [] }
});

const UserModel = (mongoose.models.user as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema);

export default UserModel;