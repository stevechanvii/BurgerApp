# Burger App

Customize your own burger and ordered! This burger App allows you create your Burger, which will be saved in Firebase. The project created by React framework.

![Screenshot](/src/assets/burger_app_1.png)

## Getting Started

### Prerequisites

VS Code

### Installing

Firstly, the environment should be setup, please refer to React offical site: https://reactjs.org

Download the code, go to project root directory and install packages, dependencies
```
npm install
```

## Firebase setup
Create your own Realtime Firebase, and replace the baseURL in axios-order.js

In authentication, Sign-in method to enable email/password. 
In database, change the rules to
```
{
  "rules": {
    "ingredients": {
        ".read": true,
        ".write": true
      },
      "orders": {
        ".read": "auth != null",
        ".write": "auth != null",
        ".indexOn": ["userId"]
      }
  }
}
```


## Running the tests
```
npm start
```
![Screenshot](/src/assets/burger_app_2.png)


## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [React](https://reactjs.org/) - The web framework used


## Versioning

[V0.1] 11/Jan/2020
* Add and remove ingredients of the burger
* Make the order and the order summary will be upload to databse

[V0.1.2] 16/Jan/2020
* Implement customer contact form, authenticated and upload to database

[V0.2] 25/Jan/2020
* Introducing redux to manage the state
* Using middleware to request data asynchronously

## Authors

* **Danyang Chen** - *Initial work* - [SteveChanVII](https://github.com/stevechanvii/)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

