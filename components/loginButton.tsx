'use client';
import {Fragment} from 'react';
import {Button} from "@/components/ui/button"
import Link from 'next/link'

export default function LoginButton() {
    return (
        <Fragment>
            <Button><Link href={"/api/auth/login"}>Login</Link></Button>
        </Fragment>
    )
}