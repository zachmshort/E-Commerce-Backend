const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try { 
    const catData = await Category.findAll({
    include: [{ model: Product }],
  })
  .then((categories) => {
    res.json(categories);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).json(err);
  });
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const catId = await Category.findByPk(req.params.id, {
    include: [{ model: Product }],
  }); 
    if (!category) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }

    res.json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  };
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
  .then((category) => {
    res.status(201).json(category);
  })
  .catch((err) => {
    console.error(err);
    res.status(400).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: { id: req.params.id },
  })
  .then((category) => {
    if (!category[0]) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }
    res.json({ message: 'Category updated' });
  })
  .catch((err) => {
    console.error(err);
    res.status(400).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: { id: req.params.id },
  })
  .then((category) => {
    if (!category) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }
    res.json({ message: 'Category deleted' });
  })
  .catch((err) => {
    console.error(err);
    res.status(500).json(err);
  });
});

module.exports = router;
