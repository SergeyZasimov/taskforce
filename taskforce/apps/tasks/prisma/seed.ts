import { PrismaClient, Status } from '@prisma/client';
import { faker } from '@faker-js/faker/locale/ru';

const prisma = new PrismaClient();

const MOCK_COUNT = 50;
const SUB_MOCK_COUNT = 5;

const customers = [
  'd93dd208cbc1ace5ad3c2fd7',
  'bbebcaf545aa5cede2b4dcb8',
  'be30ac0cecfd4c392f9de49e',
  'f975ddb603e0a1aad9c3a5ba',
  'cccddec92305fb6a8dcd91ec',
  '92edf4dd25254fd6fdbc8e84',
  '07aa3ec3caaabeb4e7afcacb',
  'f1bfb0141fda772e6ad7811e',
  '5a7c80cdd95e6ae705f55e16',
  'e2be58f2349474f3c8cc7eb1',
];

const contractors = [
  '9047b99ccaffbf9e3c8feeb6',
  'd42dd0be5ad9cfc23cce1b95',
  '1d4dbb5b9eacd8e3e45deeb0',
  '5cb2dfe2f2eefceceabfc945',
  '15c66672cfac89f3178389fb',
  'c78c1b8b091c3aee1aac8fe8',
  'bf6ef82ddb87a7ad19b1c75f',
  'edb8bce3b278b8cc98dddc2b',
  'dd447d27aa8b05fbca7c6b7b',
  'cb6e051969af6fee6af552df',
];

const categories: { title: string }[] = faker.helpers.uniqueArray(
  () => ({
    title: faker.commerce.department(),
  }),
  SUB_MOCK_COUNT
);

const tags: { title: string }[] = faker.helpers.uniqueArray(
  () => ({
    title: faker.lorem.word().toLowerCase(),
  }),
  SUB_MOCK_COUNT
);

const cities = ['Москва', 'Санкт-Петербург', 'Владивосток'];

async function fillDb() {
  categories.forEach(async (category, index) => {
    await prisma.category.upsert({
      where: { id: index },
      update: {
        title: category.title,
      },
      create: {
        title: category.title,
      },
    });
  });
  console.info('Categories were created');

  tags.forEach(async (tag, index) => {
    await prisma.tag.upsert({
      where: { id: index },
      update: {
        title: tag.title,
      },
      create: {
        title: tag.title,
      },
    });
  });
  console.info('Tags were created');

  const categoryIds = await prisma.category.findMany({ select: { id: true } });
  const tagIds = await prisma.tag.findMany({ select: { id: true } });

  for (let i = 1; i <= MOCK_COUNT; i++) {
    const status = Status[faker.helpers.arrayElement(Object.keys(Status))];

    const customerId = faker.helpers.arrayElement(customers);
    const contractorId =
      status !== Status.New && status !== Status.Cancel
        ? faker.helpers.arrayElement(contractors)
        : null;

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
        status,
        customerId,
        contractorId,
        address: `${faker.helpers.arrayElement(
          cities
        )} ${faker.address.streetAddress()}`,
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
                userId: faker.helpers.arrayElement(
                  [...customers, ...contractors].filter(
                    (id) => id !== customerId
                  )
                ),
              })
            ),
          },
        },
        feedbacks:
          status === Status.New
            ? {
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
                      contractorId: faker.helpers.arrayElement(contractors),
                    })
                  ),
                },
              }
            : undefined,
      },
    });

    if (status === Status.Complete) {
      faker.helpers.maybe(
        async () => {
          await prisma.review.create({
            data: {
              taskId: i,
              contractorId,
              customerId,
              text: faker.lorem.sentence(3),
              rating: faker.datatype.number({ min: 1, max: 5 }),
            },
          });
          console.info('Review was created');
        },
        { probability: 0.5 }
      );
    }
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
