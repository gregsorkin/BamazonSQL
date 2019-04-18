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

// main function with new switch case
function launcher() {
    inquirer.prompt([
        {
            type: "list",
            name: "chooser",
            message: "You are in MANAGER mode. What would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Log Off"]
        }
    ]).then(function(answer) {
        switch(answer.chooser) {
            case "View Products for Sale": viewProducts();
            break;

            case "View Low Inventory": viewLowInventory();
            break;

            case "Add to Inventory": addToInventory();
            break;

            case "Add New Product": addNewProduct();
            break;

            case "Log Off": console.log("See you soon!");
        }
    })
};

// view all products function
function viewProducts() {
    queryInv = 'SELECT * FROM products';

    connection.query(queryInv, function(err, data) {
        if (err) throw err;
        // print the current inventory to the screen
        console.log("- = - = = - = = = - = = = =|----MANAGER VIEW-----|= = = = - = = = - = = - = -");
        console.log("- = - = = - = = = - = = = =|-Welcome to bAmazon!-|= = = = - = = = - = = - = -");
        console.log("- = - = = - = = = - = = = =|-Current Inventory:--|= = = = - = = = - = = - = -");

        for (let i = 0; i < data.length; i++) {
            console.log("Product ID: " + data[i].item_id + " | " + "Product Name: " + data[i].product_name + 
                        " | " + "Department: " + data[i].department_name + " | " + "Price: $" + data[i].price + 
                        " | " + "Quantity: " + data[i].stock_quantity);
            console.log("- = - = = - = = = - = = = =|---------------------|= = = = - = = = - = = - = -");
        }
        console.log(" ");

        launcher();
    });
};

// view low inventory function
function viewLowInventory() {
    queryInv = 'SELECT * FROM products';

    connection.query(queryInv, function(err, data) {
        if (err) throw err;
        // print the current inventory to the screen
        console.log("- = - = = - = = = - = = = =|-----MANAGER VIEW----|= = = = - = = = - = = - = -");
        console.log("- = - = = - = = = - = = = =|-Welcome to bAmazon!-|= = = = - = = = - = = - = -");
        console.log("- = - = = - = = = - = = = =|---Low Inventory:----|= = = = - = = = - = = - = -");
        
        for (let i = 0; i < data.length; i++) {
            if (data[i].stock_quantity <= 5) {
                console.log("Product ID: " + data[i].item_id + " | " + "Product Name: " + data[i].product_name + 
                            " | " + "Department: " + data[i].department_name + " | " + "Price: $" + data[i].price + 
                            " | " + "Quantity: " + data[i].stock_quantity);
                console.log("- = - = = - = = = - = = = =|---------------------|= = = = - = = = - = = - = -");
            }
        }
        console.log(" ");

        launcher();
    });
};

// update the inventory of a given item function
function addToInventory() {
    queryInv = 'SELECT * FROM products';

    connection.query(queryInv, function(err, data) {
        if (err) throw err;
        console.log("- = - = = - = = = - = = = =|-----MANAGER VIEW----|= = = = - = = = - = = - = -");
        console.log("- = - = = - = = = - = = = =|-Welcome to bAmazon!-|= = = = - = = = - = = - = -");
        console.log("- = - = = - = = = - = = = =|--Add to Inventory:--|= = = = - = = = - = = - = -");

        // generate a list of items to choose from
        let productList = [];
        for (let j = 0; j < data.length; j++) {
            productList.push(data[j].product_name);
        };

        inquirer.prompt([
            {
                type: "list",
                name: "products",
                message: "What item would you like to increase the inventory?",
                choices: productList
            },
            {
                type: "input",
                name: "quantity",
                message: "How many would you like to add?",
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        ]).then(function(answer) {
            let currentStock;
            for (var k = 0; k < data.length; k++) {
                if (data[k].product_name === (answer.products)) {
                    currentStock = data[k].stock_quantity;
                }
            };
            connection.query("UPDATE products SET ? WHERE ?", [
                { stock_quantity: currentStock + parseInt(answer.quantity) },
                { product_name: answer.products }
            ], function(err, res) {
                if (err) throw err;
                console.log("Your item's quantity has been updated.");
            
                launcher(); 
        });
    });
});
};

// allow the manager to add a whole new item to the database
function addNewProduct() {
    queryInv = 'SELECT * FROM products';

    connection.query(queryInv, function(err, data) {
        if (err) throw err;
        console.log("- = - = = - = = = - = = = =|-----MANAGER VIEW----|= = = = - = = = - = = - = -");
        console.log("- = - = = - = = = - = = = =|-Welcome to bAmazon!-|= = = = - = = = - = = - = -");
        console.log("- = - = = - = = = - = = = =|--Add New Product:---|= = = = - = = = - = = - = -");

        inquirer.prompt([
            {
                type: "input",
                name: "product_name",
                message: "Product Name: ",
                validate: function(value) {
                    if (value) {
                        return true;
                    } else {
                        return false;
                    }
                }
            },
            {
                type: "input",
                name: "departments",
                message: "Department Name: ",
                validate: function(value) {
                    if (value) {
                        return true;
                    } else {
                        return false;
                    }
                } 
            },
            {
                type: "input",
                name: "price",
                message: "Price: $",
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    } else {
                        return false;
                    }
                }
            },
            {
                type: "input",
                name: "quantity",
                message: "How many would you like to add?",
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    } else {
                        return false;
                    }
                }
    }]).then(function(answer) {
        connection.query("INSERT INTO products SET ?", {
            product_name: answer.product_name,
            department_name: answer.departments,
            price: answer.price,
            stock_quantity: answer.quantity 
        }, function(err, res) {
            if (err) throw err;
            console.log("Your item has been added to the store's inventory.");
        
            launcher(); 
        });
    });
});
};

launcher();