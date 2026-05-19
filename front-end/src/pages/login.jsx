import LoginForm from "../components/auth/loginForm";
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card"

export default function Login() {
    return (
        <section className="flex flex-col w-full min-h-screen justify-center items-center p-10">
            <Card className="w-fit">
                <CardHeader className="text-2xl">
                    Login
                </CardHeader>
                <CardContent>
                    <div className="w-lg"><LoginForm></LoginForm></div>
                </CardContent>
            </Card>
        </section>
    )
}