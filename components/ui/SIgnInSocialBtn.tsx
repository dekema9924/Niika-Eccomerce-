import React from "react";


type SocialButtonProps = {
    providerName: string;
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    onClick: () => void;
    borderColor?: string;
    hoverBg?: string;
    className?: string;
};


const SigninSocialButton = ({ providerName, Icon, onClick, className = "" }: SocialButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-2.5 lg:py-3 mb-3 hover:bg-gray-50 transition text-sm lg:text-base ${className}`}
        >
            {Icon && <Icon className="w-4 h-4 lg:w-5 lg:h-5" />}
            <span className="font-medium">Continue with {providerName}</span>
        </button>
    );
};

export default SigninSocialButton;