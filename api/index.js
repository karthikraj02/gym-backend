// api/index.js

import { connectToDatabase } from '../../lib/mongodb';

let cachedDb = null;

const handler = async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('your_collection_name');

        // Your logic here

        res.status(200).json({ message: 'Success!' });
    } catch (error) {
        console.error('Database connection error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export default handler;
