import {  fetchCommitsOnRepository } from "@/api/GetGithub/github";
import { Link } from "lucide-react";

interface Repo {
  id: number;
  name: string;
  html_url: string;
  created_at: string;
}

interface RepoListProps {
  repos: Repo[];
  userName: string;
 
}
  
  export const RepoList = ({ repos, userName }: RepoListProps) => {
    return (
      <div className="p-4">
        <ul className="space-y-2 grid grid-cols-4 gap-4  ">
          {repos.map((repo) => (
            <div key={repo.id} className="px-4 py-2 rounded-lg border-2 border-white">
                <div className="flex items-start mb-2 gap-x-1.5">
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  {repo.name}
                </a>
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="">
                  <Link className="text-blue-500 hover:underline" size={16} />
                </a>
                </div>
                <div className="flex items-start mb-2 gap-x-1.5">
                <p>Commits :- </p>
                <button
                  onClick={() => fetchCommitsOnRepository(userName, repo.name)}
                  className="text-blue-500 hover:underline"
                >
                  Fetch Commits
                </button>

               </div>
               {/* date format dd-mm-yy */}
               <p className=" w-20 " >{new Date(repo.created_at).toLocaleDateString("en-GB")}</p>

            </div>
          ))}
        </ul>
      </div>
    );
  };
  