import {
  Admin,
  Resource
} from "react-admin";
import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";
import { ResumeList, ResumeEdit, ResumeShow, ResumeCreate } from './resumes';
import { UserList, UserShow, UserEdit, UserCreate } from './users';

export const App = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider}>
    <Resource name="users" list={UserList} show={UserShow} edit={UserEdit} create={UserCreate} />
    <Resource name="resumes" list={ResumeList} recordRepresentation="contact.title" show={ResumeShow} edit={ResumeEdit} create={ResumeCreate} />
  </Admin>
);
