import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
} from "react-admin";
import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";
import { ResumeList, ResumeEdit, ResumeShow } from './resumes';
import { UserList, UserEdit, UserShow } from './users';

export const App = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider}>
    <Resource name="users" list={UserList} show={UserShow} edit={UserEdit} />
    <Resource name="resumes" list={ResumeList} recordRepresentation="contact.title" show={ResumeShow} edit={ResumeEdit} />
  </Admin>
);
