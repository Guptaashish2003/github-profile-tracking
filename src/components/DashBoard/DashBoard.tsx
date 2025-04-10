import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { RepoList } from "../RepoList"
import {CommitChart,LanguagePieChart} from "../CommitChart"
import {
  fetchCommitActivity,
  fetchUserContributionData,
  fetchUserRepos,
  fetchUserLanguages,
} from "@/api/GetGithub/github"

const DashBoard = () => {
  const [input, setInput] = useState<string>("")
  const [userName, setUserName] = useState<string>("")
  const [repos, setRepos] = useState([])
  const [langData, setLangData] = useState<{ language: string; value: number }[]>([]);
  const [_, setCommitData] = useState([])
  const [totalContri, setTotalContri] = useState(0)
  const [chartData, setChartData] = useState<{ month: string; commit: number }[]>([])

    const extractUsername = (raw: string): string => {
    let trimmed = raw.trim()
    trimmed = trimmed.replace(/^(https?:\/\/)?(www\.)?github\.com\//, "")
    trimmed = trimmed.replace(/\/$/, "")
    return trimmed
  }

  const getUserGithubData = async (username: string) => {
    try {
      const repoList = await fetchUserRepos(username)
      const contributions = await fetchUserContributionData(username)
      const langChart = await fetchUserLanguages(input);
      setLangData(langChart);

      setRepos(repoList)
      setTotalContri(contributions.length)

      if (repoList.length > 0) {
         const commits = await fetchCommitActivity(username, repoList[0].name)
        setCommitData(commits)
      }

      const monthlyData: Record<string, number> = {}

      contributions.forEach(({ date, count }: { date: Date; count: number }) => {
        const month = date.toLocaleString("default", { month: "long" })
        if (!monthlyData[month]) monthlyData[month] = 0
        monthlyData[month] += count
      })

      const monthOrder = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ]

      const formattedChartData = monthOrder
        .filter(m => monthlyData[m])
        .map(m => ({
          month: m,
          commit: monthlyData[m],
        }))

      setChartData(formattedChartData)

    } catch (err) {
      console.error("Error fetching GitHub data:", err)
    }
  }

  const handleSubmit = async () => {
    const extracted = extractUsername(input)
    setUserName(extracted)
    await getUserGithubData(extracted)
  }

  return (
    <div className="min-h-screen w-4/5 max-md:w-[96%] mx-auto flex flex-col justify-center items-start backdrop-blur-3xl rounded-3xl shadow-lg mt-4 p-10 max-md:p-0.5">
      <div className="flex max-md:w-full max-md:flex-col w-1/2 mx-auto gap-x-4">
        <Input
          required
          className="bg-black text-white max-md:w-full mt-2"
          placeholder="Enter your GitHub username or profile link"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button className="max-md:w-24 max-md:mt-1 max-md:ml-auto" onClick={handleSubmit}>Submit</Button>
      </div>

      <div className="grid grid-cols-2 max-md:grid-cols-1 max-md:gap-y-4 gap-4 mt-4 w-full">
      {chartData.length > 0 && <CommitChart data={chartData} />}
      { langData.length > 0 && <LanguagePieChart data={langData} />}
      </div>

      {totalContri > 0 && (
        <p className="text-start text-4xl max-md:text-2xl px-3 py-2 mt-2">
          Contributions: {totalContri}
        </p>
      )}

      {userName && (
        <img
          className="w-full mt-8"
          src={`https://ghchart.rshah.org/HEXCOLORCODE/${userName}`}
          alt={userName}
        />
      )}
      {repos.length > 0 && (
        <p className="text-start text-4xl px-3 max-md:text-2xl py-2 mt-2">
          Repositories: {repos.length}
        </p>
      )}

      <RepoList repos={repos} userName={userName} />
    </div>
  )
}

export default DashBoard
