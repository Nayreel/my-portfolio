import { NextResponse } from "next/server";
import { DEVELOPER_PROFILE } from "@/data";
import { GitHubCommit, GitHubCommitsResponse } from "@/types/github";

const GITHUB_USERNAME = DEVELOPER_PROFILE.handle || "Nayreel";
const PRIMARY_REPO = "Nayreel/my-portfolio";

const FALLBACK_COMMITS: GitHubCommit[] = [
  {
    sha: "0f0a01b1d118dd5a3558659e458055bf7c9d54b0",
    shortSha: "0f0a01b",
    message: "feat: add resume PDF and upgrade Next.js to version 16.3.2",
    authorName: "Lee Ryan Garcia",
    authorAvatar: "https://avatars.githubusercontent.com/u/121541180?v=4",
    date: "2026-08-25T07:12:37Z",
    url: "https://github.com/Nayreel/my-portfolio/commit/0f0a01b1d118dd5a3558659e458055bf7c9d54b0",
    repo: "Nayreel/my-portfolio",
    repoUrl: "https://github.com/Nayreel/my-portfolio",
    branch: "main",
  },
  {
    sha: "14d894217d52a69e5bc693594d79058c5a522991",
    shortSha: "14d8942",
    message: "chore: initialize project layout with favicon, updated tsconfig settings, and next.config image patterns",
    authorName: "Nayreel",
    authorAvatar: "https://avatars.githubusercontent.com/u/121541180?v=4",
    date: "2026-08-25T07:11:49Z",
    url: "https://github.com/Nayreel/my-portfolio/commit/14d894217d52a69e5bc693594d79058c5a522991",
    repo: "Nayreel/my-portfolio",
    repoUrl: "https://github.com/Nayreel/my-portfolio",
    branch: "dev",
  },
];

interface RawGitHubCommitItem {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  author?: {
    avatar_url?: string;
  };
  html_url: string;
}

export async function GET() {
  try {
    const headers: Record<string, string> = {
      "User-Agent": "Antigravity-Portfolio-App",
      Accept: "application/vnd.github.v3+json",
    };

    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
    }

    const response = await fetch(
      `https://api.github.com/repos/${PRIMARY_REPO}/commits?per_page=5`,
      {
        headers,
        next: { revalidate: 300 }, // Cache for 5 minutes
      }
    );

    if (!response.ok) {
      return NextResponse.json<GitHubCommitsResponse>({
        commits: FALLBACK_COMMITS,
        latestCommit: FALLBACK_COMMITS[0],
        totalFetched: FALLBACK_COMMITS.length,
        source: "fallback",
        username: GITHUB_USERNAME,
      });
    }

    const rawData = (await response.json()) as RawGitHubCommitItem[];

    if (!Array.isArray(rawData) || rawData.length === 0) {
      return NextResponse.json<GitHubCommitsResponse>({
        commits: FALLBACK_COMMITS,
        latestCommit: FALLBACK_COMMITS[0],
        totalFetched: FALLBACK_COMMITS.length,
        source: "fallback",
        username: GITHUB_USERNAME,
      });
    }

    const commits: GitHubCommit[] = rawData.map((item) => ({
      sha: item.sha,
      shortSha: item.sha.substring(0, 7),
      message: item.commit.message.split("\n")[0] || "Update codebase",
      authorName: item.commit.author.name || GITHUB_USERNAME,
      authorAvatar:
        item.author?.avatar_url ||
        "https://avatars.githubusercontent.com/u/121541180?v=4",
      date: item.commit.author.date,
      url: item.html_url,
      repo: PRIMARY_REPO,
      repoUrl: `https://github.com/${PRIMARY_REPO}`,
      branch: "main",
    }));

    return NextResponse.json<GitHubCommitsResponse>({
      commits,
      latestCommit: commits[0],
      totalFetched: commits.length,
      source: "live",
      username: GITHUB_USERNAME,
    });
  } catch (error) {
    console.error("Error fetching GitHub commits:", error);
    return NextResponse.json<GitHubCommitsResponse>({
      commits: FALLBACK_COMMITS,
      latestCommit: FALLBACK_COMMITS[0],
      totalFetched: FALLBACK_COMMITS.length,
      source: "fallback",
      username: GITHUB_USERNAME,
    });
  }
}
