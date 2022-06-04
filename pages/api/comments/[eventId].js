import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  const eventId = req.query.eventId;

  const client = await MongoClient.connect('mongodb+srv://harrie:0WPQTtlaSNMs22iH@cluster0.5t4ke.mongodb.net/cool-events?retryWrites=true&w=majority');

  if (req.method === 'POST') {
    const { email, name, text} = req.body;

    // add server-side validation

    if (!email.includes('@') || !name || name.trim() === '' || !text || text.trim() === '') {
      res.status(422).json({ message: 'Invalid Input...' });
      return;
    }
    const newComment = {
      email,
      name,
      text,
      eventId
    };
    
    const db = client.db();
    const result = await db.collection('comments').insertOne(newComment)

    console.log(result);

    newComment.id = result.insertedId;

    res.status(201).json({ message: 'Added comment.', comment: newComment });
  };

  if (req.method === 'GET') {
    const db = client.db();

    const documents = await db.collection('comments').find().sort({ _id: -1 }).toArray();
    res.status(200).json({ comments: documents });
  }

  client.close();
}

export default handler;