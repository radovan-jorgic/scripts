import axios, { AxiosResponse, AxiosError } from "axios";
import * as readline from "readline";

const API_URL = "https://projectsapi.zoho.in/restapi";
const ACCOUNTS_URL = "https://accounts.zoho.in";
const REDIRECT_URI = "https://app.dev.devrev-eng.ai/login";

const clientId = "1000.DIDR2WOZ3HZRLQJFS811YV6ZF2AFJY"; // enter client secret frpm zoho api console
const clientSecret = "0c4a618c70e420e4a019d1a4387cdfb746e12f16a0"; // enter correct client secret from zoho api console
let accessToken =
  "1000.3a0d7e82257ad5c43a0f25621a639442.97e79b6e5c310f0e1eab38b2febd3c10"; // enter valid access token, if you don't have it this script will generate it for you on npm start

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export default async function zoho() {
  if (accessToken) {
    const response = await getPortals(accessToken);

    console.log(response);
  } else {
    const response = await getAccessToken();
    console.log(response);
  }
}

async function getPortals(
  accessToken: string
): Promise<AxiosResponse<any, any> | AxiosError<any>> {
  try {
    const response = axios.get(`${API_URL}/portals`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return response;
  } catch (err: any) {
    return err;
  }
}

async function getAccessToken(): Promise<
  AxiosResponse<any, any> | AxiosError<any>
> {
  const AUTH_URL = `${ACCOUNTS_URL}/oauth/v2/auth?scope=ZohoProjects.projects.ALL,ZohoProjects.tasks.ALL,ZohoProjects.portals.ALL&client_id=${clientId}&response_type=code&redirect_uri=${REDIRECT_URI}`;

  console.log(`1. Open url: ${AUTH_URL}`);
  const CODE = await new Promise<string>((resolve) =>
    rl.question("2. Enter code: ", resolve)
  );
  rl.close();

  const TOKEN_URL = `${ACCOUNTS_URL}/oauth/v2/token?code=${CODE}&redirect_uri=${REDIRECT_URI}&client_id=${clientId}&client_secret=${clientSecret}&grant_type=authorization_code`;
  try {
    const response = axios.post(TOKEN_URL);
    return response;
  } catch (err: any) {
    return err;
  }
}
