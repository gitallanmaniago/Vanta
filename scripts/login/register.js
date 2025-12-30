import { User } from "../../data/user/User.js";
import dayjs from 'dayjs';

const user = new User('Users');

const registerElem = document.querySelector('.js-register-button');
const emailElem = document.querySelector('.js-email-register');
const passElem = document.querySelector('.js-password-register');
const nameElem = document.querySelector('.js-name-register');
const surnameElem = document.querySelector('.js-surname-register');

registerElem.addEventListener('click', () => {
  userInput();
});

function userInput(){
 
  const email = emailElem.value;
  const password = passElem.value;
  const name = nameElem.value;
  const surname = surnameElem.value;
  const created_on = dayjs().format('YYYY-MM-DD HH:mm');
  const isUser = 1;
  const isActive = true;
  let tempValue = [email, password, name, surname];

  if(fieldChecker(tempValue)) {
    user.insertUser({
      id: Math.random(),
      email,
      password,
      name,
      surname,
      created_on,
      isUser,
      isActive
    });
  }
}

function fieldChecker(data) {
  let result = 0;
  data.forEach((field, index) => {
    const errorElem = document.querySelector(`.js-field-${index}`);
    if(field.trim() === '') {
      result++;
      errorElem.classList.remove('hidden');
    } else
      errorElem.classList.add('hidden');
  });
  
  return result === 0 ? true : false;
}