import { MongoClient } from 'mongodb';

async function connectDatabase() {
  const client = await MongoClient.connect(
    'mongodb+srv://harrie:0WPQTtlaSNMs22iH@cluster0.5t4ke.mongodb.net/cool-events?retryWrites=true&w=majority'
  );

  return client;
}

async function insertDocument(client, document) {
  const db = client.db();

  await db.collection('newsletter').insertOne(document);
}

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email address.' });
      return;
    }

    let client;

    try {
      client = await connectDatabase(); 
    } catch (error) {
      res.status(500).json({message: 'Connecting to database failed!'});
      return;
    }

    try {   
      await insertDocument(client, { email: userEmail })
      client.close();
    } catch (error) {
      res.status(500).json({message: 'Inserting data into database failed!'});
      return;
    }

  

    res.status(201).json({ message: 'Signed up!' });
  }
}

export default handler;