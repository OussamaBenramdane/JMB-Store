import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Prod User',
    companyName: 'Lazarous',
    email: 'prod@example.com',
    password: bcrypt.hashSync('123456', 10),
    isProd: true,
    companyAddress: {
      address: '60 rue joachim du bellay',
      city: 'Angers',
      postalCode: '49100',
      country: 'France',
    },
    numSiret: 1254698,
  },
  {
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
