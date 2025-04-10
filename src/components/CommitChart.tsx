"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartConfig = {
  commit: {
    label: "Commits",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

interface CommitChartProps {
  data:any[],
}

export function CommitChart({ data }: CommitChartProps) {

  return (
    <Card className="w-full h-full bg-card text-card-foreground shadow-sm border-2 border-white rounded-lg p-4 m-4">
      <CardHeader>
        <CardTitle>Line Chart</CardTitle>
        <CardDescription>{data.length > 0 ? data[0].month : "No Data"} - {data.length > 0 ? data[data.length - 1].month : "No Data"}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="commit"
              type="natural"
              stroke="var(--color-black)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Contribution From last Year <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          {data.length} months of contributions
        </div>
      </CardFooter>
    </Card>
  )
}



interface LanguageData {
  language: string;
  value: number;
}

const COLORS = [
  "#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF", "#FF4560",
  "#00E396", "#FEB019", "#775DD0", "#3F51B5",
];

interface Props {
  data: LanguageData[];
}

export  function LanguagePieChart({ data }: Props) {
  return (
    <Card className="w-full max-w-xl bg-card h-full text-card-foreground shadow-sm border rounded-lg p-4 m-4">
      <CardHeader>
        <CardTitle>Language Distribution</CardTitle>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="language"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {data.map((_, index) => (
                <Cell  key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
