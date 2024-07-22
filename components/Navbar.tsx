'use client'
import {Fragment, useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import Link from 'next/link'

type Props = {
    page: string|null
}

export default function Navbar({page}:Props){
    let [user,setUser]= useState<any>(false);

    useEffect(() => {
        userProfile().then(r => console.log());
    }, []);

    const userProfile = async() => {
        let token = localStorage.getItem("authToken");
        if(!token) return;
        let response:Response = await fetch("/api/userprofile",{
            method:"GET",
            headers : {
                authorization:token
            },
        });
        let result = await response.json();
        setUser(result?.user);
    }

    const logout = async() => {
        localStorage.clear();
        window.location.href="/"
    }

    return (
        <Fragment>
            <div className="navbar flex gap-8 my-8">
                <Link href="/">
                    <Button variant={page==="/" ? "default" :"outline"}>Home</Button>
                </Link>
                <Link href={"/finance"}>
                    <Button variant={page==="/finance" ? "default" : "outline"}>Transaction</Button>
                </Link>
                {
                    user ?
                        <Link href={"/"}>
                            <Button onClick={logout} variant={page==="/logout"?"default" : "outline"}>Log out</Button>
                        </Link>
                        :
                        <Link href={"/login"}>
                            <Button variant={page==="/login"?"default" : "outline"}>Log in</Button>
                        </Link>
                }

            </div>
        </Fragment>
    )
}
