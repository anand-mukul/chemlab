import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const user = await currentUser();

  if (!user || !user.id) {
    redirect(`/sign-in`);
  }
  return (
    <div className="flex-1 justify-between flex flex-col h-[calc(100vh-3.5rem)">
      <h1>Lab {id}</h1>
      <h2 className="text-2xl font-bold">Hey, {user.firstName}</h2>
    </div>
  );
}
