// types/github.ts

export interface GitHubCommit {
  sha: string;
  shortSha: string;
  message: string;
  authorName: string;
  authorAvatar?: string;
  date: string;
  url: string;
  repo: string;
  repoUrl: string;
  branch?: string;
}

export interface GitHubCommitsResponse {
  commits: GitHubCommit[];
  latestCommit?: GitHubCommit;
  totalFetched: number;
  source: "live" | "fallback";
  username: string;
}

export interface GitHubContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface GitHubContributionsData {
  total: Record<string, number>;
  contributions: GitHubContributionDay[];
}

export interface GitHubContributionsResponse {
  totalContributions: number;
  year: string;
  availableYears: string[];
  contributions: GitHubContributionDay[];
  username: string;
  source: "live" | "fallback";
}
