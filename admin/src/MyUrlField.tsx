import { useRecordContext } from "react-admin";
import { Link } from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";
import get from 'lodash/get';

const MyUrlField = ({ source }: { source: string }) => {
    const record = useRecordContext();
    const value = get(record, source);
    
    return record ? (
        <Link href={value?.url} sx={{ textDecoration: "none" }}>
            {value?.text}
            <LaunchIcon sx={{ fontSize: 15, ml: 1 }} />
        </Link>
    ) : null;
};

export default MyUrlField;