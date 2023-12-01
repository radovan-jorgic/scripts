import axios, { AxiosResponse } from "axios";
import * as readline from "readline";

const API_URL = "https://projectsapi.zoho.in/restapi";
const ACCOUNTS_URL = "https://accounts.zoho.in";
const CLIENT_ID = "1000.DIDR2WOZ3HZRLQJFS811YV6ZF2AFJY";
const CLIENT_SECRET = "0c4a618c70e420e4a019d1a4387cdfb746e12f16a0";
const REDIRECT_URI = "https://app.dev.devrev-eng.ai/login";

let accessToken = ""; // --> enter access token if you already have it

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export default async function zoho() {
  if (!accessToken) {
    try {
      const response = await createAccessTokenUsingCode();
      const { access_token } = response.data;

      console.log(`
          Access token: ${access_token}
        `);
    } catch (err) {
      console.error("Error while user authorization request", err);
    }
  }
}

async function getPortals(accessToken: string): Promise<AxiosResponse> {
  return axios.get(`${API_URL}/portals`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}

async function getAccessToken(refreshToken: string): Promise<AxiosResponse> {
  const URL = `${ACCOUNTS_URL}/oauth/v2/token?refresh_token=${refreshToken}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=refresh_token`;

  return axios.post(URL);
}

async function createAccessTokenUsingCode(): Promise<AxiosResponse> {
  const AUTH_URL = `${ACCOUNTS_URL}/oauth/v2/auth?scope=ZohoProjects.projects.ALL,ZohoProjects.tasks.ALL,ZohoProjects.portals.ALL&client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}`;

  console.log(`1. Open url: ${AUTH_URL}`);

  const CODE = await new Promise((resolve) =>
    rl.question("2. Enter code from url when Accept is clicked: ", resolve)
  );

  rl.close();

  const TOKEN_URL = `${ACCOUNTS_URL}/oauth/v2/token?code=${CODE}&redirect_uri=${REDIRECT_URI}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=authorization_code`;

  return axios.post(TOKEN_URL);
}
