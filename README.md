# MaxReps

A MERN stack web application that allows users to create an account and record their daily workouts. 

## Try it out!

Deployed: http://maxreps.herokuapp.com/

Test Account Login (Disabled email change so no one can mess up the login.)
```
Email: test@maxreps.com
Password: 123
```

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the application

- git
- npm

### Installing

1. Clone the repo

```
git clone https://github.com/xjkbro/MaxReps.git
```

2. Open Project Folder

3. Install dependancies

```
npm run client-install      //installs client dependancies
npm install                 //installs server dependancies
```
4. Create .env

Copy and paste the following and replace keys
```
MONGO_URI=REPLACE_WITH_MONGODB_URI
JWTSECRET=REPLACE_WITH_SOME_KEY
NODE_ENV=DEVELOPMENT
```

5. Happy Testing! :)


## Built With

* HTML5
* CSS3
* TailwindCSS
* JavaScript
* React
* Context API
* Node.js
* Express
* MongoDB
* Mongoose
* JWT
* Passport

## Future improvements

* Allow users to post update statuses
* Allow users to add others to friends list
* Include auto complete functionality for name exercise
    - WGER?
    - Create an API?
* Create Communities section for users to connect with anyone that share the same gyms

## Contributors

* **Jason-Kyle De Lara** - *Initial work* - http://www.jkdelara.com/

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details

## Acknowledgments

* [Traversy Media - Learn The MERN Stack](https://www.youtube.com/playlist?list=PLillGF-RfqbbiTGgA77tGO426V3hRF9iE) - Project was initialized by YouTube Course/Tutorial
* [NoobCoder's MERN course that uses React's Context API](https://www.youtube.com/watch?v=H15hpteBdL8&list=PLvTjg4siRgU0HS3cANo7KZ52Wkud083TL)
* [Traversy Media - Passport Authentication Course](https://www.youtube.com/watch?v=6FOq4cUdH8k)
* [Traversy Media - JSON WEB TOKEN](https://www.youtube.com/watch?v=7nafaH9SddU)