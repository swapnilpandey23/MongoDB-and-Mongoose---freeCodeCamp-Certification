require('dotenv').config(); //Configuring dotenv file.
// If using replit you'd be using their tool - Secrets (shown below).
let mongoose = require('mongoose'); //Importing mongoose dependency.

//TASK- 1 Connect with database.
const mySecret = process.env['YOUR SECRET URI LINK HERE']; //importing secret key.
mongoose.connect(mySecret, { useUnifiedTopology: true, useNewUrlParser: true });

//TASK- 2 Create a schema and model instance.
const Schema = mongoose.Schema;
let personSchema = new Schema({
  name: String,
  age: Number,
  favoriteFoods: [String]
});
let Person = mongoose.model('Person', personSchema);

//TASK- 3 Create and save a record/row for the model.
const createAndSavePerson = (done) => {
  let person = new Person({ name: 'Swapnil Pandey', age: 24, favoriteFoods: ['pizza', 'taco', 'bruger'] });
  person.save(function(err, data) {
    if (err) {
      console.log(`Error at createAndSavePerson ${err}`);
    } else {
      console.log(data);
      done(null, data);
    }
  });

};

//TASK- 4 Create multiple records/rows.
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, data) {
    if (err) {
      console.log(`Error at createManyPeople ${err}`);
      done(err);
    } else {
      console.log(data);
      done(null, data);
    }
  })
};

/* TASK- 5 Find multiple documents.
NOTE - model.find() returns array of values.    */
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function(err, data) {
    if (err) {
      console.log(`Error at findPeopleByName ${err}`);
      done(err);
    } else {
      console.log(data);
      done(null, data);
    }
  })
};

/* TASK- 6 Find one document (suitable for documents with unique declaration)
model.findOne() is most suitable for documents saved with unique properties because it returns the first corresponding result of your query.  */
const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function(err, data) {
    if (err) {
      console.log(`Error at findOneByFood ${err}`);
      done(err);
    } else {
      console.log(data);
      done(null, data);
    }
  })
};

//TASK- 7 Use findById() to search your database by id.
const findPersonById = (personId, done) => {
  Person.findById({ _id: personId }, function(err, data) {
    if (err) {
      console.log(`Error at findPersonById ${err}`);
      done(err);
    } else {
      console.log(data);
      done(null, data);
    }
  })
};

//TASK- 8 Classic update operation.
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({ _id: personId }, function(err, data) {
    if (err) {
      console.log(`Error at findEditThenSave ${err}`);
      done(err);
    } else {
      data.favoriteFoods.push(foodToAdd);
      data.save().then((saveDocs) => {
        console.log(saveDocs)
        done(null, saveDocs);
      })
    }
  })
};

/*TASK- 9 Perform new updates on document using findOneAndUpdate()
Note - findOneAndUpdate() takes three args. ({search query},{data to be updated},
{new - Returns the updated document,
upsert - Create new if provided query not found,
runValidators - Run validations before updations,
etc.}
We can call the third argument as Update specific options.)
*/
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, function(err, data) {
    if (err) {
      console.log(`Error at findAndUpdate ${err}`);
      done(err);
    } else {
      console.log(data);
      done(null, data);
    }
  })
};

//TASK- 10 Remove a document.
const removeById = (personId, done) => {
  Person.findByIdAndRemove({ _id: personId }, function(err, data) {
    if (err) {
      console.log(`Error at removeById ${err}`);
      done(err);
    } else {
      console.log(data);
      done(null, data);
    }
  })
};

//TASK- 11 Remove many documents
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, function(err, data) {
    if (err) {
      console.log(`Error at removeManyPeople ${err}`);
      done(err);
    } else {
      console.log(data);
      done(null, data);
    }
  })
};

/*FINAL TASK- 12 Chain the query
find()   - Returns array of corresponding results.
sort()   - 1-> sorts in ascending fashion. 
         - 1-> sorts in descending fashion.
limit()  - limits the result to the number of results you pass            in it.
select() - to select the data you want to fetch.       
           {key:boolean}. 
exec()   - to execute the query made by query builder 
           method (see in code below).
*/
const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch }).sort({ name: 1 }).limit(2).select({ name: true }).exec(function(err, data) {
    if (err) {
      console.log(`Error at queryChain ${err}`);
      done(err);
    } else {
      console.log(data);
      done(null, data);
    }
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
