import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Order from '../models/Order.js';

dotenv.config();

const migrateOrders = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for Migration');

    const orders = await Order.find({});
    console.log(`Found ${orders.length} orders to inspect.`);

    let updatedCount = 0;

    for (const order of orders) {
      let needsUpdate = false;

      // 1. Convert amt to Number if it's a String
      if (typeof order.amt === 'string') {
        const cleanAmt = order.amt.replace(/[^0-9.-]+/g,"");
        const numericAmt = parseFloat(cleanAmt);
        if (!isNaN(numericAmt)) {
          order.amt = numericAmt;
          needsUpdate = true;
        }
      }

      // 2. Convert date to Date object if it's a String
      if (typeof order.date === 'string') {
        const parsedDate = new Date(order.date);
        if (!isNaN(parsedDate.getTime())) {
          order.date = parsedDate;
          needsUpdate = true;
        }
      }
      
      // 3. Initialize items array if missing
      if (!order.items) {
        order.items = [];
        needsUpdate = true;
      }

      if (needsUpdate) {
        await order.save();
        updatedCount++;
      }
    }

    console.log(`Migration completed successfully. Updated ${updatedCount} orders.`);
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
};

migrateOrders();
