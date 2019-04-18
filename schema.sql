DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
    item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER(10),
    PRIMARY KEY(item_id) 
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Anker Wireless Charger", "Cell Phones & Accessories", 11.04, 90);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sideclick Universal Remote Attachment for Roku Streaming Player", "Electronics", 18.28, 24);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sharpie Liquid Highlighters, Chisel Tip, Assorted Colors, 10 Count", "Office Products", 6.50, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tanmit Gel Pens Set Colored Pen Fine Point Art Marker Pen 36 Count", "Arts, Crafts & Sewing", 7.99, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Phone Tripod, Flexible Cell Phone Tripod Adjustable Camera Stand Holder with Wireless Remote Control", "Cell Phones & Accessories", 11.19, 9);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("VicTsing Grill Cover, Medium 58-inch Waterproof BBQ Cover, Heavy Duty", "Patio, Lawn & Garden", 16.99, 35);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("BetterBody Foods Organic Chia Seeds Non-GMO 2lb", "Grocery & Gourmet Food", 7.59, 37);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("HAOMEILI Women's Summer Casual Swing T-Shirt Dress, Medium, Long Sleeve Army Green", "Clothing, Shoes & Jewelry", 12.44, 33);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('DIYMAG Powerful Neodymium Disc Magnets, 1.26"D x 1/8"H, Pack of 6', "Industrial & Scientific", 7.99, 75);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iClever BoostCube 2nd Generation 24W Dual USB Wall Charger with SmartID Technology", "Electronics", 7.19, 5);

SELECT * FROM products;