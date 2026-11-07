export const customizationOptions = [
  {
    id: 'milk',
    name: 'Milk',
    img: '', // Category level image slot
    link: '', // Category level link slot
    options: [
      {
        id: 'foam',
        name: 'Foam',
        type: 'select',
        img: '', // Option level image slot
        link: '', // Option level link slot
        choices: ['Extra Foam', 'Foam', 'Light Foam', 'No Foam'],
        defaultValue: 'Foam'
      },
      {
        id: 'milk',
        name: 'Milk Choice',
        type: 'select',
        img: '',
        link: '',
        choices: ['2% Milk', 'Whole Milk', 'Nonfat Milk', 'Oatmilk', 'Almondmilk', 'Coconutmilk', 'Soy Milk', 'Cream (Half & Half)', 'Heavy Cream'],
        defaultValue: '2% Milk'
      },
      {
        id: 'milkTemp',
        name: 'Steamed Hot',
        type: 'select',
        img: '',
        link: '',
        choices: ['Warm', 'Steamed Hot', 'Extra Hot'],
        defaultValue: 'Steamed Hot'
      }
    ]
  },
  {
    id: 'espresso',
    name: 'Espresso & Shot Options',
    img: '',
    link: '',
    options: [
      {
        id: 'espressoRoast',
        name: 'Espresso Roast',
        type: 'select',
        img: '',
        link: '',
        choices: ['Signature Espresso Roast', 'Blonde Espresso Roast', 'Decaf Espresso Roast', '1/3 Decaf', '1/2 Decaf', '2/3 Decaf'],
        defaultValue: 'Signature Espresso Roast'
      },
      {
        id: 'ristrettoLongShot',
        name: 'Add Ristretto or Long Shot',
        type: 'select',
        img: '',
        link: '',
        choices: ['None', 'Ristretto', 'Long Shot'],
        defaultValue: 'None'
      },
      {
        id: 'shots',
        name: 'Shots',
        type: 'counter',
        img: '',
        link: '',
        min: 0,
        max: 12,
        defaultValue: 2,
        unit: 'shots'
      }
    ]
  },
  {
    id: 'flavors',
    name: 'Flavors',
    img: '',
    link: '',
    options: [
      // Consolidated "Add Sauces" select — matches what reference shows as first row
      {
        id: 'addSauces',
        name: 'Add Sauces',
        type: 'select',
        img: '',
        link: '',
        choices: ['None', 'Caramel Sauce', 'Dark Caramel Sauce', 'Mocha Sauce', 'White Chocolate Mocha Sauce'],
        defaultValue: 'None'
      },
      // Individual syrup pump counters
      {
        id: 'caramelSauce',
        name: 'Caramel Sauce',
        type: 'counter',
        img: '',
        link: '',
        min: 0,
        max: 12,
        defaultValue: 0,
        unit: 'pumps'
      },
      {
        id: 'darkCaramelSauce',
        name: 'Dark Caramel Sauce',
        type: 'counter',
        img: '',
        link: '',
        min: 0,
        max: 12,
        defaultValue: 0,
        unit: 'pumps'
      },
      {
        id: 'mochaSauce',
        name: 'Mocha Sauce',
        type: 'counter',
        img: '',
        link: '',
        min: 0,
        max: 12,
        defaultValue: 0,
        unit: 'pumps'
      },
      {
        id: 'whiteMochaSauce',
        name: 'White Chocolate Mocha Sauce',
        type: 'counter',
        img: '',
        link: '',
        min: 0,
        max: 12,
        defaultValue: 0,
        unit: 'pumps'
      },
      // Syrups
      {
        id: 'brownSugarSyrup',
        name: 'Brown Sugar Syrup',
        type: 'counter',
        img: '',
        link: '',
        min: 0,
        max: 12,
        defaultValue: 0,
        unit: 'pumps'
      },
      {
        id: 'caramelSyrup',
        name: 'Caramel Syrup',
        type: 'counter',
        img: '',
        link: '',
        min: 0,
        max: 12,
        defaultValue: 0,
        unit: 'pumps'
      },
      {
        id: 'classicSyrup',
        name: 'Classic Syrup',
        type: 'counter',
        img: '',
        link: '',
        min: 0,
        max: 12,
        defaultValue: 0,
        unit: 'pumps'
      },
      {
        id: 'hazelnutSyrup',
        name: 'Hazelnut Syrup',
        type: 'counter',
        img: '',
        link: '',
        min: 0,
        max: 12,
        defaultValue: 0,
        unit: 'pumps'
      },
      {
        id: 'peppermintSyrup',
        name: 'Peppermint Syrup',
        type: 'counter',
        img: '',
        link: '',
        min: 0,
        max: 12,
        defaultValue: 0,
        unit: 'pumps'
      },
      {
        id: 'toastedVanillaSyrup',
        name: 'Toasted Vanilla Syrup',
        type: 'counter',
        img: '',
        link: '',
        min: 0,
        max: 12,
        defaultValue: 0,
        unit: 'pumps'
      },
      {
        id: 'vanillaSyrup',
        name: 'Vanilla Syrup',
        type: 'counter',
        img: '',
        link: '',
        min: 0,
        max: 12,
        defaultValue: 0,
        unit: 'pumps'
      },
      {
        id: 'sugarFreeVanillaSyrup',
        name: 'Sugar Free Vanilla Syrup',
        type: 'counter',
        img: '',
        link: '',
        min: 0,
        max: 12,
        defaultValue: 0,
        unit: 'pumps'
      }
    ]
  },
  {
    id: 'coldFoams',
    name: 'Cold Foams',
    img: '',
    link: '',
    options: [
      {
        id: 'proteinColdFoam',
        name: 'Add Protein Cold Foam (15g)*',
        type: 'select',
        img: '',
        link: '',
        choices: ['None', 'Protein Cold Foam'],
        defaultValue: 'None'
      },
      {
        id: 'coldFoamType',
        name: 'Add Cold Foam',
        type: 'select',
        img: '',
        link: '',
        choices: ['None', 'Vanilla Sweet Cream Cold Foam', 'Chocolate Cream Cold Foam', 'Salted Caramel Cream Cold Foam', 'Matcha Cream Cold Foam'],
        defaultValue: 'None'
      },
      {
        id: 'nondairyColdFoamType',
        name: 'Add Nondairy Cold Foam',
        type: 'select',
        img: '',
        link: '',
        choices: ['None', 'Nondairy Vanilla Sweet Cream Cold Foam', 'Nondairy Salted Caramel Cream Cold Foam'],
        defaultValue: 'None'
      }
    ]
  },
  {
    id: 'toppings',
    name: 'Toppings',
    img: '',
    link: '',
    options: [
      {
        id: 'cinnamonPowder',
        name: 'Add Cinnamon Powder',
        type: 'select',
        img: '',
        link: '',
        choices: ['None', 'Light Cinnamon Powder', 'Cinnamon Powder', 'Extra Cinnamon Powder'],
        defaultValue: 'None'
      },
      {
        id: 'toppingOptions',
        name: 'Add Topping Options',
        type: 'select',
        img: '',
        link: '',
        choices: ['None', 'Caramel Crunch Topping', 'Cookie Crumble Topping', 'Cinnamon Dolce Topping'],
        defaultValue: 'None'
      },
      {
        id: 'drizzle',
        name: 'Add Drizzle',
        type: 'select',
        img: '',
        link: '',
        choices: ['None', 'Caramel Drizzle', 'Mocha Drizzle', 'Strawberry Drizzle'],
        defaultValue: 'None'
      },
      {
        id: 'whippedCream',
        name: 'Add Whipped Cream',
        type: 'select',
        img: '',
        link: '',
        choices: ['None', 'Light Whipped Cream', 'Whipped Cream', 'Extra Whipped Cream'],
        defaultValue: 'None'
      }
    ]
  },
  {
    id: 'tea',
    name: 'Tea',
    img: '',
    link: '',
    options: [
      {
        id: 'chai',
        name: 'Add Chai',
        type: 'counter',
        img: '',
        link: '',
        min: 0,
        max: 12,
        defaultValue: 0,
        unit: 'pumps'
      },
      {
        id: 'matchaTeaPowder',
        name: 'Add Matcha Tea Powder',
        type: 'counter',
        img: '',
        link: '',
        min: 0,
        max: 12,
        defaultValue: 0,
        unit: 'scoops'
      }
    ]
  },
  {
    id: 'sweeteners',
    name: 'Sweeteners',
    img: '',
    link: '',
    options: [
      {
        id: 'liquidSweetenerType',
        name: 'Add Liquid Sweeteners',
        type: 'select',
        img: '',
        link: '',
        choices: ['None', 'Classic Syrup', 'Liquid Cane Sugar', 'Honey Blend'],
        defaultValue: 'None'
      },
      {
        id: 'liquidSweetenerPumps',
        name: 'Liquid Sweetener Pumps',
        type: 'counter',
        img: '',
        link: '',
        min: 0,
        max: 12,
        defaultValue: 0,
        unit: 'pumps'
      },
      {
        id: 'sweetenerPacketType',
        name: 'Add Sweetener Packets',
        type: 'select',
        img: '',
        link: '',
        choices: ['None', 'Splenda', 'Sugar', 'Sugar In The Raw', 'Equal', 'Sweet\'N Low', 'Stevia In The Raw'],
        defaultValue: 'None'
      },
      {
        id: 'sweetenerPacketCount',
        name: 'Sweetener Packet Count',
        type: 'counter',
        img: '',
        link: '',
        min: 0,
        max: 20,
        defaultValue: 0,
        unit: 'packets'
      }
    ]
  },
  {
    id: 'preparation',
    name: 'Preparation',
    img: '',
    link: '',
    options: [
      {
        id: 'milkInsteadOfWater',
        name: 'Add Milk Instead of Water',
        type: 'select',
        img: '',
        link: '',
        choices: ['No', 'Oatmilk', 'Whole Milk', '2% Milk', 'Almondmilk', 'Coconutmilk', 'Soy Milk'],
        defaultValue: 'No'
      },
      {
        id: 'warmed',
        name: 'Preparation Style',
        type: 'select',
        img: '',
        link: '',
        choices: ['Warmed', 'Not Warmed'],
        defaultValue: 'Not Warmed'
      },
      {
        id: 'waterLevel',
        name: 'Water Level',
        type: 'select',
        img: '',
        link: '',
        choices: ['Standard', 'Light Water', 'Extra Water', 'No Water'],
        defaultValue: 'Standard'
      },
      {
        id: 'ice',
        name: 'Ice Level',
        type: 'select',
        img: '',
        link: '',
        choices: ['Ice', 'Extra Ice', 'Light Ice', 'No Ice'],
        defaultValue: 'Ice'
      },
      {
        id: 'fruitScoops',
        name: 'Fruit Inclusions Scoop',
        type: 'counter',
        img: '',
        link: '',
        min: 0,
        max: 12,
        defaultValue: 0,
        unit: 'scoops'
      }
    ]
  },
  {
    id: 'cupOptions',
    name: 'Cup Options',
    img: '',
    link: '',
    options: [
      {
        id: 'cupSize',
        name: 'Cup Size',
        type: 'select',
        img: '',
        link: '',
        choices: ['Standard Cup size', 'Tall Cup', 'Grande Cup', 'Venti Cup'],
        defaultValue: 'Standard Cup size'
      },
      {
        id: 'personalCup',
        name: 'Personal Cup',
        type: 'select',
        img: '',
        link: '',
        choices: ['No', 'Bring Your Own Cup'],
        defaultValue: 'No'
      }
    ]
  }
];

// Helper to filter customization categories and options based on product type
export const getRelevantCustomizationOptions = (product) => {
  if (!product) return [];

  const name = (product.name || '').toLowerCase();
  const type = (product.productType || '').toLowerCase();
  const formCode = (product.formCode || '').toLowerCase();
  
  const isBev = type === 'beverage';
  const isFood = type === 'food';
  
  // Checking drink categories
  const isIced = formCode === 'iced' || name.includes('iced') || name.includes('cold') || name.includes('nitro') || name.includes('refresher') || name.includes('frappuccino') || name.includes('blended');
  const isEspressoOrCoffee = name.includes('latte') || name.includes('macchiato') || name.includes('mocha') || name.includes('cappuccino') || name.includes('americano') || name.includes('espresso') || name.includes('flat white') || name.includes('brew') || name.includes('coffee') || name.includes('roast') || name.includes('cortado');
  const isTea = name.includes('tea') || name.includes('matcha') || name.includes('chai') || name.includes('london fog');
  const isRefresherOrLemonade = name.includes('refresher') || name.includes('lemonade') || name.includes('açaí') || name.includes('dragonfruit') || name.includes('strawberry') || name.includes('pineapple') || name.includes('juice') || name.includes('pink drink') || name.includes('paradise drink');

  return customizationOptions.map(category => {
    // If it is food, it only gets Preparation -> Warmed option
    if (isFood) {
      if (category.id === 'preparation') {
        const warmedOpt = category.options.filter(opt => opt.id === 'warmed');
        return warmedOpt.length ? { ...category, options: warmedOpt } : null;
      }
      return null;
    }

    if (isBev) {
      // 1. Milk category
      if (category.id === 'milk') {
        if (isRefresherOrLemonade || name.includes('water')) {
          return null;
        }
        return category;
      }

      // 2. Espresso & Shot Options
      if (category.id === 'espresso') {
        if (isRefresherOrLemonade || name.includes('water') || (isTea && !name.includes('latte') && !name.includes('chai'))) {
          return null;
        }
        return category;
      }

      // 3. Flavors
      if (category.id === 'flavors') {
        if (name.includes('water')) return null;
        return category;
      }

      // 4. Cold Foams: Only for iced/cold drinks
      if (category.id === 'coldFoams') {
        if (!isIced) return null;
        return category;
      }

      // 5. Toppings
      if (category.id === 'toppings') {
        if (name.includes('water')) return null;
        return category;
      }

      // 6. Tea
      if (category.id === 'tea') {
        if (isRefresherOrLemonade || name.includes('water')) return null;
        return category;
      }

      // 7. Sweeteners
      if (category.id === 'sweeteners') {
        return category;
      }

      // 8. Preparation: Ice, Fruit Scoops, Water Level, Milk instead of Water
      if (category.id === 'preparation') {
        const options = category.options.filter(opt => {
          if (opt.id === 'ice') return isIced; // Ice level only for iced drinks
          if (opt.id === 'fruitScoops') return isRefresherOrLemonade; // Fruit scoops only for refreshers/lemonades
          if (opt.id === 'warmed') return false; // Warmed is only for food
          if (opt.id === 'waterLevel') {
            return isEspressoOrCoffee || isTea;
          }
          if (opt.id === 'milkInsteadOfWater') {
            return isTea;
          }
          return true;
        });
        return options.length ? { ...category, options } : null;
      }

      // 9. Cup Options: Applies to all drinks
      if (category.id === 'cupOptions') {
        return category;
      }
    }

    return null;
  }).filter(Boolean);
};

// Helper to construct a clean default state from the options config
export const getCustomizationDefaults = (product) => {
  const defaults = {};
  if (!product) return defaults;

  const relevant = getRelevantCustomizationOptions(product);
  relevant.forEach(category => {
    category.options.forEach(option => {
      defaults[option.id] = option.defaultValue;
    });
  });

  const pName = product.name?.toLowerCase() || '';
  const type = product.productType?.toLowerCase() || '';
  const isBev = type === 'beverage';

  if (isBev) {
    if (pName.includes('latte') || pName.includes('macchiato') || pName.includes('cappuccino') || pName.includes('mocha')) {
      if (defaults.hasOwnProperty('shots')) defaults.shots = 2; // Default for Grande
      if (defaults.hasOwnProperty('milk')) defaults.milk = '2% Milk';
      if (defaults.hasOwnProperty('ice')) defaults.ice = 'Ice';
    } else if (pName.includes('americano')) {
      if (defaults.hasOwnProperty('shots')) defaults.shots = 3;
      if (defaults.hasOwnProperty('milk')) defaults.milk = 'No Milk';
      if (defaults.hasOwnProperty('ice')) defaults.ice = 'Ice';
    } else if (pName.includes('flat white')) {
      if (defaults.hasOwnProperty('shots')) defaults.shots = 3;
      if (defaults.hasOwnProperty('milk')) defaults.milk = 'Whole Milk';
    } else if (pName.includes('refresher') || pName.includes('lemonade') || pName.includes('açaí') || pName.includes('dragonfruit')) {
      if (defaults.hasOwnProperty('fruitScoops')) defaults.fruitScoops = 1;
      if (defaults.hasOwnProperty('ice')) defaults.ice = 'Ice';
    }
  } else if (type === 'food') {
    if (defaults.hasOwnProperty('warmed')) defaults.warmed = 'Not Warmed';
  }

  return defaults;
};
