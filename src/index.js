function filterAndSortProducts(products, criteria) {
  const filteredProducts = products
    .filter((product) => {
      if ('categories' in criteria && criteria.categories.length > 0) {
        return criteria.categories.includes(product.category);
      }
      return true;
    })
    .filter((product) => {
      if ('priceRange' in criteria && criteria.priceRange) {
        return (
          criteria.priceRange.min <= product.price &&
          criteria.priceRange.max >= product.price
        );
      }
      return true;
    })
    .filter((product) => {
      if ('nameLength' in criteria && criteria.nameLength) {
        return (
          criteria.nameLength.min <= product.name.length &&
          criteria.nameLength.max >= product.name.length
        );
      }
      return true;
    })
    .filter((product) => {
      if ('keywords' in criteria && criteria.keywords.length > 0) {
        return (
          criteria.keywords
            .map((keyword) => product.name.includes(keyword))
            .reduce((prev, next) => prev + next, 0) > 0
        );
      }
      return true;
    });

  if ('sortBy' in criteria) {
    criteria.sortBy.forEach((sort) => {
      filteredProducts.sort((item1, item2) => {
        if (sort.order === 'ascending') {
          if (item1[sort.field] < item2[sort.field]) return -1;
          if (item1[sort.field] > item2[sort.field]) return 1;
          return 0;
        }
        if (sort.order === 'descending') {
          if (item1[sort.field] < item2[sort.field]) return 1;
          if (item1[sort.field] > item2[sort.field]) return -1;
          return 0;
        }
      });
    });
  }

  console.log(filteredProducts);
  return filteredProducts;
}

const products = [
  { id: 1, name: 'Apple iPhone 12', category: 'Electronics', price: 999 },
  { id: 2, name: 'Adidas running shoes', category: 'Sportswear', price: 280 },
  { id: 3, name: 'Samsung Galaxy S21', category: 'Electronics', price: 850 },
  { id: 4, name: 'Nike Air Max', category: 'Sportswear', price: 300 },
];

const criteria = {
  categories: ["Electronics", "Sportswear"],
  priceRange: { min: 200, max: 1000 },
  nameLength: { min: 10, max: 25 },
  keywords: ["Galaxy", "Air"],
  sortBy: [
    { field: 'price', order: 'ascending' },
    { field: "name", order: "descending" }
  ],
};

filterAndSortProducts(products, criteria);
module.exports = { filterAndSortProducts };
