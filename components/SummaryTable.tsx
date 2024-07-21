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

type TransactionType = {
    category: string,
    _sum: {
        amount: number
    }
}

type TransactionTableProps = {
    transaction: TransactionType[] | undefined;
};

export default function SummaryTable({transaction}:TransactionTableProps) {

    return (
        <Fragment>
            <Table className="my-8">
                <TableCaption>A list of your invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-center text-black font-bold">Category</TableHead>
                        <TableHead className="text-center text-black font-bold">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                {
                    transaction !== undefined ? transaction.map((trans:TransactionType,index:number) => {
                        return (
                            <TableBody key={index}>
                                <TableRow>
                                    <TableCell className="text-center">{trans.category}</TableCell>
                                    <TableCell className="text-center">{trans._sum.amount}</TableCell>
                                </TableRow>
                            </TableBody>
                            )
                    }) : null
                }
            </Table>
        </Fragment>
    )
}