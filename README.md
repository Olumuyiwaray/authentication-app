# Authentication API

---

## Table of contents

- Installation
- Usage
- Configuration
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
