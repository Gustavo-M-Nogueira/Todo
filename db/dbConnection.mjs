import mongoose from 'mongoose';

const dbConnection = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/todo');
    console.log('Connected to Database');
  } catch (err) {
    console.error('Error connecting to database:', err);
    process.exit(1);
  }
};

export default dbConnection;