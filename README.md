# Authentication API

---

## Table of contents

- Installation
- Usage
- Configuration
- Endpoints
- Testing
- Deployment
- Contributing
- License
- Contact Information

## Installation

1. Clone Repository

```
git clone git@github.com:Olumuyiwaray/payment-integration.git
```

2. Install dependencies

```
cd authentication-app
npm install
```

3. Set enviromental variables

```
MONGO_URI=mongo db database url
REDIS_HOST=redis host
REDIS_PORT= redis port
JWT_SECRET= your jwt secret key
JWT_EXPIRY= ypur jwt expiry date


```

## Usage

- Run development server:

```
npm run start:dev
```

## Configuration

- Redis is needed on development enviroment so needs to installed

- Update settings in the .env file.

## Endpoints

```
localhost:3000/
```

# Auth endpoints

1. Create a New User

URL: /auth/new

Method: POST

Description: Creates a new user in the system. role can only be [admins, student or CRM]

Request Body

username: string,
password: string,
role: string

2. Login user

URL: /auth/login

Method: POST

Description: Login user.

Request Body

username: string,
password: string

3. Logout user

URL: /auth/logout

Method: Get

Authorization: Bearer {your_token_here}

Description: logs out user

# User endpoints

1. Get User by ID

URL: /users/{id}

Method: GET

Description: Fetch a user by their unique ID.

2. Access rolebased route

URL: /users/rolename

Method: GET

Description: access a endpoint specific to that user, Admin has access to all endpoints.

## Testing

```
npm run test
```

## Deployment

1. Build for production:

```
npm run build
```

2. Start the production server:

```
npm run start:prod
```

# Contributing

Contributions are welcome! Please fork the repository and submit pull requests.

## License

This project is licensed under the MIT [License](https://github.com/Olumuyiwaray/blog-api/blob/main/LICENSE) - see the LICENSE file for details.

## Contact Information

For any questions or feedback, please contact [olumuyiwaray](https://github.com/Olumuyiwaray).
