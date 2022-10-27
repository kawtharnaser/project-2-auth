'use strict';

module.exports = {
   up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('products', [
      {
        productName: 'Frog Polka Mug',
        productPrice: 23,
        stock: 3,
        quantity: 0,
        productImg: 'https://i.pinimg.com/474x/11/c6/54/11c654d6d0103c8d4cd06daf4de55b4a.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productName: 'Rainbow Bowl',
        productPrice: 15,
        stock: 2,
        quantity: 0,
        productImg: 'https://i.pinimg.com/474x/c0/f4/fe/c0f4fee294199b289175a91a3760cb62.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productName: 'Cherries Bowl',
        productPrice: 8,
        stock: 2,
        quantity: 0,
        productImg: 'https://i.pinimg.com/474x/e8/33/6e/e8336edcb291806492296064e8013095.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productName: 'Be-Mine Spoon',
        productPrice: 5,
        stock: 2,
        quantity: 0,
        productImg: 'https://i.pinimg.com/564x/e9/e6/d8/e9e6d8343abf4945defa3a5c8af36c90.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productName: 'Classic Flower Mug',
        productPrice: 9,
        stock: 4,
        quantity: 0,
        productImg: 'https://i.pinimg.com/564x/8c/5a/c3/8c5ac3dbc4c1dfcf3ff21836fdac3e7a.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productName: 'Strawberry-Frog Couple ',
        productPrice: 12,
        stock: 1,
        quantity: 0,
        productImg: 'https://i.pinimg.com/564x/b6/42/0e/b6420e56a1382b292be9db250f93d13c.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productName: 'Cloud Tissue Box',
        productPrice: 13,
        stock: 1,
        quantity: 0,
        productImg: 'https://i.pinimg.com/564x/95/86/33/9586336f28407b6cbb427acd75ff1d5d.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productName: 'The Zoo Set',
        productPrice: 39,
        stock: 1,
        quantity: 0,
        productImg: 'https://i.pinimg.com/564x/51/34/8e/51348edd51a57a7e15c2967f7385b7e0.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productName: 'Cappucino Love Mug',
        productPrice: 10,
        stock: 4,
        quantity: 0,
        productImg: 'https://i.pinimg.com/564x/4c/ff/2e/4cff2ef415f9a2f0c4d87db6281f1c12.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ])
  },

   down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('products', null, {})
  }
};
