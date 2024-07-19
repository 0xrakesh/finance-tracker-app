'use client'
import {Fragment, useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import Link from 'next/link'


type NavbarProps = {
    page:string
}

export default function Navbar({page}:NavbarProps){
    let [user,setUser]= useState<any>(false);
    useEffect(() => {
        userProfile();
    }, []);

    const userProfile = async() => {
        let response: Response = await fetch("/api/userprofile");
        let result = await response.json();
        setUser(result.status);
    }
    return (
        <Fragment>
            <div className="navbar flex gap-8 my-8">
                <Link href="/">
                    <Button variant={page==="home" ? "default" :"outline"}>Home</Button>
                </Link>
                <Link href={"/finance"}>
                    <Button variant={page==="finance" ? "default" : "outline"}>Transaction</Button>
                </Link>
                {
                    user ?
                        <Link href={"/api/auth/logout"}>
                            <Button variant={page==="login"?"default" : "outline"}>Log out</Button>
                        </Link>
                        :
                        <Link href={"/api/auth/login"}>
                            <Button variant={page==="login"?"default" : "outline"}>Log in</Button>
                        </Link>
                }

            </div>
        </Fragment>
    )
}