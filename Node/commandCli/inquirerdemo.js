/* 
    学会使用inquirer.js，使用命令行与用户进行交互
*/
const inquirer = require('inquirer');
// const questions = [
//     {
//       type: 'confirm',
//       name: 'toBeDelivered',
//       message: 'Is this for delivery?',
//       default: false
//     },
//     {
//       type: 'input',
//       name: 'phone',
//       message: "What's your phone number?",
//       validate: function(value) {
//         var pass = value.match(
//           /^([01]{1})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i
//         );
//         if (pass) {
//           return true;
//         }
  
//         return 'Please enter a valid phone number';
//       }
//     },
//     {
//       type: 'list',
//       name: 'size',
//       message: 'What size do you need?',
//       choices: ['Large', 'Medium', 'Small'],
//       filter: function(val) {
//         return val.toLowerCase();
//       }
//     },
//     {
//       type: 'input',
//       name: 'quantity',
//       message: 'How many do you need?',
//       validate: function(value) {
//         var valid = !isNaN(parseFloat(value));
//         return valid || 'Please enter a number';
//       },
//       filter: Number
//     },
//     {
//       type: 'expand',
//       name: 'toppings',
//       message: 'What about the toppings?',
//       choices: [
//         {
//           key: 'p',
//           name: 'Pepperoni and cheese',
//           value: 'PepperoniCheese'
//         },
//         {
//           key: 'a',
//           name: 'All dressed',
//           value: 'alldressed'
//         },
//         {
//           key: 'w',
//           name: 'Hawaiian',
//           value: 'hawaiian'
//         }
//       ]
//     },
//     {
//       type: 'rawlist',
//       name: 'beverage',
//       message: 'You also get a free 2L beverage',
//       choices: ['Pepsi', '7up', 'Coke']
//     },
//     {
//       type: 'input',
//       name: 'comments',
//       message: 'Any comments on your purchase experience?',
//       default: 'Nope, all good!'
//     },
//     {
//       type: 'list',
//       name: 'prize',
//       message: 'For leaving a comment, you get a freebie',
//       choices: ['cake', 'fries'],
//       when: function(answers) {
//         return answers.comments !== 'Nope, all good!';
//       }
//     }
//   ];
  
//  /*  inquirer.prompt(questions).then(answers => {
//     console.log('\nOrder receipt:');
//     console.log(JSON.stringify(answers, null, '  '));
//   }); */

// inquirer
//     .prompt([
//         {
//         type: 'checkbox',
//         message: 'Select toppings',
//         name: 'toppings',
//         choices: [
//             new inquirer.Separator(' = The Meats = '),
//             {
//             name: 'Pepperoni'
//             },
//             {
//             name: 'Ham'
//             },
//             {
//             name: 'Ground Meat'
//             },
//             {
//             name: 'Bacon'
//             },
//             new inquirer.Separator(' = The Cheeses = '),
//             {
//             name: 'Mozzarella',
//             checked: true
//             },
//             {
//             name: 'Cheddar'
//             },
//             {
//             name: 'Parmesan'
//             },
//             new inquirer.Separator(' = The usual ='),
//             {
//             name: 'Mushroom'
//             },
//             {
//             name: 'Tomato'
//             },
//             new inquirer.Separator(' = The extras = '),
//             {
//             name: 'Pineapple'
//             },
//             {
//             name: 'Olives',
//             disabled: 'out of stock'
//             },
//             {
//             name: 'Extra cheese'
//             }
//         ],
//         validate: function(answer) {
//             if (answer.length < 1) {
//             return 'You must choose at least one topping.';
//             }
//             return true;
//         }
//         }
//     ])
//     .then(answers => {
//         console.log(JSON.stringify(answers, null, '  '));
//     });
/* 
    choice：
        1 array，数组中可以是单个的字符串，也可以是对象，对象里面有name属性说明选项的值，还有disabled属性说明为什么这个值不可选。
        2 choice中可以使用分隔符，new requirer.Separator(),可以接受字符，默认是以----分割
*/
const questions = [
    {
        type: 'list',
        name: 'fruit',
        choices: ['Apple',  new inquirer.Separator(), 'Pears',  new inquirer.Separator(), 'Watermelon',  new inquirer.Separator(), 'Pineapple'],
        message: 'choose a fruit your favorite',
        default: 0,
        filter: function(val) {
            return val.toLowerCase();
        }
    },
    {
        type: 'list',
        name: 'theme',
        message: 'what do you want to do',
        choices: ['order pizza', 'make a reservation', {
            name: 'contact support',
            disabled: 'unavailable on this hour'
        }]
    },
    {
        type: 'rawlist',
        name: 'gender',
        choices: ['male', 'female'],
    },
    {
        type: 'expand',
        name: 'overwrite', 
        message: 'conflict on `file.js`:',
        choices: [
            {
                
            }
        ]
    }
];
inquirer
    .prompt(questions)
    .then(answers => {
        console.log(JSON.stringify(answers, null, ' '))
    })
