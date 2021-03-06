# **BamazonSQL**
_Node.js &amp; MySQL Assignment - Bamazon_

## **Overview**
In this activity, you'll be creating an Amazon-like storefront with the MySQL skills you learned this unit. The app will take in orders from customers and deplete stock from the store's inventory. As a bonus task, you can program your app to track product sales across your store's departments and then provide a summary of the highest-grossing departments in the store.

Make sure you save and require the [MySQL](https://www.npmjs.com/package/mysql) and [Inquirer](https://www.npmjs.com/package/inquirer) npm packages in your homework files-- your app will need them for data input and storage.

## Instructions

### Challenge #1: Customer View (Minimum Requirement)

1. Create a MySQL Database called `bamazon`.

2. Then create a Table inside of that database called `products`.

3. The products table should have each of the following columns:

* item_id (unique id for each product)

* product_name (Name of product)

* department_name

* price (cost to customer)

* stock_quantity (how much of the product is available in stores)

4. Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).

5. Then create a Node application called `bamazonCustomer.js`. Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.

![image of product list](https://imgur.com/QMGtmq0.jpg)

6. The app should then prompt users with two messages.

* The first should ask them the ID of the product they would like to buy.
* The second message should ask how many units of the product they would like to buy.

![image of purchase options](https://imgur.com/FTJxXtO.jpg)

7. Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

* If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

![image of not enough in stock](https://imgur.com/fFu5UB6.jpg)

8. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
* This means updating the SQL database to reflect the remaining quantity.
* Once the update goes through, show the customer the total cost of their purchase.

![image of updated sql](https://imgur.com/Hhnt5m3.jpg)

- - -
- - -

### Challenge #2: Manager View (Next Level)

* Create a new Node application called `bamazonManager.js`. Running this application will:

* List a set of menu options:
* View Products for Sale
* View Low Inventory
* Add to Inventory
* Add New Product

* If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.

![image of manager_products for sale](https://imgur.com/dBglTct.jpg)

* If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.

![image of manager_low inventory](https://imgur.com/eZm9zi1.jpg)

* If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.

![image of manager_add to inventory](https://imgur.com/PX6UMNt.jpg)

* If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.

![image of manager_add ipad](https://imgur.com/ZQXIPQ5.jpg)
![image of manager_add kleenex](https://imgur.com/aL1aekW.jpg)

* If the manager selects `Log Off`.
![image of manager_log off](https://imgur.com/DtXydim.jpg)

* The updated SQL Database again.
![image of updated sql](https://imgur.com/Hhnt5m3.jpg)
