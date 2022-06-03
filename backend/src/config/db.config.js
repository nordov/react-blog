export const db = {
    mongoURI: process.env.mongoURI || "mongodb+srv://myblog:YbnBxevcqxMK6ZXU@cluster0.pak41.mongodb.net/?retryWrites=true&w=majority",
    secretOrKey: process.env.secretOrKey || 'secret',
}