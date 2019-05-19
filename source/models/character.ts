import mongoose from "mongoose";

export type CharacterDocument = mongoose.Document & {
    name: string,
    ident: number,
    class: string,
    description: string,
    slug: string,
    avatar: Buffer,
};

const characterSchema = new mongoose.Schema({
    name: String,
    ident: Number,
    class: String,
    description: String,
    slug: String,
    avatar: Buffer,
});

export const Character = mongoose.model<CharacterDocument>("Character", characterSchema);