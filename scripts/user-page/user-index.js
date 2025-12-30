import { getLoggedInUser } from "../login/usertoken.js";

if(!getLoggedInUser())
  window.location.href = '/html/login/login.html';

const userId = getLoggedInUser();


