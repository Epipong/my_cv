import { useMediaQuery, Theme } from "@mui/material";
import Grid from '@mui/material/Grid';
import {
    List, SimpleList, Datagrid, TextField, EmailField, ReferenceField, EditButton,
    Edit, ReferenceInput, SimpleForm, TextInput,
    Show, SimpleShowLayout, Create
} from "react-admin";

export const UserList = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
    return (
        <List>
            {isSmall ? (
                <SimpleList
                    primaryText={record => `${record.firstname} ${record.lastname}`}
                    secondaryText={record => record.phone}
                    tertiaryText={record => record.email}
                />
            ) : (
                <Datagrid rowClick="show">
                    <TextField source="id" />
                    <ReferenceField source="resume_id" reference="resumes" link="show" />
                    <TextField source="firstname" />
                    <TextField source="lastname" />
                    <EmailField source="email" />
                    <TextField source="phone" />
                    <EditButton />
                </Datagrid>
            )}
        </List>
    );
};

export const UserShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="firstname" label="First name" />
            <TextField source="lastname" label="Last name" />
            <EmailField source="email" />
            <TextField source="address" />
            <TextField source="phone" />
            <ReferenceField source="resume_id" reference="resumes" link="show" />
        </SimpleShowLayout>
    </Show>
);

export const UserEdit = () => (
    <Edit>
        <SimpleForm>
            <ReferenceInput source="resume_id" reference="resumes" link="show" />
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <TextInput source="firstname" label="First name" />
                </Grid>
                <Grid item xs={2}>
                    <TextInput source="lastname" label="Last name" />
                </Grid>
            </Grid>
            <TextInput source="address" />
            <TextInput source="email" />
            <TextInput source="phone" />
        </SimpleForm>
    </Edit>
);

export const UserCreate = () => (
    <Create>
        <SimpleForm>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <TextInput source="firstname" label="First name" />
                </Grid>
                <Grid item xs={2}>
                    <TextInput source="lastname" label="Last name" />
                </Grid>
            </Grid>
            <TextInput source="address" />
            <TextInput source="email" />
            <TextInput source="phone" />
        </SimpleForm>
    </Create>
);
