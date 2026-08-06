const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const main = async () => {
  try {
    // Clear existing data
    await prisma.diaryEntry.deleteMany();
    await prisma.user.deleteMany();

    console.log("Existing data cleared");


    // Create users first
    const john = await prisma.user.create({
      data: {
        username: "John",
        email: "john@gmail.com",
        password: "john"
      }
    });

    const doe = await prisma.user.create({
      data: {
        username: "Doe",
        email: "doe@gmail.com",
        password: "doe"
      }
    });

    const alex = await prisma.user.create({
      data: {
        username: "Alex",
        email: "alex@gmail.com",
        password: "alex"
      }
    });

    const bob = await prisma.user.create({
      data: {
        username: "Bob",
        email: "bob@gmail.com",
        password: "bob"
      }
    });

    const bobo = await prisma.user.create({
      data: {
        username: "Bobo",
        email: "bobo@gmail.com",
        password: "bobo"
      }
    });


    console.log("Users created");


    // Create diary entries
    const diaryEntries = [
      {
        title: "Learning backend concepts",
        transcript: "Studied how authentication systems work in backend applications.",
        category: "LEARNING",
        isFavorite: true,
        userId: john.id
      },

      {
        title: "Team discussion",
        transcript: "Discussed project requirements and assigned responsibilities.",
        category: "MEETING",
        isFavorite: false,
        userId: doe.id
      },

      {
        title: "Implemented search feature",
        transcript: "Added filtering functionality for diary records.",
        category: "TASKS",
        isFavorite: true,
        userId: alex.id
      },

      {
        title: "Database learning",
        transcript: "Explored different approaches for storing application data.",
        category: "LEARNING",
        isFavorite: false,
        userId: bob.id
      },

      {
        title: "Project meeting",
        transcript: "Reviewed current progress and discussed upcoming milestones.",
        category: "MEETING",
        isFavorite: true,
        userId: bobo.id
      },

      {
        title: "Fix user interface issue",
        transcript: "Resolved layout problems and improved user experience.",
        category: "TASKS",
        isFavorite: true,
        userId: bobo.id
      }
    ];


    for (const entry of diaryEntries) {
      await prisma.diaryEntry.create({
        data: entry
      });
    }


    console.log("Diary entries created successfully");

  } catch (error) {
    console.error("Seeding failed:", error);

  } finally {
    await prisma.$disconnect();
  }
};


main();