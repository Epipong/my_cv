import { useMediaQuery, Theme } from "@mui/material";
import {
    List, SimpleList, Datagrid, TextField, EmailField, EditButton,
    Show, SimpleShowLayout, ArrayField,
    Edit, SimpleForm, TextInput, ArrayInput, SimpleFormIterator
} from "react-admin";
import MyUrlField from './MyUrlField';

export const ResumeList = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
    return (
        <List>
            {isSmall ? (
                <SimpleList
                    primaryText={record => `${record.contact.firstname} ${record.contact.lastname}`}
                    secondaryText={record => record.contact.title}
                    tertiaryText={record => record.contact.email}
                />
            ) : (
                <Datagrid rowClick="show">
                    <TextField source="id" />
                    <TextField source="contact.firstname" />
                    <TextField source="contact.lastname" />
                    <EmailField source="contact.email" />
                    <TextField source="contact.address" />
                    <TextField source="contact.phone" />
                    <MyUrlField source="contact.website" />
                    <EditButton />
                </Datagrid>
            )}
        </List>
    );
};

export const ResumeShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="contact.firstname" />
            <ArrayField source="skills">
                <Datagrid>
                    <TextField source="content" />
                </Datagrid>
            </ArrayField>
            <ArrayField source="languages">
                <Datagrid>
                    <TextField source="name" />
                    <TextField source="level" />
                </Datagrid>
            </ArrayField>
            <ArrayField source="experiences">
                <Datagrid>
                    <TextField source="period" />
                    <TextField source="company" />
                    <TextField source="mission" />
                    <TextField source="role" />
                    <TextField source="content" />
                    <TextField source="stack" />
                </Datagrid>
            </ArrayField>
            <ArrayField source="formations">
                <Datagrid>
                    <TextField source="period" />
                    <TextField source="title" />
                    <TextField source="school" />
                </Datagrid>
            </ArrayField>
            <TextField source="hobbies.text" />
        </SimpleShowLayout>
    </Show>
);

export const ResumeEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="contact.firstname" />
            <TextInput source="contact.lastname" />
            <TextInput source="contact.title" />
            <TextInput source="contact.phone" />
            <TextInput source="contact.email" />
            <TextInput source="contact.address" />
            <TextInput source="contact.website.url" />
            <TextInput source="contact.website.text" />
            <ArrayInput source="skills">
                <SimpleFormIterator>
                    <TextInput source="content" />
                </SimpleFormIterator>
            </ArrayInput>
            <ArrayInput source="languages">
                <SimpleFormIterator>
                    <TextInput source="name" />
                    <TextInput source="level" />
                </SimpleFormIterator>
            </ArrayInput>
            <ArrayInput source="experiences">
                <SimpleFormIterator>
                    <TextInput source="period" />
                    <TextInput source="company" />
                    <TextInput source="mission" />
                    <TextInput source="role" />
                    <TextInput source="body" />
                    <TextInput source="stack" />
                </SimpleFormIterator>
            </ArrayInput>
            <ArrayInput source="formations">
                <SimpleFormIterator>
                    <TextInput source="period" />
                    <TextInput source="title" />
                    <TextInput source="school" />
                </SimpleFormIterator>
            </ArrayInput>
            <TextInput source="hobbies.text" />
        </SimpleForm>
    </Edit>
);