'use client';
import {Fragment,useEffect,useState} from 'react';
import Navbar from "@/components/Navbar";
import {Component} from "@/components/Chart"
import SummaryTable from "@/components/SummaryTable";
import {Progress} from "@/components/ui/progress";
import LoginPopUp from "@/components/LoginPopUp";


export default function Home() {
    type FetchData = {
        message:string
    }
    type UserInterface = {
        id: number,
        name: string,
        email: string,
        password: string,
        phone:string|undefined,
        image:string
    }

    type TransactionType = {
        category: string,
        _sum: {
            amount: number
        }
    }

    let [user,setUser]= useState<boolean>(false);
    useEffect(() => {
        userProfile();
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

    const [transaction,setTransaction] = useState<TransactionType[]>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        let fetchData = async() => {
            let response = await fetch("/api/dashboard");
            let result = await response.json();
            setLoading(false);
            setTransaction(result.finance);
        }
        fetchData();
    },[])

    return (
        <Fragment>
            <Navbar page={"/"}/>
            {loading ? <Progress/> : user ?
                <Fragment>
                    {
                        transaction !== undefined ? <Component transaction={transaction}/> : null
                    }

                    {
                        transaction !== undefined ? <SummaryTable transaction={transaction}/> : null
                    }
                </Fragment> : <LoginPopUp/>
            }


        </Fragment>
    );
}
