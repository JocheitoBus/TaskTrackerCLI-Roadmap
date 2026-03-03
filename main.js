const readline = require('node:readline/promises');
const { stdin: input, stdout: output } = require('node:process');

async function ask(message) {
  const rl = readline.createInterface({ input, output });
  const x = await rl.question(message);
  rl.close();
  return x;
}

async function main(){
    
}

main()