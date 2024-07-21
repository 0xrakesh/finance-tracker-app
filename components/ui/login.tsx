import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

import {Props} from "next/script";
import {Fragment} from "react";

export default function login({children}: Props) {
    return (
        <Fragment>
            <Tabs defaultValue="login" className="w-[400px]">
                <TabsList>
                    <TabsTrigger value="login">Sign in</TabsTrigger>
                    <TabsTrigger value="signup">Sign up</TabsTrigger>
                </TabsList>
                {children}
            </Tabs>

        </Fragment>
    )
}