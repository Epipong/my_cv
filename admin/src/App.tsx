import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
} from "react-admin";
import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";
import { ResumeList}  from './resumes';

export const App = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider}>
    <Resource name="resumes" list={ResumeList} />
  </Admin>
);