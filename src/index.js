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
          if (item1[sort.field] < item2[sort.field]) return 1;
          if (item1[sort.field] > item2[sort.field]) return -1;
          return 0;
        }
        if (sort.order === 'descending') {
          if (item1[sort.field] < item2[sort.field]) return -1;
          if (item1[sort.field] > item2[sort.field]) return 1;
          return 0;
        }
      });
    });
  }
  return filteredProducts;
}

module.exports = { filterAndSortProducts };
