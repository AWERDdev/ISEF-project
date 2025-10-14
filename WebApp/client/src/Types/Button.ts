export type BUTTONPROPS = {
    ButtonText: string,
    onClick?: () => void,
    disabled?: boolean,
    children?: React.ReactNode,
    className?: string
}