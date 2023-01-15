import { PrismaClient, Status } from '@prisma/client';
import { faker } from '@faker-js/faker/locale/ru';

const prisma = new PrismaClient();

const MOCK_COUNT = 50;
const SUB_MOCK_COUNT = 5;

const customers = [
  'cb63c5422d98c9d365de5f2e',
  '8efaeb738c20cd6da800db51',
  'c95e343e0253f47daeda7e1f',
  'b3fba0ac911d5fcb0cf9d3cf',
  'eba2c7ce3b879ea9cf2dfefd',
  'baeae284cade5eebec8e109b',
  '7ad2b8a025c517dfcf5c4ccb',
  '10332c144025e1beac4d413c',
  'f0aaacafa86eeeb7eddf6e38',
  'ed0ecdaff0b3a7a0f5bcabf5',
];

const contractors = [
  '3fd83f9067dfdeba8688bbae',
  'a89eb8d22cb2bdb4a8aa7f5b',
  '52e59a5fa464c2dddb35ddfb',
  'f5d50d7a7bf111cdaa50ad97',
  'fedaebef0bba13a767c0e3ad',
  '56b40ccec41bf44fa36b4cfa',
  'ca182c1fb29f58e398a14e35',
  'bf5efe7ad6a73ddace20394b',
  '717e4c4ed58a3cad88fd2d4e',
  'ba2d1230a22d98fabe91cee7',
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
