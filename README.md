# Node ES6 Patterns
*Disclaimer: This is a work in progress and a work of opinion. These are the patterns I have found to be most helpful for keeping my work organized and maintainable. If you feel anything I have written is wrong or could be done in a better way, feel free to recommend changes. Do not be offended if I choose not to implement suggestions.*

This is a node project that has a few patterns I like to follow to keep my projects organized.

## Setup
There are a few configuration items that make these things work. 

### Testing
I used Mocha and Chai for testing, and in order to set up mocha to use some of the ES6 syntax, we need to specify that in the test script. 

Install the following locally. (These are already included in this project)

```
npm install --save-dev babel-core
npm install --save-dev babel-preset-env
```

Make sure you include this in your package.json.

```
"babel": {
    "presets": [
      "env"
    ]
  }
```

Finally, set up your `test` script.
```
"test": "mocha --require babel-core/register test/**/*.test.js"
```

This script assumes all your tests will be under your `/test` directory found in the root of your project, and that those tests files end with `*.test.js`. You can build whatever file structure under test you would like, but I like my structure to follow the same structure as my project. That way tests are easy to locate.

## Modules

Modules follow a class based exporting paradigm. Class instantiation is used to assist with dependency injection. This allows for TDD and testing in general to be much more straight-forward, only occasionally requiring the use of mocking or stubbing libraries. This is beneficial because mocking and stubbing utilities can sometime do a lot under the hood, which makes it so the tests are not always easy to read for documentation purposes. 

There should be an attempt to avoid state variables (other than dependencies) to encourage functional design principles. This will help keeping the code maintainable. This would mean you should avoid using caches or state objects that change over time. If those things are required, write a helper module and inject it as a dependency at module instantiation.

### Service Modules
Service modules are modules that interact with some external resource.

/services/userDatabase/index.js

```

export default class UserDatabaseService extends Service{
    constructor(/*connection object*/){
        //set up connection
    }

    getUserById(id){
        // search user store and return user object.
    }
}

```

This pattern allows for the quick changing of store objects, along with easily mocking or stubbing the database.

### Route Modules
Route modules are modules that represent a set of APIs at the end of a path. For example, you might create a API for User CRUD operations. This module might look like this.

/routes/user/index.js
```
export default class UserRoute extends Route{
    constructor(userDB){
        this.db = userDB;
    }
    // handle '/' calls
    Index(req, res){
        res.json(/*user list*/);
    }

    Create(req, res){
        // create a new user
        res.status(200).send();
    }
    ...
}

```
Notice how we are following dependency injects patterns here as well. This is to ensure testing patterns are similar across the project. 
Your also not hooked up to the express router yet. This will be done in one file where you specify all your routes and associate handlers with those routes. 

/routes/index.js
```
import router from 'express'
import UserRoute from './user/'
import UserDatabaseService from '../services/userDatabseService/'

let userRoute = new UserRoute(new UserDatabaseService(/*connection object*/));

router.get('/user/', userRoute.Index);
...

export router

```

This keeps all routes and handler associations in one place for easy lookup. There should be very little logic in your route/handler association file, since testing this logic would be hard without extensive mocking and stubbing. It also makes it difficult to write unit tests there as well, instead you would end up writing more end to end or integration type tests. Those are important, but we want to keep those tests separate from unit tests.
This pattern, as you might have noticed, centralizes the connecting of all the separate modules. You know where all the main components connect together.


