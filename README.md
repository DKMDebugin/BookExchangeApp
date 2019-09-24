# BOOK EXCHANGE APP
  A platform where your old books can be used as a form of exchange for other
   books you might need. The frontend is JavaScript heavy. The data is gotten by sending queries via the Book exchange api created with DRF.
## MODELS
* User Model: username, fullname, city, address, state
* Book Model: user, title, desc, traded (boolean)
* Traded / Request: user1, user2, book1, book2, traded

## BUSINESS LAYERS
The business layer was built as an API so it can be indenpendent of the frontend and availabe for other to use.
* User Auth:
  - Create new user via Github
  - Login via Github
  - Logout
* Books
 - List Book View
 - Detail Book View
 - Add Book View
* Users
 - Detail User View
 - user List View
* Request
 - List Request View
 - Create Request View
* Trades
 - List Trade Views
* Current Logged User
  - Profile View
  - Edit Profile View
  - My Book View
