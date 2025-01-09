- Schema delle tabelle per il database di Boolbnb



1. Owners (One to Many with Apartments)

- ID | INT - primary_key - auto_increment 
- name | VARCHAR(50) - NULL
- email | VARCHAR(50) - NN



2. Apartments (Many to Many with Services)

- ID | INT - primary_key - auto_increment 
- title | VARCHAR(50) - NN 
- rooms_number | TINYINT - NN 
- beds | TINYINT - NN 
- bathrooms | TINYINT - NN 
- square meters | INT - NN
- address | VARCHAR(50) - NN
- picture_url | VARCHAR(50) - NULL
- description | TEXT(500) - NN
- owner_id | foreign_key - NN
- vote | INT - NN 



3. services  (Many to Many with Apartments)

- ID | INT - primary_key - auto_increment 
- free_parking | TINYINT(1) DEFAULT 0 - NULL
- private_garden | TINYINT(1) DEFAULT 0 - NULL
- air_conditioner | TINYINT(1) DEFAULT 0 - NULL
- eat-in_kitchen | TINYINT(1) DEFAULT 0 - NULL
- bathroom_essentials | TINYINT(1) DEFAULT 0 - NULL
- bed_linen | TINYINT(1) DEFAULT 0 - NULL
- television | TINYINT(1) DEFAULT 0 - NULL
- wi-fi | TINYINT(1) DEFAULT 0 - NULL
- pet_allowed | TINYINT(1) DEFAULT 0 - NULL
- smoker | TINYINT(1) DEFAULT 0 - NULL
- disabled access | TINYINT(1) DEFAULT 0 - NULL



4. apartment_service

- ID_apartment
- ID_service



5. reviews (one to many with apartments)
- ID | INT - primary_key - auto_increment 
- author_name | VARCHAR(30) - NN
- description | TEXT(500) - NN
- date | DATE
- days_of_stay | TINYINT - NULL
- ID_apartment | foreign_key - NN


6. messages (one to many with apartments)
- ID | INT - primary_key - auto_increment 
- sender_email | VARCHAR(50) - NN
- text | TEXT(500) - NN
- ID_apartment | foreign_key - NN