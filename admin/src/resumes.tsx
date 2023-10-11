import { useMediaQuery, Theme } from "@mui/material";
import Grid from '@mui/material/Grid';
import {
    List, SimpleList, Datagrid, TextField, EmailField, EditButton,
    Show, SimpleShowLayout, ArrayField,
    Edit, TabbedForm, TextInput, ArrayInput, SimpleFormIterator,
    Create, ReferenceInput
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
            <TextField source="contact.firstname" label="First name" />
            <TextField source="contact.lastname" label="Last name" />
            <ArrayField source="skills">
                <Datagrid bulkActionButtons={false}>
                    <TextField source="content" />
                </Datagrid>
            </ArrayField>
            <ArrayField source="languages">
                <Datagrid bulkActionButtons={false}>
                    <TextField source="name" />
                    <TextField source="level" />
                </Datagrid>
            </ArrayField>
            <ArrayField source="experiences">
                <Datagrid bulkActionButtons={false}>
                    <TextField source="period" />
                    <TextField source="company" />
                    <TextField source="mission" />
                    <TextField source="role" />
                    <TextField source="content" />
                    <TextField source="stack" />
                </Datagrid>
            </ArrayField>
            <ArrayField source="formations">
                <Datagrid bulkActionButtons={false}>
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
        <TabbedForm>
            <TabbedForm.Tab label="contact">
                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        <TextInput source="contact.firstname" label="First name" />
                    </Grid>
                    <Grid item xs={2}>
                        <TextInput source="contact.lastname" label="Last name" />
                    </Grid>
                </Grid>
                <TextInput source="contact.title" label="Title" />
                <TextInput source="contact.address" label="Address" />
                <TextInput source="contact.email" label="Email" />
                <TextInput source="contact.phone" label="Phone" />
                <TextInput source="contact.website.text" label="Website's text" />
                <TextInput source="contact.website.url" label="Website's url" />
            </TabbedForm.Tab>
            <TabbedForm.Tab label="skills">
                <ArrayInput source="skills">
                    <SimpleFormIterator getItemLabel={index => `#${index + 1}`}>
                        <TextInput source="content" multiline rows={5} />
                    </SimpleFormIterator>
                </ArrayInput>
            </TabbedForm.Tab>
            <TabbedForm.Tab label="languages">
                <ArrayInput source="languages">
                    <SimpleFormIterator inline getItemLabel={index => `#${index + 1}`}>
                        <TextInput source="name" />
                        <TextInput source="level" />
                    </SimpleFormIterator>
                </ArrayInput>
            </TabbedForm.Tab>
            <TabbedForm.Tab label="experiences">
                <ArrayInput source="experiences">
                    <SimpleFormIterator fullWidth getItemLabel={index => `#${index + 1}`}>
                        <TextInput source="period" />
                        <TextInput source="company" />
                        <TextInput source="mission" />
                        <TextInput source="role" />
                        <TextInput source="body" multiline rows={5} />
                        <TextInput source="stack" />
                    </SimpleFormIterator>
                </ArrayInput>
            </TabbedForm.Tab>
            <TabbedForm.Tab label="formations">
                <ArrayInput source="formations">
                    <SimpleFormIterator inline getItemLabel={index => `#${index + 1}`}>
                        <TextInput source="period" />
                        <TextInput source="title" />
                        <TextInput source="school" />
                    </SimpleFormIterator>
                </ArrayInput>
            </TabbedForm.Tab>
            <TabbedForm.Tab label="hobbies">
                <TextInput source="hobbies.text" multiline rows={5} />
            </TabbedForm.Tab>
        </TabbedForm>
    </Edit>
);

export const ResumeCreate = () => (
    <Create>
        <TabbedForm>
            <TabbedForm.Tab label="contact">
                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        <TextInput source="contact.firstname" label="First name" required />
                    </Grid>
                    <Grid item xs={2}>
                        <TextInput source="contact.lastname" label="Last name" required />
                    </Grid>
                </Grid>
                <TextInput source="contact.title" label="Title" required />
                <TextInput source="contact.address" label="Address" />
                <TextInput source="contact.email" label="Email" required />
                <TextInput source="contact.phone" label="Phone" />
                <TextInput source="contact.website.text" label="Website's text" />
                <TextInput source="contact.website.url" label="Website's url" />
            </TabbedForm.Tab>
            <TabbedForm.Tab label="skills">
                <ArrayInput source="skills">
                    <SimpleFormIterator getItemLabel={index => `#${index + 1}`}>
                        <TextInput source="content" multiline rows={5} />
                    </SimpleFormIterator>
                </ArrayInput>
            </TabbedForm.Tab>
            <TabbedForm.Tab label="languages">
                <ArrayInput source="languages">
                    <SimpleFormIterator inline getItemLabel={index => `#${index + 1}`}>
                        <TextInput source="name" required />
                        <TextInput source="level" required />
                    </SimpleFormIterator>
                </ArrayInput>
            </TabbedForm.Tab>
            <TabbedForm.Tab label="experiences">
                <ArrayInput source="experiences">
                    <SimpleFormIterator fullWidth getItemLabel={index => `#${index + 1}`}>
                        <TextInput source="period" required />
                        <TextInput source="company" required />
                        <TextInput source="mission" required />
                        <TextInput source="role" required />
                        <TextInput source="body" required multiline rows={5} />
                        <TextInput source="stack" required />
                    </SimpleFormIterator>
                </ArrayInput>
            </TabbedForm.Tab>
            <TabbedForm.Tab label="formations">
                <ArrayInput source="formations">
                    <SimpleFormIterator inline getItemLabel={index => `#${index + 1}`}>
                        <TextInput source="period" />
                        <TextInput source="title" />
                        <TextInput source="school" />
                    </SimpleFormIterator>
                </ArrayInput>
            </TabbedForm.Tab>
            <TabbedForm.Tab label="hobbies">
                <TextInput source="hobbies.text" multiline rows={5} />
            </TabbedForm.Tab>
        </TabbedForm>
    </Create>
)