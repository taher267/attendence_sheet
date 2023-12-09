- src
  - api
    - v1
      - auth
      - user
  - config
    - default.js
    - user.js
  - db
    - connectDB.js
    - index.js
  - middleware
    - authenticate.js
    - authorize.js
    - index.js
  - models
    - index.js

    - User.js
  - repo
    - index.js
    - user
  - routes
    - index.js
  - service
    - auth
    - user
  - utils
    - error.js
    - hashing.js
    - index.js
    - sendMail.js
    - verityJWT.js
  - app.js
  - index.js
- .env
- package.json

### Login or Register with google

1. for tokenObj .env GOOGLE_REDIRECT_URI_LOCAL= GOOGLE_REDIRECT_URI_LIVE= GOOGLE_CLIENT_ID= GOOGLE_CLIENT_SECRET= and install axios

2. (src/api/v1/controllers/loginOrRegisterWithGoogle.js) (src/service/auth/loginOrRegisterWithGoogle.js)

3. User.js (model) thirdPartyAuth="google"




Form Create flow:
1. have authenticated user should be active
2. department (optional) department comunicate with company
3. 