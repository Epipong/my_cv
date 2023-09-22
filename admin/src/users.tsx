import { useMediaQuery, Theme } from "@mui/material";
import {
    List,
    SimpleList,
    Datagrid,
    TextField,
    EmailField,
    ReferenceField,
    EditButton,
    Edit,
    ReferenceInput,
    SimpleForm,
    TextInput
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

export const UserEdit = () => (
    <Edit>
        <SimpleForm>
            <ReferenceInput source="resume_id" reference="resumes" link="show" />
            <TextInput source="firstname" />
            <TextInput source="lastname" />
            <TextInput source="address" />
            <TextInput source="email" />
            <TextInput source="phone" />
        </SimpleForm>
    </Edit>
)