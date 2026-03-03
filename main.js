const fs = require('fs');

function readData(){
  if(!fs.existsSync('Data.json')) fs.writeFileSync('Data.json', '{}');
  const data = fs.readFileSync('Data.json');
  return JSON.parse(data);
}

function updateData(data){
  const jsonString = JSON.stringify(data, null, 2);
  fs.writeFileSync('Data.json', jsonString);
}

let data = readData();
let readed = process.argv.slice(2).join(' ');
readed += " ";

if(readed.split(' ')[0].toLowerCase() === 'add'){
  readed = readed.slice(readed.indexOf(' ') + 1);
  for(let i in data)
    if(data[i].description === readed){
      console.log('Task already exists!');
      return;
    }
  let newEntry = {
    "description": readed,
    "status": "todo",
    "createdAt": new Date().toISOString(),
    "updatedAt": new Date().toISOString()
  }
  data[(Object.keys(data).length + 1).toString()] = newEntry;
  updateData(data);
  console.log('Task added successfully (ID: ' + (Object.keys(data).length) + ')');
  return;
}
if(readed.split(' ')[0].toLowerCase() === 'update'){
  readed = readed.slice(readed.indexOf(' ') + 1);
  if(data[readed.split(' ')[0]] === undefined){
    console.log('Task not found!');
    return;
  };
  let id = readed.split(' ')[0];
  readed = readed.slice(readed.indexOf(' ') + 1);
  data[id].description = readed;
  data[id].updatedAt = new Date().toISOString();
  updateData(data);
  console.log('Task updated!');
  return;
}
if(readed.split(' ')[0].toLowerCase() === 'delete'){
  readed = readed.slice(readed.indexOf(' ') + 1);
  if(data[readed] === undefined){
    console.log('Task not found!');
    return;
  }
  delete data[readed];
  updateData(data);
  console.log('Task deleted!');
  return;
}
if(readed.split(' ')[0].split('-')[0].toLowerCase() === 'mark'){
  readed = readed.slice(readed.indexOf('-') + 1);
  let id = readed.split(' ')[1];
  if(data[id] === undefined){
    console.log('Task not found!');
    return;
  }
  data[id].status = readed.split(' ')[0];
  data[id].updatedAt = new Date().toISOString();
  updateData(data);
  console.log('Task marked as ' + readed.split(' ')[0] + '!');
  return;
}
if(readed.split(' ')[0].toLowerCase() === 'list'){
  if(data.length === 0){
    console.log('The list is empty!');
    return;
  }
  readed = readed.slice(readed.indexOf(' ') + 1);
  readed = readed.split(' ')[0];
  for(let i in data){
    if(data[i].status === readed || readed === '')
      console.log(i + ':' + data[i].description + 
      ' [' + data[i].status + ']\n' + 
      "Created at: " + data[i].createdAt + 
      '\nUpdated at: ' + data[i].updatedAt + '\n');
  }
  return;
}
console.log('Invalid command!');
