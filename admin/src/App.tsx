import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
} from "react-admin";
import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";
import { ResumeList } from './resumes';
import { UserList, UserEdit } from './users';

export const App = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider}>
    <Resource name="users" list={UserList} show={ShowGuesser} edit={UserEdit} />
    <Resource name="resumes" list={ResumeList} recordRepresentation="contact.title" show={ShowGuesser} edit={EditGuesser} />
  </Admin>
);
