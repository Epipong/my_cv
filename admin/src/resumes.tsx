import { useMediaQuery, Theme } from "@mui/material";
import { List, SimpleList, Datagrid, TextField, EmailField, EditButton } from "react-admin";
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