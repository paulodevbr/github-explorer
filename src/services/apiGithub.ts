import axios from 'axios';

const apiGithub = axios.create({
  baseURL: process.env.REACT_APP_API_GITHUB_URL,
  headers: {
    Accept: 'application/vnd.github.v3+json',
  },
});

export default apiGithub;
