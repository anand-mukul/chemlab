"use client";
import { ProjectCard } from "./_components/ProjectCard";
import { CreateCard } from "./_components/CreateCard";
import { CrumpledPaperIcon } from "@radix-ui/react-icons";
import { ProjectCardSkeleton } from "./_components/ProjectCardSkeleton";
import { useAuth } from "@/contexts/authContext";
import LoadingPage from "@/components/global/LoadingPage";

export default function Dashboard() {
  const { user, loading, refreshUser } = useAuth();

  if (loading) return <LoadingPage />;
  
  const card = [
    {
      title: "Codeblocks design",
      image: "/placeholder.svg?height=200&width=400",
      date: "2 days ago",
      likes: 3,
      shares: 1,
    },
    {
      title: "New design",
      image: "/dashboard-preview.png?height=200&width=400",
      date: "2 days ago",
      likes: 3,
      shares: 1,
    },
  ];

  return (
    <div className="space-y-8">
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <CrumpledPaperIcon className="w-5 h-5 text-purple-500" />
            <h2 className="text-xl font-semibold">Experiments</h2>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <CreateCard title="virtual lab" />
          {card.length === 0 ? (
            <>
              <ProjectCardSkeleton />
              <ProjectCardSkeleton />
              <ProjectCardSkeleton />
            </>
          ) : (
            card.map((item, index) => (
              <ProjectCard
                key={index}
                title={item.title}
                image={item.image}
                date={item.date}
                likes={item.likes}
                shares={item.shares}
              />
            ))
          )}
        </div>
      </section>
    </div>
  );
}
