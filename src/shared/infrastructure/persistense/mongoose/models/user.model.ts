import { Document, Model, model, Schema } from "mongoose";

export interface IUserModel extends Document {
  uid: string;
  name: string;
  email: string;
  password: string;
}

const userSchema: Schema<IUserModel> = new Schema({
  uid: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const userModel: Model<IUserModel> = model<IUserModel>("Users", userSchema);

export default userModel;
