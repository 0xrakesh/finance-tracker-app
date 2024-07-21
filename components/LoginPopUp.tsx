import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {Fragment} from "react";

export default function LoginPopUp() {
    return (
        <Fragment>
            <Alert>
                <AlertTitle>Alert</AlertTitle>
                <AlertDescription>
                    To access the website, you need to login.
                </AlertDescription>
            </Alert>

        </Fragment>
    )
}