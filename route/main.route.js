const router = require('express').Router();
const fetch = require('node-fetch');

const getRandomNumber = (max) => Math.floor(Math.random() * (max - 1));
const requestIssues = async (name, filter = {}) => {
  const {
    milestone, state, sort, labels,
  } = filter;
  let url = ['https://api.github.com/repos', name, 'issues'].join('/');
  const params = [];
  if (milestone) {
    params.push(`milestone=${milestone}`);
  }
  if (state) {
    params.push(`state=${state}`);
  }
  if (labels) {
    params.push(`labels=${labels}`);
  }
  if (sort) {
    params.push(`sort=${sort}`);
  }

  if (params.length) {
    url += '?';
    url += params.join('&');
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  let result = await response.json();

  if (!Array.isArray(result) || (Array.isArray(result) && !result.length)) {
    result = 'Issues not found';
  }

  return result;
};

router.get('/', async (req, res) => {
  const responseOrgs = await fetch('https://api.github.com/organizations');
  const orgs = await responseOrgs.json();
  const { login } = orgs[getRandomNumber(orgs.length)];

  const responseRepos = await fetch(`https://api.github.com/orgs/${login}/repos`);
  const repos = await responseRepos.json();
  if (!Array.isArray(repos) || (Array.isArray(repos) && !repos.length)) {
    return 'Repos in org not found';
  }
  const { full_name } = repos[getRandomNumber(repos.length)];

  return await requestIssues(full_name, req.query);
});

module.exports = router;
