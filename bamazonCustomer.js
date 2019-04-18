// dependencies
let mysql = require("mysql");
let inquirer = require("inquirer");

// create the connection information for the sql database
let connection = mysql.createConnection({
    host: "localhost",
    PORT: 8787,
    user: "root",
    password: "",
    database: "bamazonDB"
});

// main function
function launcher() {
    queryInv = 'SELECT * FROM products';

    connection.query(queryInv, function(err, data) {
        if (err) throw err;
        // print the current inventory to the screen
        console.log("- = - = = - = = = - = = = =|-Welcome to bAmazon!-|= = = = - = = = - = = - = -");
        console.log("- = - = = - = = = - = = = =|-Current Inventory:--|= = = = - = = = - = = - = -");
        console.log("- = - = = - = = = - = = = =|---------------------|= = = = - = = = - = = - = -");
        
        for (let i = 0; i < data.length; i++) {
            console.log("Product ID: " + data[i].item_id + " | " + "Product Name: " + data[i].product_name + 
                        " | " + "Department: " + data[i].department_name + " | " + "Price: $" + data[i].price + 
                        " | " + "Quantity: " + data[i].stock_quantity);
            console.log("- = - = = - = = = - = = = =|---------------------|= = = = - = = = - = = - = -");
        }
        console.log(" ");
    
        // let user choose their action and input data
        inquirer.prompt([
            {
                type: "input",
                name: "item_id",
                message: "What is the Item ID of the product you wish to purchase?",
                validate: function(value) {
                    if (isNaN(value) == false && parseInt(value) <= data.length && parseInt(value) > 0) {
                        return true;
                    } else {
                        return false;
                    }
                }
            },
            {
                type: "input",
                name: "stock_quantity",
                message: "How many would you like?",
                validate: function(value) {
                    if (isNaN(value)) {
                        return false;
                    } else {
                        return true;
                    }
                }
            }
        ]).then(function(answer) {
            let whatItem = (answer.item_id) - 1;
            let howMany = parseInt(answer.stock_quantity);
            let finalCount = parseFloat(((data[whatItem].price) * howMany).toFixed(2));
            
            // check if there's enough in stock at present
            if (data[whatItem].stock_quantity >= howMany) {
                // update the sql database with new information
                connection.query("UPDATE products SET ? WHERE ?", [
                    { stock_quantity: (data[whatItem].stock_quantity - howMany) },
                    { item_id: answer.item_id }
                ], function(err, res) {
                    if (err) throw err;
                    console.log("Thank you for your purchase. Your total is $"+ finalCount.toFixed(2) + ". Please check your email for your order confirmation.");
                });
            } else {
                console.log("Sorry, we don't have that many in stock right now.")
            }

            backToStart();
        })
    });

    // give the option to start over
    function backToStart() {
        inquirer.prompt([
            {
                type: "confirm",
                name: "inquiry",
                message: "Would you like to purchase another item?"
            }
        ]).then(function(answer) {
            if (answer.inquiry) {
                launcher();
            } else {
                console.log("Thank you! Come again!")
            }
        });
    }; 
};

launcher();