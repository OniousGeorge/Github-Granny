import express from "express";

export const auth = (req: express.Request, res: express.Response, next: express.NextFunction) => {

const apiKey = req.headers['x-api-key'];

if(!apiKey || apiKey !== "myApiKey") {
    res.status(401).json({ message: 'Unauthorized' });
    return;
} else {
    next();
}
};


//add this as a param for a POST in server.ts