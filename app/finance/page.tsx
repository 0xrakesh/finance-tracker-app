'use client';
import {Fragment, useState,useEffect} from 'react';
import Navbar from "@/components/Navbar";
import {Finance} from "@prisma/client";
import TransactionTable from "@/components/transactionTable";
import {Button} from "@/components/ui/button";
import Modal from "@/components/Modal";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {Progress} from "@/components/ui/progress";
import LoginPopUp from "@/components/LoginPopUp";

export default function Home() {

    let [transaction, setTransaction] = useState<Finance[]|null>([])
    let [modal, setModal] = useState<Boolean>(false)
    let [log,setLog] = useState<Boolean>(false)
    let [user, setUser] = useState<any>(false)
    const [loading, setLoading] = useState<boolean>(true);
    let [reload, setReload] = useState(false)

    const [formData, setFormData] = useState({
        purpose: '',
        category: '',
        amount: '',
        transactionDate: ''
    });

    const router = useRouter();

    const fetchData = async () => {
        let response: Response = await fetch("/api/finance");
        if(response.status==404) {
            setLog((prev:Boolean) => !prev)
            setLoading(false);
            return;
        }
        let result: {finance:Finance[]} = await response.json();
        setLoading(false);
        setTransaction(result.finance);
    }

    const userProfile = async() => {
        let response: Response = await fetch("/api/userprofile");
        if(response.status===404) return;
        let result = await response.json();
        setUser(result?.user);
    }

    const handleModal = () => {
        if(!user) {
            toast("Need to login",{
                description:"For adding an transaction, you should be login",
                action: {
                    label:"Login",
                    onClick: () => router.push("/api/auth/login")
                }
            });
            return;
        }
        setModal((prev:Boolean)=>!prev);
    }

    useEffect(() => {
        userProfile();
        fetchData();
    }, [reload]);

    return (
        <Fragment>

            <Navbar page={"finance"}/>
            {
                loading ? <Progress/> : user ?
                <Fragment>
                    {
                        transaction ? <TransactionTable transaction={transaction}/> : log ? <p>"Need to login for list out the transaction"</p> : null
                    }
                    <Button variant="destructive" onClick={handleModal}>Add new transaction</Button>
                    {modal ? <Modal formData={formData} setFormData={setFormData} setReload={setReload}/> : null}
                </Fragment> : <LoginPopUp/>
            }
        </Fragment>
    )
}