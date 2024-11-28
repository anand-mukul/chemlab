"use client";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import MaxWidthWrapper from "@/components/global/MaxWidthWrapper";
import { Vortex } from "@/components/ui/vortex";
import { ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";

export default function Home() {
  const { isSignedIn } = useAuth();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, [theme]);

  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-black/85 text-gray-800 dark:text-gray-200">
      {/* Head Section */}
      <Head>
        <title>ChemLabs - Advancing Science Through Chemistry</title>
        <meta
          name="description"
          content="Discover cutting-edge research, analysis, and chemistry solutions with ChemLab's state-of-the-art services."
        />
      </Head>
      <div>
        <div className="w-[calc(100%-4rem)] mx-auto rounded-md  h-[30rem] overflow-hidden z-[-10]">
          <Vortex
            backgroundColor="transparent"
            className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
          >
            <MaxWidthWrapper className="mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center">
              <div>
                <p className="mx-auto mb-4 max-w-fit items-center justify-center relative inline-flex h-10 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-100 dark:bg-slate-950 px-3 py-1 text-sm font-medium text-black dark:text-white backdrop-blur-3xl">
                    Development Mode
                  </span>
                </p>
              </div>

              <h1 className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl">
                Advancing Science Through{" "}
                <span className="text-violet-600">Virtual</span> Lab.
              </h1>
              <p className="mt-5 max-w-prose text-zinc-700 dark:text-zinc-400 sm:text-lg">
                Cutting-edge research and analysis in our state-of-the-art
                laboratory.
              </p>

              {isSignedIn ? (
                <Link
                  className={buttonVariants({ size: "lg", className: "mt-5" })}
                  href="/lab"
                >
                  Enter the Lab <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              ) : (
                <Link
                  className={buttonVariants({ size: "lg", className: "mt-5" })}
                  href="/sign-in"
                >
                  Enter the Lab <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              )}
            </MaxWidthWrapper>
          </Vortex>
        </div>

        <div className="relative isolate">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            />
          </div>

          <div>
            <div className="mx-auto max-w-6xl px-6 lg:px-8">
              <div className="mt-16 flow-root sm:mt-24">
                <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                  <Image
                    src={
                      theme === "dark"
                        ? "/dashboard-preview-dark.png"
                        : "/dashboard-preview.png"
                    }
                    alt="product preview"
                    width={1364}
                    height={866}
                    quality={100}
                    loading="lazy"
                    className="rounded-md bg-white dark:bg-black/20 p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10"
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%-13rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]"
            />
          </div>
        </div>
      </div>

      <div className="mb-10"></div>
    </div>
  );
}
