import RegisterForm from "../components/auth/registerForm";
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card"

export default function Register() {
    return (
        <>
            
            <section className="flex flex-col w-full min-h-screen justify-center items-center p-10">
                <Card className="w-fit">
                    <CardHeader className="text-2xl">
                        Register
                    </CardHeader>
                    <CardContent>
                        <div className="w-lg"><RegisterForm /></div>
                    </CardContent>
                </Card>
            </section>
        </>
    )
}