import React from "react";
interface CreditLimitErrorProps {
    currentBalance: number;
    totalSpent: number;
    totalPromotions: number;
    message: string;
}
declare const CreditLimitError: React.FC<CreditLimitErrorProps>;
export default CreditLimitError;
