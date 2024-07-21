import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {Fragment} from "react";
import {Finance} from "@prisma/client";

type TransactionTableProps = {
    transaction: Finance[];
};

export default function TransactionTable({transaction}:TransactionTableProps) {

    return (
        <Fragment>
            <Table className="my-8">
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-black font-bold">Date</TableHead>
                        <TableHead className="text-black font-bold">Purpose</TableHead>
                        <TableHead className="text-black font-bold">Category</TableHead>
                        <TableHead className="text-right text-black font-bold">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                {
                    transaction.map((trans:Finance,index:number) => {
                        let date = new Date(trans.transactionDate).toDateString();
                        return (
                            <TableBody key={index}>
                                <TableRow>
                                    <TableCell className="font-medium">{date}</TableCell>
                                    <TableCell>{trans.purpose}</TableCell>
                                    <TableCell>{trans.category}</TableCell>
                                    <TableCell className="text-right">₹{trans.amount}</TableCell>
                                </TableRow>
                            </TableBody>
                            )
                    })
                }
            </Table>
        </Fragment>
    )
}