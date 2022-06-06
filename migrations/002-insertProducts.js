const products = [
  {
    product_slug: 'shoe',
    product_name: 'Shoe',
    product_imgpath: '/Images/Schuhe_ecommerce.jpg',
    product_price: 10,
    product_description: 'Just a single shoe if you have two feet buy two :)',
    product_keywords: 'one',
  },
  {
    product_slug: 'cool-item-2',
    product_name: 'Cool Item 2',
    product_imgpath:
      'https://hinacreates.com/wp-content/uploads/2021/06/dummy2.png',
    product_price: 20,
    product_description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.',
    product_keywords: 'two',
  },
  {
    product_slug: 'cool-item-3',
    product_name: 'Cool Item 3',
    product_imgpath:
      'https://hinacreates.com/wp-content/uploads/2021/06/dummy2.png',
    product_price: 30,
    product_description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.',
    product_keywords: 'three',
  },
  {
    product_slug: 'cool-item-4',
    product_name: 'Cool Item 4',
    product_imgpath:
      'https://hinacreates.com/wp-content/uploads/2021/06/dummy2.png',
    product_price: 40,
    product_description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.',
    product_keywords: 'four',
  },
  {
    product_slug: 'cool-item-5',
    product_name: 'Cool Item 5',
    product_imgpath:
      'https://hinacreates.com/wp-content/uploads/2021/06/dummy2.png',
    product_price: 50,
    product_description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.',
    product_keywords: 'five',
  },
  {
    product_slug: 'cool-item-6',
    product_name: 'Cool Item 6',
    product_imgpath:
      'https://hinacreates.com/wp-content/uploads/2021/06/dummy2.png',
    product_price: 60,
    product_description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.',
    product_keywords: 'six',
  },
  {
    product_slug: 'cool-item-7',
    product_name: 'Cool Item 7',
    product_imgpath:
      'https://hinacreates.com/wp-content/uploads/2021/06/dummy2.png',
    product_price: 70,
    product_description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.',
    product_keywords: 'seven',
  },
  {
    product_slug: 'cool-item-8',
    product_name: 'Cool Item 8',
    product_imgpath:
      'https://hinacreates.com/wp-content/uploads/2021/06/dummy2.png',
    product_price: 80,
    product_description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.',
    product_keywords: 'eight',
  },
  {
    product_slug: 'cool-item-9',
    product_name: 'Cool Item 9',
    product_imgpath:
      'https://hinacreates.com/wp-content/uploads/2021/06/dummy2.png',
    product_price: 90,
    product_description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.',
    product_keywords: 'nine',
  },
];

exports.up = async (sql) => {
  await sql`
    INSERT INTO products ${sql(
      products,
      'product_slug',
      'product_name',
      'product_imgpath',
      'product_price',
      'product_description',
      'product_keywords',
    )}
  `;
};

exports.down = async (sql) => {
  for (const product of products) {
    await sql`
      DELETE FROM
        products
      WHERE
				product_slug=${product.product_slug} AND
        product_name = ${product.product_name} AND
        product_imgpath = ${product.product_imgpath} AND
        product_price = ${product.product_price} AND
        product_description = ${product.product_description}
	`;
  }
};
