export default async function Page({
  params,
}: {
  params: Promise<{ labid: string }>;
}) {
  const labid = (await params).labid;
  return <div>My Lab ID: {labid}</div>;
}
