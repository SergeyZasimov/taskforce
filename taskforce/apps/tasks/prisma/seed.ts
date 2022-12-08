import { PrismaClient, Status } from '@prisma/client';
import { faker } from '@faker-js/faker/locale/ru';

const prisma = new PrismaClient();

const MOCK_COUNT = 10;
const SUB_MOCK_COUNT = 5;

const userIds = faker.helpers.uniqueArray(
  faker.database.mongodbObjectId,
  MOCK_COUNT
);

const categories: { title: string }[] = faker.helpers.uniqueArray(
  () => ({
    title: faker.commerce.department(),
  }),
  SUB_MOCK_COUNT
);

const tags: { title: string }[] = faker.helpers.uniqueArray(
  () => ({
    title: faker.lorem.word(),
  }),
  SUB_MOCK_COUNT
);

const cities = ['Москва', 'Санкт-Петербург', 'Владивосток'];

const addresses: { city: string; address: string }[] =
  faker.helpers.uniqueArray(
    () => ({
      city: faker.helpers.arrayElement(cities),
      address: faker.address.streetAddress(),
    }),
    SUB_MOCK_COUNT
  );

async function fillDb() {
  await prisma.category.createMany({
    data: categories,
  });
  console.info('Categories were created');

  await prisma.tag.createMany({
    data: tags,
  });
  console.info('Tags were created');

  await prisma.address.createMany({
    data: addresses,
  });
  console.info('Addresses were created');

  const categoryIds = await prisma.category.findMany({ select: { id: true } });
  const tagIds = await prisma.tag.findMany({ select: { id: true } });
  const addressIds = await prisma.address.findMany({ select: { id: true } });

  for (let i = 1; i <= MOCK_COUNT; i++) {
    const currentUserIds = faker.helpers.shuffle(userIds);

    await prisma.task.upsert({
      where: { id: i },
      update: {},
      create: {
        title: faker.lorem.words(),
        description: faker.lorem.paragraph(),
        category: {
          connect: faker.helpers.arrayElement(categoryIds),
        },
        image: faker.helpers.maybe(() => faker.image.imageUrl(), {
          probability: 0.5,
        }),
        status: faker.helpers.maybe(
          () => Status[faker.helpers.arrayElement(Object.keys(Status))],
          { probability: 0.7 }
        ),
        userId: currentUserIds[0],
        address: {
          connect: faker.helpers.arrayElement(addressIds),
        },
        executionTerm: faker.helpers.maybe(() => faker.date.soon(5), {
          probability: 0.3,
        }),
        price: faker.helpers.maybe(() => Number(faker.commerce.price()), {
          probability: 0.7,
        }),
        tags: {
          connect: faker.helpers.arrayElements(tagIds),
        },
        comments: {
          createMany: {
            data: Array.from(
              { length: Number(faker.random.numeric()) },
              () => ({
                text: faker.lorem.sentence(),
                userId: faker.helpers.arrayElement(currentUserIds.slice(1)),
              })
            ),
          },
        },
        feedbacks: {
          createMany: {
            data: Array.from(
              { length: Number(faker.random.numeric()) },
              () => ({
                text: faker.lorem.sentence(),
                price: faker.helpers.maybe(
                  () => Number(faker.commerce.price()),
                  {
                    probability: 0.7,
                  }
                ),
                userId: faker.helpers.arrayElement(currentUserIds.slice(1)),
              })
            ),
          },
        },
      },
    });
  }
  console.info('Tasks were created');
}

fillDb()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.log(err);
    await prisma.$disconnect;
    process.exit(1);
  });
