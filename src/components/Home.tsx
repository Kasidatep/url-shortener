"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { env } from "@/config/env";

export default function Home() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [copySuccess, setCopySuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          originalUrl,
          metadata: {
            title: "Shorten URL",
            description: "Create short URLs for free",
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to shorten URL");
      }

      const data = await response.json();
      setShortUrl(data.shortUrl);
      await copyToClipboard(data.shortUrl);
    } catch (error) {
      console.error("Error shortening URL:", error);
      setCopySuccess("Failed to shorten URL");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (redirect === "notfound") {
      setIsNotFound(true);
    }
  }, [redirect]);

  const copyToClipboard = async (short: string) => {
    try {
      await navigator.clipboard.writeText(`${env.app.url}/${short}`);
      setCopySuccess("URL copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy text:", err);
      setCopySuccess("Failed to copy URL");
    }
  };

  return (
    <div className="flex flex-col m-auto max-w-lg">
      {isNotFound && (
        <div className="m-1 border-2 w-full bg-red-600 py-2 rounded-xl">
          <h3 className="w-full text-lg font-bold text-center text-red-200">
            URL Not Found
          </h3>
          <h5 className="w-full text-md text-center text-red-200">
            Please contact the person who sent the link to you
          </h5>
        </div>
      )}
      <div className="m-1 border-2 w-full bg-zinc-400 py-8 px-5 rounded-xl">
        <h1 className="w-full text-2xl font-extrabold text-center">
          URL Shortener
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            type="url"
            placeholder="Enter original URL"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            required
            className="w-full p-2 my-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full p-2 my-2 ${
              loading ? "bg-gray-500" : "bg-blue-500"
            } text-white rounded`}
          >
            {loading ? "Shortening..." : "Shorten URL"}
          </button>
        </form>

        {shortUrl && (
          <div className="mt-5">
            <p>
              Short URL:{" "}
              <a
                href={`${env.app.url}/${shortUrl}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {env.app.url}/{shortUrl}
              </a>
              <button
                onClick={() => copyToClipboard(shortUrl)}
                className="bg-blue-500 text-white py-2 px-4 rounded ml-2"
              >
                Copy URL to Clipboard
              </button>
              {copySuccess && (
                <p className="mt-2 text-green-500">{copySuccess}</p>
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
