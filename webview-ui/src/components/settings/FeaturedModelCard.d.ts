import React from "react";
export interface FeaturedModelCardProps {
    modelId: string;
    description: string;
    onClick: () => void;
    isSelected: boolean;
    label: string;
}
declare const FeaturedModelCard: React.FC<FeaturedModelCardProps>;
export default FeaturedModelCard;
