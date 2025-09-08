"use client";


import { PageHeader } from "@/components/ui/text/page-header";
import React from "react";
import { TransactionTable } from "@/components/ui/tables/transaction/transaction-table";


const Transaction = () => {


  return (
    <>
      <PageHeader text="Transaction History" />
      <div className="my-4">
        <div className="mt-4">
          <TransactionTable />
        </div>
      </div>
    </>
  );
};

export default Transaction;
