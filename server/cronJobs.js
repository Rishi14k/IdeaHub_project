// const cron = require('node-cron');
// const Idea = require('./models/Idea'); // adjust the path if needed

// // This will run every Sunday at 11:59 PM
// cron.schedule('59 23 * * 0', async () => {
//   try {
//     console.log('Running weekly badge job...');

//     // Step 1: Find top liked ideas (this week)
//     // Here, you can adjust the timeframe if needed
//     const topIdeas = await Idea.find({})
//       .sort({ like: -1 })   // sort by most likes
//       .limit(3);            // top 3 ideas (you can change to 1, 5, etc.)

//     // Step 2: Reset previous badges
//     await Idea.updateMany({ badgeWinner: true }, { badgeWinner: false });

//     // Step 3: Set badgeWinner true for top ideas
//     for (const idea of topIdeas) {
//       idea.badgeWinner = true;
//       await idea.save();
//     }

//     console.log('Badge winners updated successfully!');
//   } catch (error) {
//     console.error('Error in badge cron job:', error.message);
//   }
// });




const cron = require('node-cron');
const Idea = require('./models/Idea');
const mongoose = require('mongoose');

// Run every Sunday at 11:59 PM
cron.schedule('59 23 * * 0', async () => {
  try {
    console.log('🏆 Weekly badge job running...');

    // Step 1: Calculate start of current week (Sunday)
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay()); // Sunday
    startOfWeek.setHours(0, 0, 0, 0);

    // Step 2: Find ideas created during the current week
    const weeklyIdeas = await Idea.find({
      createdAt: { $gte: startOfWeek },
    });

    if (weeklyIdeas.length === 0) {
      console.log('No ideas this week to consider for badge.');
      return;
    }

    // Step 3: Sort by like count and pick top 3 (or top 1)
    const topIdeas = weeklyIdeas
      .sort((a, b) => b.like.length - a.like.length) // in-memory sort
      .slice(0, 3); // top 3 ideas

    // Step 4: Reset all badgeWinners
    await Idea.updateMany({ badgeWinner: true }, { badgeWinner: false });

    // Step 5: Mark new winners
    for (const idea of topIdeas) {
      idea.badgeWinner = true;
      await idea.save();
    }

    console.log('🏅 Badge winners updated for this week.');
  } catch (err) {
    console.error('❌ Error in badge cron job:', err.message);
  }
});
