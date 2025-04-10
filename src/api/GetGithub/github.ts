import axios from "axios";
import { toast } from "react-toastify";

export const fetchUserRepos = async (username: string) => {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}/repos`);
    return response.data;
  } catch (error) {
    toast.error("Error fetching repositories. Please check the username.");
    throw error; 
    
  }
};

export const fetchCommitActivity = async (username: string, repo: string) => {
  try {
    const res = await axios.get(
      `https://api.github.com/repos/${username}/${repo}/stats/commit_activity`
    );
    return res.data;
  } catch (error) {
    toast.error("Error fetching commit activity. Please check the repository name.");
    throw error; 
    
  }
};

export const fetchCommitsOnRepository = async (username: string, repo: string) => {
    try {
        const res = await axios.get(
        `https://api.github.com/repos/${username}/${repo}/commits`
        );
        return res.data;
    } catch (error) {
        toast.error("Error fetching commits. Please check the repository name.");
        throw error; 
        
    }
}

export const fetchAllContribuitons = async (username: string) => {
    try {
        const res = await axios.get(
        `https://api.github.com/users/${username}/events`
        );
        return res.data;
    } catch (error) {
        toast.error("Error fetching contributions. Please check the username.");
        throw error; 
        
    }
}

// lib/github/contributions.ts
export async function fetchUserContributionData(username: string) {
  const query = `
    query {
      user(login: "${username}") {
        contributionsCollection {
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  })
  const json = await res.json()

  if (!json || !json.data) {
    console.error("GitHub GraphQL Error:", json.errors || json)
    throw new Error("Failed to fetch GitHub GraphQL data")
  }

  const days = json.data.user.contributionsCollection.contributionCalendar.weeks
    .flatMap((week: any) => week.contributionDays)
    .map((day: any) => ({
      date: new Date(day.date),
      count: day.contributionCount,
    }))

  return days
}


// src/api/GetGithub/fetchUserLanguages.ts

export async function fetchUserLanguages(username: string) {
  const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
  const repos = await response.json();

  if (!Array.isArray(repos)) return [];

  const languageCount: Record<string, number> = {};

  repos.forEach((repo) => {
    if (repo.language) {
      languageCount[repo.language] = (languageCount[repo.language] || 0) + 1;
    }
  });

  const languageData = Object.entries(languageCount).map(([language, count]) => ({
    language,
    value: count,
  }));

  return languageData;
}
