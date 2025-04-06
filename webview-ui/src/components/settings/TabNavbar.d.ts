export declare const TAB_NAVBAR_HEIGHT = 24;
type TabNavbarProps = {
    onPlusClick: () => void;
    onHistoryClick: () => void;
    onSettingsClick: () => void;
};
declare const TabNavbar: ({ onPlusClick, onHistoryClick, onSettingsClick }: TabNavbarProps) => JSX.Element;
export default TabNavbar;
