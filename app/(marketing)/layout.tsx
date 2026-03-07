import Image from "next/image";
import bg from "@/public/bg/bg.png";




export default function MarketingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
       <div className="relative min-h-screen flex flex-col">
            <div className="fixed inset-0 z-0 pointer-events-none">
                <Image
                    src={bg}
                    fill
                    alt="Medical pattern background"
                    className="opacity-10 object-cover"
                    priority
                />
            </div>
            
            <div className="relative z-10 flex-grow">
                {children}
            </div>
        </div>
    );
}