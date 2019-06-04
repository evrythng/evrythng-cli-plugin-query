'use strict';

const tq = require('thng-query');

module.exports = api => {
  const command = {
    about: 'Allows to use custom DSL for API queries',
    firstArg: 'query',
    operations: {
      run: {
        execute: run,
        pattern: 'run'
      },
      help: {
        execute: help,
        pattern: 'help'
      }
    }
  };

  setup(api.getConfig());
  api.registerCommand(command);
};

function run([,query]) {
  return tq.run(query)
    .then(results => console.log(JSON.stringify(results)));
}

function setup(config) {
  const operators = config.get('operators');
  const regions = config.get('regions');
  const using = config.get('using');

  const operator = operators[using];
  const apiUrl = regions[operator.region];
  const authorization = operator.apiKey;

  tq.setup({
    authorization,
    apiUrl
  });
}

function help() {
  console.log(`
thng-query is a custom DSL allowing to execute complex requests agains EVRYTHNG API
full documentation could be found at package's README.

Examples:
  evrythng query run "thngs named Consumer*"
  evrythng query run "products tagged Apparel where properties.scan_count>5000"
  evrytnhg query run "products where category=Consumables" | jq '.[] | { id }'
  evrythng query help  
  `);
}