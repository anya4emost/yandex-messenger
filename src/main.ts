import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';

const pages = {
  'login': [Pages.LoginPage],
  'chats': [ Pages.ChatsPage, {chatName: 'Мама'} ],
  'nav': [Pages.NavigatePage],
  'registration': [Pages.RegistrationPage],
  'profile': [Pages.ProfilePage, { name: 'Анна', nikname: 'mikhanvl', phone: '8-985-234-12-34', birthday: '18.03.2004' }],
  'change-password': [Pages.ChangePasswordPage, { name: 'Анна', nikname: 'mikhanvl', phone: '8-985-234-12-34', birthday: '18.03.2004' }],
  'not-found': [Pages.NotFoundPage],
  'server-error': [Pages.ServerErrorPage],
};

Object.entries(Components).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component);
});

function navigate(page: string) {
  //@ts-ignore
  const [source, context] = pages[page];
  const container = document.getElementById('app');
  if (container) {
    container.innerHTML = Handlebars.compile(source)(context);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  return navigate('nav');
});

document.addEventListener('click', e => {
  //@ts-ignore
  const page = e.target.getAttribute('page');
  if (page) {
    navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
})

// Handlebars.registerPartial('button', button);

// const templ = "<a>Ссылка</a>Name: {{name}}";

// document.addEventListener('DOMContentLoaded', () => {
//   const root = document.querySelector('#app');

//   const template = Handlebars.compile(templ);

//   const result = template({ name: 'John1' });

//   root.innerHTML = result;
// })