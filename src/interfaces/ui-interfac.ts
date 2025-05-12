export interface ButtonInterface {
    text: string;
    loading: boolean;
    action: ()=> void;
    icon ?: string;
    iconPosition ?: "right" | "left"
    variant: 'green-bg' | 'grey-bg' | 'plain' | 'blue-bg' | 'white-bg' | 'green-bg-faded' | 'red-bg' | 'green-faded-border' | 'red-faded-border' 
    fullRounded ?: boolean;
    fullWidth ?: boolean;
    type?: 'button' | 'submit';
    buttonSmaller ?: boolean
    textBolder ?: boolean
}

export interface NavObjectInterface {
    text: string,
    activeIcon: string,
    inactiveIcon: string,
    clickAction: () => void,
    slug:string
}