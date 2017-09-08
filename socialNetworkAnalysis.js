var data = {
  f01: {
    name: "Alice",
    age: 15,
    follows: ["f02", "f03", "f04"]
  },
  f02: {
    name: "Bob",
    age: 20,
    follows: ["f05", "f06"]
  },
  f03: {
    name: "Charlie",
    age: 35,
    follows: ["f01", "f04", "f06"]
  },
  f04: {
    name: "Debbie",
    age: 40,
    follows: ["f01", "f02", "f03", "f05", "f06"]
  },
  f05: {
    name: "Elizabeth",
    age: 45,
    follows: ["f04"]
  },
  f06: {
    name: "Finn",
    age: 25,
    follows: ["f05"]
  }
};

//:::::::::::::::::::::::::::::::: Helper functions :::::::::::::::::::::::::::::::
function getName(index) {
  return data[index].name;
}
function maxValue(obj) {
  let key = Object.keys(obj).reduce(function(a, b){ return obj[a] > obj[b] ? a : b });
  return obj[key];
}
function sumOfFollowers(index) {
  return data[index].follows.length;
}
function getReach(arr) {
  let result = [];
  arr.forEach(function(currentValue){
    result.push(getName(currentValue) + ': ' + sumOfFollowers(currentValue));
  })
  return result;
}
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

// List everyone and for each of them,
// list the names of who they follow and who follows them
function printFollowers() {
  for (let i in data) {
    let name = getName(i);
    let followers = [];
    for(let c in data[i].follows) {
      followers[c] = getName(data[i].follows[c]);
    }
    console.log(name + "'s followers: " + followers);
  }
}

//Identify who follows the most people & over age(30)
function followsMost(overAge) {
  let age = 0;
  let msg = "";
  if(overAge !== undefined) {
    age = overAge;
    msg = "people over "+ age;
  }

  let totalFollows = [];
  let countFollows = {};
  for(let i in data) {
    data[i].follows.forEach(function(currentValue) {
      if(countFollows[currentValue] === undefined && data[i].age > age) {
        countFollows[currentValue] = 1;
      } else if(data[i].age > age){
        countFollows[currentValue] ++;
      }
    });
  }

  for (let i in countFollows) {
    if(countFollows[i] == maxValue(countFollows)) {
      console.log(getName(i), ': follows ', countFollows[i], msg);
    }
  }
}


//Identify who has the most followers & over age(30)
function hasMostFollowers(overAge) {
  let numFollowers = 0;
  let name = '';
  let age = 0;
  let msg = ".";

  if(overAge !== undefined) {
    age = overAge;
    msg = " over " + age;
  }

  for(let i in data) {
    if(data[i].follows.length > numFollowers && data[i].age > age) {
      name = data[i].name;
      numFollowers = data[i].follows.length;
    }
  }
  console.log(name + " has most follwers" + msg);
}


//List those who follow someone that doesn't follow them back
function soloFollow () {
  for(let i in data) {
    let listFollows = data[i].follows;
    listFollows.forEach(function(currentValue) {
      if(!data[currentValue].follows.includes(i)) {
        console.log(getName(i), 'follows' ,getName(currentValue), 'BUT' ,getName(currentValue), 'does not follow back.');
      }
    })
  }
}

//List everyone and their reach
//(sum of # of followers and # of followers of followers)
function everyoneReach() {
  for(let i in data) {
    console.log(getName(i),":" ,sumOfFollowers(i), getReach(data[i].follows));
  }
}



// TESTING
console.log("");
console.log("::::: List of EVERYONE's names with follows :::::");
printFollowers();
console.log("");

console.log("::::: List of who FOLLOWS the most people :::::");
followsMost();
console.log("");

console.log("::::: List of who has the most FOLLOWERS :::::");
hasMostFollowers();
console.log("");

console.log("::::: List of who has the most FOLLOWERS over 30 :::::");
hasMostFollowers(30);
console.log("");

console.log("::::: List of who has FOLLOWS the most people over 30 :::::");
followsMost(30);
console.log("");

console.log("::::: List of who follow someone that doesn't follow them BACK :::::");
soloFollow();
console.log("");

console.log("::::: List of everyone and their reach :::::");
console.log("(sum of # of followers and # of followers of followers)");
everyoneReach();
