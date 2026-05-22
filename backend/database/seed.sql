USE homemart;

INSERT INTO users (name, email, password_hash, role) VALUES
  (
    'Admin',
    'admin@gmail.com',
    '$2b$10$BW8ALIVqQBVUijLuu.Hvguxpt46YLjyO0Zjxt6tcrBcefleYMNvyS',
    'admin'
  );

INSERT INTO categories (name) VALUES
  ('Home Comfort'),
  ('Kitchen'),
  ('Laundry');

INSERT INTO products (name, description, category_id, price, stock, image_url) VALUES
  (
    'Air Conditioner',
    'A reliable air conditioner for keeping your home cool and comfortable.',
    1,
    499.00,
    12,
    '/images/air-conditioner.jpg'
  ),
  (
    'Refrigerator',
    'A spacious refrigerator for storing fresh food and drinks every day.',
    1,
    699.00,
    8,
    '/images/refrigerator.jpg'
  ),
  (
    'Water Heater',
    'A compact water heater for safe and convenient hot water at home.',
    1,
    189.00,
    15,
    '/images/water-heater.jpg'
  ),
  (
    'Gas Stove',
    'A durable gas stove for simple and efficient home cooking.',
    2,
    149.00,
    20,
    '/images/gas-stove.jpg'
  ),
  (
    'Air Fryer',
    'An easy-to-use air fryer for cooking crispy meals with less oil.',
    2,
    129.00,
    18,
    '/images/air-fryer.jpg'
  ),
  (
    'Rice Cooker',
    'A convenient rice cooker for preparing rice and simple meals.',
    2,
    59.00,
    25,
    '/images/rice-cooker.jpg'
  ),
  (
    'Washing Machine',
    'A dependable washing machine for everyday laundry needs.',
    3,
    549.00,
    10,
    '/images/washing-machine.jpg'
  ),
  (
    'Vacuum Cleaner',
    'A lightweight vacuum cleaner for quick and easy home cleaning.',
    3,
    179.00,
    14,
    '/images/vacuum-cleaner.jpg'
  );
