'use client';
import {Fragment, useState} from "react";
import Login from "@/components/ui/login"
import { Input } from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import Navbar from "@/components/Navbar";
import {TabsContent} from "@/components/ui/tabs";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

export default function Home() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const router = useRouter();

    const handleEmail = (event:any) => {
        setEmail(event.target.value);
    }

    const handlePassword = (event:any) => {
        setPassword(event.target.value);
    }

    const handleUsername = (event:any) => {
        setUsername(event.target.value);
    }

    const handleSignUp = async () => {
        if(!username || !password || !email) {
            toast.error("Please enter all the fields");
            return;
        }
        let response = await fetch("/api/signup", {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email:email,name:username, password:password }),
        });
        if(response.status===401) {
            toast.error("Email address already exist.");
            return;
        }
        setUsername("");
        setEmail("");
        setPassword("");
        let result = await response.json();
        if(result.status === "success") {
            router.push("/login");
        }
    }

    const handleLogin = async () => {
        if(!email || !password){
            toast.error("Please enter a valid email address");
            return;
        }
        let response = await fetch("/api/login", {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email:email, password:password }),
        });
        setEmail("");
        setPassword("");
        if(response.status===401) {
            toast.error("Invalid email or password");
            return;
        }
        if(response.status===404) {
            toast.error("Invalid password.");
            return;
        }
        let result = await response.json();
        if(result.token) {
            localStorage.setItem("authToken",result.token);
            router.push("/");
        }

    }

    return (
        <Fragment>
            <Navbar page={"/login"}/>
            <Login>
                <TabsContent value="login">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-center">Sign in</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div>
                                <div className="my-2">
                                    <h1 className="my-2 font-medium">Email Address</h1>
                                    <Input placeholder="finance@gmail.com" value={email} onChange={handleEmail} />
                                </div>
                                <div className="my-2">
                                    <h1 className="my-2 font-medium">Password</h1>
                                    <Input placeholder="********" type={"password"} value={password} onChange={handlePassword} />
                                </div>
                                <div className="mt-5 text-center">
                                    <Button onClick={handleLogin}>Sign in</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="signup">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-center">Create an account</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div>
                                <div className="my-2">
                                    <h1 className="my-2 font-medium">Name</h1>
                                    <Input placeholder="rakesh kumar" value={username} onChange={handleUsername}/>
                                </div>
                                <div className="my-2">
                                    <h1 className="my-2 font-medium">Email Address</h1>
                                    <Input placeholder="finance@gmail.com" value={email} onChange={handleEmail}/>
                                </div>
                                <div className="my-2">
                                    <h1 className="my-2 font-medium">Password</h1>
                                    <Input placeholder="********" type={"password"} value={password} onChange={handlePassword}/>
                                </div>
                                <div className="mt-5 text-center">
                                    <Button onClick={handleSignUp}>Sign up</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

            </Login>
        </Fragment>
    )
}