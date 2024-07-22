'use client';
import {Fragment, useState, useEffect} from 'react';
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

    let [transaction, setTransaction] = useState<Finance[]|null>([]);
    let [modal, setModal] = useState<Boolean>(false);
    let [log, setLog] = useState<Boolean>(false);
    let [user, setUser] = useState<any>(false);
    const [loading, setLoading] = useState<boolean>(true);
    let [reload, setReload] = useState(false);

    const [formData, setFormData] = useState({
        purpose: '',
        category: '',
        amount: '',
        transactionDate: ''
    });

    const router = useRouter();

    const fetchData = async () => {
        if(!(localStorage.getItem("authToken"))) return;
        let response = await fetch("/api/finance",{
            method:"GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": localStorage.getItem("authToken") || ""
            }
        });
        if (response.status === 404) {
            setLog((prev) => !prev);
            setLoading(false);
            return;
        }
        let result = await response.json();
        setLoading(false);
        setTransaction(result.finance);
    }

    const userProfile = async () => {
        let token = localStorage.getItem("authToken");
        if (!token) return;
        let response = await fetch("/api/userprofile", {
            method: "GET",
            headers: {
                authorization: token
            },
        });
        let result = await response.json();
        setUser(result?.user);
    }

    const handleModal = () => {
        if (!user) {
            toast("Need to login", {
                description: "For adding a transaction, you should be logged in",
                action: {
                    label: "Login",
                    onClick: () => router.push("/api/login")
                }
            });
            return;
        }
        setModal((prev) => !prev);
    }

    useEffect(() => {
        userProfile();
        fetchData();
    }, [reload]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Perform client-side only actions here
        }
    }, []);

    return (
        <Fragment>
            <Navbar page={"/finance"} />
            {
                loading ? <Progress /> : user ?
                    <Fragment>
                        {
                            transaction ? <TransactionTable transaction={transaction} /> : log ? <p>Need to login for listing out the transactions</p> : null
                        }
                        <Button variant="destructive" onClick={handleModal}>Add new transaction</Button>
                        {modal ? <Modal formData={formData} setFormData={setFormData} setReload={setReload} /> : null}
                    </Fragment> : <LoginPopUp />
            }
        </Fragment>
    )
}
