import { Request, Response } from "express";
import { Character, CharacterDocument } from "../models/character";
import slugify from "slugify";
import multer from "multer";

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

export let show = async (req: Request, res: Response) => {
    const query = {
        slug: req.body.slug
    }
    try {
        const characterEntry: CharacterDocument = await Character.findOne(query)
        if (characterEntry == null) {
            throw new Error("Character not found!")
        }
        const char = {
            name: characterEntry.name,
            ident: characterEntry.ident,
            class: characterEntry.class,
            description: characterEntry.description,
        }
        const title = `Detail for ${char.name}`
        res.render("detail", { title: title, char: char});
    }
    catch(err) {
        console.log(err.message)
        res.render("error", { message: err.message });
    }
};

export let uploadForm = async (req: Request, res: Response) => {
    res.render("upload", { title: "Create New Character" });
};

export let create = async (req: Request, res: Response) => {
    
};