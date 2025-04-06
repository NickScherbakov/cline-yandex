import { UsageTransaction, PaymentTransaction } from "@shared/ClineAccount";
interface CreditsHistoryTableProps {
    isLoading: boolean;
    usageData: UsageTransaction[];
    paymentsData: PaymentTransaction[];
}
declare const CreditsHistoryTable: ({ isLoading, usageData, paymentsData }: CreditsHistoryTableProps) => import("react").JSX.Element;
export default CreditsHistoryTable;
