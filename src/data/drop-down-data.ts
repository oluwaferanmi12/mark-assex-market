import { BonusInterface, OrderInterface, TransactionInterface } from "@/interfaces/ui-interfac";

export const orderData: OrderInterface[] = [
    {
        currency: "EUR/USD",
        type: "Buy",
        orderType: "Market",
        executedPrice: 1.0845,
        amount: 1000,
        status: "Executed",
        createdAt: "10 Oct, 2025 14:10",
        profit: 12.54
    },
    {
        currency: "EUR/USD",
        type: "Buy",
        orderType: "Market",
        executedPrice: 1.0845,
        amount: 1000,
        status: "Executed",
        createdAt: "10 Oct, 2025 14:10",
        profit: 12.54
    },
    {
        currency: "EUR/USD",
        type: "Buy",
        orderType: "Market",
        executedPrice: 1.0845,
        amount: 1000,
        status: "Executed",
        createdAt: "10 Oct, 2025 14:10",
        profit: 12.54
    },
    {
        currency: "EUR/USD",
        type: "Buy",
        orderType: "Market",
        executedPrice: 1.0845,
        amount: 1000,
        status: "Executed",
        createdAt: "10 Oct, 2025 14:10",
        profit: 12.54
    }
]

export const transactionData: TransactionInterface[] = [
    {
        id: "1274597",
        amount: "220000",
        date: "10 Oct, 2025 14:10",
        paymentMethod: "Korahq",
        status: "Successful",
        type: "Deposit"

    },
    {
        id: "1274597",
        amount: "220000",
        date: "10 Oct, 2025 14:10",
        paymentMethod: "Korahq",
        status: "Successful",
        type: "Deposit"

    },
    {
        id: "1274597",
        amount: "220000",
        date: "10 Oct, 2025 14:10",
        paymentMethod: "Korahq",
        status: "Successful",
        type: "Deposit"

    },
    {
        id: "1274597",
        amount: "220000",
        date: "10 Oct, 2025 14:10",
        paymentMethod: "Korahq",
        status: "Successful",
        type: "Deposit"

    },
]

export const bonusData: BonusInterface[] = [
    { amount: 100, date: "10 Oct, 2025 14:10", expiryDate: "10 Oct, 2025 14:10", id: 'BNS 01', status: "Active", type: "Interest" },
    { amount: 100, date: "10 Oct, 2025 14:10", expiryDate: "10 Oct, 2025 14:10", id: 'BNS 01', status: "Active", type: "Interest" },
    { amount: 100, date: "10 Oct, 2025 14:10", expiryDate: "10 Oct, 2025 14:10", id: 'BNS 01', status: "Active", type: "Interest" },
    { amount: 100, date: "10 Oct, 2025 14:10", expiryDate: "10 Oct, 2025 14:10", id: 'BNS 01', status: "Active", type: "Interest" },
]