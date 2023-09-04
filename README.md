# Book Catallog Backend Assignment - 8

### Technology use:

- Use TypeScript as the Programming Language.
- Use Express.js as the web framework.
- Use Prisma as the Object Realtion Model (ORM)
- Use postgreSQL as the database

### Live Link: https://book-catallog.onrender.com

### Application Routes:

#### User

- api/v1/auth/signup (POST)
  Request body:

```json
{
  "name": "Jhon Doe",
  "email": "john@example.com",
  "password": "john123",
  "role": "customer",
  "contactNo": "1234567890",
  "address": "Dhaka, Bangladesh",
  "profileImg": "user.jpg"
}
```

- api/v1/auth/signin (POST)
  Request body:

  ```json
  {
    "email": "john@example.com",
    "password": "john123"
  }
  ```

- api/v1/users (GET) Only Allowed For Admin

- api/v1/users/6177a5b87d32123f08d2f5d4 (Single GET) Only Allowed For Admin

- api/v1/users/6177a5b87d32123f08d2f5d4 (PATCH) Only Allowed For Admin
  Request body:

```json
{
  "name": "Jhon Doe Updated"
}
```

- api/v1/users/6177a5b87d32123f08d2f5d4 (DELETE) Only Allowed For Admin

- api/v1/profile (GET) Only Allowed For Login user

### Category

- api/v1/categories/create-category (POST) Only Allowed For Admin
  Request body:

  ```json
  {
    "title": "Programming"
  }
  ```

- api/v1/categories (GET)

- api/v1/categories/6177a5b87d32123f08d2f5d4 (Single GET)

- api/v1/categories/6177a5b87d32123f08d2f5d4 (PATCH) Only Allowed For Admin
  Request body:

  ```json
  {
    "title": "Programming update"
  }
  ```

- api/v1/categories/6177a5b87d32123f08d2f5d4 (DELETE) Only Allowed For Admin

### Books

- api/v1/books/create-book (POST) Only Allowed For Admin
  Request body:

```json
{
  "title": "The Catcher in the Rye",
  "author": "J.D. Salinger",
  "genre": "Fiction",
  "price": 340.75,
  "publicationDate": "June 02, 1998",
  "categoryId": "6177a5b87d32123f08d2f5d4"
}
```

- api/v1/books (GET)

### Seraching and filtering book listings:

Route: /api/v1/books?

Query parameters: (Case Insensitive)

- page: The page number for pagination (e.g., ?page=1).
- size: The number of book listings per page (e.g. ?size=10).
- sortBy: The field to sort the cow listings (e.g. ?sortBy=price).
- sortOrder : The order of sorting, either 'asc' or 'desc' (e.g. ?sortOrder=asc).
- minPrice: The minimum price for filtering (e.g. ?minPrice=1000).
- maxPrice: The maximum price for filtering (e.g. ?maxPrice=5000).
- category: Filter using category id (e.g : ?category=f1234573-sfkjsf-45332)
- search: The search query string for searching books (e.g., ?search="Programmig"). (Search Fields should be title,author,genre)

- api/v1/books/:categoryId/category (GET)

- api/v1/books/:id (GET)

- api/v1/books/:id (PATCH) Only Allowed For Admin
  Request body:
  ```json
  {
    "title": "The Catcher in the Rye -2"
  }
  ```
- api/v1/books/:id (DELETE) Only Allowed For Admin

### Reviews

- api/v1/reviews/create-review (POST) Only Allowed For Customer
  Request body:

```json
{
  "review": "Good book",
  "rating": 4, // only 1 to 5
  "bookId": "efb2949f-8f85-42f6-a9ce-8c177814e2ec",
  "userId": "6177a5b87d32123f08d2f5d4"
}
```

- api/v1/reviews (GET) Only Allowed For Admin

- api/v1/reviews/:id (GET) Only Allowed For Admin

- api/v1/reviews/:id (PATCH) Only Allowed For Admin

- api/v1/reviews/:id (DELETE) Only Allowed For Admin

### Orders

- api/v1/orders/create-order (POST)
  Request body:

```json
{
  "orderedBooks": [
    {
      "bookId": "efb2949f-8f85-42f6-a9ce-8c177814e2ec",
      "quantity": 3
    },
    {
      "bookId": "c9b2d566-1d8a-4fe1-8d15-07ed4f7c5dc9",
      "quantity": 2
    }
  ]
}
```

- api/v1/orders (GET) Only Allowed For Admin (Get All Orders)
- api/v1/orders (GET) Only Allowed For Customer (Get Customer Orders)
- api/v1/orders/:orderId (GET) Allowed For Admin and customer (Get Single Order)
- api/v1/orders/:orderId (PATCH) Only Allowed For Admin (update order status)
  Request body:
  only allowed pending => shipped => delivered

```json
{
  "status": "shipped"
}
```

## Thanks!

Thank you for checking out our Book Catalog Backend Assignment. If you have any questions or need further assistance, please feel free to contact us. We're here to help!

## Contact Information

- Facebook: [Facebook](https://www.facebook.com/shohagroy.7771)
- Email: pkshohag240@gmail.com

I hope you have a great day and enjoy exploring my Book Catalog application!
