"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  const router = useRouter();

  const handleContinue = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md shadow-xl border border-gray-200">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Welcome to my Page
          </CardTitle>
          <CardDescription className="text-center text-gray-600 mt-2">
            I am Berkay. By clicking on continue, you will see Exercise 1.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button
            onClick={handleContinue}
            className="w-full"
          >
            Continue
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
